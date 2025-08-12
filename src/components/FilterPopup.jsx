import styled from "styled-components";
import Button from "./Button";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

const StyledFilterPopup = styled.div`
	width: min(500px, 60vw);

	display: flex;
	flex-direction: column;
	gap: 20px;

	position: absolute;
	top: 105%;
	left: -150px;
	z-index: 99;

	padding: 20px;

	background-color: white;
	color: black;

	cursor: auto;

	h1 {
		text-align: start;
		width: 70px;
	}
`;

const Genres = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;

	.container {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 5px;

		padding: 10px;

		background-color: black;
	}
`;

const Sort = styled.div`
	display: flex;
	align-items: center;
`;

const Order = styled.div`
	display: flex;
	align-items: center;
`;

const StyledSelect = styled.select`
	width: 125px;

	outline: none;
	border: 1px solid black;
	padding: 2px 5px;
`;

const ApplyButton = styled(Button)`
	padding: 7px 70px;

	margin-left: auto;

	background-color: black;

	&:hover {
		border: 1px solid black;
	}
`;

const FilterPopup = ({
	genres,
	setGenres,
	sortFilter,
	setSortFilter,
	orderFilter,
	setOrderFilters,
}) => {
	const sortFilters = ["Alphabetical", "Rating", "Release Date"];
	const orderFilters = ["Ascending", "Descending"];

	return (
		<StyledFilterPopup>
			<Genres>
				<h1>Genres</h1>
				<div className="container">
					{genres && (
						<>
							{genres.map((genre) => (
								<GenreItem key={genre} genre={genre}></GenreItem>
							))}
						</>
					)}
					<CustomDropDown
						content={<Plus />}
						options={["Anime", "Drama", "Horror"]}
					></CustomDropDown>
				</div>
			</Genres>
			<Sort>
				<h1>Sort By</h1>
				<StyledSelect>
					{sortFilters && (
						<>
							{sortFilters.map((filter) => (
								<option key={filter} value={filter}>
									{filter}
								</option>
							))}
						</>
					)}
				</StyledSelect>
			</Sort>
			<Order>
				<h1>Order</h1>
				<StyledSelect>
					{orderFilters && (
						<>
							{orderFilters.map((filter) => (
								<option key={filter} value={filter}>
									{filter}
								</option>
							))}
						</>
					)}
				</StyledSelect>
			</Order>
			<ApplyButton>Apply</ApplyButton>
		</StyledFilterPopup>
	);
};

const StyledGenreItem = styled.div``;

const GenreButton = styled(Button)`
	position: relative;
	padding: 2px 20px;

	.removeGenre {
		visibility: hidden;

		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	&:hover {
		.genre {
			visibility: hidden;
		}

		.removeGenre {
			visibility: visible;

			.lucide {
				width: 100%;
				height: 100%;
			}
		}
	}
`;

const GenreItem = ({ genre }) => {
	return (
		<StyledGenreItem>
			<GenreButton className="reverse">
				<div className="genre">{genre}</div>
				<div className="removeGenre ">
					<X></X>
				</div>
			</GenreButton>
		</StyledGenreItem>
	);
};

const StyledCustomDropDown = styled.div`
	position: relative;
	width: 100px;

	display: flex;
	flex-direction: column;
	align-items: center;

	.optionContainer {
		width: 100%;
		position: absolute;
		top: 100%;

		display: flex;
		flex-direction: column;

		background-color: black;
		border: 1px solid black;
	}
`;

const StyledDropDownButton = styled(Button)`
	width: 100%;
	height: 28px;

	.lucide {
		width: 100%;
		height: 100%;
	}
`;

const DropDownOption = styled(Button)`
	width: 100%;
	font-size: 16px;
	padding: 5px;
`;

const CustomDropDown = ({ content, options, onSelect }) => {
	const [active, setActive] = useState(false);

	const toggleDropDown = () => {
		setActive(!active);
	};

	useEffect(() => {
		const dropdownBtn = document.querySelector("#dropdownBtn");
		document.addEventListener("click", (event) => {
			if (!dropdownBtn.contains(event.target)) {
				setActive(false);
			}
		});
	});

	return (
		<StyledCustomDropDown>
			<StyledDropDownButton
				onClick={toggleDropDown}
				className="reverse"
				id="dropdownBtn"
			>
				{content}
			</StyledDropDownButton>
			{active && (
				<div className="optionContainer">
					{options.map((option) => (
						<DropDownOption key={option} className="reverse">
							{option}
						</DropDownOption>
					))}
				</div>
			)}
		</StyledCustomDropDown>
	);
};

export default FilterPopup;
