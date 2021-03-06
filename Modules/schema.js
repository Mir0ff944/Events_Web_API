'use strict'

const mongoose = require('mongoose')
const db = {
	user: 'miroff',
	password: '0N0LrfX772277A'
}

mongoose.connect(`mongodb://${db.user}:${db.password}@ds023388.mlab.com:23388/eventsapi`)
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const favoriteSchema = new Schema({
	title: String,
	genre: String,
	image: String,
	id: String
})

exports.Favorites = mongoose.model('Favorites', favoriteSchema)
