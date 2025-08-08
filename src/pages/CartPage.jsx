import styled from "styled-components";
import CartItem from "../components/CartItem";
import Button from "../components/Button";

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
`;

const CartPage = ({ data, setData }) => {
	const totalPrice = () => {
		let price = 0;
		data.cart.forEach((item) => {
			price = price + item.price * item.days;
		});

		return price;
	};

	const discount = 5;

	return (
		<StyledCartPage>
			<CartItemWrapper>
				{data.cart.map((item) => (
					<CartItem
						key={item.id}
						poster={item.poster_url}
						title={item.title}
						year={item.year}
						days={item.days}
						price={item.price}
					></CartItem>
				))}
			</CartItemWrapper>
			<CheckoutWrapper>
				<h1>Summary</h1>
				<div className="priceRow">
					<p>Price</p>
					<p>{`$${totalPrice()}`}</p>
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
					<p>{`$${totalPrice() - discount}`}</p>
				</div>
				<CheckoutButton className="reverse">Checkout</CheckoutButton>
			</CheckoutWrapper>
		</StyledCartPage>
	);
};

export default CartPage;
