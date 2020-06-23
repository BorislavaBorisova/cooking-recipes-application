export function convertStringIntoDateTime(date) {
    // yy-mm-dd hh:mm:ss
    const dateTime = date.split(/[ :-]+/);
    return new Date(dateTime[0], dateTime[1], dateTime[2], dateTime[3], dateTime[4], dateTime[5]);
}

export function getAllRecipes() {
    const recipes = [];
    let key;
    let decodedItem;
    for (let i = 0; i < localStorage.length; i++) {
        key = window.localStorage.key(i);
        if (key.startsWith("recipe_")) {
            decodedItem = JSON.parse(window.localStorage.getItem(key));
            recipes.push(decodedItem);
        }
    }
    return recipes;
}

export function getUserIdByUsername(username) {
    let key;
    let decodedItem;
    for (let i = 0; i < localStorage.length; i++) {
        key = window.localStorage.key(i);
        if (key.startsWith("user_")) {
            decodedItem = JSON.parse(window.localStorage.getItem(key));
            if (decodedItem.username === username) {
                return decodedItem._id;
            }
        }
    }
}
