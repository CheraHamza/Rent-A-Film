import styled from "styled-components";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetchData } from "../utils/Fetch";
import { format } from "date-fns";
import Searchbar from "../components/Searchbar";
import MovieCard from "../components/MovieCard";

const StyledSearchPage = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	flex-grow: 1;
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
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchedData]);

	useEffect(() => {
		setPage(1);
	}, [query]);

	return (
		<StyledSearchPage>
			<Searchbar
				searchQuery={query}
				setSearchQuery={setSearchQuery}
			></Searchbar>
			<ContentWrapper>
				{searchResults.length > 0 &&
					searchResults.map((item) => (
						<MovieCard
							key={item.id}
							id={item.id}
							poster={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
							title={item.title}
							date={
								item.release_date === ""
									? "no date!"
									: format(item.release_date, "MMM dd, yyyy")
							}
							rating={item.vote_average.toFixed(1)}
							userData={userData}
							setUserData={setUserData}
						></MovieCard>
					))}
			</ContentWrapper>
		</StyledSearchPage>
	);
}
