import React, {useEffect} from 'react'
import Axios from 'axios'

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    useEffect(() => {
        
        let variable = {
            userFrom: userFrom,
            movieId: movieId
        }
        Axios.post('/api/favorite/favoriteNumber', variable)
        .then(response => {
            if(response.data.success) {

            } else {
                alert('Failed to get favorite number')
            }
        })

    }, [])

    return (
        <div>
            <button>Favorite</button>
        </div>
    )
}

export default Favorite
