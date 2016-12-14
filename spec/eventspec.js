'use strict'

const eventim = require('../Modules/eventful')

describe('location', () => {
	it('should get valid location events', done => {
		const location = 'London'

		eventim.searchEvents(location)
			.then(event => {
				expect(event).not.toBe(undefined)
				done()
			}).catch(err => {
				throw new Error(err)
			})
	})
})

describe('performer', () => {
	it('should return performer', done => {
		const performer = 'Hardwell'

		eventim.searchPerformer(performer)
			.then(performer => {
				expect(performer).not.toBe(undefined)
				done()
			}).catch(err => {
				throw new Error(err)
			})
	})
})

describe('performer event',() => {
	it('should return performer events', done => {
		const performer = 'Hardwell'

		eventim.searchPerformerEvents(performer)
			.then(perfomer => {
				expect(perfomer).not.toBe(undefined)
				done()
			}).catch(err => {
				throw new Error(err)
			})
	})
})


describe('location', () => {
	it('should get invalid location events', done => {
		const location = 'Sarfovo'

		eventim.searchEvents(location)
			.then(event => {
				expect(event).toBe(undefined)
				done()
			}).catch(err => {
				throw new Error(err)
			})
	})
})

describe('performer', () => {
	it('should return invalid performer', done => {
		const performer = 'Tiesto'

		eventim.searchPerformer(performer)
			.then(performer => {
				expect(performer).not.toBe(undefined)
				done()
			}).catch(err => {
				throw new Error(err)
			})
	})
})

describe('performer event',() => {
	it('should return performer events', done => {
		const performer = 'Eminem'

		eventim.searchPerformerEvents(performer)
			.then(perfomer => {
				expect(perfomer).not.toBe(undefined)
				done()
			}).catch(err => {
				throw new Error(err)
			})
	})
})


//acceptance test

// describe('performer', () => {
// 	it('should find valid performer', () => {
// 		const performer = {params: { p: ['Hardwell']}}

// 		events.searchPerformer(performer, (err,data) => {
// 			if(err) expect(true).toBe(false)
// 			expect(data).not.toBe(undefined)
// 		})
// 	})
// })

// describe('performer event', () => {
// 	it('should find valid performer events', () => {
// 		const performer = {params: { p: ['Hardwell']}}

// 		events.searchPerformerEvents(performer, (err, data) => {
// 			if(err) expect(true).toBe(false)
// 			expect(data).not.toBe(undefined)
// 		})
// 	})
// })


// describe('missing parameter ', done => {
// 	it('should get valid location events', () => {
// 		const location = {params: { l: ['']}}

// 		events.searchByLocation(location, (err, data) => {
// 			if(err) expect(true).toBe(false)
// 			expect(data).toBe(undefined)
// 			done()
// 		})
// 	})
// })
// describe('missing parameter', () => {
// 	it('should find valid performer', () => {
// 		const performer = {params: { p: ['']}}

// 		events.searchPerformer(performer, (err,data) => {
// 			if(err) expect(true).toBe(false)
// 			expect(data).toBe(undefined)
// 		})
// 	})
// })
// describe('missing parameter', () => {
// 	it('should find valid performer events', () => {
// 		const performer = {params: { p: ['']}}

// 		events.searchPerformerEvents(performer, (err, data) => {
// 			if(err) expect(true).toBe(false)
// 			expect(data).toBe(undefined)
// 		})
// 	})
// })
// describe('wrong parrameter key', () => {
// 	it('should get valid location events', () => {
// 		const location = {params: { h: ['London']}}

// 		events.searchByLocation(location, (err, data) => {
// 			if(err) expect(true).toBe(false)
// 			expect(data).toBe(undefined)
// 		})
// 	})
// })
// describe('missing parameter', () => {
// 	it('should find valid performer', () => {
// 		const performer = {params: { h: ['Hardwell']}}

// 		events.searchPerformer(performer, (err,data) => {
// 			if(err) expect(true).toBe(false)
// 			expect(data).toBe(undefined)
// 		})
// 	})
// })
// describe('missing parameter', () => {
// 	it('should find valid performer events', () => {
// 		const performer = {params: { h: ['Hardwell']}}

// 		events.searchPerformerEvents(performer, (err, data) => {
// 			if(err) expect(true).toBe(false)
// 			expect(data).toBe(undefined)
// 		})
// 	})
// })

// describe('valid authorisation data', () => {
// 	it('should add a valid performer to favorites', () => {
// 		const body = {body: { name: 'HARDWELL' }, data: {performers: ['djalksjdasl','jfhasojhasodi']}, authorization: { scheme: 'Basic', credentials: 'bWlybzp0ZXN0dGVzdA==', basic: { username: 'miro', password: 'testtest' } },username: 'miro' }
// 		const file = { 'favorites': { 'title': 'HARDWELL', 'genre': 'Dance / Electronic', 'image': 'http://s1.evcdn.com/images/medium/I0-001/004/346/152-6.jpeg_/hardwell-52.jpeg','id': 'P0-001-000269982-5','_id': '58511262e02edea520d72059'}}

// 		events.addFavorites(body, (err, data) => {
// 			if(err) expect(true).toBe(false)
// 			expect(data).not.tobe(undefined)
// 			persist.addFavorite(file, (err) => {
// 				if(err) expect(true).toBe(false)
// 			})
// 			schema.Favorites.count({}, (err, count) => {
// 				if (err) expect(true).toBe(false) //error should not be thrown
// 				expect(count).toBe(1)
// 			})
// 		})
// 	})
// })

// describe('missing parameter', () => {
// 	it('should delete the favorites collection',() => {
// 		const body = {body: {}, authorization: { scheme: 'Basic', credentials: 'bWlybzp0ZXN0dGVzdA==', basic: { username: 'miro', password: 'testtest' } },username: 'miro' }
// 		const file = { 'favorites': { 'title': 'HARDWELL', 'genre': 'Dance / Electronic', 'image': 'http://s1.evcdn.com/images/medium/I0-001/004/346/152-6.jpeg_/hardwell-52.jpeg','id': 'P0-001-000269982-5','_id': '58511262e02edea520d72059'}}

// 		events.delFavorites({} ,(err, data) => {
// 			if(err) expect(true).toBe(false)
// 			expect(data).not.toBe(undefined)
// 			persist.addFavorite(file, (err) => {
// 				if(err) expect(true).toBe(false)
// 			})
// 			auth.getHeader(body,(err) => {
// 				if(err) expect(true).toBe(false)
// 			})

// 		})
// 		schema.Favorites.count({}, (err, count) => {
// 			if (err) expect(true).toBe(false) //error should not be thrown
// 			expect(count).toBe(0)
// 		})
// 	})
// })

// describe('missing parameter', () => {
// 	it('should return the favorites list',() => {
// 		const body = {body: { name: 'HARDWELL' }, authorization: { scheme: 'Basic', credentials: 'bWlybzp0ZXN0dGVzdA==', basic: { username: 'miro', password: 'testtest' } },username: 'miro' }


// 		events.showFavorites(body, (err, data) => {
// 			if(err) expect(true).toBe(false)
// 			expect(data).not.tobe(undefined)
// 			schema.Favorites.count({}, (err, count) => {
// 				if (err) expect(true).toBe(false) //error should not be thrown
// 				expect(count).toBe(1)
// 			})
// 			events.showFavorites({}, (err, data) => {
// 				if(err) expect(true).toBe(false)
// 				expect(data).not.toBe(undefined)

// 			})
// 		})
// 	})
// })
