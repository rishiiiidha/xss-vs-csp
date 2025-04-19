const express = require('express');
const path = require('path');
const crypto = require('crypto');
const database = require('./database');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.get('/', async (req, res) => {
  const comments = await database.getComments();
  res.render('index', {
    title: 'Stored XSS Demo - No CSP',
    csp: false,
    comments
  });
});

app.get('/basic-csp', async (req, res) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src *; object-src 'none'; base-uri 'self';"
  );
  
  const comments = await database.getComments();
  res.render('basic-csp', {
    title: 'Stored XSS Demo - Basic CSP',
    csp: 'basic',
    comments
  });
});

app.get('/moderate-csp', async (req, res) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; object-src 'none'; base-uri 'self'"
  );
  
  const comments = await database.getComments();
  res.render('moderate-csp', {
    title: 'Stored XSS Demo - Moderate CSP',
    csp: 'moderate',
    comments
  });
});

app.get('/strict-csp', async (req, res) => {
  const nonce = crypto.randomBytes(16).toString('base64');
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
  
  const comments = await database.getComments();
  res.render('strict-csp', {
    title: 'Stored XSS Demo - Strict CSP',
    csp: 'strict',
    nonce: nonce,
    comments
  });
});

// Handle comment submissions
app.post('/submit-comment', async (req, res) => {
  const cspMode = req.body.cspMode || 'none';
  const comment = req.body.comment || '';
  
  await database.addComment(comment);
  
  // Redirect to the appropriate page based on CSP mode
  switch(cspMode) {
    case 'basic':
      res.redirect('/basic-csp');
      break;
    case 'moderate':
      res.redirect('/moderate-csp');
      break;
    case 'strict':
      res.redirect('/strict-csp');
      break;
    case 'none':
      res.redirect('/no-csp');
      break;
    default:
      res.redirect('/no-csp');
  }
});

// Admin routes
app.get('/admin', async (req, res) => {
  const comments = await database.getComments();
  res.render('admin', { 
    comments
  });
});

app.post('/admin/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    res.redirect('/admin');
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).send('Error deleting comment');
  }
});

app.post('/admin/reset', async (req, res) => {
  try {
    await database.deleteAllComments();
    res.redirect('/admin');
  } catch (error) {
    console.error('Error resetting comments:', error);
    res.status(500).send('Error resetting comments');
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Stored XSS Demo running on http://localhost:${PORT}`);
  console.log(`Admin panel available at http://localhost:${PORT}/admin`);
});