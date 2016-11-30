'use strict'

const schema = require('./schema')

exports.addFavorite = PerformerDetails => new Promise ((resolve, reject) => {
	if (!'title' in PerformerDetails && !'music_genre in PerformerDetails' && !'id' in PerformerDetails) {
		reject(new Error('ivalid performer object'))
	}
	const favorites = new schema.favorites(PerformerDetails)

	favorites.save( (err, favorite) => {
		if (err) {
			reject(new Error('an error adding favorite'))
		}
		resolve(favorite)
	})

	resolve(favorites)

})

exports.getFavorites = () => new Promise((resolve, reject) => {
	schema.favorites.find((err, docs) => {
		if (err) reject(new Error('database error'))
		if (!docs.length) reject(new Error('favorites list is empty'))
		resolve(docs)
	})
})
