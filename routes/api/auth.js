const { Router } = require('express');
const express = require('express');
const router = express.Router();


// @route GET api/users
// @desc | Test route
// @access Public
router.get('/', (req, res) => req.send('auth route'));


module.exports = router;
