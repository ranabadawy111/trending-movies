import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from "./people.module.css";
import midoria from "../../images/Anime-Invierno.jpg";
import { Link } from 'react-router-dom';

export default function People() {
    let [trendingPerson, setTrendingPerson]= useState([]);
    let basedImgUrl="https://image.tmdb.org/t/p/w500";

    async function getTrendigPerson(){
        let {data}= await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=71a0baaedaeb570c25f9f1d009282561`);
        setTrendingPerson(data.results);
    }

    useEffect(()=>{
        getTrendigPerson();
    }, [])

    return (
        <>
        {setTrendingPerson?<div className="row justify-content-center">
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
            :<div className="vh-100 d-flex justify-content-center align-items-center">
            <i className="fa fa-spinner fa-spin fa-4x"></i>
            </div>
        }

        </>
    )
}
