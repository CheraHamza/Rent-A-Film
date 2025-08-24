import { FrownIcon, HomeIcon } from "lucide-react";
import { useNavigate, useRouteError } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

const StyledErrorPage = styled.div`
	height: 100vh;
	width: 100%;

	display: flex;
	flex-direction: column;

	align-items: center;
	justify-content: center;
	gap: 30px;

	color: white;

	& > .lucide {
		width: 100px;
		height: 100px;
		color: rgb(255, 255, 255, 0.6);
	}

	i {
		color: rgb(255, 255, 255, 0.6);
	}
`;

const StyledButton = styled(Button)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 5px;

	padding: 10px 20px;

	margin-top: 20px;

	border: none;
	border-bottom: 2px solid white;

	font-size: 16px;

	.lucide {
		width: 20px;
		height: 20px;
	}

	&:hover {
		background-color: white;
		color: black;
	}
`;

export default function ErrorPage() {
	const error = useRouteError();
	const navigate = useNavigate();

	console.error(error);

	return (
		<StyledErrorPage id="error-page">
			<FrownIcon />
			<p>Oops, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
			<StyledButton
				onClick={() => {
					navigate("/");
				}}
			>
				<HomeIcon />
				Home Page
			</StyledButton>
		</StyledErrorPage>
	);
}
