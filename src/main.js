import iziToast from 'izitoast';

import { getImagesByQuery } from './js/pixabay-api';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {
  showLoader,
  createGallery,
  clearGallery,
  hideLoader,
  simpleLightBox,
} from './js/render-functions';

// getImagesByQuery('cat').then(console.log);

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', e => {
  e.preventDefault();
  const query = e.currentTarget.elements['search-text'].value.trim();
  if (query.length === 0) {
    iziToast.warning({
      message: 'Please enter data',
      position: 'topRight',
    });
  } else {
    clearGallery();
    showLoader();
    getImagesByQuery(query)
      .then(({ hits, total, totalHits }) => {
        createGallery(hits);
      })
      .finally(() => {
        hideLoader();
      });
  }
});
