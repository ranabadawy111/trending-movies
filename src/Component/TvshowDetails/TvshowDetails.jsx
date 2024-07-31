import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';

export default function TvshowDetails() {
    let basedImgUrl="https://image.tmdb.org/t/p/w500";
    let params= useParams();
    const [tvshowDetails, setTvshowDetails]=useState(null);
    async function getTvshowDetails(id){
        let {data}= await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=71a0baaedaeb570c25f9f1d009282561&language=en-US`);
        setTvshowDetails(data);
    }
    useEffect(()=>{
        getTvshowDetails(params.id);
    }, []);
    return (
        <>
         {
            tvshowDetails?<div className="row gx-5">
            <div className="col-md-4 my-4">
                <img className="w-100" src={basedImgUrl+tvshowDetails.poster_path} alt=""/>
            </div>
            <div className="col-md-8 my-5 py-3">
                <h2>Original Name: {tvshowDetails.original_name}</h2>
                <p>Name: {tvshowDetails.name}</p>
                {tvshowDetails.genres.map((genre, index)=>
                <div key={index} className="btn btn-primary me-3 my-3">{genre["name"]}</div>
                )} 
                <h5 className="my-3">episode_number: {tvshowDetails.last_episode_to_air.episode_number}</h5>
                <h5 className="my-3">Vote: {tvshowDetails.vote_average}</h5>
                <h5 className="my-4">vote_count: {tvshowDetails.vote_count}</h5>
                <h5 className="my-4">popularity: {tvshowDetails.popularity}</h5>
                <h5 className="my-4">release_date: {tvshowDetails.first_air_date}</h5>
                <p className="my-3">{tvshowDetails.overview}</p>
            </div>
            </div>
            :<div className="vh-100 d-flex justify-content-center align-items-center">
                <i className="fa fa-spinner fa-spin fa-4x"></i>
            </div>
            }
        </>
    )
}






