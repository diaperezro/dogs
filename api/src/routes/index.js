const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const dogRouter = require("./dogRouter.js")
const temRouter = require("./temperamentRouter.js")
//const temperamentRouter = require("./temperamentRouter.js")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dog',dogRouter)
router.use('/tem',temRouter)
//router.use('/temperament',temperamentRouter)


module.exports = router;
