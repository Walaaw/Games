import React, { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
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

  const router= createBrowserRouter([{path:"" ,element:<Main logedUser={logedUser}  removeUser={removeUser}/> ,children:[
    {path:"home",element:<ProtectedRoute> <Home/> </ProtectedRoute>   },
    {path:"all",element:<ProtectedRoute> <All/> </ProtectedRoute>  },
    {path:"details",element:<GameDetails/>,children:[{path:':id'}]},
    {path:"plateform",element:<GamePlatform/>,children:[{path:':plateform'}]},
    {path:"category",element:<GameCategory/>,children:[{path:':cat'}]},
    {path:'sortby',element: <GameSortby/>,children:[{path:':sort'}]},
    {path:"login",element:<Login getLoggeduser={getLoggeduser}/>},
    {path:'register',element:<Register/>}
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
