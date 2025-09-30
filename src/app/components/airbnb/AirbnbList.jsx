"use client";
import React from "react";
import { useState, useEffect } from "react";
import "./airbnblist.css";
import Link from "next/link";
import { FaHeart, FaHome } from "react-icons/fa";

const AirbnbList = () => {
	const [loading, setLoading] = useState(true);
	const [airbnbs, setAirbnbs] = useState([]);
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		const storedFavorites = localStorage.getItem("favorites");
		if (storedFavorites) {
			setFavorites(JSON.parse(storedFavorites));
		}
	}, []);

	useEffect(() => {
		const fetchAirbnbs = async () => {
			const userToken = localStorage.getItem("authToken");
			if (!userToken) {
				throw new Error("Token de usuario no encontrado");
			}

			const response = await fetch(
				"https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings?pageSize=100&page=1",
				{
					headers: { Authorization: `Bearer ${userToken}` },
				}
			);

			if (!response.ok) {
				throw new Error("Error al obtener los airbnbs");
			}

			const data = await response.json();
			setAirbnbs(data);
			setLoading(false);
		};

		fetchAirbnbs();
	}, []);

	const toggleFavorite = (id) => {
		const isFavorite = favorites.includes(id);
		const newFavorites = isFavorite
			? favorites.filter((favId) => favId !== id)
			: [...favorites, id];

		setFavorites(newFavorites);
		localStorage.setItem("favorites", JSON.stringify(newFavorites));
	};

	if (loading) {
		return <p className="loading-text">Cargando...</p>;
	}

	return (
		<div className="airbnb-page">
			<div className="airbnb-container">
				<div className="airbnb-header">
					<h1 className="airbnb-title">Listado de Airbnb</h1>
					<h3 className="airbnb-subtitle">
						Los mejores alojamientos para vos!
					</h3>
				</div>
				<div>
					<ul className="airbnb-grid">
						{airbnbs.map((airbnb) => {
							const isFavorite = favorites.includes(airbnb._id);

							return (
								<li key={airbnb._id} className="airbnb-card">
									{airbnb.images.picture_url ? (
										<div className="airbnb-image-container">
											<img
												src={airbnb.images.picture_url}
												alt={airbnb.name}
												className="airbnb-image"
											/>
										</div>
									) : (
										<p className="airbnb-image-placeholder">
											<FaHome />
										</p>
									)}
									<div className="airbnb-content">
										<button
											onClick={() => toggleFavorite(airbnb._id)}
											className="favorite-button"
										>
											<FaHeart
												className={`favorite-icon ${
													isFavorite ? "favorited" : "not-favorited"
												}`}
											/>
										</button>
										<Link href={`/airbnb/${airbnb._id}`}>
											<h2 className="airbnb-name">{airbnb.name}</h2>
										</Link>
										<p className="airbnb-summary">{airbnb.summary}</p>
										<Link
											href={airbnb.listing_url}
											target="_blank"
											className="airbnb-url"
										>
											Ver más
										</Link>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default AirbnbList;
