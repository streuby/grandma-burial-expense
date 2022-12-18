import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Photocard = ({ photocard }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/photocard/${photocard._id}`} alt="">
        <Card.Img src={photocard.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/photocard/${photocard._id}`}>
          <Card.Title as="div">
            <strong>{photocard.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={photocard.rating}
            text={`${photocard.numReviews} messages`}
          />
        </Card.Text>
        <Card.Text as="div"></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Photocard;
