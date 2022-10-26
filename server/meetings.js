const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
} = require('./db');

/////////////////////////////////////////////////////////////////////////////////////////

//Get an array of all meetings

meetingsRouter.get('/', (err, req, res) => {
    const meetings = getAllFromDatabase('meetings');
    if (meetings) {
        res.send(meetings)
    } else {
        res.status('400').res(err.message);
    }
});

//Create a new meeting and save it to the database

meetingsRouter.post('/', (err, req, res) => {
    const newMeeting = createMeeting();
    addToDatabase('meetings', newMeeting);
    if (newMeeting) {
        res.status(201).send(newMeeting);
    } else {
        res.status('204').res(err.message)
    }
});

//Delete all meetings from the database

meetingsRouter.delete('/', (err, req, res) => {
    send.status(204).send(deleteAllFromDatabase('meetings'));
});