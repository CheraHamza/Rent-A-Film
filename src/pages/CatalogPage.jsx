import styled from "styled-components";
import Button from "../components/Button";
import MovieCard from "../components/MovieCard";
import { useFetchData } from "../utils/Fetch";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import FiltersPanel from "../components/FiltersPanel";
import ContentPlaceholder from "../components/ContentPlaceholder";
import { WindIcon } from "lucide-react";

const StyledCatalogPage = styled.div`
	display: flex;
	align-items: center;

	flex-grow: 1;

	padding: 30px;
`;

const MainContainer = styled.section`
	display: flex;
	flex-grow: 1;
	gap: 20px;
`;

const FiltersWrapper = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const PostersWrapper = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;

	.posters {
		display: flex;
		flex-wrap: wrap;
		gap: 30px;
		justify-content: center;
	}

	.loadMore {
		width: 100%;

		display: flex;
		justify-content: center;
	}
`;

const LoadMoreButton = styled(Button)`
	width: min(90%, 400px);
	height: 45px;

	margin-block: 10px;
`;

const CatalogPage = () => {
	const { userData, setUserData } = useOutletContext();
	const [catalog, setCatalog] = useState([]);

	const [sortBy, setSortBy] = useState("vote_average.desc");
	const [genres, setGenres] = useState([]);
	const [language, setLanguage] = useState("");
	const [ratingRange, setRatingRange] = useState([0, 10]);
	const [minimumVotes, setMinimumVotes] = useState([0, 300]);
	const [runtimeRange, setRuntimeRange] = useState([0, 400]);

	const [numberOfPages, setNumberOfPages] = useState(0);
	const [page, setPage] = useState(1);

	const genre_ids = genres.map((genre) => genre.id).join(",");

	const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}&with_genres=${genre_ids}&vote_count.gte=${minimumVotes[1]}&with_original_language=${language}&vote_average.gte=${ratingRange[0]}&vote_average.lte=${ratingRange[1]}with_runtime.gte=${runtimeRange[0]}&with_runtime.lte=${runtimeRange[1]}`;

	const { fetchedData, loading, error } = useFetchData(apiUrl);

	useEffect(() => {
		if (error) {
			throw new Error(
				`${error.message}: an error has occurred while fetching movies.`
			);
		}
	}, [error]);

	useEffect(() => {
		if (fetchedData) {
			if (page === 1) {
				setCatalog(fetchedData.results);
			} else {
				setCatalog((prev) => [...prev, ...fetchedData.results]);
			}

			setNumberOfPages(fetchedData.total_pages);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchedData]);

	useEffect(() => {
		setPage(1);
	}, [genres, sortBy, language, ratingRange, minimumVotes]);

	const loadMore = () => {
		setPage((prev) => prev + 1);
	};

	return (
		<StyledCatalogPage>
			<MainContainer>
				<FiltersWrapper>
					<FiltersPanel
						genres={genres}
						setGenres={setGenres}
						sortby={sortBy}
						setSortBy={setSortBy}
						language={language}
						setLanguage={setLanguage}
						ratingRange={ratingRange}
						setRatingRange={setRatingRange}
						minimumVotes={minimumVotes}
						setMinimumVotes={setMinimumVotes}
						runtimeRange={runtimeRange}
						setRuntimeRange={setRuntimeRange}
					></FiltersPanel>
				</FiltersWrapper>
				{loading ? (
					<Loader />
				) : (
					<PostersWrapper>
						<div className="posters">
							{catalog.length > 0 &&
								catalog.map((movieDetails) => (
									<MovieCard
										key={movieDetails.id}
										userData={userData}
										setUserData={setUserData}
										movieDetails={movieDetails}
									></MovieCard>
								))}
						</div>
						<div className="loadMore">
							{numberOfPages > page && (
								<LoadMoreButton onClick={loadMore}>Load More</LoadMoreButton>
							)}
						</div>
					</PostersWrapper>
				)}
				{fetchedData && fetchedData.results.length <= 0 && (
					<ContentPlaceholder
						illustration={<WindIcon />}
						text={"Oops, no results found!"}
					/>
				)}
			</MainContainer>
		</StyledCatalogPage>
	);
};

export default CatalogPage;
