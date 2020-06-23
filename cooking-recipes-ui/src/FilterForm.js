import React, { Component } from 'react'
import List from './form-elements/List';
import RecipeCard from './RecipeCard';
import { getAllRecipes, getUserIdByUsername, convertStringIntoDateTime } from './helper'

class FilterForm extends Component {
    constructor(props) {
        super(props);

        const recipes = getAllRecipes()
            .sort((recipe_one, recipe_two) => {
                return convertStringIntoDateTime(recipe_one.time_registration) < convertStringIntoDateTime(recipe_two.time_registration) ? -1 : 1;
            })
            .slice(-10);

        this.state = {
            author_filter: '',
            tags_filter: [],
            newTag: '',
            recipes: recipes
        }

        this.addTag = this.addTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.updateTag = this.updateTag.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState(() => ({
            author_filter: value
        }))
    }

    addTag() {
        if (this.state.newTag) {
            const newTag = this.state.newTag.slice();
            const list = [...this.state.tags_filter, newTag];

            this.setState(
                () => ({ tags_filter: list, newTag: '' })
            );
        }
    }

    deleteTag(valueToBeDeleted) {
        const list = [...this.state.tags_filter];
        const updatedList = list.filter(tag => tag !== valueToBeDeleted);

        this.setState(
            () => ({ tags_filter: updatedList })
        );
    }

    updateTag(e) {
        const tag = e.target.value;
        this.setState(() => ({ newTag: tag }));
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let author_id = '';

        if (this.state.author_filter) {
            author_id = getUserIdByUsername(this.state.author_filter);
        }

        const allRecipes = getAllRecipes();

        let filtered = allRecipes
            .filter(recipe => {
                return ((author_id === '' || recipe.author_id === author_id)
                    && (this.state.tags_filter === [] || this.state.tags_filter.every(tag => recipe.tags.includes(tag))))
            })
            .sort((recipe_one, recipe_two) => {
                return convertStringIntoDateTime(recipe_one.time_registration) < convertStringIntoDateTime(recipe_two.time_registration) ? -1 : 1;
            })
            .slice(-10);

        this.setState(() => ({
            recipes: filtered
        }))
    }

    onRemove(identifier) {
        window.localStorage.removeItem("recipe_" + identifier);
        this.setState(() => {
            const list = this.state.recipes.filter(recipe => {
                return (recipe._id !== identifier);
            });

            return {
                recipes: list,
            };
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s8 offset-s2">
                        <div className="card red lighten-5">
                            <div className="card-content red-text text-darken-2">
                                <span className="card-title center">Search</span>
                                <form>
                                    <label htmlFor="filter">Recipe author: </label>
                                    <input type="text" id="filter"
                                        value={this.state.author_filter}
                                        onChange={this.handleChange} />
                                    <List id={"tags_filter"} newTag={this.state.newTag} name={"tags_filter"} title={"Tags:"} type={"text"} placeholder={"Enter tags"} list={this.state.tags_filter} onAdd={this.addTag} onDelete={this.deleteTag} onUpdate={this.updateTag} />
                                    <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleFormSubmit} >
                                        <i className="material-icons">search</i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: '100%', paddingLeft: '8%' }}>
                    <div className="col s11 offset-s1">
                        {(this.state.recipes || []).map(recipe => {
                            return <RecipeCard item={recipe} key={recipe._id} remove={this.onRemove} />;
                        })
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default FilterForm