const express = require('express');
const app = express();
module.exports = app;

const checkMillionDollarIdea = require('./server/checkMillionDollarIdea')

const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase
} = require('./server/db')

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html

var cors = require('cors')
app.use(cors());

// Add middware for parsing request bodies here:
var bodyParser = require('body-parser')
app.use(bodyParser.json());

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
const { de } = require('faker/lib/locales');

app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);

})

app.use('/api', apiRouter);

apiRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

apiRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

/////////////////////////////////////////////////////////////////////////////

// Get an array of all minions

apiRouter.get('/api/minions', (err, req, res) => {
  const minions = getAllFromDatabase('minions');
  if (minions) {
    res.send(minions)
  } else {
    res.status('400').res(err.message);
  }

});

// Create a new minion and save it to database

apiRouter.post('/api/minions', (err, req, res) => {
  const newMinion = addToDatabase('minions', req.body);
  if (newMinion) {
    res.send(newMinion);
  } else {
    res.status('201').res(err.message)
  }
});

// Get a single minion by Id 

apiRouter.get('/api/minions/:minionId', (err, req, res) => {
  let minionId = req.params.minionId;
  minionId = minionId.toString();
  if (minionId) {
    getFromDatabaseById('minions', minionId);
    res.send(minionId);
  } else {
    res.status('404').res(err.message);
  }
});

// Update a single minion by Id

apiRouter.put('/api/minions/:minionId', (err, req, res) => {
  let chosenMinion = updateInstanceInDatabase('minions', req.body);
  chosenMinion = chosenMinion.toString();
  if (chosenMinion) {
    res.status(200).send(chosenMinion);
  } else {
    res.status('204').res(err.message);
  }
});

// Delete a single minion by Id

apiRouter.delete('/api/minions/:minionId', (err, req, res) => {
  let chosenMinion = req.params.minionId;
  chosenMinion = chosenMinion.toString();
  if (chosenMinion) {
    deleteFromDatabasebyId('minions', chosenMinion);
    res.send(chosenMinion);
  } else {
    res.status('404').send(err.message);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////

// Get an array of all ideas

apiRouter.get('/api/ideas', (err, req, res) => {
  const ideas = getAllFromDatabase('ideas');
  if (ideas) {
    res.send(ideas)
  } else {
    res.status('400').res(err.message);
  }
});

// Create a new idea and save it to database

apiRouter.post('/api/ideas', checkMillionDollarIdea, (err, req, res) => {
  const newIdea = addToDatabase('ideas', req.body);
  if (newIdea) {
    res.status(201).send(newIdea);
  } else {
    res.status('204').res(err.message)
  }
});

//Get a single idea by id 

apiRouter.get('/api/ideas/:ideaId', (err, req, res) => {
  let ideaId = req.params.ideaId;
  ideaId = ideaId.toString();
  if (ideaId) {
    getFromDatabaseById('ideas', ideaId);
    res.send(ideaId);
  } else {
    res.status('404').res(err.message);
  }
});

// Update a single idea by id

apiRouter.put('/api/ideas/:ideaId', checkMillionDollarIdea, (err, req, res) => {
  let chosenIdea = updateInstanceInDatabase('ideas', req.body);
  chosenIdea = chosenIdea.toString();
  if (chosenIdea) {
    res.status(200).send(chosenIdea);
  } else {
    res.status('204').res(err.message);
  }
});

// Delete a single idea by id

apiRouter.delete('/api/ideas/:ideaId', (err, req, res) => {
  let chosenIdea = req.params.ideaId;
  chosenIdea = chosenIdea.toString();
  if (chosenIdea) {
    deleteFromDatabasebyId('ideas', chosenIdea);
    res.send(chosenIdea);
  } else {
    res.status('404').send(err.message);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////

//Get an array of all meetings

apiRouter.get('/api/meetings', (err, req, res) => {
  const meetings = getAllFromDatabase('meetings');
  if (meetings) {
    res.send(meetings)
  } else {
    res.status('400').res(err.message);
  }
});

//Create a new meeting and save it to the database

apiRouter.post('/api/meetings', (err, req, res) => {
  const newMeeting = createMeeting();
  addToDatabase('meetings', newMeeting);
  if (newMeeting) {
    res.status(201).send(newMeeting);
  } else {
    res.status('204').res(err.message)
  }
});

//Delete all meetings from the database

apiRouter.delete('/api/meetings', (err, req, res) => {
  send.status(204).send(deleteAllFromDatabase('meetings'));
});


// This conditional is here for testing purposes:
if (!module.parent) {
  // Add your code to start the server listening at PORT below:

}
