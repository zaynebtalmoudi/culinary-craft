import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from './pages/Favorites';
import Details from "./pages/Details";
import { NavLink } from "react-router-dom";
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import './Components/navbar.css'
import filterData from "./Components/FilterData";
import { AdjustmentsHorizontalIcon } from '@heroicons/react/16/solid'
import './Components/filter.css'


function App() {
  const [error, setError] = useState(null)
  const [recipes, setRecipes] = useState([])
  // const querySearchKey = `&query=${searchKey}`;
  const apiKey = '8f83f45da68c477db333273669de315a';
  const baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`
  const [complexApi, setComplexApi] = useState(baseUrl)
  const [input, setInput] = useState('');

  console.log(recipes)
  console.log(input)

  if (error) throw (error)

  // -------- Filter Diet ------------------ //


  const [filter, setFilter] = useState(filterData);

  const [showModal, setShowModal] = useState(false)



  // ------ Togge from false to true -------- //
  const toggleFilter = (id) => {
    setFilter(prev => {
      return prev.map(d => d.id === id ? { ...d, value: !d.value } : d)
    })

  }

  // ------------ Queries to add to fetch : depend on filter state values  -----------------  //
  const selectedFilter = filter.map((val) => {
    if (val.value)
      return val.name
  })
    .filter((val) => val !== undefined)
    .map((val) => '&query=' + val).join('')
  console.log(selectedFilter)

  let queryInput = ''
  //-------- Fetch APi --------//
  if (input.trim().length > 0) {
    queryInput = `&query=${input}`
  }
  function getMyRecipe() {


    // if (input.trim().length > 0 && selectedFilter.join === 0) {
    //   setComplexApi(`${baseUrl}&query=${input}`)
    // }
    // if (input.trim().length === 0 && selectedFilter.length > 0) {
    //   setComplexApi(`${baseUrl}${selectedFilter}`)
    // }
    // if (input.trim().length > 0 && selectedFilter.length > 0) {
    //   setComplexApi(`${baseUrl}&query=${input}${selectedFilter}`)
    // }
    // if (input.trim().length === 0 && selectedFilter.length === 0) {
    //   setComplexApi(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`)
    // }

    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}${queryInput}${selectedFilter}`
    )
      .then(response => response.json())
      .then(data => {
        if (data)
          setRecipes(data.results)
        setInput('')
        setFilter(filterData)
        setShowModal(false)
      })
      .catch(() => {
        console.log("error")

      })
  }


  const [favoritesList, setFavoritesList] = useState([])
  function handleAddToFavorite(getCurrentItem) {
    console.log(getCurrentItem); handleAddToFavorite = { handleAddToFavorite }
    let cpyFavoritesList = [...favoritesList];
    const index = cpyFavoritesList.findIndex(item => item.id === getCurrentItem.id)

    if (index === -1) {
      cpyFavoritesList.push(getCurrentItem)
    } else {
      cpyFavoritesList.splice(index)
    }
    setFavoritesList(cpyFavoritesList)
  }
  console.log(favoritesList, 'favoritesList');



  return (
    <div>

      <div className="app">
        <nav className="navbar">
          <div className="links">
            <div className="logoImg">
              <img src={require('../src/images/chef.png')} />
            </div>
            <h2 className="logo-title">
              <NavLink to={"/"}>
                Culinary
                <span style={{ fontSize: '2rem' }}>.<span>
                </span>Craft</span>
              </NavLink>
            </h2>
            <div className='navigation'>
              <div>
                <NavLink
                  to={"/"}
                  className="home"
                >
                  Home
                </NavLink>
              </div>
              <div>
                <NavLink
                  to={"/favorites"}
                  className="favorite"
                >
                  favorites
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
        <div className="banner">

          <div className="search">
            <input
              type="text"
              name="search"
              value={input}
              onChange={(e) => { setInput(e.target.value) }}
              placeholder="eg. tomato, cheese..."
              className="search-input"
            />
            <button onClick={() => { getMyRecipe() }} className="search-icon"> <MagnifyingGlassIcon width={28} height={28} className="" /></button>
          </div>
        </div>

        {/* -------------- FILTER -------------------  */}

        <div className="filter-container">
          <div className="filter-badge-container">
            <div className={showModal ? 'filter-badge filterActive' : ' filter-badge filterInactive'} onClick={() => setShowModal(!showModal)} >
              <div className='filter-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z" />
                </svg>
                {/* <AdjustmentsHorizontalIcon width={28} height={28} /> */}
              </div>
              <span>Filters</span>
            </div>
          </div>

        </div>

        <div className={showModal ? 'filter-modal' : 'hideModal'} >

          <div className="filter-block">
            <h3>Diet</h3>
            <ul>
              {filter.filter(val => val.type === 'diet').map(val =>
                <li className={(val.value) ? 'selected' : 'notSelected'} key={val.id} onClick={() => {
                  toggleFilter(val.id)
                }}>{val.name}</li>

              )}
            </ul >
          </div>
          <div className="filter-block">
            <h3>Intolerance</h3>
            <ul>
              {filter.filter(val => val.type === 'intolerance').map(val =>
                <li className={(val.value) ? 'selected' : 'notSelected'} key={val.id} onClick={() => {
                  toggleFilter(val.id)
                }}>{val.name}</li>
              )}
            </ul >
          </div>
          <div className="filter-block">
            <h3>Cuisine</h3>
            <ul>
              {filter.filter(val => val.type === 'cuisine').map(val =>
                <li className={(val.value) ? 'selected' : 'notSelected'} key={val.id} onClick={() => {
                  toggleFilter(val.id)
                }}>{val.name}</li>
              )}
            </ul >
          </div>
          <div className="filter-block">
            <h3>Meal Type</h3>
            <ul>
              {filter.filter(val => val.type === 'mealType').map(val =>
                <li className={(val.value) ? 'selected' : 'notSelected'} key={val.id} onClick={() => {
                  toggleFilter(val.id)
                }}>{val.name}</li>
              )}
            </ul >
          </div>

        </div >
        <button onClick={() => { getMyRecipe() }} className={showModal ? 'submit-filter' : 'submit-filter hideButton'}>
          Submit
        </button>

        <div className='horizontal-seperator'></div>
        {/* ----------------------------------------------  */}


        <Routes>
          <Route path="/" element={<Home recipes={recipes} apiKey={apiKey} favoritesList={favoritesList} />} />
          <Route path="/favorites" element={<Favorites favoritesList={favoritesList} />} />
          <Route path="/recipe-item/:id" element={<Details handleAddToFavorite={handleAddToFavorite} recipes={recipes} apiKey={apiKey} />} />
        </Routes>
      </div>
    </div>



  );
}

export default App;


