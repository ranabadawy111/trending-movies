`import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from "./home.module.css";
import midoria from "../../images/Anime-Invierno.jpg";
import { Link } from 'react-router-dom';

export default function Home() {
    let [trendingMovie, setTrendingMovie]= useState([]);
    let [trendingTvshows, setTrendingTvshows]= useState([]);
    let [trendingPerson, setTrendingPerson]= useState([]);
    let basedImgUrl="https://image.tmdb.org/t/p/w500";
     // https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=71a0baaedaeb570c25f9f1d009282561
    // "https://api.themoviedb.org/3/trending/" +  mediaType + "/day?api_key=71a0baaedaeb570c25f9f1d009282561"
    
    async function getTrendingItems(mediaType, callback){
        let {data}= await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=71a0baaedaeb570c25f9f1d009282561`);
        callback(data.results);
    };
   
    useEffect(()=>{
        getTrendingItems("movie", setTrendingMovie);
        getTrendingItems("tv", setTrendingTvshows);
        getTrendingItems("person", setTrendingPerson);

    }, [])
    
    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <div className="welcome my-4">
                        <div className={`${styles.brdr} w-25 my-4`}></div>
                            <h2>Trending</h2>
                            <h2>mvies</h2>
                            <h2>to watch now</h2>
                            <p>most watched movies by day</p>
                        <div className={` ${styles.brdr} w-100 my-4 `}></div>
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
            </div>

            <div className="row">
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
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="welcome my-4">
                        <div className={`${styles.brdr} w-25 my-4`}></div>
                            <h2>Trending</h2>
                            <h2>Persons</h2>
                            <h2>to watch now</h2>
                            <p>most watched persons by day</p>
                        <div className={`${styles.brdr} w-100 my-4`}></div>
                    </div>
                </div>
                {trendingPerson.map((person)=>  
                <div key={person.id} className="col-md-2">
                    <div className="person my-3">
                        <Link to={`/PersonDetails/${person.id}`}>
                            {person.profile_path? <img className="w-100 my-2" src={basedImgUrl + person.profile_path} alt=""/>:
                            <img className="w-100 my-2" src={midoria} alt=""/>
                            }
                            <h2 className="h6">{person.name}</h2>
                        </Link>
                    </div>
                </div>)}
            </div>
        </>
    )
}
