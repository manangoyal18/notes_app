import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import notesApi from '../services/notesApi';

const ViewNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await notesApi.deleteNote(id);
      navigate('/', { 
        state: { message: 'Note deleted successfully!' }
      });
    } catch (err) {
      alert(`Error deleting note: ${err.message}`);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatContent = (content) => {
    if (!content) return 'No content';
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading note...</p>
      </div>
    );
  }

  if (error) {
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
    <div className="view-note-page">
      <div className="page-actions">
        <Link to="/" className="btn btn-secondary">
          ← Back to Notes
        </Link>
        <div className="note-actions">
          <Link to={`/notes/${note.id}/edit`} className="btn btn-primary">
            Edit Note
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Note
          </button>
        </div>
      </div>

      <article className="note-details">
        <header className="note-header">
          <h1 className="note-title">{note.title}</h1>
          <div className="note-meta">
            <div className="note-dates">
              <span className="note-date">
                <strong>Created:</strong> {formatDate(note.createdAt)}
              </span>
              {note.updatedAt !== note.createdAt && (
                <span className="note-date">
                  <strong>Last Updated:</strong> {formatDate(note.updatedAt)}
                </span>
              )}
            </div>
          </div>
        </header>

        <div className="note-content">
          {formatContent(note.content)}
        </div>
      </article>
    </div>
  );
};

export default ViewNotePage;