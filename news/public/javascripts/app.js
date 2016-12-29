var types = {
  'News': NewsArticles,
  'Sports': SportsArticles,
  'Tech': TechArticles,
  'Science': ScienceArticles,
  'Business': BusinessArticles,
  'Entertainment': EntertainmentArticles,
  'Gaming': GamingArticles,
  'Music': MusicArticles
};

var App = {
  template: JST.news,
  $el: $('main ul'),
  init: function() {
    this.collection = new NewsArticles();
    this.fetchData();
    $('nav a').on('click', this.getType);
  },
  getType: function(e) {
    e.preventDefault();

    var type = $(this).text();

    $('.highlight').removeClass('highlight');
    $(this).addClass('highlight');

    App.setNewCollection(type);
  },
  setNewCollection: function(type) {
    this.collection = new types[type]();
    this.fetchData();
  },
  fetchData: function() {
    this.collection.fetch({
      success: function(_, res) {
        this.collection.set(res.articles);
        this.render();
      }.bind(this)
    });
  },
  render: function() {
    this.$el.html('');
    this.collection.toJSON().forEach(function(obj) {
      this.$el.append(this.template(obj));
    }.bind(this));
  }
};

App.init();
