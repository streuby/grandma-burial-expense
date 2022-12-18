import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import PhotocardScreen from "./screens/PhotocardScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceExpenseScreen from "./screens/PlaceExpenseScreen";
import ExpenseScreen from "./screens/ExpenseScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import PhotocardListScreen from "./screens/PhotocardListScreen";
import PhotocardEditScreen from "./screens/PhotocardEditScreen";
import ExpenseEditScreen from "./screens/ExpenseEditScreen";
import ExpenseListScreen from "./screens/ExpenseListScreen";

const App = () => {
  return (
    <Router basename="/">
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route
              path="/admin/photocardlist"
              element={<PhotocardListScreen />}
              exact
            />
            <Route
              path="/admin/photocardlist/:pageNumber"
              element={<PhotocardListScreen />}
              exact
            />
            <Route path="/expenselist" element={<ExpenseListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route
              path="/admin/photocard/:id/edit"
              element={<PhotocardEditScreen />}
            />
            <Route
              path="/admin/expenses/:id/edit"
              element={<ExpenseEditScreen />}
            />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeexpense" element={<PlaceExpenseScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="cart" element={<CartScreen />} />
            <Route path="photocard/:id" element={<PhotocardScreen />} />
            <Route path="expense/:id" element={<ExpenseScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} exact />
            <Route
              path="/search/:keyword/page/pageNumber"
              element={<HomeScreen />}
            />
            <Route path="/page/:pageNumber" element={<HomeScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
