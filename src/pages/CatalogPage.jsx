import styled from "styled-components";
import Button from "../components/Button";
import Searchbar from "../components/Searchbar";
import { FilterIcon } from "lucide-react";
import MovieCard from "../components/MovieCard";
import { useFetchData } from "../utils/Fetch";
import { format } from "date-fns";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";

const StyledCatalogPage = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	flex-grow: 1;
`;

const FilterBar = styled.section`
	width: 100%;
	display: flex;
	justify-content: end;
	gap: 20px;

	padding: 10px 30px;
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

const CatalogPage = ({ data, setData, setMovieDetailView }) => {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);

	const { fetchedData, loading } = useFetchData(
		`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`
	);

	useEffect(() => {
		if (fetchedData) {
			setMovies((prevMovies) => [...prevMovies, ...fetchedData.results]);
		}
	}, [fetchedData]);

	return (
		<StyledCatalogPage>
			<FilterBar>
				<FilterButton>
					<StyledIcon></StyledIcon>
					Filters
				</FilterButton>
				<Searchbar></Searchbar>
			</FilterBar>
			{loading ? (
				<Loader></Loader>
			) : (
				<>
					<PostersWrapper>
						{movies.length > 0 &&
							movies.map((movieDetails) => (
								<MovieCard
									key={movieDetails.id}
									id={movieDetails.id}
									poster={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
									title={movieDetails.title}
									date={format(movieDetails.release_date, "MMM dd, yyyy")}
									rating={movieDetails.vote_average.toFixed(1)}
									data={data}
									setData={setData}
									setMovieDetailView={setMovieDetailView}
								></MovieCard>
							))}
					</PostersWrapper>
					{movies.length > 0 && (
						<LoadMoreButton
							onClick={() => {
								setPage(page + 1);
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

export default CatalogPage;
