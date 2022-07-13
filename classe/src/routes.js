const express = require('express');
const users = require('./controllers/users');
const newsletter = require('./controllers/newsletter');

const routes = express();

routes.post('/users', users.enroll);

routes.post('/newsletter', newsletter.send);

module.exports = routes;