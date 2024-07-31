import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from "./Movies.module.css";
import { Link } from 'react-router-dom';

export default function Movies() {
    let [trendingMovie, setTrendingMovie]= useState([]);
    let basedImgUrl="https://image.tmdb.org/t/p/w500";
    
    let nums= new Array(13).fill(1).map((element, index)=> index+1);
    async function getTrendingMovies(pageNumber){
        let {data}= await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=71a0baaedaeb570c25f9f1d009282561&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`);
        setTrendingMovie(data.results);
    }

    useEffect(()=>{
        getTrendingMovies(1);
    }, [])
    
    return (
        <>
        {
            setTrendingMovie?<div className="row justify-content-center">
            <div className="col-md-4">
                <div className="welcome my-4">
                    <div className={`${styles.brdr} w-25 my-4`}></div>
                        <h2>Trending</h2>
                        <h2>mvies</h2>
                        <h2>to watch now</h2>
                        <p>most watched movies by day</p>
                    <div className={`${styles.brdr} w-100 my-4`}></div>
                </div>
            </div>
            {trendingMovie.map((movie)=>  
            <div key={movie.id} className="col-md-2">
                <div className="movie my-3">
                    <Link to={`/movieDetails/${movie.id}`}>
                        <img className="w-100 my-2" src={basedImgUrl + movie.poster_path} alt=""/>
                        <h2 className="h6">{movie.title}</h2>
                    </Link>
                </div>
            </div>)}

            <nav aria-label="..." className="py-5">
            <ul className="pagination pagination-sm d-flex justify-content-center">
                { nums.map((pageNum)=> <li key={pageNum} className="page-item">
                <a onClick={()=> getTrendingMovies(pageNum)} className="page-link bg-transparent text-white">{pageNum}</a>
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
