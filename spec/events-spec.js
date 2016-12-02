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
	describe('addFavorites', () => {
		it('should add valid list', done => {
			const favorite = {
				body: {
					name: 'test'
				}
			}

			events.addFavorites(favorite,(err) => {
				if (err) expect(true).toBe(false)
				done()
			})
		})
	})
	describe('delFavorites', () => {
		it('should remove favorites list', done => {
			events.delFavorites()
			schema.Favorites.count({}, (err, count) => {
				if(err) expect(true).toBe(false)
				expect(count).toBe(0)
				done()
			})
		})
	})
	describe('searchByLocation', () => {
		it('should get a valid location', done => {
			const location = {
				params: {
					l: 'London'
				}
			}

			events.searchByLocation(location, (err, data) => {
				if(err) expect(true).toBe(false)
				expect(data).not.toBe(undefined)
				done()
			})
		})
	})
})
