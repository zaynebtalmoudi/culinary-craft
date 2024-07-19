import React, { useState, useEffect } from 'react'

function SearchedRecipes({ listByKeyWord }) {

    return (
        <>
            <div>
                <p>Recipe List :</p>
                <ul>
                    {listByKeyWord.map((recipe) => {
                        <>
                            <li key={recipe.id}> {recipe.title} </li>
                            <img src={recipe.image} alt="" />
                        </>
                    }
                    )}
                </ul>
            </div>
        </>
    )
}
export default SearchedRecipes