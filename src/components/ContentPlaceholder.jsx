import styled from "styled-components";

const Placeholder = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;

	color: white;
	opacity: 0.6;

	.lucide {
		width: 100px;
		height: 100px;
	}
`;

const ContentPlaceholder = ({ illustration, text }) => {
	return (
		<Placeholder>
			{illustration}
			<p>{text}</p>
		</Placeholder>
	);
};

export default ContentPlaceholder;
