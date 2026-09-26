import API from './api';

export const jobService = {
  // Analyze a new job posting with Gemini
  analyzeJob: async (jobData) => {
    const res = await API.post('/jobs/analyze', jobData);
    return res.data;
  },

  // Get user's analyzed jobs history
  getUserJobs: async () => {
    const res = await API.get('/jobs');
    return res.data;
  },

  // Get single job analysis report
  getJobById: async (id) => {
    const res = await API.get(`/jobs/${id}`);
    return res.data;
  },

  // Toggle save/bookmark
  toggleSaveJob: async (id) => {
    const res = await API.put(`/jobs/${id}/save`);
    return res.data;
  },

  // Delete analysis report
  deleteJob: async (id) => {
    const res = await API.delete(`/jobs/${id}`);
    return res.data;
  },

  // Get dashboard real statistics
  getDashboardStats: async () => {
    const res = await API.get('/jobs/dashboard/stats');
    return res.data;
  },
};

export default jobService;
