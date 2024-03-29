import styled from 'styled-components';
import logo_2 from '../assests/dummy_images/logo_2.png';
import { useLazyQuery, useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/queries/userQueries';
import { MuiAlert } from '../assests/MUI/MuiAlert';
import { useForm } from '../utils/customHooks';
import { MuiLoader } from '../assests/MUI/MuiLoader';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CREATE_USER } from '../graphql/mutations/userMutations';
import ChatIcon from '../assests/dummy_images/chatIcon'
const Login = () => {
  const initialState = {
    username: '',
    password: '',
    nickname: '',
  };

  const { values, onChange, onSubmit } = useForm(
    registerOrLoginCallback,
    initialState
  );
  const { loginUser: loginUserDispatch } = useAppContext();
  const navigate = useNavigate();

  const [isMember, setIsMember] = useState<boolean>(true);

  console.log(isMember);
  const [loginUser, { loading, error }] = useLazyQuery(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem('token', login.token);
      loginUserDispatch(login);
      navigate('/');
    },
  });

  const [registerUser, { loading: registerLoading, error: registerError }] =
    useMutation(CREATE_USER, {
      onCompleted({ createUser }) {
        localStorage.setItem('token', createUser.token);
        loginUserDispatch(createUser);
        navigate('/');
      },
      variables: values,
    });

  function registerOrLoginCallback() {
    return isMember ? loginUser({ variables: values }) : registerUser();
  }

  return (
    <Wrapper>
      <Container>
        <Header>
          <ChatIcon width="150px" height="150px" />
          <HeaderTitle>7kayetna</HeaderTitle>
          <HeaderText>
            Share your smile with this world and find friends
          </HeaderText>

          <ChatIcon width="150px" height="150px" />
          <LoginTitle>{isMember ? 'Login' : 'Register'}</LoginTitle>
        </Header>
        <AuthBody>
          <Title>SignIn Here</Title>
          <Form onSubmit={onSubmit}>
            <Label>Username</Label>
            <Input
              value={values.username}
              name='username'
              type='text'
              onChange={onChange}
            />

            <Label>Password</Label>
            <Input
              value={values.password}
              name='password'
              type='password'
              onChange={onChange}
            />
            {!isMember && (
              <>
                <Label>Nickname</Label>
                <Input
                  value={values.nickname}
                  name='nickname'
                  type='text'
                  onChange={onChange}
                />
              </>
            )}
            <Button type='submit'>{isMember ? 'Login' : 'Register'}</Button>
          </Form>
          <Member>
            Not a member yet?{' '}
            <span
              onClick={() => setIsMember((prevState) => !prevState)}
              style={{ color: 'var(--clr-grey-2)', cursor: 'pointer' }}
            >
              {isMember ? 'Register' : 'Login'}
            </span>
          </Member>
          {loading || registerLoading ? (
            <MuiLoader />
          ) : error || registerError ? (
            <Error>
              <MuiAlert type='error'>
                {error?.message || registerError?.message}
              </MuiAlert>
            </Error>
          ) : (
            ''
          )}
        </AuthBody>
      </Container>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 100vh;
  min-height:50rem;
  background-color:#ebfefe;
`;
const AuthBody = styled.div`
width:55%;
height:100%;
display: flex; 
align-items:center;
justify-content:center;
flex-direction:column;
gap:1rem
`
const LogoContainer = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: start;
  margin: 1.2rem 0;
`;
const LogoImage = styled.img`
  width: 55px;
`;
const LogoTitle = styled.h2`
  color: white;
  margin-left: 0.5rem;
  font-weight: 400;
  letter-spacing: 1px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--login-page-background);
  width: 90%;
  max-width: 72rem;
  height: 80vh;
  min-height: 30rem;
  box-shadow: 0px 2px 14px -2px rgba(0, 0, 0, 0.2);
  border-radius:20px
`;

const Header = styled.div`
display:flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  gap:3rem;
  text-align:center;
  padding: 2rem;
  width: 45%;
  height:100%;
  border-radius: 20px 0 0 20px;
background: rgb(51,238,235);
background: linear-gradient(180deg, rgba(51,238,235,1) 0%, rgba(104,186,236,1) 50%, rgba(147,126,220,1) 100%);
`;

const HeaderTitle = styled.h2`
  font-size: 3em;
  font-weight: 500;
  letter-spacing: 1.5px;
  color: var(--login-page-title);
`;

const HeaderText = styled.p`
  padding: 1.5rem 0 0;
  font-size: 35px;
  text-align: center;
  color: #fff;
  width:60%
`;

const LoginTitle = styled.h2`
  padding: 2rem 0px 5px;
  color: var(--login-page-title);
  font-weight: 500;
  font-size: 2em;
  letter-spacing: 1px;
  text-align: center;
  border-bottom: 1px solid var(--clr-grey);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 3rem;
  color: transparent;
  background: linear-gradient(90deg, rgba(51, 238, 235, 1) 0%, rgba(104, 186, 236, 1) 30%, rgba(147, 126, 220, 1) 100%);
  -webkit-background-clip: text; /* This is for webkit browsers like Chrome and Safari */
  background-clip: text;
  font-weight:600;
`;

const Label = styled.label`
  color: var(--login-page-title);
  margin-bottom: 0.5rem;
  width: 55%;
`;
const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.357rem 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid var(--clr-grey-2);
  background-color: var(--login-page-input);
  font-size: 100%;
  line-height: 1.15;
  width: 60%;
  border: 1px solid #fefefe;
`

const Button = styled.button`
  background-color: var(--profile-edit-btn);
  border: transparent;
  width: 55%;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  text-transform: capitalize;
  border-radius: 0.25rem;
  line-height: 1.2;
  letter-spacing: 0.5px;
  font-size: 16px;
  color: rgb(255, 255, 255);
  margin-top: 1rem;
  transition: all 0.3s ease 0s;
  &:hover {
    background-color: var(--app-primary-hover);
  }
`;

const Member = styled.p`
  margin-top: 1rem;
  color: var(--login-membe-clr);
`;

const Error = styled.div`
  width: 50%;
  text-align: center;
  margin-top: 16px;
`;
