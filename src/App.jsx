import './App.css';
import {Routes, Route, useNavigate, Navigate} from "react-router-dom";
import Home from "./Component/Home/Home";
import Movies from "./Component/Movies/Movies";
import Tvshows from "./Component/Tvshows/Tvshows";
import People from "./Component/People/People";
import Network from "./Component/Network/Network";
import About from "./Component/About/About";
import Register from './Component/Register/Register';
import Notfound from './Component/Notfound/Notfound';
import Navbar from './Component/Navbar/Navbar';
import Login from './Component/Login/Login';
import Logout from './Component/Logout/Logout';
import PersonDetails from './Component/PersonDetails/PersonDetails';
import { useState, useEffect } from 'react';
import jwtDecode from "jwt-decode";
import MovieDetails from './Component/MovieDetails/MovieDetails';
import TvshowDetails from './Component/TvshowDetails/TvshowDetails';



function App() {
  let [userData, setUserData]= useState(null);
  let navigate = useNavigate();

  function saveUserData(){
    let encodedToken= localStorage.getItem("userToken");
    let decodedToken= jwtDecode(encodedToken);
    setUserData(decodedToken);
    console.log(userData);
  }

  useEffect(()=>{
    if( localStorage.getItem("userToken")!==null)
      saveUserData();
  }, []);

  function logout(){
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }

  function ProtectedRoute(props){
    if(localStorage.getItem("userToken")==null){
      return <Navigate to="/login"/>
    }
    else{
      return props.children;
    }
  }

  return (
    <>
     <Navbar userData={userData} logout={logout}/>
     <div className="container">
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>

        <Route path="movies" element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
        <Route path="movieDetails" element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}>
            <Route path=":id" element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}/>
        </Route>
        <Route path="tvshows" element={<ProtectedRoute><Tvshows/></ProtectedRoute>}/>
        <Route path="tvshowDetails" element={<ProtectedRoute><TvshowDetails/></ProtectedRoute>}>
            <Route path=":id" element={<ProtectedRoute><TvshowDetails/></ProtectedRoute>}/>
        </Route>

        <Route path="people" element={<ProtectedRoute><People/></ProtectedRoute>}/>
        <Route path="personDetails" element={<PersonDetails/>}>
            <Route path=":id" element={<ProtectedRoute><PersonDetails/></ProtectedRoute>}/>
        </Route>
        <Route path="network" element={<Network/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="login" element={<Login saveUserData={saveUserData}/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="login" element={<Logout/>}/>
        <Route path="*" element={<Notfound/>}/>
      </Routes>
     </div>
    </>
  );
}

export default App;
