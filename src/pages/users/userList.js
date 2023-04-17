import React,{useState,useEffect} from 'react'
import UserCard from '../../components/userCard'
import './userList.css'
import axios from 'axios'

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    var config = {
      method: 'get',
      url: 'http://localhost:4000/user/getallusers',
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setUsers(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  },[])
  
  return (
    <div className='main-div'>
        {
            users.map((item,key)=>{
                return(
                    <UserCard key={item._id} id={item._id} name={item.username} image={item.photo} places={item.userPlaces.length}/>
                )
            })
        }
    </div>
  )
}

export default UserList;