'use strict'

const request = require('request')
const globals = require('./globals')

exports.searchEvents = location => new Promise ( (resolve, reject) => {
	const url = 'http://api.eventful.com/json/events/search?'
	const query_string = {app_key: 'Xf6JnTWqzJb6ZRhD', q: 'music', location: location, data: 'future'}

	request.get({url: url, qs: query_string}, (err, res, body) => {
		if (err) reject(Error(globals.badRequest))
		const data = JSON.parse(body)

		if (data.total_items.count === 0) {
			reject(Error(globals.badRequest))
		}
		resolve(data.events)
	})
})

exports.searchPerformer = performer => new Promise ( (resolve, reject) => {
	const url = 'http://api.eventful.com/json/performers/search?'
	const query_string = {app_key: 'Xf6JnTWqzJb6ZRhD', keywords: performer}

	request.get({url: url, qs: query_string}, (err, res, body) => {
		if (err) reject(Error(globals.badRequest))
		const json = JSON.parse(body)

		if (json.page_count === 0){
			reject(Error(globals.notFound))
		}
		const data = {
			title: json.performers.performer.name,
			music_genre: json.performers.performer.short_bio,
			image: json.performers.performer.image.medium.url,
			id: json.performers.performer.id
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

		if (data.total_items === 0) {
			reject(Error(globals.notFound))
			data =globals.notFound + 'No Events Found'
		}
		resolve(data)
	})
})
