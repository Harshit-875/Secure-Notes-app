import React from 'react';

export default function About() {
  return (
    <div className="container my-5 p-4 shadow-lg rounded bg-light" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-4 text-primary">About iNotebook</h2>
      <p className="lead">
        <strong>iNotebook</strong> is your personal digital notebook that helps you stay organized and productive. Whether you're a student, a developer, or just someone who likes to jot down thoughts, iNotebook makes it simple and fast to manage your notes.
      </p>
      <hr />
      <h4 className="text-secondary">Key Features</h4>
      <ul className="list-group list-group-flush mb-4">
        <li className="list-group-item">✍️ Create and manage unlimited notes</li>
        <li className="list-group-item">🔐 Secure login and authentication</li>
        <li className="list-group-item">🌐 Access your notes from anywhere</li>
        <li className="list-group-item">🗑️ Edit or delete notes anytime</li>
      </ul>
      <p>
        This project is built with <strong>React</strong> for the frontend and <strong>Node.js</strong> with <strong>MongoDB</strong> for the backend.
      </p>
      <p className="text-muted">
        Version: 1.0.0 | Developed by [Your Name]
      </p>
    </div>
  );
}
