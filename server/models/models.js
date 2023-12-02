const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false,},
    password: {type: DataTypes.STRING, allowNull: false,},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Theme = sequelize.define('theme', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false,},
})

const ArtForm = sequelize.define('artform', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false,},
})

const Exposition = sequelize.define('exposition', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false,},
})

const Exhibit = sequelize.define('exhibit', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false,},
    photo_path: {type: DataTypes.STRING, unique: true, allowNull: false,},
    admission_date: {type: DataTypes.DATE, allowNull: false,}
})

const ExhibitArtForm = sequelize.define('exhibitartform', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

Exposition.hasMany(Exhibit)
Exhibit.belongsTo(Exposition)

Theme.hasMany(Exposition)
Exposition.belongsTo(Theme)

Exhibit.belongsToMany(ArtForm, {through: ExhibitArtForm})
ArtForm.belongsToMany(Exhibit, {through: ExhibitArtForm})

module.exports = {
    User, ArtForm, Exhibit, Exposition, Theme, ExhibitArtForm
}
