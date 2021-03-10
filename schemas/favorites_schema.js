const mongoose = require('mongoose')

const FavoritesSchema = new mongoose.Schema({
    CustomerID: { type: Number },
    Favorite_Items: { type: [Number] }
});

module.exports = mongoose.model('Favorites', FavoritesSchema, 'Favorites');