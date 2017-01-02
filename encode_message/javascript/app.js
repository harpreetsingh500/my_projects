var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                'u', 'v', 'w', 'x', 'y', 'z'];

function encodeMessage(message) {
  var encodedMessage = '',
      key = '';

  message.split('').forEach(function(letter) {
    if (letter.match(/[a-z]/gi)) {
      var idx = Math.floor(Math.random() * 26),
          newletter = encodeLetter(alphabet.indexOf(letter.toLowerCase()), idx);

      if (letter === letter.toUpperCase()) {
        key += alphabet[idx].toUpperCase();
      } else {
        key += alphabet[idx];
      }

      encodedMessage += newletter;
    } else {
      encodedMessage += letter;
    }
  });

  appendMessageEncoded(encodedMessage, key);
}

function decodeMessage(message, key) {
  var decodedMessage = '',
      count = 0;

  message.split('').forEach(function(letter) {
    if (letter.match(/[a-z]/gi)) {
      var idx = alphabet.indexOf(letter) - alphabet.indexOf(key[count].toLowerCase());

      if (key[count] === key[count].toUpperCase()) {
        decodedMessage += decodeLetter(idx).toUpperCase();
      } else {
        decodedMessage += decodeLetter(idx);
      }

      count++;
    } else {
      decodedMessage += letter;
    }
  });

  appendMessageDecoded(decodedMessage);
}

function encodeLetter(letterIndex, amount) {
  var idx = letterIndex + amount;

  if (idx > 25) {
    idx = Math.abs(26 - amount - letterIndex)
  }

  return alphabet[idx];
}

function decodeLetter(idx) {
  if (idx < 0) {
    idx = 26 + idx;
  }
  return alphabet[idx];
}

function appendMessageEncoded(message, key) {
  var template = Handlebars.compile($('#show-message-encoded').html()),
      $encodedMessage = $('#encodedMessage'),
      obj = {
        message: message,
        key: key
      };

  $encodedMessage.html('')
                 .append(template(obj))
                 .show();
}

function appendMessageDecoded(message) {
  var template = Handlebars.compile($('#show-message-decoded').html()),
      $decodedMessage = $('#decodedMessage'),
      obj = {
        message: message
      };

  $decodedMessage.html('')
                 .append(template(obj))
                 .show();
}

$(function() {
  var $encodeSubmit = $('#encode').find("input[type='submit']"),
      $decodeSubmit = $('#decode').find("input[type='submit']");

  $encodeSubmit.on('click', function(e) {
    e.preventDefault();

    var message = $('#encodeInput').val();

    if (message !== '') {
      encodeMessage(message);
    }
  });

  $decodeSubmit.on('click', function(e) {
    e.preventDefault();

    var message = $('#decodeInput').val(),
        key = $('#key').val();

    if (message !== '' && key !== '') {
      while (key.length < message.replace(/[^a-z]/gi).length) {
        key += alphabet[Math.floor(Math.random() * 26)];
      }

      decodeMessage(message, key);
    }
  })
});
