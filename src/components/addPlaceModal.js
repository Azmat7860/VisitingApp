import React from "react";
import { Modal } from "antd";
import { Button, Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  // LockOutlined,
  // UserOutlined,
  DragOutlined,
  HomeOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
// import { Link } from "react-router-dom";
import { useContext,useState } from "react";
import { authContext } from "../context/authContext";
import axios from "axios";

const AddPlaceModal = ({ isPlaceAdd, setIsPlaceAdd }) => {
  const auth = useContext(authContext);
  const[image,setImage] = useState();

  const onFinish = (values) => {
    console.log("Success:", values);
    
    const formData = new FormData();
    formData.append("placename", values.placename);
    formData.append("address", values.address);
    formData.append("latitude", values.latitude);
    formData.append("longitude", values.longitude);
    formData.append("file", image);
    formData.append('userId', auth.userData.user._id);
    // values["userId"] = auth.userData._id;
    
        var config = {
      method: "post",
      url: "http://localhost:4000/place/addplace",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + auth.userData.token

      },
      data: formData,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        console.log("Data:" + auth.userData.user._id)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Modal
        title={"Add New Place"}
        centered
        visible={isPlaceAdd}
        onOk={() => setIsPlaceAdd(false)}
        onCancel={() => setIsPlaceAdd(false)}
        style={{ padding: "0", margin: "0" }}
      >
        <Form
          name="normal_login"
          // className="login-form"
          // id='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          encType="multipart/form-data"
        >
          <Form.Item
            name="placename"
            rules={[
              {
                required: true,
                message: "Please input your PlaceName!",
              },
            ]}
          >
            <Input
              prefix={<HomeOutlined className="site-form-item-icon" />}
              placeholder="Place Name"
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your Address!",
              },
            ]}
          >
            <Input
              prefix={<EnvironmentOutlined />}
              type="text"
              placeholder="Address"
            />
          </Form.Item>
          <Form.Item
            name="latitude"
            rules={[
              {
                required: true,
                message: "Please input your Latitude!",
              },
            ]}
          >
            <Input
              prefix={<DragOutlined />}
              type="number"
              placeholder="Latitude"
            />
          </Form.Item>
          <Form.Item
            name="longitude"
            rules={[
              {
                required: true,
                message: "Please input your Longitude!",
              },
            ]}
          >
            <Input
              prefix={<DragOutlined />}
              type="number"
              placeholder="Longitude"
            />
          </Form.Item>

          <Form.Item label="" valuePropName="fileList">
            <Upload onChange={(e)=>setImage(e.fileList[0].originFileObj)} name="fileList" listType="picture-card" accept=".png , .jpg, .jpeg">
              <div>
                <PlusOutlined />
                <div
                  style={{
                    // marginTop: 8,
                    margin: 8,
                    padding: 8,
                  }}
                >
                  Upload Images
                </div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPlaceModal;
