import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const dcRoot = document.createElement('div');
document.body.appendChild(dcRoot);
ReactDOM.render(<App />, dcRoot);
