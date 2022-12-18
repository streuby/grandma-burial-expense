import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { CDBBox } from "cdbreact";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import logo from "../logos/grandma/apple-touch-icon.png";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect fixed="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <CDBBox display="flex" alignItems="center">
                <img alt="logo" src={logo} width="30px" />{" "}
                <span className="ml-4 h5 m-2 font-weight-bold">
                  {" "}
                  Glorious Exit
                </span>
              </CDBBox>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <SearchBox />
            <Nav className="ml-auto">
              <LinkContainer to="/expenselist">
                <Nav.Link>
                  <i className="fas fa-money-bill-wave-alt"> Expenses</i>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/photocardlist">
                    <NavDropdown.Item>Photocards</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/expenselist">
                    <NavDropdown.Item>Expenses</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
