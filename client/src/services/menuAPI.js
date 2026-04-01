import supabase from './supabaseClient';

const menuAPI = {
  getAll: async (filters = {}) => {
    let query = supabase
      .from('menu_items')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.available !== undefined) {
      query = query.eq('available', filters.available);
    }
    if (filters.favorite) {
      query = query.eq('is_favorite', true);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  getFavorites: async () => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_favorite', true)
      .eq('available', true)
      .limit(6);

    if (error) throw error;
    return data;
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
};

export default menuAPI;