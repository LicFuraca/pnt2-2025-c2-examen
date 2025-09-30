import React from "react";
import "./airbnblist.css";

const AirbnbDetail = ({ airbnb }) => {
	return (
		<div className="airbnb-page">
			<div className="airbnb-detail-container">
				<h2 className="airbnb-detail-title">{airbnb.name}</h2>
				<div className="airbnb-detail-content">
					{airbnb.images.picture_url && (
						<div className="airbnb-detail-image-container">
							<img
								src={airbnb.images.picture_url}
								alt={airbnb.name}
								className="airbnb-detail-image"
							/>
						</div>
					)}
					<p className="airbnb-detail-summary">{airbnb.summary}</p>
				</div>
			</div>
		</div>
	);
};

export default AirbnbDetail;
