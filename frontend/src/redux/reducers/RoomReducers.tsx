import * as actions from '../constants/RoomConstants';
import { AnyAction } from 'redux'
import { IRoom } from '../../interfaces/IRoom';

const initialState: { rooms: IRoom[] } = {
    rooms: [],
};

export const roomsFetchReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case actions.FETCH_ROOMS_REQUEST:
            return {
                loading: true
            };
        case actions.FETCH_ROOMS_SUCCESS:
            return {
                loading: false,
                rooms: action.payload
            };
        case actions.FETCH_ROOMS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}