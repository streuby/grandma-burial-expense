import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  CDBCarousel,
  CDBCarouselItem,
  CDBCarouselInner,
  CDBView,
  CDBContainer,
} from "cdbreact";
import Loader from "./Loader";
import Message from "./Message";
import { listTopPhotocards } from "../actions/photocardActions";

const ProdutCdbCarousel = () => {
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
    <CDBContainer className="mt-5">
      <CDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={false}
        onHoverStop={true}
        className="z-depth-1 bg-img"
        mobileGesture={true}
        variant="dark"
        slide
      >
        <CDBCarouselInner>
          {photocards.map((photocard, index) => (
            <CDBCarouselItem key={photocard._id} itemId={index + 1}>
              <CDBView>
                <Link to={`/photocard/${photocard._id}`}>
                  <Image src={photocard.image} alt={photocard.name} fluid />
                  <Carousel.Caption variant="dark" className="carousel-caption">
                    <h2
                      style={{
                        color: "blue",
                        fontWeight: "bold",
                        textShadow:
                          "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
                      }}
                    >
                      {photocard.name}
                    </h2>
                  </Carousel.Caption>
                </Link>
              </CDBView>
            </CDBCarouselItem>
          ))}
        </CDBCarouselInner>
      </CDBCarousel>
    </CDBContainer>
  );
};

export default ProdutCdbCarousel;
