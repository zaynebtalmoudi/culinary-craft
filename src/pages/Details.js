import React, { isValidElement, useEffect, useState } from 'react'
import './Details.css'
import { CheckBadgeIcon, BookmarkIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/16/solid'
import { useParams } from 'react-router-dom'



const Details = ({ apiKey, handleAddToFavorite }) => {
    const [details, setDetails] = useState(null);
    const [nutrition, setNutrition] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        function getDetails() {
            fetch(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
            )
                .then(response => response.json())
                .then(data => {
                    setDetails(data)
                    console.log(data)
                    console.log(details)

                })
                .catch(() => {
                    console.log("error")
                })
        }
        getDetails()

        function getNutrition() {
            fetch(
                `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${apiKey}`
            )
                .then(response => response.json())
                .then(data => {
                    setNutrition(data)
                    console.log(data)
                    console.log(nutrition)
                })
                .catch(() => {
                    console.log("error")
                })
        }
        getNutrition()



    }, [])

    return (
        <>
            {
                details && nutrition ?

                    <div className='details-container' >
                        <div className='brief-Details'>

                            <div className="h-70 overflow-hidden rounded-xl group m-5">
                                <img
                                    src={`${details.image}`}
                                    className="w-90 h-full object-cover block group-hover:scale-105 duration-300"
                                />
                            </div>
                            {/* <div className="details-image">
                                <img style={{ borderRadius: '5px' }} src={`${details.image}`} />
                            </div> */}
                            <div className="details">
                                <div className='BookmarkIcon' onClick={() => { handleAddToFavorite(details) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
                                        <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                                    </svg>
                                </div>
                                {/* <BookmarkIcon className='BookmarkIcon' width={30} height={30} /> */}
                                <h1>{details.title}</h1>
                                <div className='figures'>
                                    <ul>
                                        <li>{details.extendedIngredients.length}<div>Ingredients</div> </li>
                                        <li className='vertical-seperator'></li>
                                        <li>{details.readyInMinutes} <div>Minutes</div></li>
                                        <li className='vertical-seperator' ></li>
                                        <li>{nutrition.calories}<div>Calories</div></li>
                                    </ul>
                                </div>

                                {/* --------- DESCRIPTION ------ */}
                                {/* <div className='description'>
                                    <h3 className='recipe-details-title desciption-title' >servings</h3>
                                    <div className='horizontal-line description-line' ></div>
                                    <p>{ }</p>
                                </div> */}
                            </div>

                        </div>

                        {/* ------------ INGREDIENT ------------ */}
                        <div className='ingredients'>
                            <h3 className='recipe-details-title ingredient-title'>Ingredients</h3>
                            {/* <div className='horizontal-line ingredient-line' ></div> */}
                            <ul>
                                {details.extendedIngredients.map(i =>
                                    <li>
                                        <div>
                                            <div className='checkBadgeIcon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-patch-check" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                                </svg>
                                            </div>
                                            {i.original}

                                        </div>
                                    </li>)}
                                {/* <li> <div><CheckBadgeIcon className='checkBadgeIcon' width={22} height={22} /> vsdgdfgdfhfhfh  </div></li> */}

                            </ul>

                            {/*---------- Clipboard --------*/}
                            <div className='horizontal-line clipboard-line-top' ></div>
                            <div className='clipboard'>
                                <div className='ClipboardDocumentCheckIcon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-basket2" viewBox="0 0 16 16">
                                        <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z" />
                                        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z" />
                                    </svg>
                                </div>
                                {/* <ClipboardDocumentCheckIcon className='ClipboardDocumentCheckIcon' width={30} height={30} /> */}
                                <span>Add ingredients to Shopping List</span>
                            </div>
                            <div className='horizontal-line clipboard-line-bottom' ></div>
                        </div>

                        {/* ---------- DIRECTION ----------- */}
                        <div className='directions' >
                            <h3 className='recipe-details-title direction-title'>Directions</h3>
                            {/* <div className='horizontal-line direction-line' ></div> */}
                            <ul>
                                {
                                    details.analyzedInstructions.flatMap(val => val.steps)
                                        .map(step => <li>
                                            <div>
                                                <div className='checkBadgeIcon'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
                                                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                                                    </svg>
                                                </div>
                                                step {step.number} :  {step.step}
                                            </div>
                                        </li>

                                        )

                                }


                            </ul>
                        </div>

                        {/* ---------- NUTRITION ----------- */}
                        <div className='nutrition'>
                            <h3 className='recipe-details-title'>Nutritions</h3>
                            <div className="nutrition-details">
                                <ul className='nutrition-titles'>
                                    <li>Calories</li>
                                    <li>CARBS</li>
                                    <li>FAT</li>
                                    <li>PROTEIN</li>
                                </ul>
                                <div className='vertical-seperator'></div>
                                <ul className='nutrition-figures'>
                                    <li>{nutrition.calories} Kcal</li>
                                    <li>{nutrition.carbs} g</li>
                                    <li>{nutrition.fat} g</li>
                                    <li>{nutrition.protein} g</li>


                                </ul>
                            </div>
                        </div>
                    </div> : <div>Sorry No Details Available</div>
            }
        </>
    )
}

export default Details