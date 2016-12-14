'use strict'

const events = require('../events')
const schema = require('../Modules/schema')
const auth = require('../Modules/authorise')

describe('search function ', () => {
	it('should get valid location events', () => {
		const location = {params: { l: ['London']}}

		events.searchByLocation(location, (err, data) => {
			if(err) expect(true).toBe(false)
			expect(data).not.toBe(undefined)
		})
	})
	it('should find valid performer', () => {
		const performer = {params: { p: ['Hardwell']}}

		events.searchPerformer(performer, (err,data) => {
			if(err) expect(true).toBe(false)
			expect(data).not.toBe(undefined)
		})
	})
	it('should find valid performer events', () => {
		const performer = {params: { p: ['Hardwell']}}

		events.searchPerformerEvents(performer, (err, data) => {
			if(err) expect(true).toBe(false)
			expect(data).not.toBe(undefined)
		})
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
describe('valid authorisation data', () => {
	it('should add a valid performer to favorites', () => {
		const body = {authorization: { scheme: 'Basic',credentials: 'Basic dGVzdHRlc3Q6dGVzdHRlc3Q=', basic: { username: 'testtest', password: 'testtest' } }, username: 'testtest'}
		const performer = {body: {name: ['Hardwell']}}

		events.addFavorites(performer, (err, data) => {
			if(err) expect(true).toBe(false)
			expect(data).not.tobe(undefined)
			auth.getHeader(body)
			schema.Favorites.count({}, (err, count) => {
				if (err) expect(true).toBe(false) //error should not be thrown
				expect(count).toBe(1)
			})
		})
	})

	it('should delete the favorites collection',() => {
		const body = {authorization: { scheme: 'Basic',credentials: 'Basic dGVzdHRlc3Q6dGVzdHRlc3Q=', basic: { username: 'testtest', password: 'testtest' } }, username: 'testtest'}

		events.delFavorites({} ,(err, data) => {
			if(err) expect(true).toBe(false)
			expect(data).not.toBe(undefined)
			auth.getHeader(body)

		})
		schema.Favorites.count({}, (err, count) => {
			if (err) expect(true).toBe(false) //error should not be thrown
			expect(count).toBe(0)
		})
	})

	it('should return the favorites list',() => {
		const body = {authorization: { scheme: 'Basic',credentials: 'Basic dGVzdHRlc3Q6dGVzdHRlc3Q=', basic: { username: 'testtest', password: 'testtest' } }, username: 'testtest'}
		const performer = {body: {name: ['Hardwell']}}

		events.addFavorites(performer, (err, data) => {
			if(err) expect(true).toBe(false)
			expect(data).not.tobe(undefined)
			auth.getHeader(body)
			schema.Favorites.count({}, (err, count) => {
				if (err) expect(true).toBe(false) //error should not be thrown
				expect(count).toBe(1)
			})
			events.showFavorites({}, (err, data) => {
				if(err) expect(true).toBe(false)
				expect(data).not.toBe(undefined)

			})
		})
	})
})
