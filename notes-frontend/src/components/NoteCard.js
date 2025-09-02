import React from 'react';
import { Link } from 'react-router-dom';

const NoteCard = ({ note, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getContentPreview = (content) => {
    if (!content) return 'No content';
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  };

  return (
    <div className="note-card">
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <Link to={`/notes/${note.id}`} className="btn btn-primary btn-sm">
            View
          </Link>
          <Link to={`/notes/${note.id}/edit`} className="btn btn-secondary btn-sm">
            Edit
          </Link>
          <button 
            onClick={handleDelete} 
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="note-content-preview">
        {getContentPreview(note.content)}
      </div>
      
      <div className="note-meta">
        <span className="note-date">
          Created: {formatDate(note.createdAt)}
        </span>
        {note.updatedAt !== note.createdAt && (
          <span className="note-date">
            Updated: {formatDate(note.updatedAt)}
          </span>
        )}
      </div>
    </div>
  );
};

export default NoteCard;