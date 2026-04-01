import supabase from './supabaseClient';

const contactAPI = {
  send: async (contactData) => {
    const { data, error } = await supabase
      .from('contacts')
      .insert({
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone || null,
        subject: contactData.subject,
        message: contactData.message
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  getAll: async (filters = {}) => {
    let query = supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
};

export default contactAPI;
