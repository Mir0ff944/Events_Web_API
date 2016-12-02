'use strict'

const schema = require('./schema')

exports.addFavorite = PerformerDetails => new Promise ((resolve, reject) => {
	if (!'title' in PerformerDetails && !'music_genre in PerformerDetails' && !'id' in PerformerDetails) {
		reject(new Error('ivalid performer object'))
	}
	const favorites = new schema.Favorites(PerformerDetails)

	favorites.save( (err, favorite) => {
		if (err) {
			reject(new Error('an error adding favorite'))
		}
		resolve(favorite)
	})

	resolve({favorites})

})

exports.getFavorites = () => new Promise((resolve, reject) => {
	schema.Favorites.find((err, docs) => {
		if (err) reject(new Error('database error'))
		if (!docs.length) reject(new Error('favorites list is empty'))
		resolve(docs)
	})
})

exports.delFavorites = () => new Promise((resolve, reject) => {
	schema.Favorites.remove({},(err, docs) => {
		if (err) reject(new Error('database error'))
		if (!docs.length) resolve('Favorites list has been deleted')
	})
})

// exports.existing = listname => new Promise ((resolve, reject) => {
// 	schema.favorites.find({name: listname}.remove(), (err) => {
// 		if (err) reject(new Error('database error'))
// 		//if (docs.length) reject(new Error(`${listname} is already in favorites`))
// 	})
// })
