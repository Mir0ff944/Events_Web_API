'use strict'
/**
 * Main module that combines methods from eventful.js and database methods from filepersist.js
 */
const eventful = require('./Modules/eventful')
const filepersist = require('./Modules/filepersist')
const authorise = require ('./Modules/authorise')

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
			.then(data => {
				data = data.performers[0].id
				//console.log(data)
				return data
			}).then(id => eventful.searchPerformerEvents(id))
			.then(events => events.event)
			.then(data => callback(null, data))
			.catch(err => callback(err))
}

exports.searchPerformer = (request, callback) => {
	extractParam(request, 'p')
		.then(performers => eventful.searchPerformer(performers))
		.then(data => callback(null, data))
		.catch(err => callback(err))
}

exports.addFavorites = (request, callback) => {
	authorise.getHeader(request)
	.then( () => extractBodyKey(request, 'name'))
	.then(name => eventful.searchPerformer(name))
	  .then(data => data.performers[0])
	  .then(favorite => filepersist.addFavorite(favorite))
	  .then(data => callback(null, data))
	  .catch(err => callback(err))
}

exports.showFavorites = (request, callback) => {
	authorise.getHeader(request)
	.then( () => filepersist.getFavorites())
		.then(console.log('showing favorites'))
		.then(data => callback(null, data))
		.catch(err => callback(err))
}

exports.delFavorites = (request, callback) => {
	authorise.getHeader(request).then( () => filepersist.delFavorites())
		.then(console.log('deleting favorites'))
		.then(data => callback(null, data))
		.catch(err => callback(err))
}

exports.updateFavorites = (request, callback) => {
	authorise.getHeader(request).then( () => extractBodyKey(request, 'name'))
		.then(name => filepersist.updateFavorites(name))
		.then(data => callback(null, data))
		.catch(err => callback(err))
}

const extractParam = (request, param) => new Promise( (resolve, reject) => {
	console.log(request) //debuging spec tests
	console.log(param)
	if (request.params === undefined || request.params[param] === undefined)
		reject(new Error(`${param} parameter missing('performer' if searching for performer events!)`))
	resolve(request.params[param])
})

const extractBodyKey = (request, key) => new Promise((resolve, reject) => {
	console.log(request)	//debuging spec tests
	console.log(key)
	if (request.body === undefined || request.body[key] === undefined)
		reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})


