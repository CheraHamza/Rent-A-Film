import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import Searchbar from "../components/Searchbar";
import { FilterIcon } from "lucide-react";
import MovieCard from "../components/MovieCard";
import { useFetchData } from "../utils/Fetch";
import { format } from "date-fns";

const StyledCatalogPage = styled.div``;

const MainSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;

	padding-block: 20px;
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
					<FilterButton>
						<StyledIcon></StyledIcon>
						Filters
					</FilterButton>
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
				{data && <LoadMoreButton>Load More</LoadMoreButton>}
			</MainSection>
		</StyledCatalogPage>
	);
};

export default CatalogPage;
