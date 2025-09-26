const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('userDB', 'root', 'K@lpesh02', {
    host : 'localhost',
    dialect : 'mysql'
});

sequelize.authenticate()
 .then(()=> console.log("Database Connected Successfully..!"))
 .catch(err => console.error('DB connection error:', err));

 module.exports = sequelize;