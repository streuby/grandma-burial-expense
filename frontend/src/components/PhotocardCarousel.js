import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopPhotocards } from "../actions/photocardActions";

const PhotocardCarousel = () => {
  const dispatch = useDispatch();

  const photocardTopRated = useSelector((state) => state.photocardTopRated);
  const { loading, error, photocards } = photocardTopRated;

  useEffect(() => {
    dispatch(listTopPhotocards());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-secondary">
      {photocards.map((photocard) => (
        <Carousel.Item key={photocard._id}>
          <Link to={`/photocard/${photocard._id}`}>
            <Image src={photocard.image} alt={photocard.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {photocard.name} (${photocard.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PhotocardCarousel;
