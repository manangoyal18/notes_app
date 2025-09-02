import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import notesApi from '../services/notesApi';

const CreateNotePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (noteData) => {
    try {
      setIsLoading(true);
      setError('');
      
      await notesApi.createNote(noteData);
      navigate('/', { 
        state: { message: 'Note created successfully!' }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-note-page">
      <div className="page-actions">
        <Link to="/" className="btn btn-secondary">
          ← Back to Notes
        </Link>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="form-container">
        <NoteForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitText="Create Note"
        />
      </div>
    </div>
  );
};

export default CreateNotePage;