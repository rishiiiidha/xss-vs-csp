document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dom-xss-form');
    const usernameInput = document.getElementById('username');
    const unsafeProfile = document.getElementById('profile-unsafe');
    const safeProfile = document.getElementById('profile-safe');
  

    if (window.location.hash) {
      const hashPayload = decodeURIComponent(window.location.hash.substring(1));
      updateProfiles(hashPayload);
      if (usernameInput) usernameInput.value = hashPayload;
    }
  

    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = usernameInput.value;
        
        window.location.hash = encodeURIComponent(username);
        updateProfiles(username);
      });
    }
  
    function updateProfiles(username) {
        let encoded = username.slice(1,-1)
        let result = '<' + encodeURIComponent(encoded) + '>';
      if (unsafeProfile) {
        unsafeProfile.innerHTML = `
          <h3>User Profile</h3>
          <p>Welcome, ${username}!</p>
          <p>Your profile link: <a href="/#${result}">View profile</a></p>
        `;
      }
      
      if (safeProfile) {
        safeProfile.textContent = `
          User Profile
          Welcome, ${username}!
          Your profile link: /${username}
        `;
      }
    }
  
   
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
      document.write(`<p>Search results for: ${searchQuery}</p>`);
    }
  });