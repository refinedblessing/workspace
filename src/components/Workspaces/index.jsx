import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from '../../utils/axiosUtils';

import './Workspaces.scss';

const Workspaces = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('');
  const [sortBy, setSortBy] = useState('id');

  const supportedLangOptions = [
    'CSS',
    'HTML',
    'JSON',
    'Java',
    'JavaScript',
    'LESS',
    'PHP',
    'Ruby',
    'SASS',
    'SCSS',
    'TypeScript',
    'XML',
  ].map((lang) => (
    <option key={lang} value={lang}>
      {lang}
    </option>
  ));

  useEffect(() => {
    axios
      .get('workspaces')
      .then((res) => setWorkspaces(res.data.workspaces))
      .catch(console.error);
  }, []);

  const addWorkSpace = () => {
    axios
      .post('workspaces', { workspace: { name, language } })
      .catch(console.error);
  };

  return (
    <div className="d-flex">
      <div className="mx-auto workspaces">
        <h1>Welcome to Workspaces</h1>
        <section className="form-container">
          <h3>Create New Workspace</h3>
          <form onSubmit={addWorkSpace}>
            <div className="row">
              <div className="mb-3 col-6">
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  value={name}
                  type="text"
                  placeholder="Enter Workspace Name"
                />
              </div>
              <div className="mb-3 col-6">
                <select
                  className="form-select"
                  aria-label="Workspace Language"
                  onChange={(e) => setLanguage(e.target.value)}
                  value={language}
                >
                  <option defaultValue>Select Workspace Language</option>
                  {supportedLangOptions}
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Create Workspace
            </button>
          </form>
        </section>

        <section className="workplace-list">
          <header className="d-flex justify-content-between align-items-center">
            <h3>Available Workspaces</h3>
            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              aria-label="Sort workspace list"
              value={sortBy}
            >
              <option value="id">Sort By</option>
              <option value="updated_at">Newest</option>
              <option value="language">Language</option>
              <option value="name">Name</option>
            </select>
          </header>
          <ul className="list-group list-group-flush">
            {workspaces
              .sort((workspaceA, workspaceB) => {
                if (sortBy === 'id' || sortBy === 'updated_at') {
                  return workspaceA[sortBy] < workspaceB[sortBy] ? 1 : -1;
                }
                return workspaceA[sortBy] > workspaceB[sortBy] ? 1 : -1;
              })
              .map((w) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={w.id}
                >
                  <Link to={`/workspaces/${w.id}`}>{w.name}</Link>
                  <span className="badge bg-primary rounded-pill">
                    {w.language}
                  </span>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Workspaces;
