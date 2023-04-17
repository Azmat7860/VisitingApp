import React, { useState,useEffect } from 'react'
import { useContext } from 'react'
import PlaceCard from '../../components/placeCard'
import { useParams } from 'react-router-dom'
import './placeList.css'
import { PlusOutlined } from '@ant-design/icons';
import { Fab } from '@mui/material';
import AddPlaceModal from './../../components/addPlaceModal';
import { authContext } from './../../context/authContext';
import axios from 'axios'

function PlaceList() {
    const [isPlaceAdd, setIsPlaceAdd] = useState(false);
    const [places,setPlaces] = useState([]);
    var userId = useParams().uid;

    useEffect(()=>{
    var config = {
      method: 'get',
      url: `http://localhost:4000/place/userplaces/${userId}`,
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      console.log(response.data);
      setPlaces(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  },[userId])

  const auth = useContext(authContext);

//   const PLACES = [
//       {
//           id:'1',
//           title:"Lahore",
//           description:"One of the most famous city of Pakistan.",
//           image:'/images/waqar.jpeg',
//           address:'Punjab, Pakistan',
//           coords:{
//               lat: 40.7484405,
//               lng: -73.9878584
//           },
//           creator:'1'
//       },
//       {
//           id:'2',
//           title:"Karachi",
//           description:"One of the most famous city of Pakistan.",
//           image:'/images/Azmat_Pashtoon.png',
//           address:'Sindh, Pakistan',
//           coords:{
//               lat: 40.7484405,
//               lng: -73.9878584
//           },
//           creator:'2'
//       },
//       {
//           id:'3',
//           title:"Lahore",
//           description:"One of the most famous city of Pakistan.",
//           image:'/images/waqar.jpeg',
//           address:'Punjab, Pakistan',
//           coords:{
//               lat: 40.7484405,
//               lng: -73.9878584
//           },
//           creator:'1'
//       },
//       {
//           id:'4',
//           title:"Islamabad",
//           description:"One of the most beautiful city of Pakistan.",
//           image:'/images/Ali_Makhdom.jpeg',
//           address:'Punjab, Pakistan',
//           coords:{
//               lat: 40.7484405,
//               lng: -73.9878584
//           },
//           creator:'3'
//       },
//       {
//         id:'5',
//         title:"Peshawar",
//         description:"One of the most beautiful city of Pakistan.",
//         image:'/images/Abubakar_Islam.jpeg',
//         address:'KPK, Pakistan',
//         coords:{
//             lat: 40.7484405,
//             lng: -73.9878584
//         },
//         creator:'4'
//     },
//     {
//         id:'4',
//         title:"Islamabad",
//         description:"One of the most beautiful city of Pakistan.",
//         image:'/images/Ali_Makhdom.jpeg',
//         address:'Punjab, Pakistan',
//         coords:{
//             lat: 40.7484405,
//             lng: -73.9878584
//         },
//         creator:'1'
//     },
//     {
//       id:'5',
//       title:"Peshawar",
//       description:"One of the most beautiful city of Pakistan.",
//       image:'/images/Abubakar_Islam.jpeg',
//       address:'KPK, Pakistan',
//       coords:{
//           lat: 40.7484405,
//           lng: -73.9878584
//       },
//       creator:'1'
//   },
//   {
//     id:'4',
//     title:"Islamabad",
//     description:"One of the most beautiful city of Pakistan.",
//     image:'/images/Ali_Makhdom.jpeg',
//     address:'Punjab, Pakistan',
//     coords:{
//         lat: 40.7484405,
//         lng: -73.9878584
//     },
//     creator:'1'
// },
// {
//   id:'5',
//   title:"Peshawar",
//   description:"One of the most beautiful city of Pakistan.",
//   image:'/images/Abubakar_Islam.jpeg',
//   address:'KPK, Pakistan',
//   coords:{
//       lat: 40.7484405,
//       lng: -73.9878584
//   },
//   creator:'1'
// }
//   ]
  // const USERS = [
  //   {
  //     id:"1",
  //     name:"Waqar",
  //     places:2,
  //     image:"/images/waqar.jpeg"
  //   },
  //   {
  //     id:"2",
  //     name:"Azmat",
  //     places:1,
  //     image:"/images/Azmat_Pashtoon.png"
  //   },
  //   {
  //     id:"3",
  //     name:"Ali",
  //     places:3,
  //     image:"/images/Ali_Makhdom.jpeg"
  //   },
  //   {
  //       id:"4",
  //       name:"Abubakar",
  //       places:3,
  //       image:"/images/Abubakar_Islam.jpeg"
  //     },
    
  // ]

  // const filteredPlaces = places.filter(place=>place.creator===userId)
  // const user = USERS.find(user=>user.id===userId)

  
  return (
    <div className='main-div'>
        <AddPlaceModal isPlaceAdd={isPlaceAdd} setIsPlaceAdd={setIsPlaceAdd} />
        {
            auth.isLoggedIn &&
        <Fab variant="success" aria-label="add" style={{position:'absolute', top:"15vh", right:"5vh"}}
         onClick={()=>setIsPlaceAdd(true)}>
            <PlusOutlined />
        </Fab>
        }
        {
            places.map((item,key)=>{
                return(
                    <PlaceCard key={item._id} place={item} />
                )
            })
        }
    </div>
  )
}

export default PlaceList