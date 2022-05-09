import React, { useState, useEffect } from 'react';
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeDefect } from '../actions/addToDefectAction';
import { logout } from '../actions/signOnAction';
import { CLOSE_DEFECT_RESET } from '../constants/addToDefectConstants';
const DefectHandler = () => {
  const [category, setCategory] = useState('All');
  const [priority, setPriority] = useState('All');
  const addToDefector = useSelector(state => state.addToDefector);
  const [requestitem, setRequestitem] = useState('Close request');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setCategoryValue = e => {
    setCategory(e.target.value);
  };

  const setDefectValue = e => {
    setPriority(String(e.target.value));
  };

  const closeRequest = (e, id) => {
    e.preventDefault();
    dispatch(closeDefect(id));
  };

  var { defectItems } = addToDefector;

  const [defectItemsHandler, setDefectItemsHandler] = useState(defectItems);

  const [count, setCount] = useState(0);

  const signOn = useSelector(state => state.signOn);

  var { loading, error, success, auth, closed } = signOn;

  const closeDefectItems = useSelector(state => state.closeDefectItems);

  var { closed, defectItemsAfterCloseDefect } = closeDefectItems;

  const logoutHandler = e => {
    e.preventDefault();
    dispatch(logout());
  };

  useEffect(() => {
    if (closed) {
      dispatch({ type: CLOSE_DEFECT_RESET });
      console.log(defectItems);
      setDefectItemsHandler(defectItems);
    }
    if (auth !== true) {
      navigate('/');
    }
    // filter condition starts here
    if (priority !== 'All' && category === 'All') {
      const updatedObject = defectItems.filter(
        item => String(item.priority) === String(priority)
      );
      setDefectItemsHandler(updatedObject);
      setCount(updatedObject.length);
    } else if (priority === 'All' && category !== 'All') {
      const updatedObject = defectItems.filter(
        item => String(item.category) === String(category)
      );
      setDefectItemsHandler(updatedObject);
      setCount(updatedObject.length);
    } else if (priority === 'All' && category === 'All') {
      setDefectItemsHandler(defectItems);
      setCount(defectItems.length);
    } else if (priority !== 'All' && category !== 'All') {
      const updatedObject1 = defectItems.filter(
        item => String(item.priority) === String(priority)
      );
      setDefectItemsHandler(updatedObject1);
      const updatedObject2 = defectItems.filter(
        item => String(item.category) === String(category)
      );
      setDefectItemsHandler(updatedObject2);
      setCount(updatedObject2.length);
    }
    // filter condition ends here
  }, [priority, category, auth, closed]);

  return (
    <div className='defect-items'>
      <div className='grid-container'>
        <div className='heading-container'>
          <h1 className='defect-title'>Defect Tracker</h1>
          {auth ? (
            <span className='defect-logout'>
              <Link to='/' onClick={logoutHandler}>
                Logout
              </Link>
            </span>
          ) : (
            <span className='defect-logout'>Logout</span>
          )}
          <div className='defects-add-view'>
            {auth ? (
              <Link to={`/add-defect`}>
                <span>Add Defect</span>
              </Link>
            ) : (
              <span>Add Defect</span>
            )}
            <Link to={`/view-defects`}>
              <span>View Defects</span>
            </Link>
          </div>
        </div>
        <div className='defect-filters'>
          <div className='defect-filter-container'>
            <h2 className='defect-filter'>Filter Details</h2>
            <div className='defect-category'>
              <span style={{ fontWeight: 'bold' }}>{'Priority'}</span>
              <select onChange={e => setDefectValue(e)}>
                <option>All</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <div className='defect-category-2' style={{ marginTop: '2em' }}>
              <span style={{ fontWeight: 'bold' }}>{'Category'}</span>
              <select
                onChange={e => setCategoryValue(e)}
                style={{ width: '150px' }}
              >
                <option>All</option>
                <option>UI</option>
                <option>Functional</option>
                <option>Change</option>
              </select>
            </div>
          </div>
        </div>
        <div className='defect-holder'>
          <div>
            <h2 className='defect-search'>Defect Details</h2>
            <div className='count-items'>
              <span className='defect-search-result'>Search Results :</span>
              <span style={{ color: 'red' }}>{'  ' + count}</span>
            </div>
          </div>
          <div className='defect-columns'>
            <div className='defect-column'>
              Defect <br /> Category
            </div>
            <div className='defect-column'>
              {' '}
              <br />
              Description
            </div>
            <div
              className='
              defect-column'
            >
              {' '}
              <br />
              Priority
            </div>
            <div className='defect-column'>
              {' '}
              <br />
              Status
            </div>
            <div>
              Change <br />
              Status
            </div>
          </div>

          {defectItemsHandler &&
            defectItemsHandler.map(item => (
              <div className='defect-rows'>
                <div className='defect-column'>{item.category}</div>
                <div className='defect-column'>{item.description}</div>
                <div className='defect-column'>{item.priority}</div>
                <div className='defect-column'>open</div>
                {item.close === 'open' ? (
                  <button onClick={e => closeRequest(e, item.id)}>
                    <div className='defect-column-closerequest'>
                      {item.close === 'open'
                        ? 'Close request'
                        : 'No action pending'}
                    </div>
                  </button>
                ) : (
                  <div className='defect-column-closerequest'>
                    {item.close === 'open'
                      ? 'Close request'
                      : 'No action pending'}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DefectHandler;
