import { Avatar, Card } from 'antd';
import React from 'react';
import './userCard.css'
import { Link } from 'react-router-dom'
const { Meta } = Card;

const UserCard = ({id, image, name, places}) => (
    
    <Link to={`/${id}/places`}>
        <Card
            id={'card-style'}
        >
            <Meta
            avatar={<Avatar src={`http://localhost:4000/${image}`} id={'avatar-style'}/>}
            title={name}
            description={places>1 ? places + "  Places" : places + " Place"}
            />
        </Card>
    </Link>
);

export default UserCard;