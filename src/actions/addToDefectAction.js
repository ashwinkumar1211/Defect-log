import axios from 'axios';
import {
  ADD_TO_DEFECT_FAIL,
  ADD_TO_DEFECT_REQUEST,
  ADD_TO_DEFECT_SUCCESS,
  CLOSE_DEFECT_REQUEST,
} from '../constants/addToDefectConstants';

export const addToDefect =
  (category, description, priority, id) => async (dispatch, getState) => {
    // const { data } = localStorage.getItem('defectItems');
    try {
      dispatch({
        type: ADD_TO_DEFECT_REQUEST,
        payload: {
          category: category,
          description: description,
          priority: priority,
          id: id,
          close: 'open',
        },
      });
      localStorage.setItem(
        'defectItems',
        JSON.stringify(getState().addToDefector.defectItems)
      );
    } catch (error) {
      // dispatch({
      //   type: ADD_TO_DEFECT_FAIL,
      //   payload: 'Cannot add defect at this moment, Try Later!',
      // });
    }
  };

export const closeDefect = id => async (dispatch, getState) => {
  try {
    var data = JSON.parse(localStorage.getItem('defectItems'));
    data.map(obj => {
      if (obj.id == id) {
        obj.close = 'No action pending';
      }
    });

    dispatch({
      type: CLOSE_DEFECT_REQUEST,
      payload: data,
    });

    localStorage.setItem('defectItems', JSON.stringify(data));
  } catch (error) {
    // dispatch({
    //   type: ADD_TO_DEFECT_FAIL,
    //   payload: 'Cannot add defect at this moment, Try Later!',
    // });
  }
};
