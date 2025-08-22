import styled from "styled-components";

const StyledFooter = styled.div`
	width: 100%;

	padding: 30px;

	display: flex;
	justify-content: center;
	gap: 20px;

	color: white;
	background-color: transparent;

	img {
		width: 40px;
		height: auto;
	}

	p.attribution_notice {
		color: rgb(255, 255, 255, 0.8);
		max-width: 300px;
		font-size: 12px;
	}
`;

const Footer = () => {
	return (
		<StyledFooter>
			<img
				src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
				alt=""
			/>
			<p className="attribution_notice">
				This website uses TMDB and the TMDB APIs but is not endorsed, certified,
				or otherwise approved by TMDB.
			</p>
		</StyledFooter>
	);
};

export default Footer;
