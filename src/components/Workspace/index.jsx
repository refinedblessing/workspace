import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import axios from '../../utils/axiosUtils';

import './Workspace.scss';

const Workspace = ({
  match: {
    params: { workspaceId },
  },
}) => {
  const [workspace, setWorkspace] = useState({});
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    axios
      .get(`workspaces/${workspaceId}`)
      .then((res) => {
        const { data } = res;
        setWorkspace(res.data);
        setName(data.name);
        setLanguage(data.language);
      })
      .catch(console.error);
  }, [workspaceId]);

  const options = {
    selectOnLineNumbers: true,
    colorDecorators: true,
  };

  const editorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const saveCode = () => {
    axios
      .put(`workspaces/${workspaceId}`, {
        body: editorRef.current.getValue(),
        name,
        language,
      })
      .then((res) => setWorkspace(res.data))
      .catch(console.error);
  };

  return (
    <div className="workspace">
      <button type="button" className="btn btn-primary ms-1 my-1">
        <Link to="/">Home</Link>
      </button>
      <button
        type="button"
        className="save-btn float-end btn btn-primary me-1 my-1"
        onClick={saveCode}
      >
        Save Changes To: {name}
      </button>
      <div>
        <Editor
          height="98vh"
          defaultLanguage="javascript"
          language={language}
          theme="vs-dark"
          value={workspace.body}
          options={options}
          onMount={editorDidMount}
        />
      </div>
    </div>
  );
};

Workspace.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      workspaceId: PropTypes.string.isRequired,
    }),
  }),
};

export default Workspace;
