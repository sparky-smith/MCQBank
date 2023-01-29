const express = require('express');
const route = express.Router();
const controller = require('../controller/controller')

route.get('/', controller.questions)

route.post('/createquestion',controller.create)


module.exports = route;
