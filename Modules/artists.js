'use strict'

const readline = require('readline-sync')
const request = require('request')
const globals = require('./globals')
const url = 'http://api.eventful.com/json/performers/events/list?'

const artists = String(readline.question('Enter Artist name: ')).trim() //otherwise defaults to the US...
//const count = String(readline.question(' Items per page: ')).trim()
const query_string = {app_key: 'Xf6JnTWqzJb6ZRhD', id: artists}
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
			//console.log('Total Items: ' + json.total_items)
			console.log(artists)
			console.log(json.event_count)
			console.log('––––––––––––––––––––––––––––––––')
			for (let i = 0; i < json.event.length ; i++) {
				console.log('Name: ' + json.event[i].title)
				console.log('City: '+json.event[i].city)
				console.log('Country: '+json.event[i].country)
				console.log('Region: '+json.event[i].region_name)
				console.log('Starts at: '+json.event[i].start_time)
				console.log('Event link: '+json.event[i].url)
				console.log('Event ID: '+json.event[i].id)
				console.log('––––––––––––––––––––––––––––––––')
			}
		}
	} catch(err) {
		console.log(err)
	}
})
