const { Router } = require('express');
const express = require('express');
const router = express.Router();


// @route GET api/users
// @desc | Test route
// @access Public
router.get('/', (req, res) => res.send('Post route'));


module.exports = router;
