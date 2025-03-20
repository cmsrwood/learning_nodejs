const express = require('express');

const personasRoutes = require('./personas')

const router = express.Router();

router.use('/personas', personasRoutes);

module.exports = router;