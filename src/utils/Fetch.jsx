import { useEffect, useState } from "react";

const useFetchData = (url) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
		const controller = new AbortController();

		const options = {
			method: "GET",
			mode: "cors",
			signal: controller.signal,
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${TMDB_API_KEY}`,
			},
		};

		const fetchData = async () => {
			try {
				const res = await fetch(url, options);

				if (res.status >= 400) {
					throw new Error("server error");
				}

				const data = await res.json();
				setData(data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		return () => {
			controller.abort();
		};
	}, [url]);

	return { data, error, loading };
};

export { useFetchData };
