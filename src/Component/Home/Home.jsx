import React from 'react'
import axios from 'axios'
import home from './home.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import bg from '../../images/paladins.b44d33d6e7ee1ba8.png'
export default function Home() {
  const [games, setgames] = useState(null);
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
  console.log(games);
  return (
   <>
   <div  className={`container-fluid ${home.Home}`} >
   <div className=' w-75 m-auto p-5'>
   <div className={`text-center p-1 ${home.item}`}>
    <h1>Find & track the best <span>free-to-play</span>  games!</h1>
    <p className='text-muted'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
   <Link to='/all'> <button className='btn btn-outline-secondary '> Browse Game</button></Link>
  </div> 
  </div>

    

   </div>
   <div className="container">
  <div className='d-flex justify-content-start alifn-items-center mt-5'>
   <i class="fa-solid fa-robot fa-2x text-white"></i>
   <h2>Personalized Recommendations:</h2>
  </div>
    <div className="row mt-5">
     {games?games.slice(11,14).map((game)=> <div className="col-md-4">
      <div >
        <figure>
        <Link to={`/details/${game.id}`}>
           <img src={game.thumbnail} alt="game" className='w-100' />
        </Link>
        <figcaption className='rounded d-flex justify-content-between align-items-center p-3'>
        <h6 className={` fs-6 w-50`}>{game.title}</h6>
        <div className={ `bg-info py-1 px-2 rounded fs-5 text-white`}>Free</div>
        </figcaption>
        </figure>
      </div>
    </div>):''}
    </div>
   
   </div>
   </>
  )
}
