import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  CDBFooter,
  CDBFooterLink,
  CDBBtn,
  CDBIcon,
  CDBContainer,
  CDBBox,
} from "cdbreact";
import logo from "../logos/grandma/apple-touch-icon.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* <footer>
        <Container>
          <Row>
            <Col className="text-center py-3"> Cpyright &copy; Shopy</Col>
          </Row>
        </Container>
      </footer> */}
      <CDBFooter className="shadow bg-light">
        <CDBBox
          display="flex"
          justifyContent="between"
          alignItems="center"
          className="mx-auto py-4 flex-wrap"
          style={{ width: "80%" }}
        >
          <CDBBox display="flex" alignItems="center">
            <a href="/" className="d-flex align-items-center p-0 text-dark">
              <img alt="logo" src={logo} width="150px" />
              <span className="ml-4 h5 mb-0 font-weight-bold"></span>
            </a>
            <small className="ml-2">
              &copy; By SarbTech, 2022. All rights reserved.
            </small>
          </CDBBox>
          <CDBBox display="flex">
            <CDBBtn flat color="dark" className="p-2">
              <a href="https://web.facebook.com/streuby" target="_blank">
                <CDBIcon fab icon="facebook-f" />
              </a>
            </CDBBtn>
            <CDBBtn flat color="dark" className="mx-3 p-2">
              <a href="https://twitter.com/Streuby" target="_blank">
                <CDBIcon fab icon="twitter" />
              </a>
            </CDBBtn>
            <CDBBtn flat color="dark" className="p-2">
              <a href="https://www.instagram.com/streuby2/" target="_blank">
                <CDBIcon fab icon="instagram" />
              </a>
            </CDBBtn>
          </CDBBox>
        </CDBBox>
      </CDBFooter>
    </>
  );
};

export default Footer;
