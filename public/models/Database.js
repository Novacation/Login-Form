const {Sequelize, QueryTypes} = require('sequelize')
const sequelize = new Sequelize('registro', 'root', 'Superx50@turbo', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    QueryTypes: QueryTypes
}