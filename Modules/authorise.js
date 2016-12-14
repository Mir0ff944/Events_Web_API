'use strict'


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

