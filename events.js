'use strict'

const eventful = require('./Modules/eventful')


exports.searchLocation = (request, callback) => {
	    extractParam(request, 'location')
            .then( location => eventful.searchEvents(location))
            //.then( data => this.cleanArray(request, data))
            .then( data => callback(null, data))
            .catch( err => callback(err))
}

exports.searchPerformerEvents = (request, callback) => {
	extractParam(request, 'performer')
			.then(performer => eventful.searchPerformer(performer))
			.then(function(data) {
				//this.name = data.name
				return data
			}).then(id => eventful.searchPerformerEvents(id.id))
			.then(events => events.event)
			.then(data => callback(null, data))
			.catch(err => callback(err))
}

exports.searchPerformer = (request, callback) => {
	extractParam(request, 'performer')
		.then(performer => eventful.searchPerformer(performer))
		.then(data => callback(null, data))
		.catch(err => callback(err))
}

const extractParam = (request, param) => new Promise( (resolve, reject) => {
	if (request.params === undefined || request.params[param] === undefined)
		reject(new Error(`${param} parameter missing('performer' if searching for performer events!)`))
	resolve(request.params[param])
})

// const extractBodyKey = (request, key) => new Promise((resolve, reject) => {
// 	if (request.body === undefined || request.body[key] === undefined)
// 		reject(new Error(`missing key ${key} in request body`))
// 	resolve(request.body[key])
// })

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

// exports.removeMongoFields = (request, data) => new Promise((resolve, reject) => {
// 	const host = request.host || 'http://localhost'
// 	const clean = data.map(element => ({
// 		title: element.title,
// 		// --------> link: `${host}//${element.eventID}`
// 	})
//     )
// 	resolve({events: clean})
//})
