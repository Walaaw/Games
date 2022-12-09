import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import detailstyle from './GameDetails.module.css'
export default function GameDetail() {
    let {id}=useParams()
    const [details, setdetails] = useState(null)
    async function getDetails(){
        let {data}= await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game`,
         {params: {id :id} ,
         headers: {'X-RapidAPI-Key':
        'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
         'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}
        })
      
       setdetails(data);
       
      } 
      console.log(details);
      useEffect(function(){
        getDetails();
      },[id])
    return (

        <>
        {details? <div className="container">
            <div className="row mt-5">
                <div className="col-md-4">
                    <div className="itemimage">
                        <figure>
                            <img src={details.thumbnail} alt="game" className='w-100' />
                            <div className='d-flex alifn-items-center justify-content-between mt-2'>
                                <span className=' py-2 px-3 bg-dark text-white m-1 fs-5 rounded'>Free</span>
                                <button className=' btn btn-primary w-75 m-1 fs-4 '> Play now <i className="fa-solid fa-arrow-right-to-bracket"></i></button>
                            </div>
                        </figure>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className={detailstyle.item}>
                        <h2 >{details.title}</h2>
                        <p  >{details.description}</p>
                        {details.minimum_system_requirements?<div> <h2 >minimum system requirements</h2>
                        <ul className=' list-unstyled'>
                            <li >
                                <span > {`graphics: ${details.minimum_system_requirements.graphics}`}</span>
                            </li>
                            <li >
                                <span > {`memory : ${details.minimum_system_requirements.memory }`}</span>
                            </li>
                            <li >
                                <span > {`os : ${details.minimum_system_requirements.os }`}</span>
                            </li>
                            <li >
                                <span > {`processor: ${details.minimum_system_requirements.processor}`}</span>
                            </li>
                            <li >
                                <span > {`storage: ${details.minimum_system_requirements.storage}`}</span>
                            </li>
                        </ul></div>:''}
                       
                        <h2>Overwatch 2 Screenshots</h2>
                      
                      {details.screenshots.length>0?
                       <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                       <div className="carousel-inner">
                           <div className="carousel-item active">
                           <img src= {details.screenshots[0].image} className="d-block w-100" alt="..."/>
                           </div>
                           <div className="carousel-item">
                           <img src= {details.screenshots[1].image} className="d-block w-100" alt="..."/>
                           </div>
                           <div className="carousel-item">
                           <img src= {details.screenshots[2].image} className="d-block w-100" alt="..."/>
                           </div>
                       </div>
                       <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                           <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                           <span class="visually-hidden">Previous</span>
                       </button>
                       <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                           <span class="carousel-control-next-icon" aria-hidden="true"></span>
                           <span class="visually-hidden">Next</span>
                       </button>
                       </div>
                      :''}
                        <h2>Additional Information</h2>
                        <div className="row  fs-5">
                            <div className="col-md-4">
                                <div className="item">
                                    <p>title</p>
                                    <p>{details.title}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="item">
                                    <p>Developer</p>
                                    <p>{details.developer}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="item">
                                    <p>Publisher</p>
                                    <p>{details.publisher}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row  fs-5">
                            <div className="col-md-4">
                                <div className={detailstyle.item}>
                                    <p>Release Date</p>
                                    <p>{details.release_date}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="item">
                                    <p>Genre</p>
                                    <p>{details.genre}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="item">
                                    <p>Platform</p>
                                    <p>{details.platform}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>:<div className="loadingScreen vh-100 d-flex justify-content-center align-items-center">
    <i class="fa-regular fa-circle fa-bounce fa-3x text-danger me-2"></i>
    <i class="fa-solid  fa-square fa-bounce fa-3x text-info me-2"></i>
    <i class="fa-solid fa-diamond fa-bounce fa-3x text-success me-2"></i>
    </div>}
        </>
  )
}
