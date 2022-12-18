import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getExpenseDetails, updateExpense } from "../actions/expenseActions";
import { ORDER_UPDATE_RESET } from "../constants/expenseConstants";

const expenseEditScreen = () => {
  const { id: expenseId } = useParams();

  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState(0);
  const [providerName, setProviderName] = useState("");
  const [providerEmail, setProviderEmail] = useState("");
  const [providerPhone, setProviderPhone] = useState("");
  const [providerBank, setProviderBank] = useState("");
  const [providerAccount, setProviderAccount] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const expenseDetails = useSelector((state) => state.expenseDetails);
  const { loading, error, expense } = expenseDetails;

  const expenseUpdate = useSelector((state) => state.expenseUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = expenseUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ORDER_UPDATE_RESET });
      navigate("/expenselist");
    } else {
      if (!expense.expenseService.name || expense._id !== expenseId) {
        dispatch(getExpenseDetails(expenseId));
      } else {
        setServiceName(expense.expenseService.name);
        setServicePrice(expense.expenseService.price);
        setImage(expense.image);
        setProviderName(expense.serviceProvider.name);
        setProviderEmail(expense.serviceProvider.email);
        setProviderPhone(expense.serviceProvider.phone);
        setProviderBank(expense.serviceProvider.bank);
        setProviderAccount(expense.serviceProvider.account);
      }
    }
  }, [dispatch, expenseId, expense, successUpdate, navigate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploads", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateExpense({
        _id: expenseId,
        expenseService: {
          name: serviceName,
          price: servicePrice,
        },
        serviceProvider: {
          name: providerName,
          email: providerEmail,
          phone: providerPhone,
          bank: providerBank,
          account: providerAccount,
        },
        image,
      })
    );
  };

  return (
    <Container>
      <Link to="/admin/expenselist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit expense</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Service</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service price"
                value={servicePrice}
                onChange={(e) => setServicePrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Provider</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter provider's name"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Provider Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter provider's email"
                value={providerEmail}
                onChange={(e) => setProviderEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Provider Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter provider's phone"
                value={providerPhone}
                onChange={(e) => setProviderPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Provider Bank</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter provider's bank"
                value={providerBank}
                onChange={(e) => setProviderBank(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Provider Account</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter provider's account number"
                value={providerAccount}
                onChange={(e) => setProviderAccount(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                className="custom-file-label"
                label="Choose File"
                onChange={uploadFileHandler}
                custom="true"
              />
              {uploading && <Loader />}
            </Form.Group>

            <Button type="submit" variant="outline-dark">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  );
};

export default expenseEditScreen;
