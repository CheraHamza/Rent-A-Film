import styled from "styled-components";
import Button from "./Button";

const StyledNavbar = styled.div`
	display: flex;
	align-items: center;
	gap: 15vw;
`;

const Navbar = () => {
	return (
		<StyledNavbar>
			<Button text={"Home"}></Button>
			<Button text={"Catalog"}></Button>
			<Button text={"Wishlist"}></Button>
		</StyledNavbar>
	);
};

export default Navbar;
