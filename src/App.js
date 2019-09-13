import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

// import { async } from 'q';

const App = () => {
  const App_ID  = "e9eb1e49";
  const App_KEY = "d49bbec9babeec7b81a3c0add99e802a";


  const [recipes, setRecipes ] = useState([]);
  const [search, setsearch] = useState("");
  const [query, setQuery] = useState('chicken');

  useEffect( () =>{
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${App_KEY}`);
    
    const data = await response.json();
    setRecipes(data.hits);
    
  }

  const updateSearch = e => {
    setsearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setsearch('');
  }

  return(
    <div className="App">
      <div className='htitle'><h1>Recipe Search App</h1>
      <div className="info">created by sayed</div>
      </div>
      <p>1.7+ million nutritionally analyzed recipes
          Detailed macro and micronutrient data
          Filter by calories, diets and allergens</p>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type = "text" value={search} onChange={updateSearch}/>
        <button className="search-button" type = "submit">
          Search
        </button>
      </form>
     

      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  )
}

export default App;
