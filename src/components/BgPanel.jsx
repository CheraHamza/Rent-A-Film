import styled from "styled-components";

const StyledPanel = styled.div`
	width: 100%;
	height: 100%;
`;

const StyledImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	filter: brightness(50%);
`;

const BgPanel = ({ backgroundImg }) => {
	return (
		<StyledPanel>
			<StyledImg src={backgroundImg}></StyledImg>
		</StyledPanel>
	);
};

export default BgPanel;
