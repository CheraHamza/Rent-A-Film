import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const StyledNavbar = styled.div`
	display: flex;
	align-items: center;
	gap: 15vw;
`;

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<StyledNavbar>
			<Button
				className="borderless"
				onClick={() => {
					navigate("/");
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
		</StyledNavbar>
	);
};

export default Navbar;
