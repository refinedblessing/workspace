import React, { useState, useEffect } from 'react';
import axios from '../../utils/axiosUtils';
import { Link } from 'react-router-dom';

import './Workspaces.scss';

const Workspaces = () => {
  let [workspaces, setWorkspaces] = useState([]);
  let [name, setName] = useState('');
  let [language, setLanguage] = useState('');

  useEffect(() => {
    axios.get('workspaces')
      .then(res => setWorkspaces(res.data.workspaces))
      .catch(console.error)
  }, [])

  const addWorkSpace = () => {
    axios.post('workspaces', {workspace: {name, language}})
      .catch(console.error)
  }

  return (
    <div className="workspaces container">
      <h1>Welcome to Workspaces</h1>
      <section className="form-container">
        <h5>Create new workspace</h5>
        <form onSubmit={addWorkSpace}>
          <div className="mb-3">
            <label htmlFor="new_workspace_name" className="form-label">Enter Workspace Name</label>
            <input onChange={e => setName(e.target.value)} className="form-control" value={name} name="new_workspace_name" id="new_workspace_name" type="text" placeholder="Enter Name" />
          </div>
          <div className="mb-3">
            <label htmlFor="new_workspace_language" className="form-label">Enter Workspace Language</label>
            <input className="form-control" onChange={e => setLanguage(e.target.value)} value={language} name="new_workspace_language" id="new_workspace_language" type="text" placeholder="Enter Language" />
          </div>
          <button type="submit" className="btn btn-primary">Create Workspace</button>
        </form>
      </section>

      <section>
        <h5>Workspace Lists</h5>
        <ul>
          {
            workspaces.map(({id, name}) => (
              <li key={id}>
                  <Link to={`/workspaces/${id}`}>{name}</Link>
                </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
}

export default Workspaces;
