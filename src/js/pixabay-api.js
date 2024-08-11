import axios from "axios";
const API_KEY = '45291031-b2314e04d4a4ac01a9efb8f44';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query.query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${query.page}&per_page=15`;

    try {
        const response = await axios.get(url)
        if (response.status !== 200) {
            throw new Error('Failed to fetch images');
        }
        const responseData = response.data
        return responseData;  //
    } catch (error) {
        debugger
        console.error(error);
        return [];
    }
}