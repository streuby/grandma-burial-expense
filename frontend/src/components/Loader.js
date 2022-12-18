import React from "react";
import { Spinner, Container } from "react-bootstrap";

const Loader = () => {
  return (
    <Container className="mt-5">
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
          margin: "auto",
          display: "block",
        }}
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default Loader;
