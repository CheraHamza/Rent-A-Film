import styled from "styled-components";

const StyledLoader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;

	h1 {
		color: rgb(255, 255, 255, 0.8);
	}

	.pulsesWrapper {
		display: flex;
		justify-content: center;
		gap: 20px;
	}

	.pulse-dot {
		width: 20px;
		height: 20px;
		background: rgb(255, 255, 255, 0.8);
		border-radius: 50%;
		animation: pulse 1.5s ease-in-out infinite;
	}

	.pulse-dot:nth-child(2) {
		animation-delay: 0.2s;
	}
	.pulse-dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.5);
			opacity: 0.8;
		}
	}
`;

const Loader = () => {
	return (
		<StyledLoader>
			<div className="pulsesWrapper">
				<div class="pulse-dot"></div>
				<div class="pulse-dot"></div>
				<div class="pulse-dot"></div>
			</div>
			<h1>Loading</h1>
		</StyledLoader>
	);
};

export default Loader;
