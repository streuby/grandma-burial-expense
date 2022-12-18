import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  Container,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  listPhotocardDetails,
  createPhotocardReview,
} from "../actions/photocardActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { addToCart } from "../actions/cartActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/photocardConstants";

const PhotocardScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const photocardDetails = useSelector((state) => state.photocardDetails);
  const { photocard, loading, error } = photocardDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const photocardReviewCreate = useSelector(
    (state) => state.photocardReviewCreate
  );
  const { success: successPhotocardReview, error: errorPhotocardReview } =
    photocardReviewCreate;

  useEffect(() => {
    if (successPhotocardReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listPhotocardDetails(id));
  }, [dispatch, successPhotocardReview, id]);

  const addToCartHandler = () => {
    dispatch(addToCart(id, qty));
    //navigate(`/cart/${id}?qty=${qty}`); react router v5
    // navigate({
    //   pathname: "/cart",
    //   search: `?${createSearchParams({
    //     id: id,
    //     qty: qty,
    //   })}`,
    // });

    navigate({
      pathname: "/cart",
      search: createSearchParams({
        id: id,
        qty: qty,
      }).toString(),
    });

    // navigate("/cart", {
    //   state: {
    //     id,
    //     qty,
    //   },
    //   search: createSearchParams({
    //     id: id,
    //     qty: qty,
    //   }).toString(),
    // });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPhotocardReview(id, { rating, comment }));
  };

  return (
    <Container className="mt-5">
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={photocard.name} />
          <Row>
            <Col md={6}>
              <Image src={photocard.image} alt={photocard.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{photocard.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={photocard.rating}
                    text={`${photocard.numReviews} messages`}
                  />
                </ListGroup.Item>
                {/* <ListGroup.Item>Price: ${photocard.price}</ListGroup.Item> */}
                <ListGroup.Item>
                  Caption: {photocard.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            {/* <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${photocard.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {photocard.countInStock > 0
                          ? "In Stock"
                          : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {photocard.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(photocard.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      variant="outline-dark"
                      type="button"
                      disabled={photocard.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col> */}
          </Row>
          <Row>
            <Col md={6}>
              <h2>Messages</h2>
              {photocard.reviews.length === 0 && <Message>No Messages</Message>}
              <ListGroup variant="flush">
                {photocard.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Leave a condolence message</h2>
                  {errorPhotocardReview && (
                    <Message variant="danger">{errorPhotocardReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="mb-3" controlId="rating">
                        <Form.Label>
                          Rate your experience with the deceased
                        </Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Was Good</option>
                          <option value="2">2 - Touched Meny lives</option>
                          <option value="3">
                            3 - Taught morals to the young and old
                          </option>
                          <option value="4">
                            4 - Served humanity with passion
                          </option>
                          <option value="5">
                            5 - Advanced God's Kingdom on earth
                          </option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="comment">
                        <Form.Label>Condolence message</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="outline-dark">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Plese <Link to="/login">Sign in</Link> to leave a message{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default PhotocardScreen;
