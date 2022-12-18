import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { createExpense, listExpenses } from "../actions/expenseActions";

const ExpenseListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const expenseList = useSelector((state) => state.expenseList);
  const { loading, error, expenses } = expenseList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listExpenses());
  }, [dispatch, navigate]);

  const createExpenseHandler = () => {
    dispatch(createExpense());
    if (userInfo && userInfo.isAdmin) {
      dispatch(listExpenses());
    } else {
      navigate("/login");
    }
  };

  return (
    <Container className="mt-5">
      <Meta title="Grandma-Funeral-Expenses" />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="align-items-center">
            <Col>
              <h1>Expenses</h1>
            </Col>
            {userInfo && userInfo.isAdmin && (
              <Col className="text-right">
                <Button
                  className="my-3"
                  variant="outline-dark"
                  onClick={createExpenseHandler}
                >
                  <i className="fas fa-plus"></i> Add Expense Item
                </Button>
              </Col>
            )}
          </Row>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>SERVICE</th>
                <th>PROVIDER</th>
                <th>PRICE</th>
                <th>BANK</th>
                <th>ACCOUNT</th>
                <th>PAID</th>
                {userInfo && userInfo.isAdmin && <th></th>}
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) =>
                userInfo && userInfo.isAdmin ? (
                  <tr key={expense._id}>
                    <td>{expense._id}</td>
                    <td>{expense.createdAt.substring(0, 10)}</td>
                    <td>{expense.expenseService.name}</td>
                    <td>{expense.serviceProvider.name}</td>
                    <td>₦{expense.expenseService.price}</td>
                    <td>{expense.serviceProvider.bank}</td>
                    <td>{expense.serviceProvider.account}</td>
                    <td>
                      {expense.isPaid ? (
                        expense.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    {userInfo && userInfo.isAdmin && (
                      <td>
                        <LinkContainer
                          to={`/admin/expenses/${expense._id}/edit`}
                        >
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                      </td>
                    )}
                    {!expense.isSample && (
                      <td>
                        <LinkContainer to={`/expense/${expense._id}`}>
                          <Button variant="light" className="btn-sm">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    )}
                  </tr>
                ) : (
                  !expense.isSample && (
                    <tr key={expense._id}>
                      <td>{expense._id}</td>
                      <td>{expense.createdAt.substring(0, 10)}</td>
                      <td>{expense.expenseService.name}</td>
                      <td>{expense.serviceProvider.name}</td>
                      <td>₦{expense.expenseService.price}</td>
                      <td>{expense.serviceProvider.bank}</td>
                      <td>{expense.serviceProvider.account}</td>
                      <td>
                        {expense.isPaid ? (
                          expense.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      {userInfo && userInfo.isAdmin && (
                        <td>
                          <LinkContainer
                            to={`/admin/expenses/${expense._id}/edit`}
                          >
                            <Button variant="light" className="btn-sm">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>
                        </td>
                      )}
                      {!expense.isSample && (
                        <td>
                          <LinkContainer to={`/expense/${expense._id}`}>
                            <Button variant="light" className="btn-sm">
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      )}
                    </tr>
                  )
                )
              )}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default ExpenseListScreen;
