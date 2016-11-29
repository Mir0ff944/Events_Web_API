'use strict'

const restify = require('restify')
const server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.queryParser())
server.use(restify.authorizationParser())

const events = require('./events.js')
const globals = require('./Modules/globals')

const defaultPort = 8080

server.get('/', (req, res, next) => {
	res.redirect('/events', next)
})

/**
 * @api {get} /favorites Requests a list of favorite artists
 * @apiGroup Favorites
 * @apiParam {String} location location String
 * @apiPAram {String} performer Performer String
 */

server.get('/events', (req, res) => {
	events.searchByLocation(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(global.badRequest, {error: err.message})
		} else {
			res.send(globals.ok, data)
		}
		res.end()
	})
})

server.get('/performer', (req, res) => {
	events.searchPerformer(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(global.badRequest, {error: err.message})
		} else {
			res.send(globals.ok, data)
			res.end()
		}
	})
})

server.get('/performer/events', (req, res) => {
	events.searchPerformerEvents(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(globals.badRequest, {error: err.message})
		} else {
			res.send(globals.created, {events: data})
		}
		res.end()
	})
})

server.get('/favorites', (req, res) => {
	events.showFavorites(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST, PUT, DELETE')
		if (err) {
			res.send(globals.badRequest, {error: err.message})
		} else {
			res.send(global.ok, data)
		}
		res.end()

    	})
})

server.post('/favorites', (req, res) => {
	events.addFavorite(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST, PUT, DELETE')
		if (err) {
			res.send(globals.badRequest, {error: err.message})
		} else {
			res.send(global.ok, data)
		}
	})
})

const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if(err) {
		console.log(err)
	} else {
		console.log('App is ready at : http://localhost:' + port)
	}
})
