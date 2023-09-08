const httpConstants = require('http2').constants;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
// const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { ConflictError } = require('../errors/ConflictError');
const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(httpConstants.HTTP_STATUS_OK).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с указанным email зарегистрирован'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректно переданы данные'));
      } else {
        next(err);
      }
    });
};

module.exports.Login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя с указанным Id не существует');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректный Id'));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя с указанным Id не существует');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректный Id'));
      } else {
        next(err);
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => next(err));
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя с указанным Id не существует');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректно переданы данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя с указанным Id не существует');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректно переданы данные'));
      } else {
        next(err);
      }
    });
};
