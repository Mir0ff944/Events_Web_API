'use strict'

const request = require('request')
const globals = require('./globals')
const key = 'Xf6JnTWqzJb6ZRhD'

exports.searchEvents = location => new Promise ( (resolve, reject) => {
	const url = 'http://api.eventful.com/json/events/search?'
	const query_string = {app_key: key, q: 'music', location: location, data: 'future'}

	request.get({url: url, qs: query_string}, (err, res, body) => {
		if (err) reject(Error(globals.badRequest))
		const data = JSON.parse(body)

		if (data.total_items <= 0) {
			reject(Error('No events found on this location'))
		} else {
			resolve(data.events)
		}
	})
})

exports.searchPerformer = performer => new Promise ( (resolve, reject) => {
	const url = 'http://api.eventful.com/json/performers/search?'
	const query_string = {app_key: key, keywords: performer}

	request.get({url: url, qs: query_string}, (err, res, body) => {
		if (err) reject(Error('failed to make api request'))

		const json = JSON.parse(body)

		if (json.page_count <= 0) {
			reject(Error('Performer not found'))
		} else {
			if (json.total_items > 1) {
				const performers = [
					performer = {
						title: json.performers.performer[0].name,
						music_genre: json.performers.performer[0].short_bio,
						image: json.performers.performer[0].image.medium.url,
						id: json.performers.performer[0].id,
					}
				]

				resolve({performers})
			} else {
				const performers = [
					performer = {
						title: json.performers.performer.name,
						music_genre: json.performers.performer.short_bio,
						image: json.performers.performer.image.medium.url,
						id: json.performers.performer.id,
					}
				]

				resolve({performers})
			}
		}
	})
})

exports.searchPerformerEvents = id => new Promise((resolve,reject) => {
	const url = 'http://api.eventful.com/json/performers/events/list?'
	const query_string = {app_key: key, id: id}

	request.get({url: url, qs: query_string}, (err, res, body) => {
		if (err) reject(Error(globals.badRequest))
		const data = JSON.parse(body)

		if (data.total_items <= 0) {
			reject(Error('No upcoming events'))
		} else {
			resolve(data)
		}
	})
})
