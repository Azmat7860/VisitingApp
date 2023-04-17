import React, { useState } from "react";
import { Modal } from "antd";
import { Button, Form, Input, Upload, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  // LockOutlined,
  // UserOutlined,
  DragOutlined,
  HomeOutlined,
  ShopOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { authContext } from "../context/authContext";
// import { Link } from "react-router-dom";
import axios from "axios";

const EditPlaceModal = ({ isPlaceVisible, setIsPlaceVisible, place }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const auth = useContext(authContext);


  // const [placename, setPlaceName] = useState("");
  // const [address, setAddress] = useState("");
  // const [latitude, setLatitude] = useState("");
  // const [longitude, setLongitude] = useState("");

  const id = place._id;
  const onFinish = (values) => {
    console.log("Success:", values);

    var config = {
      method: "post",
      url: `http://localhost:4000/place/${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + auth.userData.token

      },
      data: values,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setIsUpdated(true);
        setIsPlaceVisible(false);
      })
      .catch(function (error) {
        console.log(error);
        alert("Sorry Something went wrong!");
      });
  };

  return (
    <>
      {isUpdated && (
        <Alert
          message="Data Updated Successfully"
          type="success"
          onClose={() => setIsUpdated(false)}
          closable
          closeIcon={<CloseOutlined />}
        />
      )}
      <Modal
        title={"Edit Place"}
        centered
        visible={isPlaceVisible}
        onOk={() => setIsPlaceVisible(false)}
        onCancel={() => setIsPlaceVisible(false)}
        style={{ padding: "0", margin: "0" }}
      >
        <Form
          name="edit_place"
          // className="login-form"
          // id='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
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
              prefix={<ShopOutlined className="site-form-item-icon" />}
              placeholder="Place Name"
              // value={placename}
              // onChange={(e) => setPlaceName(e.target.value)}
            />
            {/* <input type={'hidden'} value={placename}/> */}
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
              prefix={<HomeOutlined />}
              type="text"
              placeholder="Address"
              // onChange={(e) => setAddress(e.target.value)}
              // value={address}
            />
            {/* <input type={'hidden'} value={address}/> */}
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
              // onChange={(e) => setLatitude(e.target.value)}
              // value={latitude}
            />
            {/* <input type={'hidden'} value={latitude}/> */}
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
              // onChange={(e) => setLongitude(e.target.value)}
              // value={longitude}
            />
            {/* <input type={'hidden'} value={longitude}/> */}
          </Form.Item>

          <Form.Item label="" valuePropName="fileList">
            <Upload
              name="fileList"
              action="http://localhost:4000/place/upload"
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditPlaceModal;
