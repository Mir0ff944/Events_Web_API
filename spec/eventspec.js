'use strict'

const events = require('../events')
const schema = require('../Modules/schema')
// const authorise = require('../Modules/authorise')

describe('search function ', () => {

	it('should get valid location events', done => {
		const location = {params: { l: ['London']}}

		events.searchByLocation(location, (err, data) => {
			if(err) expect(true).toBe(false)
			expect(data).not.toBe(undefined)
		})
		done()
	})

	it('should find valid performer', done => {
		const performer = {params: { p: ['Hardwell']}}

		events.searchPerformer(performer, (err,data) => {
			if(err) expect(true).toBe(false)
			expect(data).not.toBe(undefined)
		})
		done()
	})

	it('should find valid performer events', done => {
		const performer = {params: { p: ['Ariana Grande']}}

		events.searchPerformerEvents(performer, (err, data) => {
			if(err) expect(true).toBe(false)
			expect(data).not.toBe(undefined)
		})
		done()
	})
})

describe('missing parameter ', () => {
	beforeEach(() => {
		schema.Favorites.remove({}, err => {
			if (err) expect(true).toBe(false)
			new schema.Favorites({performers: {name: ['Hardwell']}}).save((err) => {
				if (err) expect(true).toBe(false)
				schema.Favorites.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(1)
				})
			})
		})
	})

	it('should get valid location events', () => {
		const location = {params: { l: ['']}}

		events.searchByLocation(location, (err, data) => {
			if(err) expect(true).toBe(false)
			expect(data).toBe(undefined)
		})
	})

	it('should find valid performer', () => {
		const performer = {params: { p: ['']}}

		events.searchPerformer(performer, (err,data) => {
			if(err) expect(true).toBe(false)
			expect(data).toBe(undefined)
		})
	})

	it('should find valid performer events', () => {
		const performer = {params: { p: ['']}}

		events.searchPerformerEvents(performer, (err, data) => {
			if(err) expect(true).toBe(false)
			expect(data).toBe(undefined)
		})
	})
})

describe('wrong parrameter key', () => {
	beforeEach(() => {
		schema.Favorites.remove({}, err => {
			if (err) expect(true).toBe(false)
			new schema.Favorites({performers: {name: ['Hardwell']}}).save((err) => {
				if (err) expect(true).toBe(false)
				schema.Favorites.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(1)
				})
			})
		})
	})

	it('should get valid location events', () => {
		const location = {params: { h: ['London']}}

		events.searchByLocation(location, (err, data) => {
			if(err) expect(true).toBe(false)
			expect(data).toBe(undefined)
		})
	})

	it('should find valid performer', () => {
		const performer = {params: { h: ['Hardwell']}}

		events.searchPerformer(performer, (err,data) => {
			if(err) expect(true).toBe(false)
			expect(data).toBe(undefined)
		})
	})

	it('should find valid performer events', () => {
		const performer = {params: { h: ['Hardwell']}}

		events.searchPerformerEvents(performer, (err, data) => {
			if(err) expect(true).toBe(false)
			expect(data).toBe(undefined)
		})
	})
})


	// it('should find valid performer', done => {
	// 	const performer = {params: { p: ['Hardwell']}}

	// 	events.searchPerformer(performer, (err,data) => {
	// 		if(err) expect(true).toBe(false)
	// 		expect(data).not.toBe(undefined)
	// 		done()
	// 	})
	// })


	// describe('addFavorites', () => {
	// 	it('should add valid list', done => {
	// 		const favorite = {performers: {name: ['Hardwell']}}
	// 		// const auth = {authorization: { scheme: 'Basic', credentials: 'ZmFzZGFzOmRhc2Zhc2Q=', basic: { username: 'fasdas', password: 'dasfasd' }},username: 'fasdas' }

	// 		events.addFavorites(favorite,(err) => {
	// 			// authorise.getHeader(auth)
	// 			if (err) expect(true).toBe(false)
	// 			schema.Favorites.count({}, (err, count) => {
	// 				if (err) expect(true).toBe(false)
	// 				expect(count).toBe(1)
	// 			})
	// 			done()
	// 		})
	// 	})
	// 	it('should remove favorites list', done => {
	// 		events.delFavorites({}, (err) => {
	// 			if (err) expect(true).toBe(false)
	// 			schema.Favorites.count({}, (err, count) => {
	// 				if(err) expect(true).toBe(false)
	// 				expect(count).toBe(0)
	// 				done()
	// 			})
	// 		})
	// 	})
	// 	it('should get valid location events', done => {
	// 		const location = {params: { l: ['London']}}

	// 		events.searchByLocation(location, (err, data) => {
	// 			if(err) expect(true).toBe(false)
	// 			expect(data).not.toBe(undefined)
	// 			done()
	// 		})
	// 	})
	// 	it('should find valid performer', done => {
	// 		const performer = {params: { p: ['Hardwell']}}

	// 		events.searchPerformer(performer, (err,data) => {
	// 			if(err) expect(true).toBe(false)
	// 			expect(data).not.toBe(undefined)
	// 			done()
	// 		})
	// 	})
	// 	it('should find valid performer events', done => {
	// 		const performer = {params: { p: ['Hardwell']}}

	// 		events.searchPerformerEvents(performer, (err, data) => {
	// 			if(err) expect(true).toBe(false)
	// 			expect(data).not.toBe(undefined)
	// 			done()
	// 		})
	// 	})
	// })
	// describe('showFavorites', () => {
	// 	it('should return favorites list', done => {
	// 		const favorite = {body: {name: ['Hardwell']}}

	// 		events.addFavorites(favorite,(err) => {
	// 			if (err) expect(true).toBe(false)
	// 			schema.Favorites.count({}, (err, count) => {
	// 				if (err) expect(true).toBe(false)
	// 				expect(count).toBe(1)
	// 			})
	// 		})
	// 		events.showFavorites({}, (err, data) => {
	// 			if (err) expect(true).toBe(false)
	// 			expect(data).not.toBe(undefined)
	// 			schema.Favorites.count({}, (err) => {
	// 				if(err) expect(true).toBe(false)
	// 				//expect(count).toBe(1)
	// 				done()
	// 			})
	// 		})
	// 	})
	// })
// })
