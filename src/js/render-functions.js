import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const imgList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const generateMarkup = images => {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `
    <li class="gallery-item">
	<a class="gallery-link" href="${largeImageURL}">
		<img 
		  class="gallery-image" 
		  src="${webformatURL}"
		   alt="${tags}"
       loading="lazy"
		/>
	</a>
  <ul class="statistic-list">
  <li>Likes
  <p>${likes}
  </p>
  </li>
  <li>Views
  <p>${views}
  </p>
  </li>
  <li>Comments
  <p>${comments}
  </p>
  </li>
  <li>Downloads
  <p>${downloads}
  </p>
  </li>
  </ul>
</li>
  `
    )
    .join('');
};

const createGallery = images => {
  const markup = generateMarkup(images);
  imgList.innerHTML = markup;
  simpleLightBox.refresh();
};

const appendGallery = images => {
  const markup = generateMarkup(images);
  imgList.insertAdjacentHTML('beforeend', markup);
  simpleLightBox.refresh();
};

const clearGallery = () => {
  imgList.innerHTML = '';
};

const isLoaderVisible = () => {
  return !loader.classList.contains('visually-hidden');
};

const showLoader = () => {
  if (!isLoaderVisible()) {
    loader.classList.remove('visually-hidden');
  }
};

const hideLoader = () => {
  if (isLoaderVisible()) {
    loader.classList.add('visually-hidden');
  }
};

const isLoadMoreVisible = () => {
  return !loadMoreBtn.classList.contains('visually-hidden');
};

const showLoadMoreButton = () => {
  if (!isLoadMoreVisible()) {
    loadMoreBtn.classList.remove('visually-hidden');
  }
};
const hideLoadMoreButton = () => {
  if (isLoadMoreVisible) {
    loadMoreBtn.classList.add('visually-hidden');
  }
};

const getCardHeight = () => {
  const card = imgList.querySelector('.gallery-item');
  if (card === null) {
    return 0;
  }
  return card.getBoundingClientRect().height;
};

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  appendGallery,
  getCardHeight,
  simpleLightBox,
};
