import styled from "styled-components";
import posterUnavailble from "/Images/unavailable_poster.jpg";
import Counter from "./Counter";
import Button from "./Button";
import { X } from "lucide-react";

const StyledCartItem = styled.div`
	width: 100%;
	height: 120px;

	padding: 5px 20px;
	padding-right: 70px;

	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;

	background-color: white;
	color: black;

	.priceWrapper {
		width: 50px;
	}
`;

const MovieWrapper = styled.div`
	height: 100%;

	display: flex;
	align-items: center;
	gap: 20px;

	.posterWrapper {
		height: 100%;

		flex-shrink: 0;

		border: 1px solid rgb(0, 0, 0, 0.5);

		img {
			width: 100%;
			height: 100%;
		}
	}

	p {
		width: 200px;

		font-size: 18px;

		span {
			color: rgb(0, 0, 0, 0.6);
		}
	}
`;

const DaysCounterWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;

	color: rgb(0, 0, 0, 0.8);

	p {
		font-size: 15px;
	}
`;

const RemoveItemButton = styled(Button)`
	width: 25px;
	height: 25px;

	position: absolute;

	color: black;

	border: none;

	top: 10px;
	right: 10px;

	.lucide {
		width: 100%;
		height: 100%;
	}

	&:hover {
		color: rgb(0, 0, 0, 0.5);
	}
`;

const CartItem = ({ setUserData, movieDetails }) => {
	const id = movieDetails.id;
	const title = movieDetails.title;
	const year = movieDetails.year;
	const poster = movieDetails.poster_path
		? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
		: posterUnavailble;
	const days = movieDetails.days;
	const price = movieDetails.price;

	const handleIncrement = () => {
		if (days < 10) {
			setUserData((prevData) => ({
				...prevData,
				cart: prevData.cart.map((item) =>
					item.id === id ? { ...item, days: item.days + 1 } : item
				),
			}));
		}
	};

	const handleDecrement = () => {
		if (days > 1) {
			setUserData((prevData) => ({
				...prevData,
				cart: prevData.cart.map((item) =>
					item.id === id ? { ...item, days: item.days - 1 } : item
				),
			}));
		}
	};

	const handleRemoveFromCart = () => {
		setUserData((prevData) => ({
			...prevData,
			cart: prevData.cart.filter((item) => item.id !== id),
		}));
	};

	return (
		<StyledCartItem>
			<RemoveItemButton onClick={handleRemoveFromCart}>
				<X></X>
			</RemoveItemButton>
			<MovieWrapper>
				<div className="posterWrapper">
					<img src={poster} />
				</div>

				<p>
					{title} <span className="year">({year})</span>
				</p>
			</MovieWrapper>
			<DaysCounterWrapper>
				<p>Rent For</p>
				<Counter
					count={days}
					increment={handleIncrement}
					decrement={handleDecrement}
				></Counter>
				<p>Days</p>
			</DaysCounterWrapper>
			<div className="priceWrapper">
				<p>{`$${(price * days).toFixed(2)}`}</p>
			</div>
		</StyledCartItem>
	);
};

export default CartItem;
