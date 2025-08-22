import styled from "styled-components";
import Header from "./components/Header";

import { useState } from "react";
import { userData as initUserData } from "./utils/data.js";
import { Outlet, useLocation } from "react-router-dom";

const StyledApp = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`;

const App = () => {
	const [userData, setUserData] = useState(initUserData);

	let location = useLocation();
	const pathname = location.pathname;

	return (
		<StyledApp>
			<Header onTop={pathname === "/home"} userData={userData}></Header>
			<Outlet context={{ userData, setUserData }} />
		</StyledApp>
	);
};

export default App;
