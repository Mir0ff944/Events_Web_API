'use strict'

const eventful = require('./Modules/eventful')
const filepersist = require('./Modules/filepersist')
//const schema = require('./Modules/schema')

exports.searchByLocation = (request, callback) => {
	    extractParam(request, 'l')
            .then( location => eventful.searchEvents(location))
            //.then( data => this.cleanArray(request, data))
            .then( data => callback(null, data))
            .catch( err => callback(err))
}

exports.searchPerformerEvents = (request, callback) => {
	extractParam(request, 'p')
			.then(performer => eventful.searchPerformer(performer))
			.then(id => eventful.searchPerformerEvents(id.id))
			.then(events => events.event)
			.then(data => callback(null, data))
			.catch(err => callback(err))
}

exports.searchPerformer = (request, callback) => {
	extractParam(request, 'p')
		.then(performer => eventful.searchPerformer(performer))
		.then(data => callback(null, data))
		.catch(err => callback(err))
}

exports.addFavorite = (request, callback) => {
	extractBodyKey(request, 'name')
		.then(name => eventful.searchPerformer(name))
		.then(favorite => filepersist.addFavorite(favorite))
		.then(data => callback(null, data))
		.catch(err => callback(err))
}

exports.showFavorites = (request, callback) => {
	filepersist.getFavorites()
		.then(console.log('showing favorites'))
		.then(data => callback(null, data))
		.catch(err => callback(err))
}

const extractParam = (request, param) => new Promise( (resolve, reject) => {
	if (request.params === undefined || request.params[param] === undefined)
		reject(new Error(`${param} parameter missing('performer' if searching for performer events!)`))
	resolve(request.params[param])
})

const extractBodyKey = (request, key) => new Promise((resolve, reject) => {
	if (request.body === undefined || request.body[key] === undefined)
		reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})

exports.cleanArray = (request, data) => new Promise((resolve) => {
	const host = request.host ||'http://localhost'
	const clean = data.items.map(element =>
             ({
	title: element.performers.performer.name,
	link: `${host}/events/${element.id}`
})
	)

	resolve({events: clean})
})
