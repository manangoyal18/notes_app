export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export const ROUTES = {
  HOME: '/',
  CREATE_NOTE: '/create',
  VIEW_NOTE: '/notes/:id',
  EDIT_NOTE: '/notes/:id/edit',
};

export const MESSAGES = {
  LOADING: 'Loading...',
  NO_NOTES: 'No notes found. Create your first note!',
  CREATE_SUCCESS: 'Note created successfully!',
  UPDATE_SUCCESS: 'Note updated successfully!',
  DELETE_SUCCESS: 'Note deleted successfully!',
  DELETE_CONFIRM: 'Are you sure you want to delete this note?',
};