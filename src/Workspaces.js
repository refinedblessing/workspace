import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Workspaces.scss';

const Workspaces = () => {
  let [workspaces, setWorkspaces] = useState([]);
  let [name, setName] = useState('');
  let [language, setLanguage] = useState('');
  const apiUrl = 'http://127.0.0.1:3000/api/v1/workspaces';
  useEffect(() => {
    axios.get(apiUrl)
      .then(res => setWorkspaces(res.data))
      .catch(console.error)
  }, [])

  const addWorkSpace = () => {
    axios.post(apiUrl, {workspace: {name, language}})
      .catch(console.error)
  }

  return (
    <div className="workspaces container">
      <h1>Welcome to Workspaces</h1>
      <section className="form-container">
        <h5>Create new workspace</h5>
        <form onSubmit={addWorkSpace}>
          <div className="mb-3">
            <label for="new_workspace_name" className="form-label">Enter Workspace Name</label>
            <input onChange={e => setName(e.target.value)} className="form-control" value={name} name="new_workspace_name" id="new_workspace_name" type="text" placeholder="Enter Name" />
          </div>
          <div className="mb-3">
            <label for="new_workspace_language" className="form-label">Enter Workspace Language</label>
            <input className="form-control" onChange={e => setLanguage(e.target.value)} value={language} name="new_workspace_language" id="new_workspace_language" type="text" placeholder="Enter Language" />
          </div>
          <button type="submit" className="btn btn-primary">Create Workspace</button>
        </form>
      </section>

      <section>
        <h5>Workspace Lists</h5>
        <ul>
          {
            workspaces.map(({id, name}) => {
              const link = `${apiUrl}/${id}`;
              return (
                <li key={id}>
                  <a href={link}><p>{name}</p></a>
                </li>
              )
            })
          }
        </ul>
      </section>
    </div>
  );
}

export default Workspaces;
