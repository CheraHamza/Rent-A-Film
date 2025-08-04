import { HeartIcon, StarIcon } from "lucide-react";
import styled from "styled-components";
import { useState } from "react";

const StyledMovieCard = styled.div`
	width: 250px;
	border: 0.5px solid rgba(255, 255, 255, 0.3);
	color: white;

	box-shadow: 0 2px 8px rgba(255, 255, 255, 0.15);
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

const CardOverlay = styled.div`
	opacity: 0;
	pointer-events: none;

	position: absolute;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	gap: 10px;

	width: 100%;
	height: 100%;

	background-color: #000000c8;

	transition: opacity 0.3s ease-in-out;
`;

const RentedWrapper = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;

	p {
		font-family: "DM Serif Display";
		font-size: 20px;
		font-weight: 500;
		letter-spacing: 2px;
	}
`;

const LikedButton = styled.button`
	position: absolute;

	top: 15px;
	right: 15px;

	width: 35px;
	height: 35px;

	color: white;
	background-color: transparent;
	border: none;

	cursor: pointer;

	&:hover .lucide-heart {
		fill: white;
	}

	&.liked .lucide-heart {
		fill: white;
	}
`;

const StyledHeartIcon = styled(HeartIcon)`
	width: 100%;
	height: 100%;
`;

const StyledButton = styled.button`
	width: 150px;

	background-color: transparent;
	border: 1px solid white;

	color: white;
	padding: 5px;

	font-family: "DM Serif Display";
	font-size: 16px;
	font-weight: 400;

	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;

	cursor: pointer;
	&:hover {
		background-color: white;
		color: black;
	}
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
				<CardOverlay className="overlay">
					<LikedButton onClick={toggleLike} className={liked ? "liked" : ""}>
						<StyledHeartIcon></StyledHeartIcon>
					</LikedButton>
					{!inCart ? (
						<>
							<StyledButton onClick={addToCart}>Add to Cart</StyledButton>
						</>
					) : (
						<>
							<RentedWrapper className="rented">
								<p>In Cart</p>
							</RentedWrapper>
						</>
					)}
				</CardOverlay>
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
