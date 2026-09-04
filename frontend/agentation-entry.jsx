import React from 'react';
import { createRoot } from 'react-dom/client';
import { Agentation } from 'agentation';

if (typeof document !== 'undefined') {
  const initAgentation = () => {
    let container = document.getElementById('agentation-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'agentation-root';
      document.body.appendChild(container);
    }
    const root = createRoot(container);
    root.render(React.createElement(Agentation));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAgentation);
  } else {
    initAgentation();
  }
}
