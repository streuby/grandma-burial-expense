import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listPhotocards,
  deletePhotocard,
  createPhotocard,
} from "../actions/photocardActions";
import { PRODUCT_CREATE_RESET } from "../constants/photocardConstants";

const PhotocardListScreen = () => {
  const { pageNumber } = useParams() || 1;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const photocardList = useSelector((state) => state.photocardList);
  const { loading, error, photocards, page, pages } = photocardList;

  const photocardDelete = useSelector((state) => state.photocardDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = photocardDelete;

  const photocardCreate = useSelector((state) => state.photocardCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    photocard: createdPhotocard,
  } = photocardCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/photocard/${createdPhotocard._id}/edit`);
    } else {
      dispatch(listPhotocards("", pageNumber));
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdPhotocard,
    pageNumber,
    navigate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deletePhotocard(id));
    }
  };

  const createPhotocardHandler = () => {
    dispatch(createPhotocard());
  };

  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col>
          <h1>Photocards</h1>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            variant="outline-dark"
            onClick={createPhotocardHandler}
          >
            <i className="fas fa-plus"></i> Create Photocard
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {photocards.map((photocard) => (
                <tr key={photocard._id}>
                  <td>{photocard._id}</td>
                  <td>{photocard.name}</td>
                  <td>{photocard.category}</td>
                  <td>
                    <LinkContainer
                      to={`/admin/photocard/${photocard._id}/edit`}
                    >
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(photocard._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </Container>
  );
};

export default PhotocardListScreen;
