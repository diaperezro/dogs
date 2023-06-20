const { Router } = require('express');
const { setTem, getAllTem } = require('../Handlers/temHandlers');
const temRouter = Router();

// GETS
temRouter.get('/', getAllTem )
//dogRouter.get('/:id', getCountryID_API)


// POSTS
temRouter.post('/', setTem)


module.exports = temRouter;