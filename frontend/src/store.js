import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  photocardListReducer,
  photocardDetailsReducer,
  photocardDeleteReducer,
  photocardCreateReducer,
  photocardUpdateReducer,
  photocardReviewCreateReducer,
  photocardTopRatedReducer,
} from "./reducers/photocardReducers";
import {
  expenseCreateReducer,
  expenseListMyReducer,
  expenseDetailsReducer,
  expensePayReducer,
  expenseListReducer,
  expenseDeliverReducer,
  expenseUpdateReducer,
} from "./reducers/expenseReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  photocardList: photocardListReducer,
  photocardDetails: photocardDetailsReducer,
  photocardDelete: photocardDeleteReducer,
  photocardCreate: photocardCreateReducer,
  photocardUpdate: photocardUpdateReducer,
  photocardReviewCreate: photocardReviewCreateReducer,
  photocardTopRated: photocardTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  expenseCreate: expenseCreateReducer,
  expenseDetails: expenseDetailsReducer,
  expenseList: expenseListReducer,
  expenseListMy: expenseListMyReducer,
  expenseDeliver: expenseDeliverReducer,
  expenseUpdate: expenseUpdateReducer,
  expensePay: expensePayReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

//console.log("Init-state: ", initialState);

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
