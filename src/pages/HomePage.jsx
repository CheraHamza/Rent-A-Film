import styled from "styled-components";
import Button from "../components/Button";

import bg_1 from "/Images/image_1.jpg";
import bg_2 from "/Images/image_2.jpg";
import bg_3 from "/Images/image_3.jpg";
import bg_4 from "/Images/image_4.jpg";
import bg_5 from "/Images/image_5.jpg";
import { useNavigate } from "react-router-dom";

const StyledHomePage = styled.div`
	width: 100%;
	height: 100%;

	position: relative;
`;

const FrameWrapper = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
	gap: 10px;

	.lastFrame {
		gap: 100px;
	}
`;

const Frame = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	width: 100%;
	height: 100vh;
	background-image: url(${(props) => props.$backgroundImg});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	background-color: #000000be;
	background-blend-mode: darken;

	section {
		display: flex;
		flex-direction: column;
		gap: 30px;

		padding-left: 100px;
	}
`;

const StyledH1 = styled.h1`
	font-size: 80px;
	color: white;

	letter-spacing: -3px;
`;

const StyledParagraph = styled.p`
	color: white;

	font-style: italic;
	font-size: 20px;

	letter-spacing: 3px;
`;

const BrowseButton = styled(Button)`
	align-self: center;
	padding: 10px 20px;
`;

function HomePage() {
	const navigate = useNavigate();

	return (
		<StyledHomePage>
			<FrameWrapper>
				<Frame $backgroundImg={bg_1}>
					<section>
						<StyledH1>Lights.</StyledH1>
						<StyledH1>Stories.</StyledH1>
						<StyledH1>Silence.</StyledH1>
						<StyledParagraph>A Space for movies to breath.</StyledParagraph>
					</section>
				</Frame>
				<Frame $backgroundImg={bg_2}>
					<section>
						<StyledH1>Rent</StyledH1>
						<StyledH1>Films</StyledH1>
						<StyledH1>That</StyledH1>
						<StyledH1>Speak.</StyledH1>
					</section>
				</Frame>
				<Frame $backgroundImg={bg_3}>
					<section>
						<StyledH1>Curated</StyledH1>
						<StyledH1>Cinema.</StyledH1>
					</section>
				</Frame>
				<Frame $backgroundImg={bg_4}>
					<section>
						<StyledH1>Stories That Linger.</StyledH1>
						<StyledH1>Moments That Matter.</StyledH1>
					</section>
				</Frame>
				<Frame $backgroundImg={bg_5} className="lastFrame">
					<section>
						<StyledH1>Find Your Next Frame.</StyledH1>
						<StyledH1>Rent. Watch. Drift.</StyledH1>
					</section>
					<BrowseButton
						onClick={() => {
							navigate("/catalog");
						}}
					>
						Browse Catalog
					</BrowseButton>
				</Frame>
			</FrameWrapper>
		</StyledHomePage>
	);
}

export default HomePage;
