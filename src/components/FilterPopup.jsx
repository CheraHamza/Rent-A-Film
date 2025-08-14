import styled from "styled-components";
import Button from "./Button";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFetchData } from "../utils/Fetch";

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

const FilterPopup = ({ filters, setFilters }) => {
	const { fetchedData } = useFetchData(
		`https://api.themoviedb.org/3/genre/movie/list?language=en`
	);
	const [availableGenres, setAvailableGenres] = useState([]);
	const sortFilters = ["Alphabetical", "Rating", "Release Date"];
	const orderFilters = ["Ascending", "Descending"];

	useEffect(() => {
		if (fetchedData) {
			let selectedGenres = filters.genres.map((genre) => genre.id);
			let availableGenres = fetchedData.genres.filter(
				(genre) => !selectedGenres.includes(genre.id)
			);
			setAvailableGenres(availableGenres);
		}
	}, [fetchedData, filters.genres]);

	const onSortFilterChange = (event) => {
		setFilters((prevData) => ({
			...prevData,
			sort: event.target.value,
		}));
	};

	const onOrderFilterChange = (event) => {
		setFilters((prevData) => ({
			...prevData,
			order: event.target.value,
		}));
	};

	return (
		<StyledFilterPopup>
			<Genres>
				<h1>Genres</h1>
				<div className="container">
					{filters.genres && (
						<>
							{filters.genres.map((genre) => (
								<GenreItem
									setFilters={setFilters}
									key={genre.id}
									genre={genre}
								></GenreItem>
							))}
						</>
					)}
					<CustomDropDown
						content={<Plus />}
						options={availableGenres && availableGenres}
						setFilters={setFilters}
					></CustomDropDown>
				</div>
			</Genres>
			<Sort>
				<h1>Sort By</h1>
				<StyledSelect onChange={onSortFilterChange}>
					<>
						{sortFilters.map((filter) => (
							<option
								selected={filter === filters.sort}
								key={filter}
								value={filter}
							>
								{filter}
							</option>
						))}
					</>
				</StyledSelect>
			</Sort>
			<Order onChange={onOrderFilterChange}>
				<h1>Order</h1>
				<StyledSelect>
					<>
						{orderFilters.map((filter) => (
							<option
								selected={filter === filters.order}
								key={filter}
								value={filter}
							>
								{filter}
							</option>
						))}
					</>
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

const GenreItem = ({ genre, setFilters }) => {
	const onRemove = () => {
		setFilters((prevData) => ({
			...prevData,
			genres: prevData.genres.filter((item) => item.id !== genre.id),
		}));
	};
	return (
		<StyledGenreItem>
			<GenreButton onClick={onRemove} className="reverse">
				<div className="genre">{genre.name}</div>
				<div className="removeGenre ">
					<X></X>
				</div>
			</GenreButton>
		</StyledGenreItem>
	);
};

const StyledCustomDropDown = styled.div`
	position: relative;
	width: 130px;

	display: flex;
	flex-direction: column;
	align-items: center;

	.optionContainer {
		width: 100%;
		height: 250px;

		overflow-x: hidden;
		overflow-y: auto;
		scrollbar-width: thin;

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

const CustomDropDown = ({ content, options, setFilters }) => {
	const [active, setActive] = useState(false);

	const toggleDropDown = () => {
		setActive(!active);
	};

	const onSelect = (genre) => {
		setFilters((prevData) => ({
			...prevData,
			genres: [...prevData.genres, genre],
		}));
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
						<DropDownOption
							onClick={() => {
								onSelect(option);
							}}
							id={option.id}
							key={option.id}
							className="reverse"
						>
							{option.name}
						</DropDownOption>
					))}
				</div>
			)}
		</StyledCustomDropDown>
	);
};

export default FilterPopup;
