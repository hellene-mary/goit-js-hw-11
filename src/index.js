import Notify from 'notiflix';
import ApiService from './js/fetchImages';
import { searchForm, btnLoadMore, gallery } from './js/ref';

const ImageApiService = new ApiService();

searchForm.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onBtnLoadMore);

function onSearch(e) {
    e.preventDefault();
    gallery.innerHTML = '';

    const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    if (!searchQuery) {
        Notify.Notify.warning('Please type something to search.');
        btnLoadMore.classList.remove('visible');
        btnLoadMore.classList.add('is-hidden');
        return;
    }

    ImageApiService.query = searchQuery;
    ImageApiService.page = 1;

    ImageApiService.fetchImages();

    // console.log('~ IN SEARCH searchQuery', searchQuery);
    // console.log('~ IN SEARCH current page', ImageApiService.page);

    e.currentTarget.reset();
}

function onBtnLoadMore() {
    ImageApiService.fetchImages();
}
