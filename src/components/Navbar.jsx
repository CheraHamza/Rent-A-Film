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
				onClick={() => {
					navigate("/");
				}}
				text={"Home"}
			></Button>
			<Button
				onClick={() => {
					navigate("/catalog");
				}}
				text={"Catalog"}
			></Button>
			<Button
				onClick={() => {
					navigate("/wishlist");
				}}
				text={"Wishlist"}
			></Button>
		</StyledNavbar>
	);
};

export default Navbar;
