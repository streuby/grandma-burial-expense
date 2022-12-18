import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  listPhotocardDetails,
  updatePhotocard,
} from "../actions/photocardActions";
import { PRODUCT_UPDATE_RESET } from "../constants/photocardConstants";

const PhotocardEditScreen = () => {
  const { id: photocardId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const photocardDetails = useSelector((state) => state.photocardDetails);
  const { loading, error, photocard } = photocardDetails;

  const photocardUpdate = useSelector((state) => state.photocardUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = photocardUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/photocardlist");
    } else {
      if (!photocard.name || photocard._id !== photocardId) {
        dispatch(listPhotocardDetails(photocardId));
      } else {
        setName(photocard.name);
        setPrice(photocard.price);
        setImage(photocard.image);
        setBrand(photocard.brand);
        setCategory(photocard.category);
        setCountInStock(photocard.countInStock);
        setDescription(photocard.description);
      }
    }
  }, [dispatch, photocardId, photocard, successUpdate, navigate]);

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
      updatePhotocard({
        _id: photocardId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <Container>
      <Link to="/admin/photocardlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Photocard</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Caption</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
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

export default PhotocardEditScreen;
