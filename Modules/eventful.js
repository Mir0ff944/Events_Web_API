'use strict'

const readline = require('readline-sync')
const request = require('request')
const globals = require('./globals')
const url = 'http://api.eventful.com/json/events/search?'

const location = String(readline.question('location: ')).trim() //otherwise defaults to the US...
const count = String(readline.question(' Items per page: ')).trim()
const query_string = {app_key: 'Xf6JnTWqzJb6ZRhD' ,q: 'music', location: location, page_size: count, date: 'future'}
request.get({url: url, qs: query_string}, (err, res, body) => {
	try {
		if (err) {
			throw err
		} else {
			console.log(body)
			const json = JSON.parse(body)
			if (json.cod !== globals.ok) {
				throw globals.status.notFound
			}

			//const array = JSON.stringify(json, null, 2)
			console.log('STATUS CODE: '+res.statusCode)
			//console.log(array)
			console.log('Total Items: ' + json.total_items)
			console.log('––––––––––––––––––––––––––––––––')
			for (let i = 0; i < json.events.event.length ; i++) {
				console.log('Title: '+json.events.event[i].title)
				console.log('Starts at: '+json.events.event[i].start_time)
				console.log('Venue: '+json.events.event[i].venue_name)
				console.log('City: '+json.events.event[i].city_name)
				console.log('Region: '+json.events.event[i].region_name)
				console.log('Country: '+json.events.event[i].country_name)
				console.log('Event link: '+json.events.event[i].url)
				console.log('Event ID: '+json.events.event[i].id)
				console.log('––––––––––––––––––––––––––––––––')
			}
		}
	} catch(err) {
		console.log(err)
	}
})
