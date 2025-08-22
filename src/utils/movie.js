import posterUnavailable from "/Images/unavailable_poster.jpg";
import portraitUnavailable from "/Images/unavailable_portrait.jpg";

const createMovie = (movieDetails) => {
	const id = movieDetails.id;
	const poster_path = movieDetails.poster_path;
	const poster = movieDetails.poster_path
		? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
		: posterUnavailable;
	const title = movieDetails.title;
	const date = movieDetails.release_date;
	const year = movieDetails.release_date
		? movieDetails.release_date.split("-", 1)
		: "xxxx";

	const genres = movieDetails.genres.map((genre) => {
		return genre.name;
	});

	const runtime = (() => {
		let hours = Math.floor(movieDetails.runtime / 60);
		let minutes = movieDetails.runtime % 60;

		return `${hours}h ${minutes}m`;
	})();

	const rating = movieDetails.vote_average;
	const formatedRating = movieDetails.vote_average.toFixed(1);
	const tagline = movieDetails.tagline;
	const overview = movieDetails.overview;

	const director = (() => {
		let director = movieDetails.credits.crew.filter(
			(person) => person.job === "Director"
		)[0];

		return {
			id: director.id,
			name: director.name,
		};
	})();

	const cast = (() => {
		let topCast = movieDetails.credits.cast.filter((cast, index) => index < 20);

		return topCast.map((cast) => {
			return {
				id: cast.id,
				name: cast.name,
				character: cast.character,
				picture: cast.profile_path
					? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
					: portraitUnavailable,
			};
		});
	})();

	const recommendations = (() => {
		let movies = movieDetails.recommendations.results.filter(
			(movie) => movie.id
		);

		return movies.map((movie) => {
			return {
				id: movie.id,
				title: movie.title,
				poster: movie.poster_path
					? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
					: posterUnavailable,
				year: movie.release_date.split("-", 1),
			};
		});
	})();

	return {
		id,
		poster_path,
		poster,
		title,
		year,
		date,
		genres,
		runtime,
		rating,
		formatedRating,
		tagline,
		overview,
		director,
		cast,
		recommendations,
	};
};

export default createMovie;
