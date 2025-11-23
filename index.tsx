import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  document.body.innerHTML = '<div style="color:red; padding:20px;">Failed to find the root element</div>';
  throw new Error("Could not find root element to mount to");
}

try {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("App mounted successfully");
} catch (error) {
  console.error("Error mounting React app:", error);
  // Show error on screen for debugging
  rootElement.innerHTML = `<div style="color: #ef4444; padding: 20px; text-align: center; direction: ltr; background: #18181b; height: 100vh; display: flex; flex-direction: column; justify-content: center;">
    <h2 style="margin-bottom: 10px;">Something went wrong</h2>
    <pre style="background: #000; padding: 15px; border-radius: 8px; overflow: auto; max-width: 800px; margin: 0 auto;">${error instanceof Error ? error.message : String(error)}</pre>
  </div>`;
}