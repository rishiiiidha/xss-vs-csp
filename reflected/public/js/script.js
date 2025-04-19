document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('xss-form');
    const queryInput = document.getElementById('query');
    
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = queryInput.value;
        

        const newUrl = window.location.pathname + '?query=' + encodeURIComponent(query);
        window.location.href = newUrl;
        
        const unsafeOutput = document.getElementById('output-unsafe');
        if (unsafeOutput) {
          unsafeOutput.innerHTML = query;
        }
        
        const safeOutput = document.getElementById('output-safe');
        if (safeOutput) {
          safeOutput.textContent = query;
        }
      });
    }
    
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    if (query && queryInput) {
      queryInput.value = query;
      
      const unsafeOutput = document.getElementById('output-unsafe');
      if (unsafeOutput) {
        unsafeOutput.innerHTML = query;
      }
      
      const safeOutput = document.getElementById('output-safe');
      if (safeOutput) {
        safeOutput.textContent = query;
      }
    }
  });