import styled from "styled-components";
import Button from "./Button";
import { useNavigate, useLocation } from "react-router-dom";
import { HouseIcon, CompassIcon, LibraryIcon, SearchIcon } from "lucide-react";

const StyledNavbar = styled.div`
	display: flex;
	align-items: center;
	gap: 50px;
`;

const NavButton = styled(Button)`
	width: 50px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	padding: 5px;

	border: none;
	border-radius: 3px;

	opacity: 0.5;

	.lucide {
		width: 20px;
	}

	span {
		font-size: 12px;
	}

	&:hover {
		background-color: rgb(255, 255, 255, 0.5);
		color: black;
		opacity: 1;
	}

	&.active {
		color: white;
		opacity: 1;
	}
`;

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const pathname = location.pathname.split("/")[1];

	return (
		<StyledNavbar>
			<NavButton
				className={pathname === "home" ? "active" : ""}
				title="Home"
				onClick={() => {
					navigate("/home");
				}}
			>
				<HouseIcon />
				<span>Home</span>
			</NavButton>
			<NavButton
				className={pathname === "catalog" ? "active" : ""}
				title="Catalog"
				onClick={() => {
					navigate("/catalog");
				}}
			>
				<CompassIcon />
				<span>Catalog</span>
			</NavButton>
			<NavButton
				className={pathname === "wishlist" ? "active" : ""}
				title="Wishlist"
				onClick={() => {
					navigate("/wishlist");
				}}
			>
				<LibraryIcon />
				<span>Wishlist</span>
			</NavButton>
			<NavButton
				className={pathname === "search" ? "active" : ""}
				title="Find"
				onClick={() => {
					navigate("/search");
				}}
			>
				<SearchIcon />
				<span>Find</span>
			</NavButton>
		</StyledNavbar>
	);
};

export default Navbar;
