const createMovie = (movieDetails) => {
	const id = movieDetails.id;
	const poster = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
	const title = movieDetails.title;
	const year = movieDetails.release_date.split("-", 1);
	const genres = movieDetails.genres.map((genre) => {
		return genre.name;
	});

	const runtime = (() => {
		let hours = Math.floor(movieDetails.runtime / 60);
		let minutes = movieDetails.runtime % 60;

		return `${hours}h ${minutes}m`;
	})();

	const rating = movieDetails.vote_average;
	const tagline = movieDetails.tagline;
	const overview = movieDetails.overview;

	const director = (() => {
		let directors = movieDetails.credits.crew.filter(
			(person) => person.known_for_department === "Directing"
		);
		let mainDirector = directors[0];

		return {
			id: mainDirector.id,
			name: mainDirector.name,
			role: "Director",
			job: mainDirector.job,
		};
	})();

	const cast = (() => {
		let topCast = movieDetails.credits.cast.filter((cast, index) => index < 20);

		return topCast.map((cast) => {
			return {
				id: cast.id,
				name: cast.name,
				character: cast.character,
				picture: `https://image.tmdb.org/t/p/w500${cast.profile_path}`,
			};
		});
	})();

	const recommendations = (() => {
		let ids = movieDetails.recommendations.results.filter((movie) => movie.id);

		return ids;
	})();

	const price = `$${movieDetails.vote_average.toFixed(2)}`;

	return {
		id,
		poster,
		title,
		year,
		genres,
		runtime,
		rating,
		tagline,
		overview,
		director,
		cast,
		recommendations,
		price,
	};
};

export default createMovie;
