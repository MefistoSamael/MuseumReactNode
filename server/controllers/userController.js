const ApiError = require('../error/ApiError')
const {User} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJWT = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '80h'});
}

class UserController{
    async registration(req, res, next){
        const {email, password, role} = req.body;
        if (!email || !password)
            return next(ApiError.notFound('Некорректный email или пароль'));

        const candidate = await User.findOne({where: {email}});

        if (candidate){
            return next(ApiError.notFound('Пользователь с таким email уже существует'));
        }

        const user = await User.create({email, role, password});

        const token = generateJWT(user.id, user.email, user.role);

        return res.json({token});
    }

    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.notFound('Пользователь не найден'));
        }

        if (password !== user.password){
            return  next(ApiError.internal('указан неверный пароль'))
        }

        const token = generateJWT(user.id, user.email, user.role);
        return res.json({token})
    }

    async check(req, res, next){
        const token = generateJWT(req.user.id, req.user.email, "USER");

        return res.json({token});
    }
}

module.exports = new UserController()