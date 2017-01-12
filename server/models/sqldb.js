var Sequelize = require('sequelize');

var sequelize = new Sequelize('mysql://root:1111@localhost:3306/twitter', {});

var User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true})
    .then(function () {
        return User.create({
            email: 'John',
            password: 'Hancock'
        });
});

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

module.exports = User;