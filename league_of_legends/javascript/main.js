function getChampionNames() {
  var championNames,
      link = 'https://ddragon.leagueoflegends.com/cdn/6.22.1/data/en_US/champion.json';

  $.getJSON(link, function(data) {
    championNames = Object.keys(data.data);
    showChampionImages(championNames, data.data);
  });
}

function showChampionImages(names, data) {
  var template = Handlebars.compile($('#generate-champions').html()),
      $championList = $('#champion-list'),
      link = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/';

  names.forEach(function(name) {
    var obj = {
      championName: name,
      championType: data[name].tags.join('_'),
      championImage: link + name + '_0.jpg'
    };

    $championList.append(template(obj));
  });
}

function getChampionInfo(name) {
  var link = 'https://ddragon.leagueoflegends.com/cdn/6.22.1/data/en_US/champion/' + name + '.json';

  $.getJSON(link, function(data) {
    showChampionInfo(data, name);
  });
}

function showChampionInfo(data, name) {
  var template = Handlebars.compile($('#generate-champion-info').html()),
      $championInfo = $('#champion-info'),
      spellImage = 'https://ddragon.leagueoflegends.com/cdn/6.22.1/img/spell/',
      passiveImage = 'https://ddragon.leagueoflegends.com/cdn/6.22.1/img/passive/',
      skinImage = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/',
      data = data.data[name],
      skins = {};

  for (var id in data.skins) {
    skins[id] = {};
    skins[id].name = data.skins[id].name;
    skins[id].imageLink = skinImage + name + '_' + id + '.jpg';
  }

  var obj = {
    championName: name,
    passiveImage: passiveImage + data.passive.image.full,
    passiveInfo: modifyString(data.passive.description),
    qImage: spellImage + data.spells[0].image.full,
    qInfo: modifyString(data.spells[0].description),
    wImage: spellImage + data.spells[1].image.full,
    wInfo: modifyString(data.spells[1].description),
    eImage: spellImage + data.spells[2].image.full,
    eInfo: modifyString(data.spells[2].description),
    rImage: spellImage + data.spells[3].image.full,
    rInfo: modifyString(data.spells[3].description),
    skins: skins
  }

  $championInfo.append(template(obj));
}

function modifyString(str) {
  return str.replace(/(<br>)*(<span class=(.){13}>)*(<\/span>)*/g, '');
}

function filterChampions(types) {
  var $champions = $('.champion');

  if (types.length === 0) {
    $champions.show();
    $champions.attr('style', '');
    return;
  };

  $champions.hide();
  $champions.each(function() {
    var show = true,
        championType = $(this).data('type').split('_');

    championType.forEach(function(type) {
      if (!types.includes(type)) { show = false; }
    });

    if (types.length === 1 && championType.includes(types[0])) {
      $(this).show();
    } else if (show && championType.length === types.length) {
      $(this).show();
    }
  });

  changeMarginValue();
}

function changeMarginValue() {
  $('.champion').filter(':visible').each(function(idx) {
    if ((idx + 1) % 3 === 0) {
      $(this).css('margin', '0 0 1% 0');
    } else {
      $(this).css('margin', '0 1% 1% 0');
    }
  });
}

$(function() {
  function modalToggle() {
    $modal.toggle();
    $championInfo.toggle();
  }

  var $championList = $('#champion-list'),
      $modal = $('#modal'),
      $championInfo = $('#champion-info'),
      $form = $('#sort-champions'),
      $filter = $("input[type='submit']");


  $championList.on('click', '.champion', function() {
    var name = $(this).data('name'),
        height = $(window).scrollTop() + 50;

    $championInfo.html('');
    $championInfo.css('top', height);
    getChampionInfo(name);
    modalToggle();
  });

  $filter.on('click', function(e) {
    e.preventDefault();

    var types = [];

    $form.find("input[type='checkbox']:checked").each(function() {
      types.push($(this).val());
    });

    filterChampions(types);
  });

  $championInfo.on('click', 'h3', function() {
    var panel = $(this).closest('div').find('ul li');
    panel.slideToggle(1000);
  });

  $championInfo.on('click', '.close', modalToggle);

  $($modal).on('click', modalToggle);

  getChampionNames();
});
