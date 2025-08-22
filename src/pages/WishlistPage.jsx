import styled from "styled-components";
import Button from "../components/Button";
import { SortAsc, SortDesc, WindIcon } from "lucide-react";
import { useState } from "react";
import MovieCard from "../components/MovieCard.jsx";
import { useOutletContext } from "react-router-dom";
import ContentPlaceholder from "../components/ContentPlaceholder.jsx";

const SortBar = styled.section`
	width: 100%;
	display: flex;
	justify-content: end;

	padding: 10px 30px;
`;

const SortButton = styled(Button)`
	height: 30px;

	display: flex;
	align-items: center;
	gap: 5px;

	border: none;

	font-size: 14px;
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
		<div>
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
						key={item.id}
						userData={userData}
						setUserData={setUserData}
						movieDetails={item}
					></MovieCard>
				))}
			</MainSection>
			{wishlist.length <= 0 && (
				<ContentPlaceholder
					illustration={<WindIcon />}
					text={"Wishlist is empty!"}
				/>
			)}
		</div>
	);
};

export default WishlistPage;
