// import templateFunction from './template.hbs';
// document.body.innerHTML = templateFunction();

import articlesTpl from './templates/articles.hbs';
import './css/styles.css';
import NewsApiService from '../news-service'; // импортируем класс
// import onSearch from './on-search';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
const newsApiService = new NewsApiService(); //делаем экземпляр чтобы получить обект с методами и свойствами
// console.log(newsApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// let searchQuery = ''; убираем пременную сервис будет заходить через this get set

function onSearch(e) {
  e.preventDefault();

  clearArticlesContainer();
  newsApiService.query = e.currentTarget.elements.query;
  //при сабмите формы мы на наш обект-newsApiService в его свойство newQuery при помощи SET записали то что из формы получаем КОТИКА
  newsApiService.resetPage(); // ресетим страничку на 1 каждый раз когда сабмитим форму
  newsApiService.fetchArticles().then(appendArticlesMarkup); // вернуть чтобы во внешнем коде присовать,searchQuery передается как параметр и пошел http-запрос
}

function onLoadMore() {
  // в this.searchQuery = ''; все еще находится КОТИК поэтому запрос делает на котика
  newsApiService.fetchArticles().then(appendArticlesMarkup); // searchQuery передается как параметр
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles)); // в контейнер вставляет результат вызова этого шаблона артиклы повесит их в дом
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
