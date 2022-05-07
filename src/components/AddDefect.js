import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToDefect } from '../actions/addToDefectAction';
import { logout } from '../actions/signOnAction';

const AddDefect = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(1);
  const signOn = useSelector(state => state.signOn);

  var { loading, error, auth } = signOn;

  const submitHandler = e => {
    e.preventDefault();
    dispatch(addToDefect(category, description, priority, Date.now()));
  };
  const navigate = useNavigate();
  const addToDefector = useSelector(state => state.addToDefector);

  const { success } = addToDefector;

  const setCategoryValue = e => {
    setCategory(e.target.value);
  };

  const setDefectValue = e => {
    setPriority(e.target.value);
  };

  const setDescriptionValue = e => {
    setDescription(e.target.value);
  };
  const logoutHandler = e => {
    e.preventDefault();
    dispatch(logout());
  };

  useEffect(() => {
    if (auth === false) {
      navigate('/');
    }
    if (success) {
      alert('Success');
    }
  }, [success, auth]);

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
        <div className='defect-addition'>
          <h2 className='add-defect-title'>Add Defects</h2>
          <div className='defect-category-choose'>
            <span>{'Default Category'}</span>
            <select
              onChange={e => setCategoryValue(e)}
              style={{ marginLeft: '10px' }}
            >
              <option>select</option>
              <option>UI</option>
              <option>Functional</option>
              <option>Change</option>
            </select>
          </div>
          <div className='add-defect-description' style={{ marginTop: '10px' }}>
            <span>{'Description'}</span>
            <textarea
              onChange={e => setDescriptionValue(e)}
              placeholder='Enter description'
              style={{ marginLeft: '10px' }}
            ></textarea>
          </div>
          <div className='defect-priority-choose' style={{ marginTop: '10px' }}>
            <span>{'Priority'}</span>
            <select
              onChange={e => setDefectValue(e)}
              style={{ marginLeft: '10px' }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <button
            onClick={submitHandler}
            style={{ marginTop: '10px', marginBottom: '10px' }}
          >
            Add Defect
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDefect;
