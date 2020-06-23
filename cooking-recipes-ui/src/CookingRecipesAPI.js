export const COOKING_RECIPES_API_BASE = "http://localhost:8080/api/users";
export const COOKING_RECIPES_API_BASE_RECIPES = "http://localhost:8080/api/recipes";

export class CookingRecipesAPI{

    static async registerUser(user){
        const response = await fetch(
            COOKING_RECIPES_API_BASE,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }
        );

        const registeredUser = await response.json();
        if(registeredUser.status >= 400) { //error status code
            console.log("No registered user:");
            throw(registeredUser.message);
        }
        return registeredUser;
    }

    static async addRecipe(recipe, author_id){
        const response = await fetch(
            COOKING_RECIPES_API_BASE + '/' + author_id + '/recipes',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recipe)
            }
        );

        const addedRecipe = await response.json();
        if(addedRecipe.status >= 400) { //error status code
            console.log("No added recipe:");
            throw(addedRecipe.message);
        }
        return addedRecipe;
    }

    static async updateRecipe(recipe){
        const updateRecipeResponse = await fetch(
            COOKING_RECIPES_API_BASE + '/' + recipe.author_id + '/recipes/' + recipe._id,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recipe)
            }
        );

        const updatedRecipe = await updateRecipeResponse.json();
        console.log('recipe updated.');
        if(updatedRecipe.status >= 400) { //error status code
            console.log("No such recipe:", updatedRecipe);
            throw(updatedRecipe.message);
        }
        return updatedRecipe;
    }

    static async login(username, password){
        const response = await fetch(
            COOKING_RECIPES_API_BASE + '/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"username": username, "password": password})
            }
        );

        const user = await response.json();
        console.log('Logged in.');
        return user;
    }

    static async getUserById(userId){
        const userResponse = await fetch(
            COOKING_RECIPES_API_BASE + '/' + userId,
            {
                method: 'GET'
            }
        );

        const user = await userResponse.json();
        if(user.status >= 400) { //error status code
            console.log("No such user:", user);
            throw(user.message);
        }
        return user;
    }

    static async deleteUser(userId){
        //compare userId with current user id or check if current user is an admin
        const deleteResponse = await fetch(
            COOKING_RECIPES_API_BASE + '/' + userId,
            {
                method: 'DELETE',
            }
        )

        const body = await deleteResponse.json();
        
        if(body.status >= 400) { //error status code
            console.log("Error with deleting user:", body);
            throw(body.message);
        }
        console.log("User deleted successfully", body);
        return body;
    }

    static async deleteRecipe(userId, recipeId){
        const deleteResponse = await fetch(
            COOKING_RECIPES_API_BASE + '/' + userId + '/recipes/' + recipeId,
            {
                method: 'DELETE',
            }
        )

        const body = await deleteResponse.json();
        
        if(body.status >= 400) { //error status code
            console.log("Error with deleting recipe:", body);
            throw(body.message);
        }
        console.log("Recipe deleted successfully", body);
        return body;
    }

    static async getAllRecipesByUser(userId){
        const recipesResponse = await fetch(
            COOKING_RECIPES_API_BASE + '/' + userId + '/recipes',
            {
                method: 'GET'
            }
        );
        const recipes = await recipesResponse.json();

        if(recipes.status >= 400) { //error status code
            console.log("Error fetching recipes.");
            throw(recipes.message);
        }
        return recipes;
    }

    static async getRecipeById(author_id, recipeId){
        const recipeResponse = await fetch(
            COOKING_RECIPES_API_BASE + '/' +author_id + '/recipes/' + recipeId,
            {
                method: 'GET'
            }
        );
        const recipe = await recipeResponse.json();

        if(recipe.status >= 400) { //error status code
            console.log("Error fetching recipe.");
            throw(recipe.message);
        }
        return recipe;
    }

    static async getAllRecipes(){
        const recipesResponse = await fetch(
            COOKING_RECIPES_API_BASE_RECIPES,
            {
                method: 'GET'
            }
        );
        
        const recipes = await recipesResponse.json();

        if(recipes.status >= 400) { //error status code
            console.log("Error fetching recipes.");
            throw(recipes.message);
        }
        return recipes;
    }

    static async getAllUsers(){
        const allUsersResponse = await fetch(
            COOKING_RECIPES_API_BASE,
            {
                method: 'GET'
            }
        );

        return await allUsersResponse.json();
    }

    static async updateUser(user){
        const updateUserResponse = await fetch(
            COOKING_RECIPES_API_BASE + '/' + user._id,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }
        );

        const updatedUser = await updateUserResponse.json();
        if(updatedUser.status >= 400) { //error status code
            console.log("No such user:", updatedUser);
            throw(updatedUser.message);
        }
        return updatedUser;
    }
}