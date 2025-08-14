import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const StyledErrorPage = styled.div`
	height: 100vh;
	width: 100%;

	display: flex;
	flex-direction: column;

	align-items: center;
	justify-content: center;
	gap: 30px;

	color: white;

	h1 {
		font-size: 30px;
	}

	i {
		color: rgb(255, 255, 255, 0.6);
	}
`;

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<StyledErrorPage id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</StyledErrorPage>
	);
}
