export default class NewsApiService {
  constructor() {
    this.searchQuery = ''; // когда делаем экземпляр там будет пустая строка, при каждом запросе будет сохранено обект Котик
    this.page = 1; // храним первую страничку
  }

  //вернуть в промис и его значение будет data.articles
  fetchArticles() {
    console.log('this searchQuery до запроса', this);
    // searchQuery передается как параметр
    const options = {
      headers: {
        Authorization: '34da5db0e5ff45bc8a86f4b2bb2db13b',
      },
    }; // из функции fetchArticles возвращается результат промиса return data.articles и его значение data.articles
    const url = `https://newsapi.org/v2/everything?q=${this.searchQuery}&language=en&pageSize=5&page=${this.page}`;

    return (
      fetch(url, options)
        //если запрос http запрос успеный и распарсился then(r => r.json()) то выполним this.page += 1
        .then(r => r.json())
        .then(data => {
          this.incrementPage();
          console.log('данные в свойстве articles', data);
          console.log('this searchQuery после запроса если все ОК', this);
          return data.articles; // промис тот что вернули из его колбэка,возвращает articles в fetchArticles
        })
    );
  }

  incrementPage() {
    this.page += 1; //методы класса,для увеличения страници
  }

  resetPage() {
    this.page = 1; //методы класса,сбрасывает группу страниц на 1
  }
  //чтобы из внешнего кода сюда чтото записать созаем get set
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery; //перезаписываем поверх
  }
}
