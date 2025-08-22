import { HeartIcon, StarIcon } from "lucide-react";
import posterUnavailble from "/Images/unavailable_poster.jpg";
import Button from "../components/Button";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";

const StyledMovieCard = styled.div`
	width: 250px;
	border: 0.5px solid rgba(255, 255, 255, 0.3);
	color: white;

	box-shadow: 0 2px 5px rgba(255, 255, 255, 0.15);
`;

const StyledImgWrapper = styled.div`
	position: relative;

	width: 100%;

	&:hover .overlay {
		opacity: 1;
		pointer-events: auto;
	}
`;

const StyledImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const MovieDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;

	padding: 10px 10px 25px;

	h2 {
		font-weight: 500;
		font-size: 13px;
		color: rgba(255, 255, 255, 0.8);
	}
`;

const TitleButton = styled(Button)`
	width: fit-content;

	text-align: start;
`;

const Rating = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;

	p {
		font-size: 14px;
		color: #ffffffb8;
	}
`;

const StyledStar = styled(StarIcon)`
	width: 20px;
	fill: white;
`;

const ImageOverlay = styled.div`
	opacity: 0;
	pointer-events: none;

	position: absolute;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100%;

	background-color: #000000c8;

	transition: opacity 0.3s ease-in-out;
`;

const LikeButton = styled(Button)`
	position: absolute;

	top: 15px;
	right: 15px;

	width: 35px;
	height: 35px;

	border: none;

	&:hover {
		background-color: transparent;
		color: white;
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
	width: 150px;
	font-size: 16px;
`;

const StyledHeartIcon = styled(HeartIcon)`
	width: 100%;
	height: 100%;
`;

const MovieCard = ({ userData, setUserData, movieDetails }) => {
	const [, setSearchParams] = useSearchParams();

	const id = movieDetails.id;
	const title = movieDetails.title;
	const poster = movieDetails.poster_path
		? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
		: posterUnavailble;
	const date = movieDetails.release_date
		? format(movieDetails.release_date, "MMM dd, yyyy")
		: "Date Unavailable";
	const rating = movieDetails.vote_average
		? movieDetails.vote_average.toFixed(1)
		: "0.0";

	const setMovieId = (id) => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			if (id) {
				newParams.set("id", id);
			} else {
				newParams.delete("id");
			}
			return newParams;
		});
	};

	const navigate = useNavigate();

	const isOnlist = (list) => {
		return userData[list].filter((item) => item.id === id)[0] ? true : false;
	};

	const handleAddToCart = () => {
		let newItem = {
			id,
			title,
			year: date.split(", ")[1],
			price: rating,
			poster_path: movieDetails.poster_path,
			days: 1,
		};

		setUserData((prevData) => ({
			...prevData,
			cart: [...prevData.cart, newItem],
		}));
	};

	const handleAddToWishlist = () => {
		let newItem = {
			id,
			title,
			release_date: movieDetails.release_date,
			vote_average: movieDetails.vote_average
				? movieDetails.vote_average
				: "0.0",
			poster_path: movieDetails.poster_path,
		};

		setUserData((prevData) => ({
			...prevData,
			wishlist: [...prevData.wishlist, newItem],
		}));
	};

	const handleRemoveFromList = (list) => {
		setUserData((prevData) => ({
			...prevData,
			[list]: prevData[list].filter((item) => item.id !== id),
		}));
	};

	const handleLikeClick = () => {
		const list = "wishlist";
		if (isOnlist(list)) {
			handleRemoveFromList(list);
		} else {
			handleAddToWishlist();
		}
	};

	const handleMovieNavigation = (id) => {
		navigate("/movie");
		setMovieId(id);
	};

	return (
		<StyledMovieCard id={id}>
			<StyledImgWrapper>
				<ImageOverlay className="overlay">
					<LikeButton
						onClick={handleLikeClick}
						className={isOnlist("wishlist") ? "liked" : ""}
					>
						<StyledHeartIcon></StyledHeartIcon>
					</LikeButton>
					{!isOnlist("cart") ? (
						<CartButton className="reverse" onClick={handleAddToCart}>
							Add to Cart
						</CartButton>
					) : (
						<CartButton
							onClick={() => {
								navigate("/cart");
							}}
						>
							View in Cart
						</CartButton>
					)}
				</ImageOverlay>
				<StyledImg src={poster}></StyledImg>
			</StyledImgWrapper>
			<MovieDetails>
				<Rating>
					<StyledStar></StyledStar>
					<p>{rating}</p>
				</Rating>
				<TitleButton
					onClick={() => {
						handleMovieNavigation(id);
					}}
					className="borderless"
					title={title}
				>
					{title}
				</TitleButton>
				<h2>{date}</h2>
			</MovieDetails>
		</StyledMovieCard>
	);
};

export default MovieCard;
