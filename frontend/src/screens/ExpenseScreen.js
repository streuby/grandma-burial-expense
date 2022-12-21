import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { PaystackButton } from "react-paystack";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { getExpenseDetails, payExpense } from "../actions/expenseActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/expenseConstants";

const ExpenseScreen = () => {
  const { id } = useParams();
  const expenseId = id;

  // Paystack
  //const payStackPublicKey = process.env.PAYSTACK_PUBLIC_KEY;

  const [sdkReady, setSdkReady] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(parseInt(0));
  const [componentProps, setComponentProps] = useState({});
  const [payStackPublicKey, setPayStackPublicKey] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const expenseDetails = useSelector((state) => state.expenseDetails);
  const { expense, loading, error } = expenseDetails;

  const expensePay = useSelector((state) => state.expensePay);
  const { loading: loadingPay, success: successPay } = expensePay;

  const expenseDeliver = useSelector((state) => state.expenseDeliver);
  const { loading: loadingDeliver, success: successDeliver } = expenseDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    // expense.itemsPrice = addDecimals(
    //   expense.expenseItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    // );
  }

  // useEffect(() => {
  //   if (!userInfo) {
  //     navigate("/login");
  //   }
  // Paystack
  // const setPayStack = async () => {
  //   const { data: publicKey } = await axios.get("/api/config/paystack");
  //   setEmail(expense.user.email);
  //   setName(expense.user.name);
  //   setAmount(expense.totalPrice * 100);
  //   setPayStackPublicKey(publicKey);
  // };

  // if (expense) {
  //   setPayStack();
  //   // }
  // }, [expense, userInfo, navigate]);

  const successPaymentHandler = (paymentResult) => {
    paymentResult.paypal = "paypal";
    dispatch(payExpense(expenseId, paymentResult));
  };

  useEffect(() => {
    // Paystack
    if (expense) {
      setComponentProps({
        email: email,
        amount: amount,
        metadata: {
          name: name,
          phone: phone,
        },
        publicKey: payStackPublicKey,
        text: "Pay with Paystack",
        onSuccess: (paymentResult) => {
          console.log("onSuccess Fired");
          try {
            paymentResult.paystack = "paystack";
            dispatch(payExpense(expenseId, paymentResult));
          } catch (error) {
            throw new Error("Error: ", error);
          }
        },
        onClose: () => {},
      });
    }
  }, [
    expense,
    email,
    amount,
    name,
    phone,
    dispatch,
    expenseId,
    payStackPublicKey,
  ]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (!expense || successPay || successDeliver || expense._id !== expenseId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getExpenseDetails(expenseId));
    }
  }, [
    dispatch,
    expenseId,
    successPay,
    successDeliver,
    expense,
    navigate,
    userInfo,
  ]);

  const markPaidHandler = () => {
    dispatch(payExpense(expense._id));
  };

  const uploadFileHandler = async (e) => {
    navigate(`/admin/expenses/${expense._id}/edit`);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Container className="mt-5">
      {expense && expense.isPaid ? (
        <Meta title="Shopy-Payment confirmation" />
      ) : (
        <Meta title="Shopy-Make payment" />
      )}
      <h1>Expense {expense._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Service</h2>
              <p>
                <strong>Name: </strong> {expense.expenseService.name}
              </p>
              <p>
                <strong>Provider:</strong> {expense.serviceProvider.name},
                <p>
                  <strong>Email: </strong>{" "}
                  <a href={`mailto:${expense.serviceProvider.email}`}>
                    {expense.serviceProvider.email}
                  </a>
                </p>
                <p>
                  <strong>Phone: </strong> {expense.serviceProvider.phone}{" "}
                  <strong>Bank: </strong> {expense.serviceProvider.bank}{" "}
                  <strong>Account: </strong> {expense.serviceProvider.account}
                </p>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Status</h2>
              {expense.isPaid ? (
                <Message variant="success">
                  Paid on {expense.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Paiment Evidence</h2>
              {userInfo && userInfo.isAdmin && expense.isPaid && (
                <Container className="mb-3">
                  <Button
                    type="button"
                    variant="outline-dark"
                    onClick={uploadFileHandler}
                  >
                    Upload Evidence
                  </Button>
                </Container>
              )}
              {!expense.isPaid ? (
                <Message>Evidence is empty</Message>
              ) : (
                <ListGroup>
                  <ListGroup.Item variant="flush">
                    <>
                      <Col md={6}>
                        <Image src={expense.image} alt={expense.name} fluid />
                      </Col>
                    </>
                  </ListGroup.Item>
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Expense Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>₦{expense.expenseService.price}</Col>
                </Row>
              </ListGroup.Item>
              {expense.isPaid && (
                <ListGroup.Item>
                  <strong>Paid</strong>
                </ListGroup.Item>
              )}
              {loadingPay && <Loader />}
              {userInfo && userInfo.isAdmin && !expense.isPaid && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    variant="outline-dark"
                    onClick={markPaidHandler}
                  >
                    Mark As Paid
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseScreen;
