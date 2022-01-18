import React from 'react';
import ReactDOM from 'react-dom';
import SpotifyContext from './SpotifyContext';
import './index.css';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <SpotifyContext>
     <App />
    </SpotifyContext>
 </React.StrictMode>,
  document.getElementById('root')
);

