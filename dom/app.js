const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { 
    title: 'DOM XSS Demo - No CSP',
    csp: false
  });
});

app.get('/basic-csp', (req, res) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self'; object-src 'none'; base-uri 'self';"
  );
  
  res.render('basic-csp', { 
    title: 'DOM XSS Demo - Basic CSP',
    csp: 'basic'
  });
});

app.get('/moderate-csp', (req, res) => {
  res.setHeader(
    "Content-Security-Policy", 
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; object-src 'none'; base-uri 'self'"
  );
  
  res.render('moderate-csp', { 
    title: 'DOM XSS Demo - Moderate CSP',
    csp: 'moderate'
  });
});

app.get('/strict-csp', (req, res) => {
  const nonce = require('crypto').randomBytes(16).toString('base64');
  console.log(`Nonce: ${nonce}`);
  
  res.setHeader(
    "Content-Security-Policy", 
    `default-src 'none'; ` +
    `script-src 'self' 'nonce-${nonce}'; ` +
    `style-src 'self'; ` +
    `img-src 'self'; ` +
    `connect-src 'self'; ` +
    `font-src 'self'; ` +
    `object-src 'none'; ` +
    `base-uri 'none'; ` +
    `form-action 'self'; ` +
    `frame-ancestors 'none'`
  );
  
  res.render('strict-csp', { 
    title: 'DOM XSS Demo - Strict CSP',
    csp: 'strict',
    nonce: nonce
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});