/* globals JSON3, localStorage */

import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import {charactersApi} from '../api/marvelApi';
import JSON3 from 'json3';

Vue.use(Vuex);

let sortAsc = (a, b) => {

    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();

    if (nameA < nameB) {

        return -1;

    }

    if (nameA > nameB) {

        return 1;

    }

    return 0;

};

let sortDesc = (a, b) => {

    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();

    if (nameA > nameB) {

        return -1;

    }

    if (nameA < nameB) {

        return 1;

    }

    return 0;

};

export const store = new Vuex.Store({

    state: {
        characters: [],
        filteredCharactersByName: [],
        sortedCharacters: [],
        characterDetail: {},
        favourites: [],
        sortBy: 'asc',
        currentPage: 1
    },

    getters: {

        charactersInPage: (state, getters) => {

            let characterArr;

            if (state.filteredCharactersByName.length) {

                characterArr = state.filteredCharactersByName;

            } else {

                characterArr = state.characters;

            }

            switch (state.sortBy) {

                case 'asc':
                    characterArr.sort(sortAsc);
                    break;
                default:
                    characterArr.sort(sortDesc);

            }

            return characterArr.slice((state.currentPage - 1) * 10, ((state.currentPage - 1) * 10) + 10);

        },

        characterDetail: (state, getters) => {

            return state.characters.find(character => character.id === state.route.params.id);

        },

        totalCharacters: (state, getters) => {

            if (state.filteredCharactersByName.length) {

                return state.filteredCharactersByName.length;

            }

            return state.characters.length;

        },

        currentPage: (state, getters) => {

            return state.currentPage;

        },

        favourites: (state, getters) => {

            return state.favourites;

        },

        favouriteExists: (state, getters) => id => {

            return _.some(state.favourites, ['id', id]);

        }

    },

    mutations: {

        setCharacters (state, characters) {

            state.characters = characters;

        },

        setFavourites (state, favourites) {

            state.favourites = favourites;

        },

        setCharacterDetail (state, id) {

            state.characterDetail = state.characters.find(character => character.id === id);

        },

        setFilteredCharactersByName (state, name) {

            let patt = new RegExp(name, 'i');
            let filteredCharacters = _.filter(state.characters, character => patt.test(character.name.trim()));

            state.currentPage = 1;

            if (filteredCharacters.length) {

                state.filteredCharactersByName = filteredCharacters;

            } else {

                charactersApi.defaults.params.name = name;

                charactersApi.request()
                    .then(response => {

                        let charactersArr = response.data.data.results;

                        if (charactersArr.length) {

                            state.filteredCharactersByName = charactersArr;

                            _.forEach(charactersArr, obj => {

                                if (!_.some(state.characters, ['id', obj.id])) {

                                    state.characters.push(obj);

                                }

                            });

                            localStorage.setItem('characters', JSON3.stringify(state.characters));

                        }

                    })
                    .catch(error => {

                        console.error(error);

                    });

            }

        },

        setCurrentPage (state, pageNum) {

            state.currentPage = pageNum;

        },

        setSortBy (state, sortType) {

            state.sortBy = sortType;

        },

        addFavourite (state, favourite) {

            if (!_.some(state.favourites, ['id', favourite.id])) {

                state.favourites.push(favourite);
                localStorage.setItem('favourites', JSON3.stringify(state.favourites));

            }

        },

        removeFavorite (state, id) {

            state.favourites = _.filter(state.favourites, favourite => favourite.id !== id);
            localStorage.setItem('favourites', JSON3.stringify(state.favourites));

        }

    },

    actions: {}

});
