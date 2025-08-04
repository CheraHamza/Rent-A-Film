import { HeartIcon, StarIcon } from "lucide-react";
import Button from "../components/Button";
import styled from "styled-components";
import { useState } from "react";

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

	h1 {
		font-size: 17px;
		font-weight: 600;

		cursor: pointer;
	}

	h2 {
		font-size: 15px;
		font-weight: 400;

		color: rgba(255, 255, 255, 0.8);
	}
`;

const Rating = styled.div`
	display: flex;
	align-items: end;
	gap: 5px;

	p {
		font-family: "DM Serif Display";
		font-size: 16px;
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

const MovieCard = ({ id, poster, title, date, rating }) => {
	const [inCart, setInCart] = useState(false);
	const [liked, setLiked] = useState(false);

	const toggleLike = () => {
		setLiked(!liked);
	};

	const addToCart = () => {
		setInCart(true);
	};

	return (
		<StyledMovieCard id={id}>
			<StyledImgWrapper>
				<ImageOverlay className="overlay">
					<LikeButton onClick={toggleLike} className={liked ? "liked" : ""}>
						<StyledHeartIcon></StyledHeartIcon>
					</LikeButton>
					{!inCart ? (
						<CartButton className="reverse" onClick={addToCart}>
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
				<h1 title={title}>{title}</h1>
				<h2>{date}</h2>
			</MovieDetails>
		</StyledMovieCard>
	);
};

export default MovieCard;
