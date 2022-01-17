const User = require('../models/userMdel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtl = {
    register: async (req, res) => {
        try {
            
        const {name, email, password} = req.body
        
        const user = await User.findOne({email})
        if(user) return res.status(400).json({msg: 'This user is already exist'})

        if(password.length < 6) return res.status(400).json({mgs: 'Password is at least six'})

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            name, email, password: passwordHash
        })

        //access token
   
        const accessToken = jwt.sign({id: newUser._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
        const refreshToken = jwt.sign({id: newUser._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})

        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            path: '/user/refresh_token'
        });

        const info = await newUser.save()
       // res.json({msg: 'New user created'})
       // res.json(info)
       res.json(refreshToken)

    } catch (error) {
            return res.status(500).json({msg: error.message})
    }
    },
    login: async (req, res) => {
        try {

            const {email, password} = req.body
           // console.log(email+ ' ' +password);

            const user = await User.findOne({email})
            if(!user) return res.status(400).json({msg: 'email is incorrect'})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: 'password is incorrect'})

            //if user succes create access token refresh token
            const accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
            const refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})

            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token'
            });

            res.json({accessToken});
            
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    logout: async (req, res) => {  
        try {
            
        res.clearCookie('refreshtoken', {path: '/user/refresh_token'});
        return res.json({msg: 'logged out'});


    } catch (err) {
        res.status(500).json({msg: err.message});
    }
},
    refreshToken: (req, res) => {  
        try{
        
            const rf_token = req.cookies.refreshtoken;
            
            if(!rf_token) return res.status(400).json({msg: 'Please login or Register'})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: 'Please login or Register'})

                const accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})

                res.json({accessToken})
            });
     //   res.json({rf_token});

        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
},
    getInfor: async (req, res) => {
       try{ 
           const user = await User.findById(req.params.id).select('-password')
            if(!user) return res.status(400).json({msg: 'user is not exist'})

        res.json(user)
    }catch(err){
        return res.status(400).json({msg: err.message})
    }
    }
}

module.exports = userCtl