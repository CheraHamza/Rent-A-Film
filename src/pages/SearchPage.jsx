import styled from "styled-components";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetchData } from "../utils/Fetch";
import Searchbar from "../components/Searchbar";
import MovieCard from "../components/MovieCard";
import Button from "../components/Button";
import { ChevronLeft, ChevronRight, SearchIcon, WindIcon } from "lucide-react";
import ContentPlaceholder from "../components/ContentPlaceholder";

const StyledSearchPage = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	flex-grow: 1;
`;

const PageIndicator = styled.div`
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: center;

	color: rgb(255, 255, 255, 0.8);

	padding-top: 20px;

	div {
		display: flex;
		align-items: center;
		gap: 10px;

		button {
			width: 25px;
			height: 25px;

			.lucide {
				width: 100%;
				height: 100%;
			}

			&.disabled {
				pointer-events: none;
				visibility: hidden;
			}
		}
	}
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;

	gap: 30px;

	padding: 30px;
`;

export default function SearchPage() {
	const { userData, setUserData } = useOutletContext();
	const [searchResults, setSearchResults] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();

	const [numberOfPages, setNumberOfPages] = useState(0);
	const [page, setPage] = useState(1);

	const query = searchParams.get("query");

	const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;

	const setSearchQuery = (value) => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			if (value) {
				newParams.set("query", value);
			} else {
				newParams.delete("query");
			}
			return newParams;
		});
	};

	const { fetchedData } = useFetchData(apiUrl);

	useEffect(() => {
		if (query) {
			if (fetchedData) {
				setSearchResults(fetchedData.results);
				setNumberOfPages(fetchedData.total_pages);
			}
		} else {
			setSearchResults([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchedData]);

	useEffect(() => {
		setPage(1);
	}, [query]);

	useEffect(() => {
		document.querySelector(".searchBar").focus();
	});

	const nextPage = () => {
		setPage(page + 1);
	};

	const previousPage = () => {
		setPage(page - 1);
	};

	return (
		<StyledSearchPage>
			<Searchbar
				searchQuery={query}
				setSearchQuery={setSearchQuery}
			></Searchbar>
			<PageIndicator>
				{searchResults.length > 0 && (
					<div>
						<Button
							title="Previous page"
							className={page === 1 ? "disabled borderless" : "borderless"}
							onClick={previousPage}
						>
							<ChevronLeft />
						</Button>

						<span>{`Page ${page}`}</span>

						<Button
							title="Next page"
							className={
								page >= numberOfPages ? "disabled borderless" : "borderless"
							}
							onClick={nextPage}
						>
							<ChevronRight />
						</Button>
					</div>
				)}
			</PageIndicator>
			<ContentWrapper>
				{searchResults.length > 0 &&
					searchResults.map((item) => (
						<MovieCard
							key={item.id}
							movieDetails={item}
							userData={userData}
							setUserData={setUserData}
						></MovieCard>
					))}
			</ContentWrapper>
			{query && searchResults.length <= 0 && (
				<ContentPlaceholder
					illustration={<WindIcon />}
					text={"Oops, no results found!"}
				/>
			)}
			{!query && (
				<ContentPlaceholder
					illustration={<SearchIcon />}
					text={"Search for a movie to get results!"}
				/>
			)}
		</StyledSearchPage>
	);
}
