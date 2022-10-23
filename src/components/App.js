import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import '../css/app.css';
import { v4 as uuidv4 } from 'uuid';
import RecipeEdit from './RecipeEdit';

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes';

function App() {
    const [selectedRecipeId, setSelectedRecipeId] = useState();

    const [recipes, setRecipes] = useState(() => {
        const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (recipeJSON !== null) {
            return JSON.parse(recipeJSON);
        } else {
            return sampleRecipes;
        }
    });

    const selectedRecipe = recipes.find(
        (recipe) => recipe.id === selectedRecipeId
    );

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
    }, [recipes]);

    const recipeContextValue = {
        handleRecipeAdd,
        handleRecipeDelete,
        handleRecipeSelect,
        handleRecipeChange,
    };

    function handleRecipeSelect(id) {
        setSelectedRecipeId(id);
    }

    function handleRecipeAdd() {
        const newRecipe = {
            id: uuidv4(),
            name: '',
            servings: 1,
            cookTime: '',
            instructions: '',
            ingredients: [
                {
                    id: uuidv4(),
                    name: 'Name',
                    amount: '1 tsb',
                },
            ],
        };

        setSelectedRecipeId(newRecipe.id);
        setRecipes([...recipes, newRecipe]);
    }

    function handleRecipeChange(id, recipe) {
        const newRecipes = [...recipes];
        const index = newRecipes.findIndex((recipe) => recipe.id === id);
        newRecipes[index] = recipe;
        setRecipes(newRecipes);
    }

    function handleRecipeDelete(id) {
        if (selectedRecipeId !== null && selectedRecipeId === id) {
            setSelectedRecipeId(null);
        }
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
    }

    return (
        <RecipeContext.Provider value={recipeContextValue}>
            <RecipeList recipes={recipes} />
            {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
        </RecipeContext.Provider>
    );
}

const sampleRecipes = [
    {
        id: 1,
        name: 'Plain Chicken',
        servings: 3,
        cookTime: '1:45',
        instructions:
            '1. Put salt on Chicken\n2. Put Chicken in oven\n3. Eat the chicken',
        ingredients: [
            {
                id: 1,
                name: 'Chicken',
                amount: '2 Pounds',
            },
            {
                id: 2,
                name: 'Salt',
                amount: '1 Tbs',
            },
        ],
    },
    {
        id: 2,
        name: 'Plain Pork',
        servings: 5,
        cookTime: '0:45',
        instructions:
            '1. Put paprika on pork\n2. Put Pork in oven\n3. Eat the pork',
        ingredients: [
            {
                id: 1,
                name: 'Pork',
                amount: '1 Pounds',
            },
            {
                id: 2,
                name: 'Paprika',
                amount: '2 Tbs',
            },
        ],
    },
];
export default App;
