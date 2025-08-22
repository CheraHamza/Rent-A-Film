import styled from "styled-components";
import Button from "./Button";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCartIcon } from "lucide-react";

const StyledCart = styled(Button)`
	width: 50px;
	height: 50px;
	position: relative;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	padding: 5px;

	border: none;
	border-radius: 3px;

	color: rgb(255, 255, 255, 0.5);

	.lucide {
		width: 20px;
	}

	span {
		font-size: 12px;
	}

	&:hover {
		background-color: rgb(255, 255, 255, 0.5);
		color: black;
	}

	&.active {
		color: white;
	}
`;

const Counter = styled.span`
	width: 15px;
	height: 15px;

	font-size: 12px;

	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	top: 5px;
	right: 0px;

	background-color: red;
	color: white;
	border-radius: 50px;
`;

const CartIcon = ({ count = 0 }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const pathname = location.pathname.split("/")[1];

	return (
		<StyledCart
			className={pathname === "cart" ? "active" : ""}
			onClick={() => {
				navigate("/cart");
			}}
		>
			<ShoppingCartIcon />
			<span>Cart</span>
			<Counter>{count}</Counter>
		</StyledCart>
	);
};

export default CartIcon;
