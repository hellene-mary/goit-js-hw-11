import Notify from 'notiflix';
import axios from 'axios';
import { renderPhotoCard } from './renderPhotoCard';
import { btnLoadMore } from './ref';

const API_KEY = '29743747-4d974b8d370b5a5c48adadad9';
const URL = 'https://pixabay.com/api/';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.hits = 0;
    }

    async fetchImages() {
        try {
            const options = {
                params: {
                    key: API_KEY,
                    q: this.searchQuery,
                    image_type: 'photo',
                    orientation: 'horizontal',
                    safesearch: true,
                    page: this.page,
                    per_page: 40,
                },
            };
            const url = `${URL}`;
            const response = await axios.get(url, options);
            const data = await response.data;

            // console.log('~ data', data);
            // console.log('~ IN FETCH data.totalHits', data.totalHits);
            // console.log('~ IN FETCH response', data.hits);
            // console.log('~ IN FETCH sum hits', this.hits);
            // console.log('~ IN FETCH next page', this.page);

            //окремий метод, що додає сторінки і кількість???
            this.page += 1;
            this.hits += 40;

            if (data.hits.length == 0) {
                btnLoadMore.classList.remove('visible');
                btnLoadMore.classList.add('is-hidden');

                Notify.Notify.failure(
                    'Sorry, there are no images matching your search query. Please try again.'
                );

                return;
            }
            if (this.hits > 500) {
                Notify.Notify.info(
                    "We're sorry, but you've reached the end of search results."
                );

                btnLoadMore.disabled = true;

                return;
            }

            renderPhotoCard(data);
            Notify.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        } catch (error) {
            console.log(error.message);
            Notify.Notify.failure(
                'Oops! Something went wrong. Please try again.'
            );
        }
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
