import axios from 'axios';
import {apikey} from '../config.js';

const baseURL = 'https://gateway.marvel.com:443/v1/public/';

export const charactersApi = axios.create({
    url: 'characters',
    baseURL,
    method: 'GET',
    responseType: 'json',
    params: {
        apikey,
        limit: 100,
        orderBy: 'modified'
    }
});

export const comicsApi = axios.create({
    method: 'GET',
    responseType: 'json',
    params: {
        apikey
    }
});
