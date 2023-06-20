const { Router } = require('express');
const { getAllDogs, setDogs, getDogId } = require('../Handlers/dogHandlers');
const dogRouter = Router();

// GETS
dogRouter.get('/', getAllDogs )
dogRouter.get('/:id', getDogId)


// POSTS
dogRouter.post('/', setDogs)

module.exports = dogRouter;