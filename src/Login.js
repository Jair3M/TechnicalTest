import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import { setUserSession } from './Utils/Common';

const Wrapper = styled.div`
    position: absolute;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 100%;
    width: 100%;
`;

const Form = styled.form`
    flex-direction: column;
`;

const Description = styled.span`
    color: #303f9f;
    display: block;
    font-size: 25px;
    font-weight: 700;
    text-align: center;
`;

const ErrorMesage = styled.span`
    color: #f44336;
    display: block;
    font-size: 10px;
    font-weight: 700;
    text-align: center;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  color: {
    color: theme.palette.getContrastText('#303f9f'),
    backgroundColor: '#303f9f',
    marginLeft: '30%',
    width: '80px',
    height: '80px'
  }
}));

function Login(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginData, setLoginData] = useState({});

  const handleLogin = () => {
    let goodForm = true;
    setEmailError(false);
    setPasswordError(false);
    goodForm = validInput('email');
    goodForm = !goodForm ? goodForm : validInput('password');
    if(goodForm){
      setLoading(true);
      axios.post('https://reqres.in/api/login', { email: loginData.email, password: loginData.email }).then(response => {
        setLoading(false);
        setUserSession(response.token, '');
        props.history.push('/dashboard');
      }).catch(error => {
        setLoading(false);
        if (error.response.status === 401) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
    }
  }

  function validInput(input){
    switch (input) {
        case 'email':
            if(loginData.email === undefined || loginData.email === null || loginData.email === ''){
                setEmailError(true);
                return false;
            }else{
              setEmailError(false);
                return true;
            }
        case 'password':
            if(loginData.password === undefined || loginData.password === null || loginData.password === ''){
                setPasswordError(true);
                return false;
            }else{
                setPasswordError(false);
                return true;
            }
        default:
            return false;
    }
}

  const handleChange = (e, type) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value
    });
    if(type === 'email'){
      setEmailError(false);
    }else{
      setPasswordError(false);
    }
  }

  return (
    <div>
      <Wrapper>
        <div>
          <Form>
            <Row gutter={[0, 24]} className="input-row">
                <Avatar className={classes.color}>
                  <FolderIcon />
                </Avatar>
                <Description>Welcome</Description>
            </Row>
            <Row gutter={[0, 24]} className="input-row">
                <Col span={24}>
                    <TextField
                        autoComplete="off"
                        defaultValue={""}
                        id="email"
                        label="Email address"
                        variant="outlined"
                        onChange={e => handleChange(e, 'email')}
                        helperText={emailError && 'Please type your email'}
                        error={emailError}
                    />
                </Col>
            </Row>
            <Row gutter={[0, 24]} className="input-row">
                <Col span={24}>
                    <TextField
                        autoComplete="off"
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        onChange={e => handleChange(e, 'password')}
                        helperText={passwordError && 'Please type your password'}
                        error={passwordError}
                    />
                </Col>
            </Row>
            <Row gutter={[0, 24]} className="input-row">
                {error && (
                  <ErrorMesage>{error}</ErrorMesage>
                )}
                <Col span={24}>
                    <Button
                        disabled={loading}
                        variant="contained"
                        color="primary"
                        style={{ width: '100%' }}
                        type='button'
                        onClick={handleLogin}
                    >
                        {loading ? 'Loading' : 'Sign In'}
                    </Button>
                </Col>
            </Row>
          </Form>
        </div>
      </Wrapper>
    </div>
  );
}

export default Login;