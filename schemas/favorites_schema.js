const FavoritesSchema = new mongoose.Schema({
    CustomerID: { type: Number },
    FavoriteItems: { type: Number }
});

const Favorites = mongoose.model('Favorites', FavoritesSchema, 'Favorites');

console.log("finding favorites");
Favorites.find({}, function (err, favorites) {
    console.log(favorites);
});