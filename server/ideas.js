const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

//////////////////////////////////////////////////////////////////////////////////////////

// Get an array of all ideas

ideasRouter.get('/', (err, req, res) => {
    const ideas = getAllFromDatabase('ideas');
    if (ideas) {
        res.send(ideas)
    } else {
        res.status('400').res(err.message);
    }
});

// Create a new idea and save it to database

ideasRouter.post('/', checkMillionDollarIdea, (err, req, res) => {
    const newIdea = addToDatabase('ideas', req.body);
    if (newIdea) {
        res.status(201).send(newIdea);
    } else {
        res.status('204').res(err.message)
    }
});

//Get a single idea by id 

ideasRouter.get('/:ideaId', (err, req, res) => {
    let ideaId = req.idea;
    ideaId = ideaId.toString();
    res.send(ideaId);
});

// Update a single idea by id

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (err, req, res) => {
    let chosenIdea = updateInstanceInDatabase('ideas', req.body);
    chosenIdea = chosenIdea.toString();
    if (chosenIdea) {
        res.status(200).send(chosenIdea);
    } else {
        res.status('204').res(err.message);
    }
});

// Delete a single idea by id

ideasRouter.delete('/:ideaId', (err, req, res) => {
    let deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deletedIdea) {
        res.status(204).send(deletedIdea);
    } else {
        res.status('500').send(err.message);
    }
});