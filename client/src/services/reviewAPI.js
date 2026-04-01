import supabase from './supabaseClient';

const reviewAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw error;
    return data;
  },

  create: async (reviewData) => {
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        customer_name: reviewData.customerName,
        rating: Number(reviewData.rating),
        comment: reviewData.comment,
        visit_date: reviewData.visitDate || new Date().toISOString(),
        approved: true // auto-approve
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  getStats: async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('approved', true);

    if (error) throw error;

    const totalReviews = data.length;

    if (totalReviews === 0) {
      return {
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }

    const totalRating = data.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = Number((totalRating / totalReviews).toFixed(1));

    const ratingDistribution = {
      5: data.filter(r => r.rating === 5).length,
      4: data.filter(r => r.rating === 4).length,
      3: data.filter(r => r.rating === 3).length,
      2: data.filter(r => r.rating === 2).length,
      1: data.filter(r => r.rating === 1).length
    };

    return { totalReviews, averageRating, ratingDistribution };
  }
};

export default reviewAPI;