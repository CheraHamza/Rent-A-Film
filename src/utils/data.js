const data = {
	wishlist: [
		{
			id: 238,
			card_info: {
				title: "The Godfather",
				date: "Mar 14, 1972",
				rating: 8.69,
				poster_url:
					"https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
			},
		},
	],

	cart: [
		{
			id: 238,
			card_info: {
				title: "The Godfather",
				date: "Mar 14, 1972",
				rating: 8.69,
				poster_url:
					"https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
			},
		},
	],
};

function getWishlist() {
	return data.wishlist;
}

export { data, getWishlist };
