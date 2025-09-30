"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import AirbnbDetail from "../../components/airbnb/AirbnbDetail";

const AirbnbDetailPage = () => {
	const { id } = useParams();
	const [airbnb, setAirbnb] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAirbnb = async () => {
			const userToken = localStorage.getItem("authToken");
			if (!userToken) {
				throw new Error("Tenes que estar logueado para ver esta página");
			}

			const response = await fetch(
				`https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings/${id}`,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error("Error al obtener el airbnb");
			}

			const data = await response.json();

			if (data) {
				setAirbnb(data);
			} else {
				console.log("Airbnb no encontrado");
			}

			setLoading(false);
		};

		if (id) {
			fetchAirbnb();
		}
	}, [id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return <AirbnbDetail airbnb={airbnb} />;
};

export default AirbnbDetailPage;
