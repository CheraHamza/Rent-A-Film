import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import WishlistPage from "./pages/WishlistPage";
import { useEffect, useState } from "react";
import { data as initialData } from "./utils/data.js";
import MoviePage from "./pages/MoviePage.jsx";
import CartPage from "./pages/CartPage.jsx";

const StyledApp = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`;

const App = () => {
	const [data, setData] = useState(initialData);
	const [catalog, setCatalog] = useState([]);
	const [search, setSearch] = useState("");
	const [pages, setPages] = useState(1);
	const [query, setQuery] = useState("");

	const [filters, setFilters] = useState({
		genres: [],
		sort: "Alphabetical",
		order: "Ascending",
	});

	const [movieDetailView, setMovieDetailView] = useState({
		id: null,
		title: null,
	});

	let params = useParams();
	let url = params["*"];

	useEffect(() => {
		const urlElement = url.split("/");
		if (urlElement[0] === "movie") {
			let id = Number(urlElement[1]);
			let title = urlElement[2];

			if (Number.isInteger(id) && title) {
				setMovieDetailView({
					id,
					title,
				});
			}
		}
	}, [url]);

	useEffect(() => {
		const urlElements = url.split("/");
		if (urlElements[0] === "catalog") {
			if (urlElements[1]) {
				const searchElement = urlElements[1].split("=");
				if (searchElement[0] === "search") {
					setSearch(searchElement[1]);
				}
			}
		}
	}, [url]);

	useEffect(() => {
		let query = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pages}`;

		setCatalog([]);
		setPages(1);

		if (search) {
			query = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${pages}`;
		}
		setQuery(query);
	}, [search, pages]);

	const pageContent =
		url === "home" ? (
			<HomePage />
		) : url === "catalog" || url === `catalog/search=${search}` ? (
			<CatalogPage
				data={data}
				setData={setData}
				catalog={catalog}
				setCatalog={setCatalog}
				pages={pages}
				setPages={setPages}
				query={query}
				filters={filters}
				setFilters={setFilters}
				movieDetailView={movieDetailView}
				setMovieDetailView={setMovieDetailView}
			/>
		) : url === "wishlist" ? (
			<WishlistPage
				data={data}
				setData={setData}
				movieDetailView={movieDetailView}
				setMovieDetailView={setMovieDetailView}
			/>
		) : url === `movie/${movieDetailView.id}/${movieDetailView.title}` ? (
			<MoviePage
				data={data}
				setData={setData}
				id={movieDetailView.id}
				movieDetailView={movieDetailView}
				setMovieDetailView={setMovieDetailView}
			/>
		) : url === "cart" ? (
			<CartPage data={data} setData={setData} />
		) : null;

	return (
		<StyledApp>
			<Header onTop={url === "home"} data={data}></Header>
			{pageContent}
		</StyledApp>
	);
};

export default App;
