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

	const pageContent =
		url === "home" ? (
			<HomePage />
		) : url === "catalog" ? (
			<CatalogPage
				data={data}
				setData={setData}
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
