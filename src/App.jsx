import styled from "styled-components";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { saveData, loadData } from "./utils/data.js";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer.jsx";

const StyledApp = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`;

const App = () => {
	const [userData, setUserData] = useState(loadData);

	let location = useLocation();
	const pathname = location.pathname;

	useEffect(() => {
		saveData(userData);
	}, [userData]);

	return (
		<>
			<StyledApp>
				<Header onTop={pathname === "/home"} userData={userData}></Header>
				<Outlet context={{ userData, setUserData }} />
			</StyledApp>
			<Footer />
		</>
	);
};

export default App;
