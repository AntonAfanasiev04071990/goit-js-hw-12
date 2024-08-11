import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function clearGallery() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
}

export function renderImages(images) { 
    const gallery = document.querySelector('.gallery');
    
    const markup = images.map((item) => {
        return `
            <a href="${item.largeImageURL}" class="photo-card">
                <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes:</b> ${item.likes}
                    </p>
                    <p class="info-item">
                        <b>Views:</b> ${item.views}
                    </p>
                    <p class="info-item">
                        <b>Comments:</b> ${item.comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads:</b> ${item.downloads}
                    </p>
                </div>
            </a>
        `;
    }).join('');

    gallery.insertAdjacentHTML('beforeend', markup);
}

export function showNoResultsMessage() {
    iziToast.warning({
        title: 'Warning',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight'
    });
}
