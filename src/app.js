import "core-js/stable"; //to replace babel/polyfill
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css/normalize.css';
import './style.scss';


const App = ()=>(
    <p>i love you</p>
)

const root = createRoot(document.getElementById('app')); 
root.render(<App />);