import React, {useEffect, useState} from 'react'
import Axios from 'axios'

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    useEffect(() => {
        
        let variable = {
            userFrom: userFrom,
            movieId: movieId
        }
        Axios.post('/api/favorite/favoriteNumber', variable)
        .then(response => {
            if(response.data.success) {
                setFavoriteNumber(response.data.favoriteNumber)
            } else {
                alert('Failed to get favorite number')
            }
        })
        
        Axios.post('/api/favorite/favorited', variable)
        .then(response => {
            if(response.data.success) {
                setFavorited(response.data.favorited)
            } else {
                alert('Failed to get favorited info')
            }
        })

    }, [])

    return (
        <div>
            <button>{Favorited ? "Not Favorite" : "Add to Favorite "} {FavoriteNumber}</button>
        </div>
    )
}

export default Favorite
