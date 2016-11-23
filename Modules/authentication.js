'use strict'

const bcrypt = require('bcrypt')
const globals = require('./globals')

exports.getHeader = request => new Promise ((resolve, reject) => {
	if (request.authorization === undefined || request.authorization.basic === undefined) {
		reject(new Error(globals.unauthorizrd))
	}
	const auth = request.authorization.basic
	if (auth.username === undefined || auth.password === undefined) {
		reject({username: auth.username, password: auth.password})
	}
})

exports.hashPassword = credentials => new Promise ( (resolve, reject) => {
	const salt = bcrypt.genSaltSync(10)
	credentials.password = bcrypt.hasSync(credentials.password, salt)
	resolve(credentials)
})

exports.checkPassword = (provided, stored) => new Promise ((resolve, reject) => {
	if (!bcrypt.compareSync(provided, stored)) {
		reject(new Error('invalid password'))
	}
	resolve()
})

// exports.performerID = identification => new Promise ((resolve, reject) => {

//})
