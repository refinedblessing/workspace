import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import axios from './utils/axiosUtils';
// import { Link } from 'react-router-dom';

const Workspace = ({match: {params: {workspaceId}}}) => {
  let [workspace, setWorkspace] = useState({});
  const [name, setName] = useState('')
  const [language, setLanguage] = useState('')
  const editorRef = useRef(null);

  useEffect(() => {
    axios.get(`workspaces/${workspaceId}`)
      .then(res => {
        const data = res.data
        setWorkspace(res.data)
        setName(data.name)
        setLanguage(data.language)
      })
      .catch(console.error)
  }, [workspaceId])

  const options = {
    selectOnLineNumbers: true,
    colorDecorators: true
  };

  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor; 
  }

  const saveCode = () => {
    axios.put(`workspaces/${workspaceId}`, {
      body: editorRef.current.getValue(),
      name,
      language
    })
      .then(res => setWorkspace(res.data))
      .catch(console.error)
  }

  return (
    <div>
      <h2>{name}</h2>
      <div className='mb-3'>
        <Editor
          height="90vh"
          defaultLanguage='javascript'
          language={language}
          theme="vs-dark"
          value={workspace.body}
          options={options}
          onMount={editorDidMount}
        />
      </div>
      <button className="btn btn-primary" onClick={saveCode}>Save value</button>
    </div>
  )
}

export default Workspace;
