import React, {useEffect, useState} from 'react'
import {Row} from 'antd'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../commons/GridCards'

function MovieDetail(props) {

    let movieId = props.match.params.movieId; //URL에서 movieId를 가져옴(App.js의 :movieId)
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {

        let endpointCast = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            setMovie(response)
        })

        fetch(endpointCast)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast)
        })
       
    }, [])

    const ActorToggleView = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <div>

            {/*Header */}
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                title = {Movie.original_title}
                text = {Movie.overview}
            />
        
            {/*Body */}
            <div style = {{width: '85%', margin: '1rem auto'}}>

                {/*Movie Info */}
                <MovieInfo 
                    movie={Movie}
                />

                <br />
                {/*Actors Grid */}
                <div style = {{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button onClick={ActorToggleView}>View Actors</button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={cast.profile_path ?
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    castName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                }                

            </div>

        </div>
    )
}

export default MovieDetail
