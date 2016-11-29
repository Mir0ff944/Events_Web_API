'use strict'

const mongoose = require('mongoose')
const db = {
	user: 'miroff',
	password: '0N0LrfX772277A'
}

mongoose.connect(`mongodb://${db.user}:${db.password}@ds023388.mlab.com:23388/eventsapi`)
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const userSchema = new Schema ({
	name: String,
	username: String,
	password: String
})

exports.User = mongoose.model('User', userSchema)

const favoriteSchema = new Schema({
	name: String,
	title: String,
	image: String,
	id: String
})

exports.favorite = mongoose.model('Favorite', favoriteSchema)
