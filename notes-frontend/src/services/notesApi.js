import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const notesApi = {
  getAllNotes: async () => {
    try {
      const response = await api.get('/notes');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch notes');
    }
  },

  getNoteById: async (id) => {
    try {
      const response = await api.get(`/notes/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Note not found');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch note');
    }
  },

  createNote: async (noteData) => {
    try {
      const response = await api.post('/notes', noteData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error(
          error.response.data?.fieldErrors 
            ? Object.values(error.response.data.fieldErrors).join(', ')
            : error.response.data?.message || 'Invalid note data'
        );
      }
      throw new Error(error.response?.data?.message || 'Failed to create note');
    }
  },

  updateNote: async (id, noteData) => {
    try {
      const response = await api.put(`/notes/${id}`, noteData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Note not found');
      }
      if (error.response?.status === 409) {
        throw new Error('Note was modified by another user. Please refresh and try again.');
      }
      if (error.response?.status === 400) {
        throw new Error(
          error.response.data?.fieldErrors 
            ? Object.values(error.response.data.fieldErrors).join(', ')
            : error.response.data?.message || 'Invalid note data'
        );
      }
      throw new Error(error.response?.data?.message || 'Failed to update note');
    }
  },

  deleteNote: async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      return true;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Note not found');
      }
      throw new Error(error.response?.data?.message || 'Failed to delete note');
    }
  },
};

export default notesApi;