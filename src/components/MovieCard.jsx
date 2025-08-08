import { HeartIcon, StarIcon } from "lucide-react";
import Button from "../components/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
		font-size: 14px;
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

const MovieCard = ({
	id,
	poster,
	title,
	date,
	rating,
	data,
	setData,
	setMovieDetailView,
}) => {
	const navigate = useNavigate();

	const isOnlist = (list) => {
		return data[list].filter((item) => item.id === id)[0] ? true : false;
	};

	const handleAddToCart = () => {
		let newItem = {
			id,
			title,
			year: date.split(", ")[1],
			price: rating,
			poster_url: poster,
			days: 1,
		};

		setData((prevData) => ({
			...prevData,
			cart: [...prevData.cart, newItem],
		}));
	};

	const handleAddToWishlist = () => {
		let newItem = {
			id,
			title,
			date,
			rating,
			poster_url: poster,
		};

		setData((prevData) => ({
			...prevData,
			wishlist: [...prevData.wishlist, newItem],
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
			handleAddToWishlist();
		}
	};

	const handleMovieClick = () => {
		const urlTitle = title.split(" ").join("-").toLowerCase();

		setMovieDetailView({
			id,
			title: urlTitle,
		});
		navigate(`/movie/${id}/${urlTitle}`);
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
						<CartButton
							className="reverse"
							onClick={() => {
								handleAddToCart();
							}}
						>
							Add to Cart
						</CartButton>
					) : (
						<CartButton>View in Cart</CartButton>
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
					onClick={handleMovieClick}
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
