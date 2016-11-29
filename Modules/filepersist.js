'use strict'

const schema = require('./schema')

exports.addFavorite = PerformerDetails => new Promise ((resolve, reject) => {
	if (!'title' in PerformerDetails && !'music_genre in PerformerDetails' && !'id' in PerformerDetails) {
		reject(new Error('ivalid performer object'))
	}
	const favorite = new schema.favorite(PerformerDetails)

	favorite.save( (err, favorite) => {
		if (err) {
			reject(new Error('an error adding favorite'))
		}
		resolve(favorite)
	})

	resolve(favorite)

})
