import styled from "styled-components";
import { useFetchData } from "../utils/Fetch";
import createMovie from "../utils/movie";
import Button from "../components/Button";
import { ArrowLeft, HeartIcon, StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StyledMoviePage = styled.div`
	padding-inline: 40px;

	display: flex;
	flex-direction: column;
	gap: 20px;

	color: white;
`;

const NavSection = styled.section`
	opacity: 0.8;

	display: flex;
	align-items: center;
	gap: 10px;
`;

const BackButton = styled(Button)`
	width: 25px;
	height: 25px;

	.lucide {
		height: 100%;
		width: 100%;
	}

	&:hover {
		color: white;
	}
`;

const MovieSection = styled.section`
	display: flex;
	gap: 40px;
`;

const Poster = styled.div`
	width: 300px;
	height: 450px;

	flex-shrink: 0;

	border: 1px solid rgba(255, 255, 255, 0.6);

	img {
		width: 100%;
		height: 100%;
	}
`;

const MovieInfo = styled.section`
	display: flex;
	flex-direction: column;
	gap: 10px;
	flex-grow: 1;

	.titleSection,
	.taglineSection,
	.overviewSection {
		max-width: 700px;
	}

	.header {
		display: flex;
		align-items: start;
		justify-content: space-between;

		.titleSection {
			.title {
				font-size: 25px;
				letter-spacing: 1px;
				text-transform: uppercase;

				.year {
					font-size: inherit;
					letter-spacing: inherit;

					color: rgb(255, 255, 255, 0.6);
				}
			}

			.subText {
				display: flex;
				gap: 5px;

				p {
					font-size: 14px;
					color: rgb(255, 255, 255, 0.6);
				}
			}
		}
	}

	.ratingSection {
		display: flex;
		align-items: center;
		gap: 5px;

		h1 {
			font-size: 25px;
		}

		.lucide {
			width: 25px;
			height: 25px;

			fill: white;
		}
	}

	.taglineSection {
		p {
			font-size: 17px;
			font-style: italic;
			color: rgb(255, 255, 255, 0.6);
			letter-spacing: 1px;
		}
	}

	.overviewSection {
		display: flex;
		flex-direction: column;
		gap: 10px;

		h2 {
			font-size: 18px;
		}

		p {
			font-size: 15px;
			text-align: justify;
			color: rgb(255, 255, 255, 0.6);
		}
	}

	.directorSection {
		margin-top: 20px;

		.role {
			font-size: 14px;
			color: rgb(255, 255, 255, 0.6);
		}
	}

	.cartSection {
		margin-top: auto;

		display: flex;
		justify-content: end;
	}
`;

const LikeButton = styled(Button)`
	width: 40px;
	height: 40px;

	border: none;

	&:hover {
		background-color: transparent;
		color: white;
	}

	.lucide-heart {
		width: 100%;
		height: 100%;
	}

	&:hover .lucide-heart {
		fill: white;
	}

	&.liked .lucide-heart {
		fill: white;
	}
`;

const CartButton = styled(Button)`
	height: 40px;
	width: 180px;
	font-size: 17px;
`;

const CastSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 20px;

	padding-block: 30px;

	h1 {
		font-size: 25px;
		letter-spacing: 1px;
	}

	.castWrapper {
		display: flex;
		gap: 20px;

		padding-bottom: 10px;

		overflow-x: auto;
		overflow-y: hidden;

		user-select: none;
		scroll-behavior: smooth;

		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.3) rgb(0, 0, 0, 0);
	}
`;

const CastCard = styled.div`
	width: 150px;
	flex-shrink: 0;

	background-color: white;
	color: black;

	img {
		width: 100%;
	}

	.details {
		display: flex;
		flex-direction: column;

		gap: 3px;

		padding: 5px 10px 20px;

		h3 {
			font-size: 17px;
		}

		p {
			font-size: 14px;
			color: rgb(0, 0, 0, 0.6);
		}
	}
`;

const RecommendationSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 20px;

	padding-bottom: 30px;

	h1 {
		font-size: 25px;
	}

	.recommendationsWrapper {
		display: flex;
		gap: 20px;

		padding-bottom: 10px;

		overflow-x: auto;
		overflow-y: hidden;

		user-select: none;
		scroll-behavior: smooth;

		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.3) rgb(0, 0, 0, 0);
	}
`;

const RecommendationCard = styled(Button)`
	width: 180px;

	border: 1px solid rgba(255, 255, 255, 0.6);

	&:hover {
	}

	flex-shrink: 0;

	img {
		width: 100%;
		height: 100%;
	}
`;

const MoviePage = ({ id, data, setData, setMovieDetailView }) => {
	const { fetchedData } = useFetchData(
		`https://api.themoviedb.org/3/movie/${id}?append_to_response=recommendations,credits`
	);

	const navigate = useNavigate();

	let movie;

	if (fetchedData) {
		movie = createMovie(fetchedData);
	}

	const navigateToMovie = (id, title) => {
		const urlTitle = title.split(" ").join("-").toLowerCase();

		setMovieDetailView({
			id,
			title: urlTitle,
		});

		navigate(`/movie/${id}/${urlTitle}`);
	};

	const isOnlist = (list) => {
		return data[list].filter((item) => item.id === id)[0] ? true : false;
	};

	const handleAddToList = (list) => {
		let newItem = {
			id,
			card_info: {
				title: movie.title,
				date: movie.date,
				rating: movie.rating,
				poster_url: movie.poster,
			},
		};

		setData((prevData) => ({
			...prevData,
			[list]: [...prevData[list], newItem],
		}));
	};

	const handleRemoveFromList = (list) => {
		setData((prevData) => ({
			...prevData,
			[list]: prevData[list].filter((item) => item.id !== id),
		}));
	};

	const handleLikeClick = () => {
		const list = "wishlist";
		if (isOnlist(list)) {
			handleRemoveFromList(list);
		} else {
			handleAddToList(list);
		}
	};

	return (
		<StyledMoviePage>
			{movie && (
				<>
					<NavSection>
						<BackButton
							onClick={() => {
								navigate(-1);
							}}
							className="borderless"
						>
							<ArrowLeft />
						</BackButton>
						<p>{`Movie Details  |  ${movie.title}`}</p>
					</NavSection>
					<MovieSection>
						<Poster>
							<img src={movie.poster} alt="" />
						</Poster>
						<MovieInfo>
							<div className="header">
								<div className="titleSection">
									<h1 className="title">
										{movie.title}
										<span className="year"> ({movie.year})</span>
									</h1>
									<div className="subText">
										<p className="genres">{movie.genres.join(", ")}</p>
										<p> | </p>
										<p className="">{movie.runtime} </p>
									</div>
								</div>
								<LikeButton
									onClick={handleLikeClick}
									className={isOnlist("wishlist") ? "liked" : ""}
								>
									<HeartIcon></HeartIcon>
								</LikeButton>
							</div>
							<div className="ratingSection">
								<h1>{movie.rating}</h1>
								<StarIcon></StarIcon>
							</div>
							<div className="taglineSection">
								<p>{movie.tagline}</p>
							</div>
							<div className="overviewSection">
								<h2>Overview</h2>
								<p className="overview">{movie.overview}</p>
							</div>
							<div className="directorSection">
								<h3 className="name">{movie.director.name}</h3>
								<p className="role">Director</p>
							</div>
							<div className="cartSection">
								{!isOnlist("cart") ? (
									<CartButton className="reverse">Add to Cart</CartButton>
								) : (
									<CartButton>View in Cart</CartButton>
								)}
							</div>
						</MovieInfo>
					</MovieSection>
					<CastSection>
						<h1>Top Billed Cast</h1>
						<div className="castWrapper">
							{movie.cast.map((cast) => (
								<CastCard key={cast.id}>
									<img src={cast.picture} />
									<div className="details">
										<h3>{cast.name}</h3>
										<p>{cast.character}</p>
									</div>
								</CastCard>
							))}
						</div>
					</CastSection>
					<RecommendationSection>
						<h1>Recommendations</h1>
						<div className="recommendationsWrapper">
							{movie.recommendations.map((recommendation) => (
								<RecommendationCard
									key={recommendation.id}
									onClick={() => {
										navigateToMovie(recommendation.id, recommendation.title);
									}}
									title={`${recommendation.title} (${recommendation.year})`}
								>
									<img src={recommendation.poster} alt="" />
								</RecommendationCard>
							))}
						</div>
					</RecommendationSection>
				</>
			)}
		</StyledMoviePage>
	);
};

export default MoviePage;
