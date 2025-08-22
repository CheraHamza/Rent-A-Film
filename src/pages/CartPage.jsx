import styled from "styled-components";
import CartItem from "../components/CartItem";
import Button from "../components/Button";
import { useNavigate, useOutletContext } from "react-router-dom";

const StyledCartPage = styled.div`
	height: calc(100vh - 70px);

	display: flex;

	justify-content: space-around;

	padding: 30px;
`;

const CartItemWrapper = styled.div`
	width: min(850px, 100%);

	display: flex;
	flex-direction: column;

	overflow-x: hidden;
	overflow-y: auto;

	padding-inline: 10px;

	scrollbar-width: thin;
	scrollbar-color: rgb(255, 255, 255, 0.3) rgb(255, 255, 255, 0);

	gap: 20px;
`;

const CheckoutWrapper = styled.div`
	width: min(320px);

	align-self: center;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;

	color: white;

	h1 {
		font-size: 30px;
		padding-bottom: 20px;
	}

	p {
		font-size: 18px;
	}

	.priceRow,
	.saleRow,
	.taxesRow,
	.totalRow {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 30px;
	}

	hr {
		width: 100%;
		border-color: rgb(255, 255, 255, 0.5);
	}
`;

const CheckoutButton = styled(Button)`
	width: 110%;
	padding-block: 10px;

	margin-top: 20px;

	font-size: 20px;
	letter-spacing: 2px;

	&.disabled {
		opacity: 0.3;
		pointer-events: none;
	}
`;

const CartPage = () => {
	const { userData, setUserData } = useOutletContext();
	const navigate = useNavigate();

	const handleCheckout = () => {
		setUserData((prevData) => ({
			...prevData,
			cart: [],
		}));

		alert("Thank you for your trust!");
		navigate("/catalog");
	};

	const totalPrice = () => {
		let price = 0;
		userData.cart.forEach((item) => {
			price = price + item.price * item.days;
		});

		return price;
	};

	const discount = 5;

	return (
		<StyledCartPage>
			<CartItemWrapper>
				{userData.cart.map((item) => (
					<CartItem
						key={item.id}
						setUserData={setUserData}
						movieDetails={item}
					></CartItem>
				))}
			</CartItemWrapper>
			<CheckoutWrapper>
				<h1>Summary</h1>
				<div className="priceRow">
					<p>Price</p>
					<p>{`$${totalPrice().toFixed(2)}`}</p>
				</div>
				<div className="saleRow">
					<p>Sale Discount</p>
					<p>{`$${discount}.00`}</p>
				</div>
				<div className="taxesRow">
					<p>Taxes</p>
					<p>Calculated at Checkout</p>
				</div>
				<hr />
				<div className="totalRow">
					<p>Subtotal</p>
					<p>{`$${(totalPrice() - discount).toFixed(2)}`}</p>
				</div>
				<CheckoutButton
					onClick={handleCheckout}
					className={userData.cart.length > 0 ? "reverse" : "reverse disabled"}
				>
					Checkout
				</CheckoutButton>
			</CheckoutWrapper>
		</StyledCartPage>
	);
};

export default CartPage;
