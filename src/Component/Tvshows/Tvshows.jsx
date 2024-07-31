import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from "./tvshows.module.css";
import { Link } from 'react-router-dom';

export default function Tvshows() {
    
    let [trendingTvshows, setTrendingTvshows]= useState([]);
    let basedImgUrl="https://image.tmdb.org/t/p/w500";
    let nums= new Array(13).fill(1).map((element, index)=> index+1);

    async function getTrendingTvshows(pageNumber){
        let {data}= await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=71a0baaedaeb570c25f9f1d009282561&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`);
        setTrendingTvshows(data.results);
    }

    useEffect(()=>{   
        getTrendingTvshows(1);
    }, []);

    return (
        <>
        {
            setTrendingTvshows?<div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="welcome my-4">
                        <div className={`${styles.brdr} w-25 my-4`}></div>
                            <h2>Trending</h2>
                            <h2>Tv Shows</h2>
                            <h2>to watch now</h2>
                            <p>most watched tv shows by day</p>
                        <div className={`${styles.brdr} w-100 my-4`}></div>
                    </div>
                </div>
                {trendingTvshows.map((tv)=>  
                <div key={tv.id} className="col-md-2">
                    <div className="tvshows my-3">
                        <Link to={`/tvshowDetails/${tv.id}`}>
                            <img className="w-100 my-2" src={basedImgUrl + tv.poster_path} alt=""/>
                            <h2 className="h6">{tv.name}</h2>
                        </Link>
                    </div>
                </div>)}
                <nav aria-label="..." className="py-5">
                <ul className="pagination pagination-sm d-flex justify-content-center">
                    { nums.map((pageNum)=> <li key={pageNum} className="page-item">
                    <a onClick={()=> getTrendingTvshows(pageNum)} className="page-link bg-transparent text-white">{pageNum}</a>
                    </li>
                    )} 
                </ul>
                </nav>
            </div>  
            :<div className="vh-100 d-flex justify-content-center align-items-center">
                <i className="fa fa-spinner fa-spin fa-4x"></i>
            </div>
        }
            
        </>
    )
}
