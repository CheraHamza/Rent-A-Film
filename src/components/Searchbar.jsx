import { SearchIcon } from "lucide-react";
import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";

const StyledSearchBar = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
`;

const Styledinput = styled.input`
	height: 100%;
	width: 100%;

	padding: 10px 60px;
	border: none;
	outline: none;

	background-color: rgb(255, 255, 255, 0.1);
	color: white;
`;

const Searchbar = ({ searchQuery, setSearchQuery }) => {
	const [inputValue, setInputValue] = useState(searchQuery);

	const onInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const onSearch = (e) => {
		if (e.key !== "Enter") return;
		setSearchQuery(inputValue);
	};

	return (
		<StyledSearchBar>
			<Styledinput
				className="searchBar"
				onChange={onInputChange}
				value={inputValue}
				placeholder="Search for a movie..."
				onKeyDown={onSearch}
			></Styledinput>
		</StyledSearchBar>
	);
};

export default Searchbar;
