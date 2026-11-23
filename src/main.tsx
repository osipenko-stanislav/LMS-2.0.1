import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { TooltipProvider } from './ui';
import './ui/styles.css';
import { MotionProvider } from './ui/motion';
createRoot(document.getElementById('root')!).render(<StrictMode><MotionProvider><TooltipProvider><App /></TooltipProvider></MotionProvider></StrictMode>);
