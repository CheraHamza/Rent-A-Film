import styled from "styled-components";

const StyledFooter = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;

	padding: 30px;

	color: rgb(255, 255, 255, 0.8);
	background-color: transparent;

	.attribution {
		display: flex;
		gap: 20px;
	}

	img {
		width: 40px;
		height: auto;
	}

	p.attribution_notice {
		text-align: justify;
		max-width: 300px;
		font-size: 12px;
	}

	.note {
		font-size: 10px;
	}
`;

const Footer = () => {
	return (
		<StyledFooter>
			<div className="note">
				* : This website is not a real product and is built for learning
				purposes only.
			</div>
			<div className="attribution">
				<img
					src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
					alt=""
				/>
				<p className="attribution_notice">
					This website uses TMDB and the TMDB APIs but is not endorsed,
					certified, or otherwise approved by TMDB.
				</p>
			</div>
		</StyledFooter>
	);
};

export default Footer;
