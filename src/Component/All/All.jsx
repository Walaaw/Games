import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import allStyle from './All.module.css' 
export default function All() {
const [games, setgames] = useState(null);
const [slice, setslice] = useState(20);
useEffect(() => {
  getGamesApi();
}, [])
  async function getGamesApi(){
   let{data}= await axios.get("https://free-to-play-games-database.p.rapidapi.com/api/games",{headers: {'X-RapidAPI-Key':
   'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}
   })
   setgames(data);
  }
  function getMoreGames(){
   let newslice=slice+10;
   setslice(newslice)
  }
  
  return (
   <>
   <div className="container">
    <div className="row pt-5">
    {games?games.slice(0,slice).map((game,idx)=>  
    <div key={idx}className="col-lg-3 col-md-6">
       
        <div className={allStyle.item}>
          <figure>
          <Link to={`/details/${game.id}`}>
           <img src={game.thumbnail} alt="game" className='w-100' />
        </Link>
            <figcaption className={`p-4  rounded position-relative`}>
              <h6 className={`w-75 ${allStyle.desc}`}>{game.title}</h6>
              <div className={ `bg-info py-1 px-2 rounded ${allStyle.free}`}>Free</div>
              <p className={allStyle.desc}>{game.short_description}</p>
              <div className=' d-flex justify-content-between align-items-center'>
              <i class="fa-regular fa-square-plus text-white"></i>
                 <div>
                 <span className='text-dark bg-secondary rounded-pill py-1 px-2 me-2'>{game.genre}</span>
                  {game.platform==="PC (Windows)"?<i className="fa-brands fa-windows text-secondary"></i>:<i className="fa-solid fa-window-maximize text-secondary"></i>}

                 </div>
              </div>
            </figcaption>
          </figure>

        </div>
    </div> 
      ):<div className="loadingScreen vh-100 d-flex justify-content-center align-items-center">
    <i class="fa-regular fa-circle fa-bounce fa-3x text-danger me-2"></i>
    <i class="fa-solid  fa-square fa-bounce fa-3x text-info me-2"></i>
    <i class="fa-solid fa-diamond fa-bounce fa-3x text-success me-2"></i>
    </div>}
    </div>
    <button onClick={getMoreGames} className=' btn btn-outline-secondary d-block m-auto my-3'> more games</button>
   </div>
  
   </>
  )
}
