import { Navigate } from "react-router-dom";
import App from "./App";
import CartPage from "./pages/CartPage";
import CatalogPage from "./pages/CatalogPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import WishlistPage from "./pages/WishlistPage";

const routes = [
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Navigate to="/home" replace />,
			},
			{
				path: "home",
				element: <HomePage />,
			},
			{
				path: "catalog",
				element: <CatalogPage />,
			},
			{
				path: "wishlist",
				element: <WishlistPage />,
			},
			{
				path: "cart",
				element: <CartPage />,
			},
			{
				path: "movie",
				element: <MoviePage />,
			},
		],
	},
];

export default routes;
