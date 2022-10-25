const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/', (req, res, next) => {
    console.log(`use works`)
});

module.exports = apiRouter;
