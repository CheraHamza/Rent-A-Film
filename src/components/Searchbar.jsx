import { SearchIcon } from "lucide-react";
import styled from "styled-components";

const StyledSearchBar = styled.div`
	display: flex;
	align-items: center;
`;

const Styledinput = styled.input.attrs({ type: "search" })`
	height: 30px;
	width: 250px;

	padding: 10px;
	border: none;
	outline: none;
`;

const StyledButton = styled.button`
	width: 30px;
	height: 30px;
	background-color: transparent;
	border: 1px solid white;

	padding: 3px;
	cursor: pointer;

	transition: all 0.15s ease-in-out;

	&:hover {
		background-color: white;
		border-left-color: black;

		.lucide-search {
			color: black;
		}
	}
`;

const StyledIcon = styled(SearchIcon)`
	width: 100%;
	height: 100%;
	color: white;

	transition: all 0.15s ease-in-out;
`;

const Searchbar = () => {
	return (
		<StyledSearchBar>
			<Styledinput placeholder="Search..."></Styledinput>
			<StyledButton>
				<StyledIcon className="icon"></StyledIcon>
			</StyledButton>
		</StyledSearchBar>
	);
};

export default Searchbar;
