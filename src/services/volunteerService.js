import axios from 'axios';

const API_URL = '/api/volunteers';

export const volunteerService = {
  getVolunteers: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getVolunteerById: async (id) => {
    const response = await axios.get(`${API_URL}?id=${id}`);
    return response.data;
  },

  approveVolunteer: async (id) => {
    const response = await axios.put(`${API_URL}?id=${id}`, { status: 'Aprovado' });
    return response.data;
  },

  rejectVolunteer: async (id) => {
    const response = await axios.put(`${API_URL}?id=${id}`, { status: 'Rejeitado' });
    return response.data;
  },

  updateVolunteer: async (volunteer) => {
    const response = await axios.put(`${API_URL}?id=${volunteer.id}`, volunteer);
    return response.data;
  },

  addTask: async (volunteerId, task) => {
    console.log('Adding task:', volunteerId, task);
    try {
      const volunteer = await volunteerService.getVolunteerById(volunteerId);
      console.log('Existing volunteer:', volunteer);
      const updatedTasks = [...(volunteer.tasks || []), { ...task, id: Date.now(), status: 'Pendente' }];
      console.log('Updated tasks:', updatedTasks);
      const response = await axios.put(`${API_URL}?id=${volunteerId}`, { tasks: updatedTasks });
      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in addTask:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  updateTask: async (volunteerId, taskId, updatedTask) => {
    const response = await axios.put(`${API_URL}/${volunteerId}/tasks/${taskId}`, updatedTask);
    return response.data;
  },

  updateTaskStatus: async (volunteerId, taskId, newStatus) => {
    const volunteer = await volunteerService.getVolunteerById(volunteerId);
    const updatedTasks = volunteer.tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    const response = await axios.put(`${API_URL}?id=${volunteerId}`, { tasks: updatedTasks });
    return response.data;
  },

  addActivityLog: async (volunteerId, action, details) => {
    const volunteer = await volunteerService.getVolunteerById(volunteerId);
    const newActivity = {
      id: Date.now(),
      date: new Date().toISOString(),
      action,
      details
    };
    const updatedActivityLog = [...(volunteer.activityLog || []), newActivity];
    const response = await axios.put(`${API_URL}?id=${volunteerId}`, { activityLog: updatedActivityLog });
    return response.data;
  },

  getActivityLog: async (volunteerId) => {
    const volunteer = await volunteerService.getVolunteerById(volunteerId);
    return volunteer.activityLog || [];
  }
};
