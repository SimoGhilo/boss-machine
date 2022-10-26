const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { response } = require('../server');
const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');


minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});



/////////////////////////////////////////////////////////////////////////////

// Get an array of all minions

minionsRouter.get('/', (err, req, res) => {
    const minions = getAllFromDatabase('minions');
    if (minions) {
        res.send(minions)
    } else {
        res.status('400').res(err.message);
    }

});

// Create a new minion and save it to database

minionsRouter.post('/', (err, req, res) => {
    const newMinion = addToDatabase('minions', req.body);
    if (newMinion) {
        res.status(201).send(newMinion);
    } else {
        res.status(204).res(err.message)
    }
});

// Get a single minion by Id 

minionsRouter.get('/:minionId', (req, res) => {
    res.send(req.minion)
});

// Update a single minion by Id

apiRouter.put('/:minionId', (err, req, res) => {
    let chosenMinion = updateInstanceInDatabase('minions', req.body);
    chosenMinion = chosenMinion.toString();
    if (chosenMinion) {
        res.status(200).send(chosenMinion);
    } else {
        res.status('204').res(err.message);
    }
});

// Delete a single minion by Id

minionsRouter.delete('/:minionId', (err, req, res) => {
    let chosenMinion = req.params.minionId;
    chosenMinion = deleteFromDatabasebyId('minions', chosenMinion);
    if (chosenMinion) {
        res.status(204);
    } else {
        res.status('500').send(err.message);
    }
});


/////////////////////////////////////////////////////////////////////

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
});



////////Get an array of all work for the given minion

minionsRouter.get('/:minionId/work', (req, res, next) => {
    let chosenMinion = req.params.minionId;
    let work = getAllFromDatabase('work').filter((work) => {
        return work.minionId === chosenMinion;
    });
    res.send(work);
})

//create a new work object and save it to the database

minionsRouter.post('/:minionId/work', (req, res, next) => {
    let newWork = req.body;
    newWork.minionId = req.params.minionId;
    res.status(201).send(addToDatabase('work', newWork))
})

//Update a single work by Id


minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.body.minionId !== req.params.minionId) {
        response.status(404).send()
    } else {
        const instance = req.body;
        res.send(updateInstanceInDatabase('work', instance));
    }

})

///delete a work by its id

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    let chosenWork = req.params.workId;
    if (chosenWork === undefined) {
        res.status(404).send()
    } else {
        deleteFromDatabasebyId('work', chosenWork)
    }
})
