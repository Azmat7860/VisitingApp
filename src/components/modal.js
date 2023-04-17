import { Modal } from 'antd';
import React from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div>{text}</div>;

const PlaceModal = ({isVisible, setIsVisible, lat,lng,title}) => {
  return (
    <>
      <Modal
        title={title}
        centered
        visible={isVisible}
        onOk={() => setIsVisible(false)}
        onCancel={() => setIsVisible(false)}
        style={{ padding: 0 }}
      >
        <div style={{ height: '50vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={{
              lat:lat,
              lng:lng,
            }}
            defaultZoom={11}
          >
            <Marker
              lat={lat}
              lng={lng}
              text="Marker"
            />
          </GoogleMapReact>
        </div>
      </Modal>
    </>
  );
};

export default PlaceModal;