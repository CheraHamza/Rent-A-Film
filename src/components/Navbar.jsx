import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const StyledNavbar = styled.div`
	display: flex;
	align-items: center;
	gap: 50px;
`;

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<StyledNavbar>
			<Button
				className="borderless"
				onClick={() => {
					navigate("/home");
				}}
			>
				Home
			</Button>
			<Button
				className="borderless"
				onClick={() => {
					navigate("/catalog");
				}}
			>
				Catalog
			</Button>
			<Button
				className="borderless"
				onClick={() => {
					navigate("/wishlist");
				}}
			>
				Wishlist
			</Button>
			<Button
				className="borderless"
				onClick={() => {
					navigate("/search");
				}}
			>
				Find
			</Button>
		</StyledNavbar>
	);
};

export default Navbar;
