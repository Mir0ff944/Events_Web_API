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

/**
 * @api {get} /events If nothing requested, redirect to favorites list
 */
server.get('/', (req, res, next) => {
	res.redirect('/favorites', next)
})

/**
 * @api {get} /events Request list of events based on location
 * @apiGroup events
 * @apiParam {String} l - location
 */
server.get('/events', (req, res) => {
	events.searchByLocation(req, (err, data) => {
		res.setHeader('content-type', globals.format.json)
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(global.badRequest, {error: err.message})
		} else {
			res.send(globals.ok, data)
		}
		res.end()
	})
})

/**
 * @api {get} /events Request performer details
 * @apiGroup events
 * @apiParam {String} p - performer name
 */
server.get('/performer', (req, res) => {
	events.searchPerformer(req, (err, data) => {
		res.setHeader('content-type', globals.format.json)
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(global.badRequest, {error: err.message})
		} else {
			res.send(globals.ok, data)
			res.end()
		}
	})
})

/**
 * @api {get} /events Request performer events based on performer id
 * @apiGroup events
 * @apiParam {String} p - performer name
 */
server.get('/performer/events', (req, res) => {
	events.searchPerformerEvents(req, (err, data) => {
		res.setHeader('content-type', globals.format.json)
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(globals.badRequest, {error: err.message})
		} else {
			res.send(globals.created, {events: data})
		}
		res.end()
	})
})

/**
 * @api {get} /events Request a list of favorite performers
 * @apiGroup events
 */
server.get('/favorites', (req, res) => {
	events.showFavorites(req, (err, data) => {
		res.setHeader('content-type', globals.format.json)
		res.setHeader('accepts', 'GET, POST, PUT, DELETE')
		if (err) {
			res.send(globals.badRequest, {error: err.message})
		} else {
			res.send(global.ok, data)
		}
		res.end()

    	})
})

/**
 * @api {post} /events Posts a performer into the favorites list
 * @apiGroup events
 * @apiParam {String} name - performer name
 */
server.post('/favorites', (req, res) => {
	events.addFavorites(req, (err, data) => {
		res.setHeader('content-type', globals.format.json)
		res.setHeader('accepts', 'GET, POST, PUT, DELETE')
		if (err) {
			res.send(globals.badRequest, {error: err.message})
		} else {
			res.send(global.ok, data)
		}
	})
})

/**
 * @api {del} /events Delete favorite list
 * @apiGroup events
 */
server.del('/favorites', (req, res) => {
	events.delFavorites(req, (err, data) => {
		res.setHeader('content-type', globals.format.json)
		res.setHeader('accepts', 'GET, POST, PUT, DELETE')
		if (err) {
			res.send(global.badRequest, {error: err.message})
		} else {
			res.send(global.ok, data)
		}
	})
})

server.put('/favorites', (req, res) => {
	events.updateFavorites(req, (err, data) => {
		res.setHeader('content-type', globals.format.json)
		res.setHeader('accepts', 'GET, POST, PUT, DELETE')
		if (err) {
			res.send(globals.badRequest, {error: err.message})
		} else {
			res.send(globals.ok, data)
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
