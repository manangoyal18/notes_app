import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import notesApi from '../services/notesApi';

const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNote();
  }, [id]);

  const fetchNote = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await notesApi.getNoteById(id);
      setNote(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (noteData) => {
    try {
      setIsSubmitting(true);
      setError('');
      
      await notesApi.updateNote(id, noteData);
      navigate(`/notes/${id}`, { 
        state: { message: 'Note updated successfully!' }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading note...</p>
      </div>
    );
  }

  if (error && !note) {
    return (
      <div className="error">
        <h3>Error Loading Note</h3>
        <p>{error}</p>
        <div className="error-actions">
          <button onClick={fetchNote} className="btn btn-primary">
            Try Again
          </button>
          <Link to="/" className="btn btn-secondary">
            Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="error">
        <h3>Note Not Found</h3>
        <p>The requested note could not be found.</p>
        <Link to="/" className="btn btn-primary">
          Back to Notes
        </Link>
      </div>
    );
  }

  return (
    <div className="edit-note-page">
      <div className="page-actions">
        <Link to={`/notes/${id}`} className="btn btn-secondary">
          ← Back to Note
        </Link>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
          {error.includes('modified by another user') && (
            <div className="error-help">
              <p>This note has been updated by someone else. Please refresh to see the latest version.</p>
              <button onClick={fetchNote} className="btn btn-sm btn-primary">
                Refresh Note
              </button>
            </div>
          )}
        </div>
      )}

      <div className="form-container">
        <NoteForm
          initialData={note}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
          submitText="Update Note"
        />
      </div>
    </div>
  );
};

export default EditNotePage;