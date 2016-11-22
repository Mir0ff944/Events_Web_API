'use strict'

const eventful = require('./Modules/eventful')


exports.search = (reques, callback) => {
	    extractParam(reques, 'l')
            .then( location => eventful.searchEvents(location))
            .then( data => this.cleanArray(reques, data))
            .then( data => callback(null, data))
            .catch( err => callback(err))
}


const extractParam = (request, param) => new Promise( (resolve, reject) => {
	if (request.params === undefined || request.params[param] === undefined)
		reject(new Error('${param} parameter missing'))
	resolve(request.params[param])
})

const extractBodyKey = (request, key) => new Promise((resolve, reject) => {
	if (request.body === undefined || request.body[key] === undefined)
		reject(new Error('missing key ${key} in request body'))
	resolve(request.body[key])
})

exports.cleanArray = (request, data) => new Promise((resolve) => {
	const host = request.host ||'http://localhost'
	const clean = data.items.map(element =>
             ({
	title: element.performers.performer.name,
	link: `${host}/book/${element.id}`
})
	)
	resolve({events: clean})
})

exports.removeMongoFields = (request, data) => new Promise((resolve, reject) => {
	const host = request.host || 'http://localhost'
	const clean = data.map(element => ({
		title: element.title,
		link: `${host}/books/${element.eventID}`
	})
    )
	resolve({events: clean})
})
