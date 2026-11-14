import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './app/lobby.css';
import './app/emblem.css';
import './app/compact.css';
import './app/compact-screens.css';

createRoot(document.getElementById('root')!).render(<App />);
