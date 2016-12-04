'use strict'



const events = require('../events')
const schema = require('../Modules/schema')

describe('favorites list', () => {
	beforeEach(done => {
		schema.Favorites.remove({}, err => {
			if (err) expect(true).toBe(false)
			new schema.Favorites({name: 'favorites', performers: ['Ariana Grande', 'Eminem']}).save((err) => {
				if (err) expect(true).toBe(false)
				schema.Favorites.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(1)
					done()
				})
			})
		})
	})
})
