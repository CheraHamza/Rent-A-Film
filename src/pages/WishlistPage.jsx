import styled from "styled-components";
import Button from "../components/Button";
import { SortAsc, SortDesc } from "lucide-react";
import { useState } from "react";
import MovieCard from "../components/MovieCard.jsx";
import { useOutletContext } from "react-router-dom";

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
	const { userData, setUserData } = useOutletContext();
	const [order, setOrder] = useState("Newest");

	let wishlist =
		order === "Newest" ? [...userData.wishlist].reverse() : userData.wishlist;

	return (
		<StyledWishList>
			<SortBar>
				{order === "Newest" ? (
					<SortButton
						onClick={() => {
							setOrder("Oldest");
						}}
					>
						<SortAsc></SortAsc>
						Newest
					</SortButton>
				) : (
					<SortButton
						onClick={() => {
							setOrder("Newest");
						}}
					>
						<SortDesc></SortDesc>
						Oldest
					</SortButton>
				)}
			</SortBar>
			<MainSection>
				{wishlist.map((item) => (
					<MovieCard
						id={item.id}
						key={item.id}
						title={item.title}
						date={item.date}
						rating={item.rating}
						poster={item.poster_url}
						userData={userData}
						setUserData={setUserData}
					></MovieCard>
				))}
			</MainSection>
		</StyledWishList>
	);
};

export default WishlistPage;
