import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { signOnReducer } from './reducers/signOnReducer';
import {
  addToDefectReducer,
  closeDefectReducer,
} from './reducers/addToDefectReducer';

const reducer = combineReducers({
  signOn: signOnReducer,
  addToDefector: addToDefectReducer,
  closeDefectItems: closeDefectReducer,
});

const defectItemsFromStorage = localStorage.getItem('defectItems')
  ? JSON.parse(localStorage.getItem('defectItems'))
  : [];

const initialState = {
  addToDefector: {
    defectItems: defectItemsFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
