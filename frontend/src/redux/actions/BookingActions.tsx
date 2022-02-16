import { Dispatch } from "redux";
import axios from 'axios';
import * as actions from '../constants/BookingConstants';
import { IRoom } from "../../interfaces/IRoom";
import { ICreateBooking } from "../../interfaces/IBooking";

export const checkRoomBooking = (id: IRoom['_id'], checkInDate: Date, checkOutDate: Date) => async (dispatch: Dispatch) => {

    try {
        dispatch({ type: actions.CHECK_ROOM_BOOKING_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/JSON",
            }
        }

        await axios.post(`/api/bookings/check`, {id, checkInDate, checkOutDate}, config);

        dispatch({ type: actions.CHECK_ROOM_BOOKING_SUCCESS });

    } catch (error: any) {
        dispatch({ 
            type: actions.CHECK_ROOM_BOOKING_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}

export const createBooking = (bookingData: ICreateBooking) => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: actions.CREATE_BOOKING_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/JSON",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/bookings`, bookingData, config);

        dispatch({ type: actions.CREATE_BOOKING_SUCCESS });

    } catch (error: any) {
        dispatch({ 
            type: actions.CREATE_BOOKING_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}

export const getBookedDates = (roomId:  IRoom['_id']) => async (dispatch: Dispatch) => {

    try {
        dispatch({ type: actions.GET_BOOKED_DATES_REQUEST });

        const { data } = await axios.get(`/api/bookings/dates/${roomId}`);

        dispatch({ type: actions.GET_BOOKED_DATES_SUCCESS, payload: data });

    } catch (error: any) {
        dispatch({ 
            type: actions.GET_BOOKED_DATES_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}

export const getMyBookings = () => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: actions.GET_MY_BOOKINGS_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/JSON",
                "Authorization": `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`/api/bookings/me`, config);

        dispatch({ type: actions.GET_MY_BOOKINGS_SUCCESS, payload: data });

    } catch (error: any) {
        dispatch({ 
            type: actions.GET_MY_BOOKINGS_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}