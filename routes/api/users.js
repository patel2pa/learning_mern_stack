const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check'); 
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('config');

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
        return res.status(400).json({errors: [{msg: 'User already exist'}]});
    }

    const avatar = gravatar.url(email,{
        s: '200', 
        r: 'pg', 
        d: 'mm'
    } )

    user = new User({
        name, 
        email, 
        avatar,
        password
    });


    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save(); 


    const payload = {
        user:{
            id: user.id
        }
    };

    jwt.sign(payload, config.get('jwtSecret'),
    {expiresIn: 360000}, (err, token)=>{
        if(err){ throw err; res.json({token});
    }
    });
}catch(err){}
    console.error(err.massage);
    res.status(500).send('server error');
})

module.exports = router;
