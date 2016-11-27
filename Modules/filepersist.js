'use strict'

const storage = require('node-persist')

storage.initSync()

const Favorite = function(title, genre, id) {
	this.title = title,
    this.music_genre = genre,
    this.id = id
}

exports.addFavorite = PerformerDetails => new Promise ((resolve, reject) => {
	if (!'title' in PerformerDetails && !'music_genre in PerformerDetails' && !'id' in PerformerDetails) {
		reject(new Error('ivalid performer object'))
	}
	const favorite = new Favorite(PerformerDetails)

	storage.setItemSync(favorite)
	resolve(favorite)

})


