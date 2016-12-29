var NewsArticles = Backbone.Collection.extend({
  model: NewsArticle,
  url: 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=01f2e88bf3094f54bc5fd1b9950ef058'
});

var SportsArticles = Backbone.Collection.extend({
  model: SportsArticle,
  url: 'https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=01f2e88bf3094f54bc5fd1b9950ef058'
});

var TechArticles = Backbone.Collection.extend({
  model: TechArticle,
  url: 'https://newsapi.org/v1/articles?source=engadget&sortBy=top&apiKey=01f2e88bf3094f54bc5fd1b9950ef058'
});

var ScienceArticles = Backbone.Collection.extend({
  model: ScienceArticle,
  url: 'https://newsapi.org/v1/articles?source=new-scientist&sortBy=top&apiKey=01f2e88bf3094f54bc5fd1b9950ef058'
});

var BusinessArticles = Backbone.Collection.extend({
  model: BusinessArticle,
  url: 'https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=01f2e88bf3094f54bc5fd1b9950ef058'
});

var EntertainmentArticles = Backbone.Collection.extend({
  model: EntertainmentArticle,
  url: 'https://newsapi.org/v1/articles?source=buzzfeed&sortBy=top&apiKey=01f2e88bf3094f54bc5fd1b9950ef058'
});

var GamingArticles = Backbone.Collection.extend({
  model: GamingArticle,
  url: 'https://newsapi.org/v1/articles?source=ign&sortBy=top&apiKey=01f2e88bf3094f54bc5fd1b9950ef058'
});

var MusicArticles = Backbone.Collection.extend({
  model: MusicArticle,
  url: 'https://newsapi.org/v1/articles?source=mtv-news&sortBy=top&apiKey=01f2e88bf3094f54bc5fd1b9950ef058'
});
