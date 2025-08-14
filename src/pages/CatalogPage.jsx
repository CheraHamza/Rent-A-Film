import styled from "styled-components";
import Button from "../components/Button";
import Searchbar from "../components/Searchbar";
import { FilterIcon } from "lucide-react";
import MovieCard from "../components/MovieCard";
import { useFetchData } from "../utils/Fetch";
import { format } from "date-fns";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import FilterPopup from "../components/FilterPopup";

const StyledCatalogPage = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	flex-grow: 1;
`;

const StyledIcon = styled(FilterIcon)`
	height: 90%;
	width: 90%;
`;

const PostersWrapper = styled.section`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 30px;

	padding: 20px 30px;
`;

const LoadMoreButton = styled(Button)`
	width: 400px;
	height: 45px;

	margin-block: 20px;
`;

const CatalogPage = ({
	data,
	setData,
	catalog,
	setCatalog,
	pages,
	setPages,
	query,
	filters,
	setFilters,
	setMovieDetailView,
}) => {
	const { fetchedData, loading } = useFetchData(query);
	const [filteredCatalog, setFilteredCatalog] = useState(catalog);

	useEffect(() => {
		if (fetchedData) {
			console.log(fetchedData);

			setCatalog((prevMovies) => [...prevMovies, ...fetchedData.results]);
		}
	}, [fetchedData, setCatalog]);

	useEffect(() => {
		let selectedGenres;
		let matchesSelectedGenres = [];
		if (filters.genres.length > 0) {
			selectedGenres = filters.genres.map((genre) => genre.id);

			catalog.forEach((item) => {
				const movieGenres = item.genre_ids;
				if (selectedGenres.every((genre) => movieGenres.includes(genre))) {
					matchesSelectedGenres.push(item);
					return;
				}
			});
			console.log(matchesSelectedGenres);

			setFilteredCatalog(matchesSelectedGenres);
		} else {
			setFilteredCatalog(catalog);
		}
	}, [filters.genres, catalog]);

	return (
		<StyledCatalogPage>
			<FilterBar
				filters={filters}
				setFilters={setFilters}
			></FilterBar>
			{loading ? (
				<Loader></Loader>
			) : (
				<>
					<PostersWrapper>
						{filteredCatalog.length > 0 &&
							filteredCatalog.map((movieDetails) => (
								<MovieCard
									key={movieDetails.id}
									id={movieDetails.id}
									poster={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
									title={movieDetails.title}
									date={
										movieDetails.release_date === ""
											? "no date!"
											: format(movieDetails.release_date, "MMM dd, yyyy")
									}
									rating={movieDetails.vote_average.toFixed(1)}
									data={data}
									setData={setData}
									setMovieDetailView={setMovieDetailView}
								></MovieCard>
							))}
					</PostersWrapper>
					{filteredCatalog.length > 0 && (
						<LoadMoreButton
							onClick={() => {
								setPages(pages + 1);
							}}
						>
							Load More
						</LoadMoreButton>
					)}
				</>
			)}
		</StyledCatalogPage>
	);
};

const StyledFilterBar = styled.section`
	width: 100%;
	display: flex;
	justify-content: end;
	gap: 20px;

	padding: 10px 30px;

	.filtersWrapper {
		position: relative;
	}
`;

const FilterButton = styled(Button)`
	height: 30px;

	display: flex;
	align-items: center;
	gap: 5px;

	border: none;

	font-family: "Playfair Display";
	font-size: 16px;
	letter-spacing: 1px;
	padding: 5px 10px;

	&.active {
		background-color: white;
		color: black;
	}
`;

const FilterBar = ({
	filters,
	setFilters,
}) => {
	const [active, setActive] = useState(false);

	const toggleActive = () => {
		setActive(!active);
	};

	useEffect(() => {
		const filtersWrapper = document.querySelector(".filtersWrapper");

		document.addEventListener("click", (event) => {
			if (!filtersWrapper.contains(event.target)) {
				setActive(false);
			}
		});
	});

	return (
		<StyledFilterBar>
			<div className="filtersWrapper">
				<FilterButton onClick={toggleActive} className={active ? "active" : ""}>
					<StyledIcon></StyledIcon>
					Filters
				</FilterButton>
				{active && (
					<FilterPopup filters={filters} setFilters={setFilters}></FilterPopup>
				)}
			</div>
			<Searchbar
			></Searchbar>
		</StyledFilterBar>
	);
};

export default CatalogPage;
