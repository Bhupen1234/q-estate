import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import "./FeaturedListing.css";
const FeaturedListing = () => {
  const [listingData, setListingData] = useState([]);

  const fetchListings = async () => {
    try {
      let response = await axios.get(
        `${config.backendEndpoint}/real-estate-data`
      );
      let data = response.data.listings;
      setListingData(data.slice(0, 8));
    } catch (error) {
      console.error(error);
      setListingData([]);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);
  return (
    <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {listingData.length === 0 ? (
        <Grid item>
          <p className="error-message"> No Listing Data available</p>
        </Grid>
      ) : (
        listingData.map((ele, index) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`/assets/real-estate-${index}.jpg`}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="property-name"
                    >
                      {ele.property_name.slice(0, 6)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <div className="listing-detail">
                    <span className="property-price">Rs {ele.price}</span>
                    <span className="property-city">
                      {" "}
                      {ele.city.slice(0, 5)}
                    </span>
                  </div>
                </CardActions>
              </Card>
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

export default FeaturedListing;
