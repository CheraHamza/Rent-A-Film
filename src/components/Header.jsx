import styled from "styled-components";

import logo from "/Icons/logo.svg";
import Navbar from "./Navbar";
import CartIcon from "./CartIcon";

const StyledHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px 30px;

	&.onTop {
		position: absolute;
		width: 100%;
		z-index: 99;
	}
`;

const StyledLogo = styled.img`
	width: 40px;
	height: 40px;
`;

const Header = ({ onTop = false }) => {
	return (
		<StyledHeader className={onTop ? "onTop" : ""}>
			<StyledLogo src={logo} alt="logo"></StyledLogo>
			<Navbar></Navbar>
			<CartIcon></CartIcon>
		</StyledHeader>
	);
};

export default Header;
