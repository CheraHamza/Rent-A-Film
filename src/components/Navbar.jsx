import styled from "styled-components";

const StyledNavbar = styled.div`
	display: flex;
	align-items: center;
	gap: 15vw;
`;

const StyledButton = styled.button`
	font-family: "DM Serif Display";
	font-size: 18px;
	color: white;

	background-color: transparent;
	border: none;

	cursor: pointer;

	&:hover {
		color: #979797;
	}
`;

const Navbar = () => {
	return (
		<StyledNavbar>
			<StyledButton>Home</StyledButton>
			<StyledButton>Catalog</StyledButton>
			<StyledButton>WishList</StyledButton>
		</StyledNavbar>
	);
};

export default Navbar;
