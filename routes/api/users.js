const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check'); 

const User = require('../../models/User');

// @route GET api/users
// @desc | Test route
// @access Public
router.post('/', [
check('name', 'Name is required').not().isEmpty(), 
check('email', 'please include valid email').isEmail(), 
check('password', 'please enter a password with 6 or more characters').isLength({min: 6})
],
async (req, res) => 
{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}


const { name, email, password} = req.body;

try{
    let user = await User.findOne({email});

    if(user){
        res.status(400).json({errors: [{msg: 'User already exist'}]});
    }

    console.log(req.body)
    res.send('User route');
}catch(err){}
    console.error(err.massage);
    res.status(500).send('server error');
})

module.exports = router;
