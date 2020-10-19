import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';
import Recipe from './components/Recipe';
import { v4 as uuidv4 } from 'uuid';
import Alert from './components/Alert';


function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState('');

  const APP_ID = "4fb96b42";
  const APP_KEY = "067436e62139752800f2a6e9b6f8a5c6";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;


  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert('Cannot find this food name.')
      }
      setRecipes(result.data.hits);
      console.log(result);
      setAlert('');
    }
    else (
      setAlert('Please input the form!')
    )

  }
  const onChange = e => {
    setQuery(e.target.value);
  }
  const onSubmit = e => {
    e.preventDefault();
    getData();
    setQuery('');
  }
  return (
    <div className="App">
      <h1 onClick={getData}>Looking for food - APP</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== '' && <Alert alert={alert} />}
        <input type="text" placeholder="input your food..." onChange={onChange} autoComplete="off" value={query} />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes !== [] && recipes.map(recipe => <h2>
          <Recipe key={uuidv4()} recipe={recipe} />
        </h2>)}
      </div>
    </div>
  );
}

export default App;
