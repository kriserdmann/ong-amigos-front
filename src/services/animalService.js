import axios from 'axios';

const API_URL = '/api/animals';

export const animalService = {
  getAnimals: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  addAnimal: async (animal) => {
    const response = await axios.post(API_URL, animal);
    return response.data;
  },

  updateAnimal: async (animal) => {
    const response = await axios.put(API_URL, animal);
    return response.data;
  },

  deleteAnimal: async (id) => {
    const response = await axios.delete(`${API_URL}?id=${id}`);
    return response.data;
  },

  getAnimal: async (id) => {
    const response = await axios.get(`${API_URL}?id=${id}`);
    return response.data;
  }
};
