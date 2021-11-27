const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
    const user = new User(req.body)

    user.save((err, user) => {
        if(err) {
            return res.status('400').json({error: "this user is already existe"})
        }
        res.send(user)
    })
}

exports.signin = (req, res) => {
    const {Identity, Password} = req.body

    User.findOne({Identity}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({error: "user not found ith this Identity, please sign up"})
        }
        if(!user.authenticate(Password)) {
            return res.status(401).json({error: 'Identity and Password d\'ont match !'})
        }

        const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET);

        res.cookie('token', token, {expire: new Date() + 84566565})

        const { _id, name, Identity, role} = user;

        return res.json({
            token, user: {_id, name, Identity, role}
        })
    })
}

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(404).json({
                error: "user not found !"
            })
        }

        req.profile = user;
        next();
    })
}

exports.getOneUser = (req, res) => {
    res.json({
        user: req.profile
    })
}

exports.allUser = (req, res) => {
    User.find((err, user) => {
        if(err) {
            return res.status(400).send(err)
        }
        return res.status(200).json(user)
    })
}

exports.signout = (req, res) =>  {
    res.clearCookie('token');

    res.json({
        message: "user signout"
    })
}