export function renderImages(images) {
    const gallery = document.querySelector('.gallery');
    const markup = images.map(image => {
        return `
            <div class="photo-card">
                <a href="${image.largeImageURL}">
                    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
                </a>
                <div class="info">
                    <p class="info-item"><b>Likes:</b> ${image.likes}</p>
                    <p class="info-item"><b>Views:</b> ${image.views}</p>
                    <p class="info-item"><b>Comments:</b> ${image.comments}</p>
                    <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
                </div>
            </div>
        `;
    }).join('');

    gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
    document.querySelector('.gallery').innerHTML = '';
}

export function smoothScroll() {
    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}