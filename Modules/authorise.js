'use strict'

const bcrypt = require('bcrypt')
// const globals = require('./globals')

const passLen = 10

exports.getHeader = request => new Promise ((resolve, reject) => {
	if (request.authorization === undefined || request.authorization.basic === undefined) {
		reject(new Error('Missing authorization'))
	}
	const auth = request.authorization.basic

	if (auth.username === undefined || auth.password === undefined) {
		reject({username: auth.username, password: auth.password})
	}
	// console.log(`username: ${auth.username}, password: ${auth.password}`)
	resolve()
})

exports.hashPassword = user => new Promise ( (resolve, reject) => {
	if(user.password === undefined){
		reject(new Error('type in password'))
	}
	const salt = bcrypt.genSaltSync(passLen)

	user.password = bcrypt.hasSync(user.password, salt)
	resolve(user)
})

exports.checkPassword = (provided, stored) => new Promise ((resolve, reject) => {
	if (!bcrypt.compareSync(provided, stored)) {
		reject(new Error('invalid password'))
	}
	resolve()
})
