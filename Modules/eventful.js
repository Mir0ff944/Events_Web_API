'use strict'

const request = require('request')
const globals = require('./globals')

exports.searchEvents = location => new Promise ( (resolve, reject) => {
	const url = 'http://api.eventful.com/json/events/search?'
	const query_string = {app_key: 'Xf6JnTWqzJb6ZRhD', q: 'music', location: location}

	request.get({url: url, qs: query_string}, (err, res, body) => {
		if (err) reject(Error(globals.badRequest))
		const data = JSON.parse(body)
		if (data.event.count === 0) {
			reject(Error(globals.notFound))
		}
		resolve(data)
	})
})

exports.searchEvents = performer => new Promise ( (resolve, reject) => {
	const url = 'http://api.eventful.com/json/performers/search?'
	const query_string = {app_key: 'Xf6JnTWqzJb6ZRhD', keywords: performer}

	request.get({url: url, qs: query_string}, (err, res, body) => {
		if (err) reject(Error(globals.badRequest))
		const json = JSON.parse(body)
		if (json.total_items === 0){
			reject(Error(global.notFound))
		}
		const data = {
			title: json.performers.performer[0].name,
			music_genre: json.performers.performer[0].short_bio,
			id: json.performers.performer[0].id
		}
		resolve(data)
	})
})

exports.searchPerformerEvents = id => new Promise((resolve,reject) => {
	const url = 'http://api.eventful.com/json/performers/events/list?'
	const query_string = {app_key: 'Xf6JnTWqzJb6ZRhD', id: id}

	request.get({url: url, qs: query_string}, (err, res, body) => {
		if (err) reject(Error(globals.badRequest))
		const data = JSON.parse(body)
		if (data.erro === 1) {
			reject(Error(globals.notFound))
		}
		resolve(data)
	})
})
