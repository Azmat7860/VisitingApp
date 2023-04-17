import React, { useState } from "react";
import { Alert, Button, Form, Input, Upload } from "antd";
import "./signup.css";
import {
  PlusOutlined,
  MailOutlined,
  LockOutlined,
  UserOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [photo,setPhoto] = useState();
  // const [username,setUsername] = useState();
  // const [email,setEmail] = useState();
  // const [password,setPassword] = useState();


  
  const onFinish = (values) => {
    console.log("Success:", values);

    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("file", photo);

    var config = {
      method: "POST",
      url: "http://localhost:4000/user/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response));
        setIsRegistered(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      { isRegistered && 
        <Alert style={{fontSize: "20px", textAlign:"center", padding:"10px"}}
          message="User Registered Successfully"
          type="success"
          onClose={() => setIsRegistered(false)}
          closable
          closeIcon={<CloseOutlined style={{fontSize:"20px"}} />}
        />
      }
       <Form
        name="normal_login"
        id={"signup-form"}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        encType="multipart/form-data"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" type={"email"} />
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

        <Form.Item valuePropName="fileList">
          <Upload onChange={(e)=>setPhoto(e.fileList[0].originFileObj)} name="fileList" listType="picture-card" accept=".jpg, .png, .jpeg">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Profile Picture</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Register
          </Button>
        </Form.Item>

        <Form.Item>
          <Link to={"/login"}>Already have an account?</Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default Signup;
