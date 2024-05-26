import axios from 'axios';
import {
    PROPERTY_LIST_REQUEST,
    PROPERTY_LIST_SUCCESS,
    PROPERTY_LIST_FAIL,
    PROPERTY_DETAILS_REQUEST,
    PROPERTY_DETAILS_SUCCESS,
    PROPERTY_DETAILS_FAIL,
    PROPERTY_CREATE_REQUEST,
    PROPERTY_CREATE_SUCCESS,
    PROPERTY_CREATE_FAIL,
} from '../constants/propertyConstants';

export const listProperties = () => async (dispatch) => {
    try {
        dispatch({ type: PROPERTY_LIST_REQUEST });

        const { data } = await axios.get('/api/properties');

        dispatch({
            type: PROPERTY_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PROPERTY_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createProperty = (property) => async (dispatch, getState) => {
    try {
        dispatch({ type: PROPERTY_CREATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post('/api/properties', property, config);

        dispatch({
            type: PROPERTY_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PROPERTY_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};