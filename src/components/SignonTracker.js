import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/signOnAction';

const SignonTracker = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  const navigate = useNavigate();

  const signOn = useSelector(state => state.signOn);

  var { loading, error, success } = signOn;

  useEffect(() => {
    if (success) {
      navigate('/view-defects');
    }
  }, [success]);

  return (
    <div className='login-container'>
      <h2 className='login-heading-1'>Defect Tracker</h2>
      <h3 className='login-error-message'>{error}</h3>
      <h3 className='login-success-message'>{success}</h3>
      <h3 className='login-heading-2'>Login</h3>
      <label className='login-label'>Username</label>
      <input
        type='text'
        className='login-value-1'
        placeholder='Enter Username'
        onChange={e => setUserName(e.target.value)}
      />
      <br />
      <label className='login-label'>Password</label>
      <input
        type='password'
        className='login-value-2'
        placeholder='Password'
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button className='login-submit' onClick={submitHandler}>
        Sign in
      </button>
    </div>
  );
};

export default SignonTracker;
