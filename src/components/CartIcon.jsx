import styled from "styled-components";
import shoppingcart from "/Icons/shopping-cart.svg";

const StyledCart = styled.button`
	width: 60px;
	height: 60px;
	position: relative;
	background-color: transparent;
	border: none;

	cursor: pointer;

	&:hover img,
	&:hover span {
		opacity: 0.8;
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

const CartIcon = ({ count = 99 }) => {
	return (
		<StyledCart>
			<StyledImg src={shoppingcart} alt="shopping cart"></StyledImg>
			<Counter>{count}</Counter>
		</StyledCart>
	);
};

export default CartIcon;
