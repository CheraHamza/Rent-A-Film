import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import WishlistPage from "./pages/WishlistPage";
import { useState } from "react";
import { data as initialData } from "./utils/data.js";

const StyledApp = styled.div``;

const App = () => {
	const [data, setData] = useState(initialData);

	let params = useParams();

	let page = params.page;

	const pageContent =
		page === "home" ? (
			<HomePage />
		) : page === "catalog" ? (
			<CatalogPage data={data} setData={setData} />
		) : page === "wishlist" ? (
			<WishlistPage data={data} setData={setData} />
		) : null;

	return (
		<StyledApp>
			<Header onTop={page === "home"} data={data}></Header>
			{pageContent}
		</StyledApp>
	);
};

export default App;
