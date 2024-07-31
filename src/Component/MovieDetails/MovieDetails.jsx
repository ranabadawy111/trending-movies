import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';


export default function MovieDetails() {
    let basedImgUrl="https://image.tmdb.org/t/p/w500";
    let params= useParams();
    const [movieDetails, setMovieDetails]=useState(null);
    async function getMovieDetails(id){
        let {data}= await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=71a0baaedaeb570c25f9f1d009282561&language=en-US`);
        setMovieDetails(data);
    }
    useEffect(()=>{
        getMovieDetails(params.id);
    }, [])
    return (
        <>
            {movieDetails?<div className="row gx-5">
                <div className="col-md-4 my-4">
                    <img className="w-100" src={basedImgUrl+movieDetails.poster_path} alt=""/>
                </div>
                <div className="col-md-8 my-5 py-5">
                    <h2>{movieDetails.title}</h2>
                    <p>{movieDetails.tagline}</p>
                    {movieDetails.genres.map((genre, index)=>
                    <div key={index} className="btn btn-primary me-3 my-3">{genre["name"]}</div>
                    )}
                    <h5 className="my-3">Vote: {movieDetails.vote_average}</h5>
                    <h5 className="my-4">vote_count: {movieDetails.vote_count}</h5>
                    <h5 className="my-4">popularity: {movieDetails.popularity}</h5>
                    <h5 className="my-4">release_date: {movieDetails.release_date}</h5>
                    <p className="my-3">{movieDetails.overview}</p>
                </div>
            </div>:<div className="vh-100 d-flex justify-content-center align-items-center">
                <i className="fa fa-spinner fa-spin fa-4x"></i>
            </div>
            }
        </>
    )
}
