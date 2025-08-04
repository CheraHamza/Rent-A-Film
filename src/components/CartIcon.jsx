import styled from "styled-components";
import shoppingcart from "/Icons/shopping-cart.svg";
import Button from "./Button";

const StyledCart = styled(Button)`
	width: 60px;
	height: 60px;
	position: relative;

	& img,
	span {
		transition: opacity 0.15s ease-in-out;
	}

	&:hover img,
	&:hover span {
		opacity: 0.5;
	}
`;

const StyledImg = styled.img`
	width: 30px;
	height: 30px;
`;

const Counter = styled.span`
	width: 19px;
	height: 19px;

	font-family: "DM Serif Display";
	font-size: 12px;

	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	top: 10px;
	right: 0px;

	background-color: red;
	color: white;
	border-radius: 50px;
`;

const CartIcon = ({ count = 2 }) => {
	return (
		<StyledCart className="borderless">
			<StyledImg src={shoppingcart} alt="shopping cart"></StyledImg>
			<Counter>{count}</Counter>
		</StyledCart>
	);
};

export default CartIcon;
