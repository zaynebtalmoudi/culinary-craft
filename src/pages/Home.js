import React, { useEffect, useState } from 'react'

import RecipeItem from '../Components/RecipeItem'
import { Link } from 'react-router-dom';
import './pages.css'

function Home({ recipes, apiKey, handleAddToFavorite }) {
    // const [recipesList, setRecipesList] = useState(recipes)



    // useEffect(() => {
    //     function getRandomRecipes() {
    //         fetch(
    //             `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`
    //         )
    //             .then(response => response.json())
    //             .then(data => {
    //                 recipesList(data)
    //                 console.log(data)
    //                 console.log(recipesList)

    //             })
    //             .catch(() => {
    //                 console.log("error")
    //             })
    //     }
    //     getRandomRecipes()
    // }, [])



    return (
        <>
            <div className='recipes-container'>
                {recipes.map(val =>
                    <RecipeItem
                        id={val.id}
                        title={val.title}
                        image={val.image}
                        handleAddToFavorite={handleAddToFavorite}
                    />
                )
                }
            </div> :
            <div className='slogan'>
                <p className='text-slogan'>Say goodbye to boring meals</p>
            </div>
            <div className='sloganImg'>
                <img src={require('../images/seasoning.png')} />
            </div>
        </>
    )
}

export default Home