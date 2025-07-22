import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const imgList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const createGallery = images => {
  const markup = images
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

  imgList.innerHTML = markup;
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

export { createGallery, clearGallery, showLoader, hideLoader, simpleLightBox };
