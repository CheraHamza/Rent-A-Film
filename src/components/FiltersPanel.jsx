import styled from "styled-components";
import Button from "./Button";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFetchData } from "../utils/Fetch";

const FiltersWrapper = styled.div`
	width: 300px;

	display: flex;
	flex-direction: column;
	gap: 30px;

	padding: 20px 20px 50px;

	background-color: white;
	color: black;

	cursor: auto;

	.title {
		font-size: 25px;
	}

	& > * > h1 {
		font-size: 18px;
		font-weight: 400;
	}
`;

const Sort = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;

	.container {
		p {
			font-size: 15px;
			font-weight: 200;

			padding-bottom: 5px;
		}
	}
`;

const StyledSelect = styled.select`
	outline: none;
	padding: 5px;
	border: none;
	border-radius: 0px;

	background-color: #ced4da;

	option {
		background-color: white;
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

const Languages = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const Rating = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const StyledRange = styled(RangeSlider)`
	.range-slider__thumb {
		color: white;
		background-color: black;

		border-radius: 3px;

		display: flex;
		justify-content: center;
		align-items: center;

		font-size: 12px;
		color: rgb(255, 255, 255, 0.8);
	}
	.range-slider__range {
		background-color: black;
	}
`;

const MinimumVotes = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;

	.range-slider__thumb[data-lower] {
		width: 0;
	}
	.range-slider__range {
		border-radius: 6px;
	}
`;

const Runtime = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const FiltersPanel = ({
	genres,
	setGenres,
	sortby,
	setSortBy,
	language,
	setLanguage,
	ratingRange,
	setRatingRange,
	minimumVotes,
	setMinimumVotes,
	runtimeRange,
	setRuntimeRange,
}) => {
	// sort filter
	const sortbyOptions = [
		{ name: "Popularity Descending", value: "popularity.desc" },
		{ name: "Popularity Ascending", value: "popularity.asc" },
		{ name: "Rating Descending", value: "vote_average.desc" },
		{ name: "Rating Ascending", value: "vote_average.asc" },
		{ name: "Release Date Descending", value: "primary_release_date.desc" },
		{ name: "Release Date Ascending", value: "primary_release_date.asc" },
		{ name: "Title (A - Z)", value: "title.asc" },
		{ name: "Title (Z - A)", value: "title.desc" },
	];

	const handleSortSelect = (e) => {
		setSortBy(e.target.value);
	};

	// genre filter
	const [availableGenres, setAvailableGenres] = useState([]);
	const { fetchedData: fetchedGenres, error: genresFetchError } = useFetchData(
		`https://api.themoviedb.org/3/genre/movie/list?language=en`
	);

	useEffect(() => {
		if (genresFetchError) {
			throw new Error(
				`${genresFetchError.message}: an error has occurred while fetching genre filters.`
			);
		}
	}, [genresFetchError]);

	const selectedGenres = genres;

	useEffect(() => {
		if (fetchedGenres) {
			let selectedGenresIds = selectedGenres.map((genre) => genre.id);
			let availableGenres = fetchedGenres.genres.filter(
				(genre) => !selectedGenresIds.includes(genre.id)
			);
			setAvailableGenres(availableGenres);
		}
	}, [fetchedGenres, selectedGenres]);

	const handleGenreSelect = (genre) => {
		setGenres((prev) => [...prev, genre]);
	};

	const handleGenreRemoval = (genre) => {
		setGenres((prev) => prev.filter((item) => item.id !== genre.id));
	};

	// language filter

	const [languageOptions, setLanguageOptions] = useState([]);

	const { fetchedData: fetchedLanguages, error: languagesFetchError } =
		useFetchData(`https://api.themoviedb.org/3/configuration/languages`);

	useEffect(() => {
		if (languagesFetchError) {
			throw new Error(
				`${languagesFetchError.message}: an error has occurred while fetching language filters.`
			);
		}
	}, [languagesFetchError]);

	useEffect(() => {
		if (fetchedLanguages) {
			let languages = fetchedLanguages.map((language) => {
				return { id: language.iso_639_1, name: language.english_name };
			});

			languages.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});

			setLanguageOptions(languages);
		}
	}, [fetchedLanguages]);

	const handleLanguageSelect = (e) => {
		setLanguage(e.target.value);
	};

	// rating filter

	useEffect(() => {
		const ratingSliderThumbs = document.querySelectorAll(
			".ratingSlider > .range-slider__thumb"
		);
		ratingSliderThumbs.forEach((thumb) => {
			if (thumb.hasAttribute("data-lower")) {
				thumb.textContent = ratingRange[0];
			} else {
				thumb.textContent = ratingRange[1];
			}
		});
	}, [ratingRange]);

	// minimum votes filter

	useEffect(() => {
		const votesSliderThumb = document.querySelector(
			".votesSlider > .range-slider__thumb[data-upper]"
		);

		votesSliderThumb.textContent = minimumVotes[1];
	}, [minimumVotes]);

	// runtime filter

	useEffect(() => {
		const runtimeSlider = document.querySelector(".runtimeSlider");
		runtimeSlider.title = `${runtimeRange[0]} minutes - ${runtimeRange[1]} minutes`;

		const runtimeSliderThumbs = document.querySelectorAll(
			".runtimeSlider > .range-slider__thumb"
		);
		runtimeSliderThumbs.forEach((thumb) => {
			if (thumb.hasAttribute("data-lower")) {
				thumb.textContent = runtimeRange[0];
			} else {
				thumb.textContent = runtimeRange[1];
			}
		});
	}, [runtimeRange]);

	return (
		<FiltersWrapper>
			<h1 className="title">Filters</h1>
			<Sort>
				<h1>Sort</h1>
				<div className="container">
					<p>Sort Results By</p>
					<StyledSelect onChange={handleSortSelect} defaultValue={sortby}>
						{sortbyOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.name}
							</option>
						))}
					</StyledSelect>
				</div>
			</Sort>
			<Genres>
				<h1>Genres</h1>
				<div className="container">
					{selectedGenres && (
						<>
							{selectedGenres.map((genre) => (
								<GenreItem
									onRemove={handleGenreRemoval}
									key={genre.id}
									genre={genre}
								></GenreItem>
							))}
						</>
					)}
					<CustomDropDown
						options={availableGenres && availableGenres}
						onSelect={handleGenreSelect}
					></CustomDropDown>
				</div>
			</Genres>
			<Languages>
				<h1>Language</h1>
				<div className="container">
					<StyledSelect onChange={handleLanguageSelect} defaultValue={language}>
						{languageOptions.length > 0 && (
							<>
								<option value={""}>None Selected</option>
								{languageOptions.map((option) => (
									<option key={option.id} value={option.id}>
										{option.name}
									</option>
								))}
							</>
						)}
					</StyledSelect>
				</div>
			</Languages>
			<Rating>
				<h1>Rating</h1>
				<div className="container">
					<StyledRange
						className="ratingSlider"
						value={ratingRange}
						onInput={setRatingRange}
						min={0}
						max={10}
					/>
				</div>
			</Rating>
			<MinimumVotes>
				<h1>Minimum Votes</h1>
				<StyledRange
					className="votesSlider"
					thumbsDisabled={[true, false]}
					rangeSlideDisabled={true}
					value={minimumVotes}
					onInput={setMinimumVotes}
					min={0}
					max={500}
					step={50}
				/>
			</MinimumVotes>
			<Runtime>
				<h1>Runtime</h1>
				<StyledRange
					className="runtimeSlider"
					value={runtimeRange}
					onInput={setRuntimeRange}
					min={0}
					max={400}
					step={10}
				/>
			</Runtime>
		</FiltersWrapper>
	);
};

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

const GenreItem = ({ genre, onRemove }) => {
	return (
		<div>
			<GenreButton
				onClick={() => {
					onRemove(genre);
				}}
				className="reverse"
			>
				<div className="genre">{genre.name}</div>
				<div className="removeGenre ">
					<X></X>
				</div>
			</GenreButton>
		</div>
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

		z-index: 99;
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

const CustomDropDown = ({ options, onSelect }) => {
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
				<Plus />
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

export default FiltersPanel;
