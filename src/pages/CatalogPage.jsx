import styled from "styled-components";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import { FilterIcon } from "lucide-react";

const StyledCatalogPage = styled.div``;

const MainSection = styled.section``;

const FilterBar = styled.section`
	display: flex;
	justify-content: end;
	gap: 20px;

	padding: 10px 30px;
`;

const StyledButton = styled.button`
	height: 30px;

	display: flex;
	align-items: center;
	gap: 5px;

	color: white;
	background-color: transparent;
	border: none;

	font-size: 16px;
	letter-spacing: 1px;
	padding: 5px 10px;

	cursor: pointer;

	transition: all 0.15s ease-in-out;

	&:hover {
		background-color: white;
		color: black;
	}
`;

const StyledIcon = styled(FilterIcon)`
	height: 90%;
	width: 90%;
`;

const PostersWrapper = styled.section`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;

	padding: 20px 30px;
`;

const CatalogPage = () => {
	return (
		<StyledCatalogPage>
			<Header></Header>
			<MainSection>
				<FilterBar>
					<StyledButton>
						<StyledIcon></StyledIcon>
						Filters
					</StyledButton>
					<Searchbar></Searchbar>
				</FilterBar>
				<PostersWrapper>
					<img src="https://placehold.co/180x300" alt="" />
					<img src="https://placehold.co/180x300" alt="" />
					<img src="https://placehold.co/180x300" alt="" />
					<img src="https://placehold.co/180x300" alt="" />
					<img src="https://placehold.co/180x300" alt="" />
				</PostersWrapper>
			</MainSection>
		</StyledCatalogPage>
	);
};

export default CatalogPage;
