var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var App = {
  guessWords: ['apple', 'orange', 'banana'],
  guesses: [],
  startGame: function() {
    this.randomWord = this.getRandomWord();
    this.outputRandomWord(this.randomWord);
  },
  getRandomWord: function() {
    return this.guessWords[Math.floor(Math.random() * this.guessWords.length)];
  },
  outputRandomWord: function(randomWord) {
    var wordLength = randomWord.length,
        $guessWord = $('#guess-word');

    for (var i = 0; i < wordLength; i++) {
      $guessWord.append('<span></span>');
    }
  },
  checkInput: function(letter, word) {
    var $span = $('#guess-word span'),
        badGuess = true;

    word.split('').forEach(function(letter2, idx) {
      if (letter2 === letter) {
        $span.eq(idx).text(letter);
        badGuess = false;
      }
    });

    $('#show-guesses').append('<span>' + letter + '</span>');

    if (badGuess) { this.takeAwayApple(); }
  },
  checkIfWon: function() {
    var won = true;

    $('#guess-word span').each(function(_, span) {
      if ($(span).text() === '') {
        won = false;
      }
    });

    return won;
  },
  takeAwayApple: function() {
    var current = +$('#apples').css('background-position-y').replace(/[px]/g, '');

    if (current === -1610) {
      $('#apples').hide();
    } else {
      $('#apples').css('background-position-y', current - 322);
    }
  },
  applesLeft: function() {
    return $('#apples:visible').length === 0;
  },
  resetGame: function(e) {
    e.preventDefault();

    $('#message, #guess-word, #show-guesses').html('');
    $('#apples').show()
                .css('background-position-y', 0);

    this.guesses = [];
    this.startGame();
  },
  outputMessage: function(result) {
    if (result === 'won') {
      $('#message').append('<p>You guessed correctly you win!</p>');
    } else {
      $('#message').append('<p>Sorry wrong guess you lose.</p>');
    }

    $('#message').append("<a href='#'>Play again.</a>");
  }
};

$(function() {
  $('body').on('keyup', function(e) {
    var letter = e.key.toLowerCase();

    if (alphabet.includes(letter) && !this.guesses.includes(letter) && $('#message').text() === '') {
      this.guesses.push(letter);
      this.checkInput(letter, this.randomWord);

      if (this.checkIfWon()) {
        this.outputMessage('won');
      } else if (this.applesLeft()) {
        this.outputMessage('lost');
      }
    }
  }.bind(App));

  $('#message').on('click', 'a', App.resetGame.bind(App));

  App.startGame();
});
