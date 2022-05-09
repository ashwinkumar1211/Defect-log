import {
  ADD_TO_DEFECT_FAIL,
  ADD_TO_DEFECT_REQUEST,
  CLOSE_DEFECT_REQUEST,
} from '../constants/addToDefectConstants';

export const addToDefectReducer = (state = { defectItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_DEFECT_REQUEST:
      const item = action.payload;
      return {
        ...state,
        defectItems: [...state.defectItems, item],
        success: action.payload,
      };
    default:
      return state;
  }
};

export const closeDefectReducer = (state = { defectItems: [] }, action) => {
  switch (action.type) {
    case CLOSE_DEFECT_REQUEST:
      const item = action.payload;
      return {
        ...state,
        defectItemsAfterCloseDefect: [...state.defectItems, item],
        defectItemsAfterCloseDefector: action.payload,
        closed: true,
      };
    default:
      return state;
  }
};
