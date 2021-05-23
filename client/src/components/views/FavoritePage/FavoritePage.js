import React, {useEffect, useState} from 'react'
import './favorite.css';
import Axios from 'axios';
import {Popover} from 'antd';
import {IMAGE_BASE_URL} from '../../Config';

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])
    const fatchFavoriteList = () => {
        Axios.post('/api/favorite/getFavoritedMovie', {userFrom: localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success) {
                setFavorites(response.data.favorites)
            } else {
                alert("Failed to get Favorited movies")
            }
        })
    }

    useEffect(() => {
        fatchFavoriteList()
    }, [])

    const onClickDelete = (movieId, userFrom) => {

        const variable = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFavorite', variable)
        .then(response => {
            if(response.data.success) {
                fatchFavoriteList()
            } else {
                alert ("Failed to remove favorite.")
            }
        })
    }

    const renderTable = Favorites.map((favorites, index) => {

        const content = (
            <div>
                {favorites.moviePost ?
                    <img src={`${IMAGE_BASE_URL}w500${favorites.moviePost}`} /> : "no image"
                }
            </div>
        )      
        
        //Popover는 이미지tooltip을 위함
        return <tr key ={index}>
            <Popover content = {content} title={`${favorites.movieTitle}`}>
                <td>{favorites.movieTitle}</td>
            </Popover>                            
            <td>{favorites.movieRunTime}</td>
            <td><button onClick={() => onClickDelete(favorites.movieId, favorites.userFrom)}>Remove</button></td>
        </tr>
    })

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
                    {renderTable}
                </tbody>
            </table>
            
        </div>
    )
}

export default FavoritePage
