import axios from 'axios';

const API_KEY = '45291031-b2314e04d4a4ac01a9efb8f44';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
    };

    const response = await axios.get(BASE_URL, { params });
    return response.data;
}