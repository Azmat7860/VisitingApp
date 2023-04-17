import {
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Image, Popconfirm, message } from "antd";
import React, { useState } from "react";
import { useContext } from "react";
import PlaceModal from "./modal";
import "./placeCard.css";
import EditPlaceModal from "./editPlaceModal";
import { authContext } from "./../context/authContext";
import axios from "axios";

const { Meta } = Card;

const PlaceCard = ({ place, user }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaceVisible, setIsPlaceVisible] = useState(false);
  const auth = useContext(authContext);

  const confirm = (id) => {
    console.log(id);
    // message.success("Click on Yes");
    onDelete(id);
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Your Data is Save.");
  };

  const onDelete = (id) => {
    console.log("id", id);

    var config = {
      method: "delete",
      url: `http://localhost:4000/place/${id}`,
      headers: {
        "Authorization": "Bearer " + auth.userData.token
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        message.success('Deleted Successfully');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <EditPlaceModal
        isPlaceVisible={isPlaceVisible}
        setIsPlaceVisible={setIsPlaceVisible}
        place={place}
      />
      <PlaceModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        lat={place.latitude}
        lng={place.longitude}
        title={place.placename}
      />
      <Card
        id="card"
        cover={<Image alt="Image" src={place?.image} />}
        actions={
          auth.isLoggedIn ?
          [
                <EyeOutlined key="view" onClick={() => setIsVisible(true)} />,
                <EditOutlined
                  key="edit"
                  onClick={() => setIsPlaceVisible(true)}
                />,
                <Popconfirm
                  title="Are you sure to delete this place?"
                  onConfirm={()=>confirm(place._id)}
                  onCancel={cancel}
                  okText="Delete"
                  cancelText="Cancel"
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                >
                  <DeleteOutlined key="delete" />
                </Popconfirm>,
          ]
          : 
          [<EyeOutlined key="view" onClick={() => setIsVisible(true)} />]
        }
      >
        <Meta
          avatar={<Avatar src={user?.image} />}
          title={place.placename}
          description={place.address}
        />
      </Card>
    </div>
  );
};

export default PlaceCard;
