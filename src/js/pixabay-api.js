import axios from 'axios';
import iziToast from 'izitoast';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImagesByQuery = query => {
  return axios
    .get('/', {
      params: {
        key: '51392413-3a9fe7039391cca55c3ec30ee',
        q: query.trim().toLowerCase(),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(({ data }) => {
      if (data.hits.length === 0) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }
      return data;
    })
    .catch(console.log);
};
