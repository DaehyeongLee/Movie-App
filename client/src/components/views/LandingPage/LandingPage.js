import React, {useEffect, useState} from 'react';
import {API_URL, API_KEY, IMAGE_BASE_URL} from "../../Config";
import MainImage from "./Sections/MainImage";

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        //API를 통해 영화 데이터 가져오기
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setMovies([response.results])
            setMainMovieImage(response.results[0])
        })
        
    }, [])

    return (
        <div style = {{width: '100%', margin: '0'}}>

            {/*Main Image */}
            {/*useEffect 내에서 main movie image 가져온 뒤에 랜더링이 되도록*/}
            {MainMovieImage && 
                <MainImage 
                image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`} 
                title = {MainMovieImage.original_title}
                text = {MainMovieImage.overview}/>
            }            

            <div style = {{width: '85%', margin: '1rem auto'}}>

                <h2>Movie by latest</h2>
                <hr />

                {/*Movie Grid Cards */}

            </div>
            <div style = {{display: 'flex', justifyContent: 'center'}}>

                <button>Load More</button>

            </div>

        </div>
    )
}

export default LandingPage
