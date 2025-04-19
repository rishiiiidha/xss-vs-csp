/**
 * Stored XSS Demo - Client-side JavaScript
 * 
 * This file contains legitimate JavaScript that will be loaded by all pages
 * It can be used to demonstrate that legitimate scripts still work with CSP
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Stored XSS Demo - Script loaded');
    
    // Add helpful message about the current CSP mode
    const cspStatus = document.querySelector('.csp-status strong');
    if (cspStatus) {
      const cspMode = cspStatus.textContent;
      console.log(`Current CSP mode: ${cspMode}`);
      
      // Add additional information based on CSP mode
      switch(cspMode) {
        case 'None':
          console.log('Warning: No CSP protection, all scripts will execute');
          break;
        case 'Basic':
          console.log('Basic CSP allows inline scripts but blocks some advanced attacks');
          break;
        case 'Moderate':
          console.log('Moderate CSP blocks inline scripts but allows same-origin scripts');
          break;
        case 'Strict':
          console.log('Strict CSP requires nonces and blocks most XSS attacks');
          break;
      }
    }
    
    // Add click event to comment examples for easy copy
    const payloadExamples = document.querySelectorAll('.payload-examples code');
    payloadExamples.forEach(example => {
      example.style.cursor = 'pointer';
      example.title = 'Click to copy';
      
      example.addEventListener('click', function() {
        const textarea = document.getElementById('comment');
        if (textarea) {
          textarea.value = this.textContent;
          textarea.focus();
        }
      });
    });
    
    // Highlight active navigation link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
  });