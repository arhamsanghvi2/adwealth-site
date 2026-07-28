const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://localhost:5173',
    'https://127.0.0.1:5173',
    'https://adwealth.co.in',
    'http://adwealth.co.in',
    'https://www.adwealth.co.in',
    'http://www.adwealth.co.in',
    'https://adweath.co.in',
    'http://adweath.co.in',
    'https://www.adweath.co.in',
    'http://www.adweath.co.in'
  ],
  credentials: true
}));
app.use(express.json());

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'db.sqlite3');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database at:', dbPath);
    createTables();
  }
});

function createTables() {
  db.serialize(() => {
    // Create contacts table
    db.run(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        company TEXT,
        subject TEXT NOT NULL,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Error creating contacts table:', err.message);
    });

    // Create applications table
    db.run(`
      CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reference_code TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        gender TEXT NOT NULL,
        address TEXT NOT NULL,
        percentage_12th REAL NOT NULL,
        cgpa REAL NOT NULL,
        college TEXT NOT NULL,
        skills TEXT NOT NULL,
        experience INTEGER NOT NULL,
        comments TEXT,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Error creating applications table:', err.message);
    });
  });
}

// POST endpoint to submit contact form
app.post('/api/contact', (req, res) => {
  const { name, phone, email, company, subject, message } = req.body;

  if (!name || !phone || !subject) {
    return res.status(400).json({ error: 'Name, Phone, and Subject are required fields.' });
  }

  const query = `
    INSERT INTO contacts (name, phone, email, company, subject, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [name, phone, email, company, subject, message], function (err) {
    if (err) {
      console.error('Database insertion error:', err.message);
      return res.status(500).json({ error: 'Failed to save contact message.' });
    }
    res.status(201).json({
      message: 'Thank you! Your message has been Send.',
      id: this.lastID
    });
  });
});

// POST endpoint to submit job applications
app.post('/api/careers', (req, res) => {
  const {
    reference_code,
    full_name,
    phone,
    email,
    gender,
    address,
    percentage_12th,
    cgpa,
    college,
    skills,
    experience,
    comments
  } = req.body;

  if (!reference_code || !full_name || !phone || !email) {
    return res.status(400).json({ error: 'Required fields missing.' });
  }

  const query = `
    INSERT INTO applications (
      reference_code, full_name, phone, email, gender, address, 
      percentage_12th, cgpa, college, skills, experience, comments
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [
      reference_code,
      full_name,
      phone,
      email,
      gender,
      address,
      percentage_12th,
      cgpa,
      college,
      JSON.stringify(skills || {}),
      experience || 0,
      comments
    ],
    function (err) {
      if (err) {
        console.error('Database insertion error:', err.message);
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ error: 'Reference code collision. Please resubmit.' });
        }
        return res.status(500).json({ error: 'Failed to store application.' });
      }
      res.status(201).json({
        message: 'Application recorded successfully in the SQLite database.',
        id: this.lastID
      });
    }
  );
});

// GET endpoint to fetch contacts (for verification)
app.get('/api/contacts', (req, res) => {
  db.all('SELECT * FROM contacts ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET endpoint to fetch applications (for verification)
app.get('/api/applications', (req, res) => {
  db.all('SELECT * FROM applications ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const parsed = rows.map(r => ({
      ...r,
      skills: JSON.parse(r.skills || '{}')
    }));
    res.json(parsed);
  });
});

app.use(express.static(path.join(__dirname, "dist")));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

