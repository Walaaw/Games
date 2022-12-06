import React, { useEffect, useState } from 'react';
import './App.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Main from './Component/Main/Main';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import Home from './Component/Home/Home';
import All from './Component/All/All';
import GameDetails from './Component/GameDetails/GameDetail';
import jwtDecode from 'jwt-decode';
import GamePlatform from './Component/GamePlateform/GamePlatform';
import GameCategory from './Component/GameCategory/GameCategory';
import GameSortby from './Component/GameSortby/GameSortby';
import NotFound from './Component/NotFound/NotFound';
function App() {
  const [logedUser, setlogedUser] = useState(null);
  function getLoggeduser() {

    let incodededData=localStorage.getItem('token')
    let docodedData=jwtDecode(incodededData);
    setlogedUser(docodedData);
  }
  function removeUser() {
    localStorage.removeItem('token');
    setlogedUser(null);
  }
  function checkReload() {
    if(localStorage.getItem('token')!=null &&logedUser==null)
    {
      getLoggeduser();
    }
  }
  useEffect(function(){
    checkReload();
  },[])
  function ProtectedRoute(props){
    if(logedUser===null){
       return <Login/>
    }
    else{
      return <>
       {props.children}
      </>
    }
  }
  console.log(logedUser);

  const router= createHashRouter([{path:"" ,element:<Main logedUser={logedUser}  removeUser={removeUser}/> ,children:[
    {path:"",element:<Home/>},
    {path:"home",element: <ProtectedRoute><Home/></ProtectedRoute> },
    {path:"all",element:<ProtectedRoute><All/></ProtectedRoute> },
    {path:"details",element: <ProtectedRoute><GameDetails/></ProtectedRoute>,children:[{path:':id'}]},
    {path:"plateform",element: <ProtectedRoute> <GamePlatform/></ProtectedRoute>,children:[{path:':plateform'}]},
    {path:"category",element:<ProtectedRoute><GameCategory/></ProtectedRoute> ,children:[{path:':cat'}]},
    {path:'sortby',element: <ProtectedRoute><GameSortby/></ProtectedRoute> ,children:[{path:':sort'}]},
    {path:"login",element:<Login getLoggeduser={getLoggeduser}/>},
    {path:'register',element:<Register/>},
    {path:'*',element:<NotFound/>}
  ]}])
  return (
   <>
   <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
   </>
  );
}

export default App;
