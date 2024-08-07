import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery, smoothScroll } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import 'css-loader/dist/css-loader.css';

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
    event.preventDefault();
    currentQuery = event.currentTarget.searchQuery.value.trim();
    if (currentQuery === '') {
        iziToast.error({ title: 'Error', message: 'Please enter a search query.' });
        return;
    }

    currentPage = 1;
    clearGallery();
    loadMoreBtn.classList.add('hidden');
    
    try {
        const data = await fetchImages(currentQuery, currentPage);
        totalHits = data.totalHits;

        if (totalHits === 0) {
            iziToast.warning({ title: 'No Results', message: 'Sorry, no images found. Try another query!' });
            return;
        }

        renderImages(data.hits);
        lightbox.refresh();
        loadMoreBtn.classList.remove('hidden');
        smoothScroll();

        if (totalHits <= currentPage * 15) {
            loadMoreBtn.classList.add('hidden');
            iziToast.info({ title: 'End', message: "We're sorry, but you've reached the end of search results." });
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again later.' });
    }
}

async function onLoadMore() {
    currentPage += 1;

    try {
        const data = await fetchImages(currentQuery, currentPage);
        renderImages(data.hits);
        lightbox.refresh();
        smoothScroll();

        if (totalHits <= currentPage * 15) {
            loadMoreBtn.classList.add('hidden');
            iziToast.info({ title: 'End', message: "We're sorry, but you've reached the end of search results." });
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again later.' });
    }
}