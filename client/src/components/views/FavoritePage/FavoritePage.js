import React, {useEffect, useState} from 'react'
import './favorite.css';
import Axios from 'axios';

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        Axios.post('/api/favorite/getFavoritedMovie', {userFrom: localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success) {
                setFavorites(response.data.favorites)
            } else {
                alert("Failed to get Favorited movies")
            }
        })
    }, [])

    return (
        <div style = {{width: '85%', margin: '3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>
                    {Favorites.map((favorites, index) => (
                        <tr key ={index}>
                            <td>{favorites.movieTitle}</td>
                            <td>{favorites.movieRunTime}</td>
                            <td><button>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}

export default FavoritePage
