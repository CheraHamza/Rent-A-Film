import styled from "styled-components";

const StyledButton = styled.button`
	font-family: "DM Serif Display";
	font-size: 18px;
	color: white;

	background-color: transparent;
	border: none;

	cursor: pointer;

	&:hover {
		color: #979797;
	}
`;

const Button = ({ text }) => {
	return <StyledButton>{text}</StyledButton>;
};

export default Button;
