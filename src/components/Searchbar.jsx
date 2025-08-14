import { SearchIcon } from "lucide-react";
import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const StyledButton = styled(Button)`
	width: 40px;
	height: 30px;

	padding: 3px;

	&:hover {
		border-left-color: black;
	}
`;

const StyledIcon = styled(SearchIcon)`
	width: 100%;
	height: 100%;
`;

const Searchbar = () => {
	const [inputValue, setInputValue] = useState("");

	const navigate = useNavigate();

	const onInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const onSearch = () => {
		navigate(`/catalog/search=${inputValue}`);
	};

	return (
		<StyledSearchBar>
			<Styledinput
				onChange={onInputChange}
				value={inputValue}
				placeholder="Search..."
			></Styledinput>
			<StyledButton onClick={onSearch}>
				<StyledIcon className="icon"></StyledIcon>
			</StyledButton>
		</StyledSearchBar>
	);
};

export default Searchbar;
