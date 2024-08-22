// server/models/GolfStats.js

const db = require('../database');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS GolfStats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    fairwayHit BOOLEAN NOT NULL,
    fairwayReason VARCHAR(255),
    gir BOOLEAN NOT NULL,
    girReason VARCHAR(255),
    putts INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

db.query(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating table:', err);
        return;
    }
    console.log('GolfStats table is ready');
});
