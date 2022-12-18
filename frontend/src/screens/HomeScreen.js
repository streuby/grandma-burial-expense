import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Photocard from "../components/Photocard";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProdutCdbCarousel from "../components/PhotocardCdbCarousel";
import Meta from "../components/Meta";
import { listPhotocards } from "../actions/photocardActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams();
  const { pageNumber } = useParams() || 1;

  const photocardList = useSelector((state) => state.photocardList);
  const { loading, error, photocards, page, pages } = photocardList;

  useEffect(() => {
    dispatch(listPhotocards(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Container className="mt-5">
      <Meta />
      {!keyword ? (
        <ProdutCdbCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Mrs. Lydia Ikachi Obajes's Funeral Photocards</h1>
      <strong>(1930 - Dec. 12th, 2022)</strong>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {photocards.map((photocard) => (
              <Col key={photocard._id} sm={12} md={6} lg={4} xl={3}>
                <Photocard photocard={photocard} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </Container>
  );
};

export default HomeScreen;
