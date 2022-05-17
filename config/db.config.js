const env = require('../config/env');
const Sequelize = require('sequelize');
const mysql = require('mysql2')
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect : env.dialect
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models
db.users = require('../model/user.model')(sequelize, Sequelize);

module.exports = db;