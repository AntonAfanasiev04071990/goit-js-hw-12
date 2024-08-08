import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const perPage = 15; // Змінено на 15 згідно з умовами

async function getPictures(name, page) {
    const KEY = '45291031-b2314e04d4a4ac01a9efb8f44';

    try {
        if (name.includes(' ')) {
            name = name.replace(/\s+/g, '+');
        }

        const response = await axios.get(`https://pixabay.com/api/`, {
            params: {
                key: KEY,
                q: name,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: perPage,
            }
        });
        return response;
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Sorry! The site is currently unavailable. Please try later!',
        });
        console.error(error.message);
    }
}

export { getPictures, perPage };