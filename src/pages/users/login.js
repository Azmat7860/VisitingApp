import React from "react";
import { useContext, useState } from "react";
import { LockOutlined, MailOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Alert } from "antd";
import { Link } from "react-router-dom";
import "./login.css";
import { authContext } from "./../../context/authContext";
import axios from "axios";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useContext(authContext);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    var config = {
      method: "POST",
      url: "http://localhost:4000/user/login",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer " + auth.userData.token
      },
      data: values,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        auth.setUser(response.data);
        auth.login();
        if (response.response.status === 404) 
        {
          setIsLoggedIn(true);
        }
      })
      .catch(function (error) {
        if (error) {
          setIsLoggedIn(true);
        }
        // console.log(error);
      });
  };

  return (
    <>
      {isLoggedIn && (
        <Alert style={{fontSize: "20px", textAlign:"center", padding:"10px"}}
          message="InValid Email or Password!"
          type="error"
          onClose={() => setIsLoggedIn(false)}
          closable
          closeIcon={<CloseOutlined style={{fontSize:"20px"}} />}
        />
      )}
      <Form
        name="normal_login"
        id={"login-form"}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            type={"email"}
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>

        <Form.Item>
          <Link to={"/register"}>Register Now!</Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
