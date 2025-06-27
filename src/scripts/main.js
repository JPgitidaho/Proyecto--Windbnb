import { setupFilters } from './filter.js';


 

document.addEventListener('DOMContentLoaded', () => {
      const darkToggle = document.getElementById('darkToggle');
      const html = document.documentElement;

      if (localStorage.getItem('darkMode') === 'enabled') {
        html.classList.add('dark');
        darkToggle.checked = true;
      }

      darkToggle.addEventListener('change', () => {
        if (darkToggle.checked) {
          html.classList.add('dark');
          localStorage.setItem('darkMode', 'enabled');
        } else {
          html.classList.remove('dark');
          localStorage.setItem('darkMode', 'disabled');
        }
      });
    });
     setupFilters();
