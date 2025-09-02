import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NotesListPage from './pages/NotesListPage';
import CreateNotePage from './pages/CreateNotePage';
import ViewNotePage from './pages/ViewNotePage';
import EditNotePage from './pages/EditNotePage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<NotesListPage />} />
          <Route path="/create" element={<CreateNotePage />} />
          <Route path="/notes/:id" element={<ViewNotePage />} />
          <Route path="/notes/:id/edit" element={<EditNotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

const NotFoundPage = () => {
  return (
    <div className="error">
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-primary">
        Go Home
      </a>
    </div>
  );
};

export default App;