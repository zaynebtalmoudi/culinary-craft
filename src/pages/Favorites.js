import React from 'react'
import RecipeItem from '../Components/RecipeItem'
function Favorites({ favoritesList }) {


    return (
        <>
            {
                !favoritesList &&
                <div>
                    <h1>
                        Your Favorite List is empty
                    </h1>
                    <img src='../images/recipe.png' />
                </div>
            }
            <h1>
                Your Favorite List
            </h1>
            <div className='recipes-container'>
                {favoritesList.map(val =>
                    <RecipeItem
                        id={val.id}
                        title={val.title}
                        image={val.image}
                    />
                )
                }
            </div>
        </>
    )
}

export default Favorites