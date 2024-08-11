import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery, showNoResultsMessage } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let appState = {}

let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.btn-load');
const endText = document.querySelector('.end-loader');

loadMore.addEventListener('click', async (event) => {
    event.preventDefault();
    showLoading();
    appState.page = appState.page + 1;
    try {
        const responseData = await fetchImages(appState);
        if (appState.page * 15 >= responseData.totalHits) {
            loadMore.style.display = "none";
            endText.style.display = "block";
        } else {
            loadMore.style.display = "block";
            endText.style.display = "none";
        }
        const images = responseData.hits;

        renderImages(images);
        lightbox.refresh();

        const cardHeight = document.querySelector('.photo-card').getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
            position: 'topRight'
        });
    } finally {
        hideLoading();
    }
});

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = event.target.elements.searchQuery.value.trim();

    if (query === '') {
        return iziToast.error({
            title: 'Error',
            message: 'Please enter a search query!',
            position: 'topRight'
        });
    }

    clearGallery();
    showLoading();

    appState = {
        query,
        page: 1
    }

    try {
        const responseData = await fetchImages(appState);
        if (appState.page * 15 >= responseData.totalHits) {
            loadMore.style.display = "none";
            endText.style.display = "block";
        } else {
            loadMore.style.display = "block";
            endText.style.display = "none";
        }
        const images = responseData.hits;

        if (images.length === 0) {
            showNoResultsMessage();
        } else {
            renderImages(images);
            lightbox.refresh();
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
            position: 'topRight'
        });
    } finally {
        hideLoading();
    }
});

function showLoading() {
    loader.style.display = 'block';
}

function hideLoading() {
    loader.style.display = 'none';
}
