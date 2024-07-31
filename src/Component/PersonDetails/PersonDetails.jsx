import React, { useEffect, useState} from 'react'
import {useParams } from 'react-router-dom';
import axios from 'axios';

export default function PersonDetails() {

    let params= useParams();
    let [details, setDetails]= useState({});
    let basedImgUrl="https://image.tmdb.org/t/p/w500";

    async function getMovieDetails(id){
        let {data}= await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=71a0baaedaeb570c25f9f1d009282561&language=en-US`);
        setDetails(data);
    }
    useEffect(()=>
    {
        getMovieDetails(params.id);
    }, [])
    return (
        <>
        {
            setDetails?<div className="row gx-5">
                <div className="col-md-4 mt-5">
                    <img className="w-100" src={basedImgUrl+ details.profile_path} alt=""/>
                </div>
                <div className="col-md-8 my-5">
                    <h4 className="my-4">name:  {details.name}</h4>
                    <h4 className="my-4">birthday:  {details.birthday}</h4>
                    <h4 className="my-4">place of birth:  {details.place_of_birth}</h4>
                    <h4 className="my-4">popularity:  {details.popularity}</h4>
                    <h4 className="my-4">biography: <br/><br/> {details.biography}</h4>
                </div>
            </div>
            :<div className="vh-100 d-flex justify-content-center align-items-center">
            <i className="fa fa-spinner fa-spin fa-4x"></i>
        </div>
        }
            
        </>
    )
}
