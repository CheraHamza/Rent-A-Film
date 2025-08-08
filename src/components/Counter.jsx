import styled from "styled-components";
import { ChevronDown, ChevronUp } from "lucide-react";

const StyledCounter = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledButton = styled.button`
	width: 25px;
	height: 25px;
	background-color: transparent;
	border: none;
	color: black;

	cursor: pointer;

	&.disabled {
		cursor: not-allowed;
	}

	.lucide-chevron-up {
		transform: translateY(3px);
	}

	.lucide-chevron-down {
		transform: translateY(-3px);
	}

	&:hover .lucide {
		transform: translateY(0px);
	}

	.lucide {
		width: 100%;
		height: 100%;

		transition: all 0.15s ease-in-out;
	}
`;

const StyledCount = styled.p`
	font-size: 18px;
`;

const Counter = ({ count, setCount }) => {
	const increment = () => {
		if (count < 10) {
			setCount(count + 1);
		}
	};

	const decrement = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};

	return (
		<StyledCounter>
			<StyledButton
				className={count === 10 ? "disabled" : ""}
				onClick={increment}
			>
				<ChevronUp />
			</StyledButton>
			<StyledCount>{count}</StyledCount>
			<StyledButton
				className={count === 1 ? "disabled" : ""}
				onClick={decrement}
			>
				<ChevronDown />
			</StyledButton>
		</StyledCounter>
	);
};

export default Counter;
