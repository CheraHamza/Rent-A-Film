import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
const routes = [
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/catalog",
		element: <CatalogPage />,
	},
];

export default routes;
