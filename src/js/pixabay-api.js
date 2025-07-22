import axios from 'axios';
import iziToast from 'izitoast';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImagesByQuery = async (query, page) => {
  try {
    const response = await axios.get('/', {
      params: {
        key: '51392413-3a9fe7039391cca55c3ec30ee',
        q: query.trim().toLowerCase(),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
      },
    });
    if (response.data.hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
