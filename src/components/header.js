import React from 'react';
import { useContext } from 'react';
import { Button, PageHeader } from 'antd';
import { Link } from 'react-router-dom';
import { authContext } from './../context/authContext';

const Header = () => {
  const auth = useContext(authContext);
  console.log(auth.userData);
  

  
  return(
  <PageHeader
    title="MERN PROJECT"
    extra={ auth.isLoggedIn ?
      [
        <Link to={"/"}>
            <Button key="3">Home</Button>
        </Link>,
        <Link to={`/${auth.userData._id}/places`}>
        <Button key="2">My Places</Button>
        </Link>,
        <Link to={"/logout"}>
            <Button key="1" type="primary" onClick={auth.logout} >Logout</Button>
        </Link>,
    ]
    :
    [
      <Link to={"/"}>
            <Button key="3">Home</Button>
        </Link>,
         <Link to={"/login"}>
         <Button key="1" type="primary">Login</Button>
     </Link>,

    ]
  }
    avatar={{
      src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
      // src: `http://localhost:4000/${auth.userData.user.photo}`,
    }}
  >
  </PageHeader>
)};

export default Header;