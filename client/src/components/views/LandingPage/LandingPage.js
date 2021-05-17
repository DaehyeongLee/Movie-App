import React, {useEffect, useState} from 'react';
import {API_URL, API_KEY, IMAGE_BASE_URL} from "../../Config";
import MainImage from "./Sections/MainImage";
import GridCards from "../commons/GridCards";
import {Row} from "antd";

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [currentPage, setcurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetchMovies(endpoint)
        
    }, [])
    
    const fetchMovies = (endpoint) => {
        //API를 통해 영화 데이터 가져오기
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            //Load more button 눌렀을 때 뒤에 붙어서 Grid Card가 나오게끔
            setMovies([...Movies, ...response.results])
            setMainMovieImage(response.results[0])
            setcurrentPage(response.page)
        })
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;

        fetchMovies(endpoint)
    }

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
                {/*Antd-Row gutter: 사이의 여백 px */}
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>                

            </div>
            <div style = {{display: 'flex', justifyContent: 'center'}}>

                <button onClick={loadMoreItems}>Load More</button>

            </div>

        </div>
    )
}

export default LandingPage
