import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = cart;

  if (!shippingAddress) {
    return <Navigate to="/shipping" replace />;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <Container className="mt-5">
      <FormContainer className="mt-5">
        <Meta title="Shopy-Payment method" />
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
              <Form.Check
                type="radio"
                label="Paystack"
                id="Paystack"
                name="paymentMethod"
                value="Paystack"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type="submit" variant="outline-dark">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default PaymentScreen;
