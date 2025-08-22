import styled from "styled-components";

const Button = styled.button`
	font-size: 18px;
	color: white;

	background-color: transparent;
	border: 1px solid white;

	cursor: pointer;

	transition: opacity 0.15s ease-in-out, color 0.15s ease-in-out,
		background-color 0.15s ease-in-out;

	&:hover {
		color: black;
		background-color: white;
	}

	&.borderless {
		border: none;

		&:hover {
			color: rgb(255, 255, 255, 0.5);
			background-color: transparent;
		}
	}

	&.reverse {
		color: black;
		background-color: white;

		&:hover {
			color: white;
			background-color: transparent;
		}
	}
`;

export default Button;
