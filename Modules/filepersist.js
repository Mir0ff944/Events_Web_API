'use strict'

const schema = require('./schema')

exports.addFavorite = PerformerDetails => new Promise ((resolve, reject) => {
	if (!'perforers[0].title' in PerformerDetails && !'performers[0].genre' in PerformerDetails && !'performers[0].image' in PerformerDetails && !'performers[0].id' in PerformerDetails) {
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
	schema.Favorites.find((err, favorites ) => {
		if (err) reject(new Error('database error'))
		if (!favorites.length) reject(new Error('favorites list is empty'))
		resolve({favorites})
	})
})

exports.delFavorites = favorites => new Promise((resolve, reject) => {
	schema.Favorites.remove({favorites},(err, favorites) => {
		if (err) reject(new Error('database error'))
		if (!favorites.length) resolve('Favorites list has been deleted')
	})
})

exports.updateFavorites = name => new Promise((resolve, reject) => {
	console.log(name)
	schema.Favorites.findOneAndRemove({'title': name},err => {
		if (err) reject(new Error('database error'))
		resolve(`${name} is no longer in your favorites list`)
	})
})

