import supabase from './supabaseClient';

const reservationAPI = {
  create: async (reservationData) => {
    // Check availability first (max 50 guests per time slot)
    const { data: existing, error: checkError } = await supabase
      .from('reservations')
      .select('number_of_guests')
      .eq('date', reservationData.date)
      .eq('time', reservationData.time)
      .neq('status', 'annulée');

    if (checkError) throw checkError;

    const totalGuests = existing.reduce((acc, r) => acc + r.number_of_guests, 0);

    if (totalGuests + Number(reservationData.numberOfGuests) > 50) {
      throw new Error('Désolé, ce créneau est complet. Veuillez choisir un autre horaire.');
    }

    const { data, error } = await supabase
      .from('reservations')
      .insert({
        customer_name: reservationData.customerName,
        email: reservationData.email,
        phone: reservationData.phone,
        date: reservationData.date,
        time: reservationData.time,
        number_of_guests: Number(reservationData.numberOfGuests),
        special_request: reservationData.specialRequest || null,
        occasion: reservationData.occasion || 'aucune'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  checkAvailability: async (date, time) => {
    const { data, error } = await supabase
      .from('reservations')
      .select('number_of_guests')
      .eq('date', date)
      .eq('time', time)
      .neq('status', 'annulée');

    if (error) throw error;

    const totalGuests = data.reduce((acc, r) => acc + r.number_of_guests, 0);
    const availableSeats = 50 - totalGuests;

    return {
      totalGuests,
      availableSeats,
      isAvailable: availableSeats > 0
    };
  },

  getAll: async (filters = {}) => {
    let query = supabase
      .from('reservations')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (filters.date) {
      query = query.eq('date', filters.date);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
};

export default reservationAPI;