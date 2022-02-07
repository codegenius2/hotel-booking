import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userLoginReducer, userRegisterReducer, profileUpdateReducer, passwordUpdateReducer } from './reducers/UserReducers';
import {roomsFetchReducer, roomDetailsReducer, roomCreateReviewReducer } from './reducers/RoomReducers';
import { roomBookingCheckReducer } from './reducers/BookingReducers';

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  profileUpdate: profileUpdateReducer,
  passwordUpdate: passwordUpdateReducer,
  roomsFetch: roomsFetchReducer,
  roomDetails: roomDetailsReducer,
  roomCreateReview: roomCreateReviewReducer,
  roomBookingCheck: roomBookingCheckReducer,
});

const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo")!);

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage
  }
};

const store = createStore(
  rootReducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;