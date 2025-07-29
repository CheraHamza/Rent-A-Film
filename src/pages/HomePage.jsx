import Header from "../components/Header";
import styled from "styled-components";

import bg_1 from "/Images/image_1.jpg";
import bg_2 from "/Images/image_2.jpg";
import bg_3 from "/Images/image_3.jpg";
import bg_4 from "/Images/image_4.jpg";
import bg_5 from "/Images/image_5.jpg";

const StyledHomePage = styled.div`
	width: 100%;
	height: 100%;

	position: relative;

	.header {
		position: absolute;
		width: 100%;
		z-index: 99;
	}
`;

const FrameWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const Frame = styled.div`
	width: 100%;
	height: 90vh;
	background-image: url(${(props) => props.$backgroundImg});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	background-color: #000000be;
	background-blend-mode: darken;
`;

function HomePage() {
	return (
		<StyledHomePage>
			<Header></Header>
			<FrameWrapper>
				<Frame $backgroundImg={bg_1}></Frame>
				<Frame $backgroundImg={bg_2}></Frame>
				<Frame $backgroundImg={bg_3}></Frame>
				<Frame $backgroundImg={bg_4}></Frame>
				<Frame $backgroundImg={bg_5}></Frame>
			</FrameWrapper>
		</StyledHomePage>
	);
}

export default HomePage;
