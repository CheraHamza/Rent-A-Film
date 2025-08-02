import styled from "styled-components";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import { FilterIcon } from "lucide-react";
import MovieCard from "../components/MovieCard";
import { useFetchData } from "../utils/Fetch";
import { format } from "date-fns";

const StyledCatalogPage = styled.div``;

const MainSection = styled.section``;

const FilterBar = styled.section`
	display: flex;
	justify-content: end;
	gap: 20px;

	padding: 10px 30px;
`;

const StyledButton = styled.button`
	height: 30px;

	display: flex;
	align-items: center;
	gap: 5px;

	color: white;
	background-color: transparent;
	border: none;

	font-size: 16px;
	letter-spacing: 1px;
	padding: 5px 10px;

	cursor: pointer;

	transition: all 0.15s ease-in-out;

	&:hover {
		background-color: white;
		color: black;
	}
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

const CatalogPage = () => {
	const { data } = useFetchData(
		"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
	);

	return (
		<StyledCatalogPage>
			<Header></Header>
			<MainSection>
				<FilterBar>
					<StyledButton>
						<StyledIcon></StyledIcon>
						Filters
					</StyledButton>
					<Searchbar></Searchbar>
				</FilterBar>
				<PostersWrapper>
					{data &&
						data.results.map((movieDetails) => (
							<MovieCard
								key={movieDetails.id}
								id={movieDetails.id}
								poster={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
								title={movieDetails.title}
								date={format(movieDetails.release_date, "MMM dd, yyyy")}
								rating={movieDetails.vote_average.toFixed(2)}
							></MovieCard>
						))}
				</PostersWrapper>
			</MainSection>
		</StyledCatalogPage>
	);
};

export default CatalogPage;
