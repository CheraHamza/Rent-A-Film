import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import WishlistPage from "./pages/WishlistPage";

const StyledApp = styled.div``;

const App = () => {
	let params = useParams();

	let page = params.page;

	const pageContent =
		page === "home" ? (
			<HomePage />
		) : page === "catalog" ? (
			<CatalogPage />
		) : page === "wishlist" ? (
			<WishlistPage />
		) : null;

	return (
		<StyledApp>
			<Header onTop={page === "home"}></Header>
			{pageContent}
		</StyledApp>
	);
};

export default App;
