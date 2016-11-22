'use strict'

const readline = require('readline-sync')
const request = require('request')
const globals = require('./globals')
const url = 'http://api.eventful.com/json/events/search?'

const location = String(readline.question('location: ')).trim() //otherwise defaults to the US...
const query_string = {app_key: 'Xf6JnTWqzJb6ZRhD' ,q: 'music', location: location, date: 'future'}
request.get({url: url, qs: query_string}, (err, res, body) => {
	try {
		if (err) {
			throw err
		} else {
			//console.log(body)
			const json = JSON.parse(body)
			if (json.total_items === null) {
				throw 'No events Found'
			} else {
				const eventsFromJson = json.events
				const data = {
					title: [],
					start_time: [],
					venue_name: [],
					city_name: [],
					url: []
				}
				console.log('STATUS CODE: '+res.statusCode)
				console.log('Total Items: ' + json.total_items)
				console.log('––––––––––––––––––––––––––––––––')
				for (let i = 0; i < eventsFromJson.event.length; i++) {
					data.title.push(eventsFromJson.event[i].title)
					data.start_time.push(eventsFromJson.event[i].start_time)
					data.venue_name.push(eventsFromJson.event[i].venue_name)
					data.city_name.push(eventsFromJson.event[i].city_name)
					data.url.push(eventsFromJson.event[i].url)
				}
				console.log(data)
			}
		}
	} catch(err) {
		console.log(err)
	}
})
