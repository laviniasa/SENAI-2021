require('dotenv').config();
const {Sequelize} = require('sequelize');

const Usuario = require('../model/usuario');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER ,'',{
    host: process.env.HOST,
    dialect:'mysql',
    define: {
        timestamps: false,
    }
})

const sync = () =>{
    Usuario.init(sequelize);

    sequelize.sync({force: true}); 
}

module.exports = {
    sequelize,
    sync
}