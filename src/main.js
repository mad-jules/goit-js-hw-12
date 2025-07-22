import iziToast from 'izitoast';

import { getImagesByQuery } from './js/pixabay-api';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {
  showLoader,
  createGallery,
  clearGallery,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  appendGallery,
  getCardHeight,
} from './js/render-functions';

const formEl = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');
const perPage = 15;

let page = 1;
let query = '';
let totalPages = null;
let cardHeight = null;

formEl.addEventListener('submit', async e => {
  e.preventDefault();
  page = 1;
  query = e.currentTarget.elements['search-text'].value.trim();
  if (query.length === 0) {
    iziToast.warning({
      message: 'Please enter data',
      position: 'topRight',
    });
  } else {
    clearGallery();
    showLoader();
    try {
      const response = await getImagesByQuery(query, page);
      const { hits, total, totalHits } = response;
      totalPages = Math.ceil(totalHits / perPage);
      createGallery(hits);
      cardHeight = getCardHeight();
      if (page < totalPages) {
        showLoadMoreButton();
        loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
      }
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  }
});

const onLoadMoreBtnClick = async e => {
  e.target.blur();
  page += 1;
  try {
    hideLoadMoreButton();
    showLoader();
    const response = await getImagesByQuery(query, page);
    const { hits, total, totalHits } = response;
    appendGallery(hits);
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
    scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    if (page < totalPages) {
      showLoadMoreButton();
    }
    if (page === totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
    }
  }
};
