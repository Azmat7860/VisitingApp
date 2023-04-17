import './App.css';
import { Routes, Route, Navigate} from 'react-router-dom';
import { useState } from 'react';
import UserList from './pages/users/userList';
import PlaceList from './pages/places/placeList';
import Header from './components/header';
import Signup from './pages/users/signup';
import Login from './pages/users/login';
import { authContext } from './context/authContext';
import AddPlaceModal from './components/addPlaceModal';
import EditPlaceModal from './components/editPlaceModal';
function App() {
  
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  function login(){
    setIsLoggedIn(true);
  }
  function logout(){
    setIsLoggedIn(false);
  }

  const [userData, setUserData] = useState(null);
  const setUser = (data) => {
    console.log("API RESPONSE: " + data);
    setUserData(data);
  }
  const clearUser = () => {
    setUserData(null);
  }

  return (
    <authContext.Provider value={{isLoggedIn,login,logout, setUser,clearUser,userData}}>
    <div className="App">
      <div className="App-header">
        <Header/>
      </div>
      {
        isLoggedIn ?
      
      <Routes>
        <Route path="/" element={<UserList/>} />
        <Route path="/:uid/places" element={<PlaceList/>} />
        <Route path="/places/add" element={<AddPlaceModal/>} />
        <Route path="/places/edit" element={<EditPlaceModal/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      :
      <Routes>
        <Route path="/" element={<UserList/>} />
        <Route path="/:uid/places" element={<PlaceList/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      }
    </div>
    </authContext.Provider>
  );
}

export default App;
