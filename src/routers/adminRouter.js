import express from 'express';
import debugModule from 'debug';
import Datastore from 'nedb';
import sessions from '../data/sessions.js';

const debug = debugModule('app:adminRouter');
const adminRouter = express.Router();

// Create and load the NeDB database
const db = new Datastore({ filename: 'sessions.db', autoload: true });

adminRouter.route('/').get((req, res) => {
  // Insert sessions data into the NeDB database
  db.insert(sessions, (error, response) => {
    if (error) {
      debug(error.stack);
      res.status(500).send('Error inserting sessions data');
    } else {
      debug('Inserted sessions data into NeDB');
      res.json(response);
    }
  });
});

export default adminRouter;
