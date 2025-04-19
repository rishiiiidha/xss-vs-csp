/**
 * Database module for Stored XSS Demo
 * Uses SQLite in-memory database to store and retrieve comments
 */

const sqlite3 = require('sqlite3').verbose();

// Initialize in-memory database
const db = new sqlite3.Database(':memory:');

// Set up database schema
db.serialize(() => {
  // Create comments table
  db.run(`
    CREATE TABLE comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add some initial safe comments
  db.run(`INSERT INTO comments (content) VALUES ('This is a safe comment.')`);
  db.run(`INSERT INTO comments (content) VALUES ('This is <b>formatted</b> but safe.')`);
  db.run(`INSERT INTO comments (content) VALUES ('Welcome to the stored XSS demo!')`);
});

// Database operations
module.exports = {
  /**
   * Get all comments from the database
   * @returns {Promise<Array>} Array of comment objects
   */
  getComments: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM comments ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  /**
   * Add a new comment to the database
   * @param {string} content - The comment content (potentially malicious)
   * @returns {Promise<number>} The ID of the inserted comment
   */
  addComment: (content) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO comments (content) VALUES (?)', [content], function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  },

  /**
   * Get a comment by ID
   * @param {number} id - The comment ID
   * @returns {Promise<Object>} The comment object
   */
  getCommentById: (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM comments WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  /**
   * Delete all comments (for reset functionality)
   * @returns {Promise<void>}
   */
  deleteAllComments: () => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM comments', (err) => {
        if (err) reject(err);
        else {
          // Re-add initial safe comments
          db.run(`INSERT INTO comments (content) VALUES ('This is a safe comment.')`);
          db.run(`INSERT INTO comments (content) VALUES ('This is <b>formatted</b> but safe.')`);
          db.run(`INSERT INTO comments (content) VALUES ('Welcome to the stored XSS demo!')`, (err) => {
            if (err) reject(err);
            else resolve();
          });
        }
      });
    });
  }
};