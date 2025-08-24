const initData = {
	wishlist: [],
	cart: [],
};

function saveData(data) {
	localStorage.setItem("userData", JSON.stringify(data));
}

function loadData() {
	const data = localStorage.getItem("userData");
	return data ? JSON.parse(data) : initData;
}

export { saveData, loadData };
