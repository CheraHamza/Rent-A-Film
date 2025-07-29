import styled from "styled-components";

const StyledButton = styled.button`
	font-family: "DM Serif Display";
	font-size: 18px;
	color: white;

	background-color: transparent;
	border: none;

	cursor: pointer;

	transition: all 0.15s ease-in-out;

	&:hover {
		color: #979797;
	}
`;

const Button = ({ text, onClick }) => {
	return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default Button;
