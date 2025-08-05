import styled from "styled-components";
import Button from "../components/Button";
import { SortAsc, SortDesc } from "lucide-react";
import Searchbar from "../components/Searchbar";
import { useState } from "react";
import { getWishlist } from "../utils/data.js";
import MovieCard from "../components/MovieCard.jsx";

const StyledWishList = styled.div``;

const SortBar = styled.section`
	width: 100%;
	display: flex;
	justify-content: end;
	gap: 20px;

	padding: 10px 30px;
`;

const SortButton = styled(Button)`
	height: 30px;

	display: flex;
	align-items: center;
	gap: 5px;

	border: none;

	font-family: "Playfair Display";
	font-size: 16px;
	letter-spacing: 1px;
	padding: 5px 10px;

	.lucide {
		height: 90%;
		width: 90%;
	}
`;

const MainSection = styled.section`
	display: flex;
	flex-wrap: wrap;
	gap: 30px;

	padding: 20px 30px;
`;

const WishlistPage = () => {
	const [order, setOrder] = useState("Ascending");

	const sortToggle = () => {
		order === "Ascending" ? setOrder("Descending") : setOrder("Ascending");
	};

	let wishlist = getWishlist();

	return (
		<StyledWishList>
			<SortBar>
				{order === "Ascending" ? (
					<SortButton onClick={sortToggle}>
						<SortAsc></SortAsc>
						Ascending
					</SortButton>
				) : (
					<SortButton onClick={sortToggle}>
						<SortDesc></SortDesc>
						Descending
					</SortButton>
				)}

				<Searchbar></Searchbar>
			</SortBar>
			<MainSection>
				{wishlist.map((item) => (
					<MovieCard
						id={item.id}
						key={item.id}
						title={item.card_info.title}
						date={item.card_info.date}
						rating={item.card_info.rating}
						poster={item.card_info.poster_url}
					></MovieCard>
				))}
			</MainSection>
		</StyledWishList>
	);
};

export default WishlistPage;
