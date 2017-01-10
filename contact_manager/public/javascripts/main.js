function sortParams(params, editID) {
  var data = {};

  params.split('&').forEach(function(input) {
    input = input.split('=');
    data[input[0]] = input[1];
  });

  data.email = decodeURIComponent(data.email);

  if (checkData(data)) {
    if (editID) {
      saveData(data, editID);
      changeContactInfo(data);
    } else {
      saveData(data);
      appendContact(data);
    }

    return true;
  }
}

function changeContactInfo(data) {
  var $li = $("li[data-id=" + data.id + "]");

  $li.find('p').text(data.firstName + ' ' + data.lastName);
  $li.find('dd').eq(0).text(data.phoneNumber);
  $li.find('dd').eq(1).text(data.email);
}

function saveData(data, id) {
  var id = id || makeId(),
      allContacts = JSON.parse(localStorage.contactManager);

  data.id = id;
  allContacts[id] = JSON.stringify(data);
  localStorage.contactManager = JSON.stringify(allContacts);
}

function makeId() {
  var allContacts = JSON.parse(localStorage.contactManager),
      length = Object.keys(allContacts).length;

  if (length === 0) {
    return 1;
  } else {
    return Object.keys(allContacts)
                 .map(Number)
                 .sort(function(a, b) {
                   return a - b;
                 })[length - 1] + 1;
  }
}

function appendContact(data) {
  var obj = {
        id: data.id,
        contactName: data.firstName + ' ' + data.lastName,
        phoneNumber: data.phoneNumber,
        contactEmail: data.email
      };

  $('#contact-list').append(JST['contacts'](obj));
}

function checkData(data) {
  var respone = [];

  respone.push(checkName(data.firstName, 'first'));
  respone.push(checkName(data.lastName, 'last'));
  respone.push(checkEmail(data.email));
  respone.push(checkPhoneNumber(data.phoneNumber));

  if (respone.includes(undefined)) { return false; }
  return true;
}

function checkName(name, type) {
  if (name.match(/^[a-z]+$/gi)) {
    return true;
  } else {
    outputError(type + ' name', type + 'Name');
  }
}

function checkEmail(email) {
  if (email.match(/^([a-z0-9])+([.])?([a-z0-9])+@([a-z])+[.]([a-z])+$/gi)) {
    return true;
  } else {
    outputError('email address', 'email');
  }
}

function checkPhoneNumber(number) {
  if (number.match(/[0-9]{10}/)) {
    return true;
  } else {
    outputError('phone number', 'telephone');
  }
}

function outputError(message, input) {
  var obj = {
    input: message
  }

  $('#' + input).append(JST['error-message'](obj));
}

function deleteErrorMessages() {
  $('label p').remove();
}

function resetForm() {
  $('form')[0].reset();
}

function showContacts() {
  if (localStorage.contactManager) {
    var allContacts = JSON.parse(localStorage.contactManager);

    for(var id in allContacts) {
      appendContact(JSON.parse(allContacts[id]));
    }
  } else {
    localStorage.contactManager = JSON.stringify({});
  }
}

function fillOutForm($contact) {
  var fullName = $contact.find('p').text().split(' '),
      firstName = fullName[0],
      lastName = fullName[1],
      phone = $contact.find('dd').eq(0).text(),
      email = $contact.find('dd').eq(1).text();

  $('#firstName input').val(firstName);
  $('#lastName input').val(lastName);
  $('#email input').val(email);
  $('#telephone input').val(phone);
}

$(function() {
  function toggleElements() {
    $form.slideToggle('slow');
    $contactList.slideToggle();
    $mainHeader.slideToggle();
  }

  var $addContact = $('#add-contact'),
      $form = $('form'),
      $cancel = $('#cancel'),
      $submit = $('#submit'),
      $contactList = $('#contact-list'),
      $mainHeader = $('#main-header'),
      $search = $('#search-contact'),
      editID = 0;

  $addContact.on('click', function(e) {
    e.preventDefault();

    editID = 0;
    resetForm();
    deleteErrorMessages();
    toggleElements();
  });

  $submit.on('click', function() {
    var params = $form.serialize(),
        data;

    deleteErrorMessages();

    if (sortParams(params, editID)) {
      toggleElements();
      editID = 0;
    }
  });

  $search.on('focus', function() {
    $(this).on('keyup', function() {
      var value = $(this).val().toLowerCase();

      $contactList.find('li').hide();

      $contactList.find('li').filter(function() {
        return $(this).find('p').text().toLowerCase().match(value);
      }).show();
    });
  });

  $contactList.on('click', '.delete-contact', function(e) {
    e.preventDefault();

    var $li = $(this).closest('li'),
        id = $li.data('id'),
        allContacts = JSON.parse(localStorage.contactManager);

    $li.remove();
    delete allContacts[id];
    localStorage.contactManager = JSON.stringify(allContacts);
  });

  $contactList.on('click', '.edit-contact', function(e) {
    e.preventDefault();

    var $li = $(this).closest('li');

    editID = $li.data('id');
    fillOutForm($li);
    deleteErrorMessages();
    toggleElements();
  });

  $cancel.on('click', toggleElements);

  showContacts();
});
