import axios from 'axios';
import { Dispatch } from 'redux';
import * as actions from '../constants/RoomConstants';
import { IRoom } from '../../interfaces/IRoom';

export const fetchRooms = (keyword: string, numOfBeds: number | string, roomType: string) => 
async (dispatch: Dispatch) => {
    try {
        dispatch({ type: actions.FETCH_ROOMS_REQUEST });

        const { data } = 
        await axios.get(`/api/rooms/?keyword=${keyword}&numOfBeds=${numOfBeds}&roomType=${roomType}`);

        dispatch({ type: actions.FETCH_ROOMS_SUCCESS, payload: data });
        
    } catch (error: any) {
        dispatch({ 
            type: actions.FETCH_ROOMS_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }
}

export const getRoomDetails = (id: IRoom['_id']) => async (dispatch: Dispatch) => {

    try {
        dispatch({ type: actions.ROOM_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/rooms/${id}`);
        dispatch({ type: actions.ROOM_DETAILS_SUCCESS, payload: data });

    } catch (error: any) {
        dispatch({ 
            type: actions.ROOM_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}

export const createRoomReview = (id: IRoom['_id'], review: {}) => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: actions.ROOM_CREATE_REVIEW_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/JSON",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/rooms/${id}/reviews`, review, config);
        dispatch({ type: actions.ROOM_CREATE_REVIEW_SUCCESS });

    } catch (error: any) {
        dispatch({ 
            type: actions.ROOM_CREATE_REVIEW_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}