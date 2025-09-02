import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import notesApi from '../services/notesApi';
import { MESSAGES } from '../utils/constants';

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await notesApi.getAllNotes();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await notesApi.deleteNote(noteId);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    } catch (err) {
      alert(`Error deleting note: ${err.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>{MESSAGES.LOADING}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h3>Error Loading Notes</h3>
        <p>{error}</p>
        <button onClick={fetchNotes} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="notes-list-page">
      {notes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>{MESSAGES.NO_NOTES}</h3>
          <Link to="/create" className="btn btn-primary">
            Create Your First Note
          </Link>
        </div>
      ) : (
        <>
          <div className="notes-stats">
            <p>{notes.length} {notes.length === 1 ? 'note' : 'notes'}</p>
          </div>
          
          <div className="notes-grid">
            {notes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NotesListPage;