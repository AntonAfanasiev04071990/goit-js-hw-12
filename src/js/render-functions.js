function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
              width="360"
            />
          </a>
          <div class="thumb-block">
            <div class="block">
              <h2 class="tittle">Likes</h2>
              <p class="amount">${likes}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Views</h2>
              <p class="amount">${views}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Comments</h2>
              <p class="amount">${comments}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Downloads</h2>
              <p class="amount">${downloads}</p>
            </div>
          </div>
        </li>`)
        .join('');
}

function scrollingTopPage() {
    document.addEventListener('DOMContentLoaded', function () {
        const upButton = document.querySelector('.up-btn');

        upButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            document.body.classList.add('scrolling');
        });

        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                upButton.classList.add('show');
            } else {
                upButton.classList.remove('show');
            }

            if (document.body.classList.contains('scrolling') && window.scrollY === 0) {
                document.body.classList.remove('scrolling');
            }
        });
    });
}

export { createMarkup, scrollingTopPage };