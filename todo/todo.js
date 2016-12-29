function appendDays() {
  appendToForm($('#day'), 1, 31);
}

function appendYears() {
  appendToForm($('#year'), 2016, 2025);
}

function appendToForm($name, min, max) {
  for (var i = min; i <= max; i++) {
    $name.append('<option value=' + i + '>' + i + '</option>'); 
  }
}

function makeNewID() {
  var id,
      length = localStorage.length;
  
  if (length === 0) {
    id = 1;
  } else {
    id = +Object.keys(localStorage).sort(function(a, b) {
      return a - b;
    })[length - 1] + 1;
  }
  
  return id;
}

function saveData(data, id = '', done = false) {
  var obj = convertDataToObject(data);
  
  if (id === '') { id = makeNewID(); }
  
  localStorage[id] = JSON.stringify(obj);
  
  if (done) { saveAsComplete(id, true); }
  
  return modifyObject(obj, id);
}

function saveAsComplete(id, value = true) {
  var obj = JSON.parse(localStorage[id]);
  
  obj.done = value;
  localStorage[id] = JSON.stringify(obj);
}

function newData(data) {
  var obj = saveData(data);
  
  appendData(obj);
}

function editData(data, id) {
  var done = JSON.parse(localStorage[id]).done,
      obj = saveData(data, id, done),
      $a = $("a[data-id=" + id + "]");
      
  $a.text(obj.item + ' - ' + obj.dueDate);
  $a.closest('li').attr('data-date', obj.date);
}

function getData() {
  var newObj;
  
  for (var id in localStorage) {
    newObj = modifyObject(JSON.parse(localStorage[id]), id);
    appendData(newObj);
  }
}

function appendData(obj) {
  var $todoList = $('.todo-list'),
      template = Handlebars.compile($('#todo-items').html());
  
  $todoList.append(template(obj));
}

function modifyObject(obj, id) {
  var newObj = {
    item: obj.item,
    id: id,
    done: obj.done
  };
  
  if (obj.month === 'Month' || obj.year === 'Year') {
    newObj.dueDate = 'No Due Date';
  } else {
    newObj.dueDate = obj.month + '/' + obj.year.replace(/^20/, '');
  }
  
  newObj.date = newObj.dueDate.split(/[ /]/).join('-');
  return newObj;
}

function convertDataToObject(data) {
  var obj = {},
      paramName,
      paramValue;
      
  data.split('&').forEach(function(param) {
    param = param.split('=');
    paramName = param[0];
    paramValue =  decodeURIComponent(param[1].replace(/[+]/g, ' '));
    
    obj[paramName] = paramValue;
  });
  
  return obj;
}

function resetForm() {
  $('#edit-title').val('');
  $("[value='Day'], [value='Month'], [value='Year']").prop('selected', true);
  $('#description').val('');
}

function showGroupedTodos(all, done) {
  $('.all-todos, .completed').find('tr + tr').remove();
  var allTotal,
      allCompleted;
  
  allTotal = appendGroupedTodos(all, '.all-todos');
  allCompleted = appendGroupedTodos(done, '.completed');
  
  $('.total-todos, .todo-amount').text(allTotal);
  $('.completed tr:first-child td:last-child').text(allCompleted);
}

function appendGroupedTodos(obj, className) {
  var dataName,
      total = 0;
  
  for (var date in obj) {
    dataName = date.split(/[ /]/).join('-');
    total += obj[date];
    
    if ($(className).find("[data-name=" + dataName + "]").length === 0) {
      $(className).append('<tr data-name=' + dataName + '><td>' + date + '</td><td>' +  obj[date] + '</td></tr>')
    } else {
      $(className).find("[data-name=" + dataName + "]").find('td:last').text(obj[date]);
    }
  }
  
  return total;
}

function sortTodos() {
  var list = [],
      complete = $('.todo-list li.complete'),
      incomplete = $('.todo-list li.incomplete');
  
  list.push(incomplete, complete);
  $('.todo-list li').remove();
  
  list.forEach(function($obj) {
    $obj.each(function(_, li) {
      $('.todo-list').append(li);
    });
  });
}

$(function() {
  function modalToggle() {
    $modalBackground.fadeToggle('slow');
    $form.fadeToggle('slow');
  }
  
  function fillOutForm(id) {
    var obj = JSON.parse(localStorage.getItem(id));
    
    $('#edit-title').val(obj.item);
    $('option').filter(function(_, option) {
      var val = $(option).val();
      return val === obj.month || val === obj.year || val === obj.day;
    }).prop('selected', true);
    $('#description').val(obj.description);
  }
  
  function groupTodosByDate() {
    var allTodos = {},
        completedTodos = {},
        length,
        date,
        text;
    
    $todoList.find('li').find('a:first').each(function(_, todoName) {
      text = $(todoName).text();
      
      if (text.match(/(.)* (No Due Date)/)) {
        allTodos['No Due Date'] = allTodos['No Due Date'] + 1 || 1;
        
        if ($(todoName).closest('li').hasClass('complete')) {
          completedTodos['No Due Date'] = completedTodos['No Due Date'] + 1 || 1;
        }
      } else {
        length = text.length,
        date = text.slice(length - 5, length);
        allTodos[date] = allTodos[date] + 1 || 1;
        
        if ($(todoName).closest('li').hasClass('complete')) {
          completedTodos[date] = completedTodos[date] + 1 || 1;
        }
      }
    });
    
    showGroupedTodos(allTodos, completedTodos);
    sortTodos();
  }
  
  var $addNewTodo = $('.add-todo'),
      $modalBackground = $('.todo-edit-background'),
      $form = $('.todo-edit-form'),
      $formSave = $('#save'),
      $todoList = $('.todo-list'),
      $nav = $('nav'),
      $markComplete = $('#mark-complete'),
      editID;
  
  $addNewTodo.on('click', function(e) {
    e.preventDefault();
    
    editID = undefined;
    resetForm();
    modalToggle();
  });
  
  $modalBackground.on('click', function() {
    modalToggle();
  });
  
  $formSave.on('click', function(e) {
    e.preventDefault();
    
    var data = $form.serialize();
    
    if (editID) {
      editData(data, editID);
    } else {
      newData(data);
    }
    
    groupTodosByDate();
    modalToggle();
  });
  
  $markComplete.on('click', function(e) {
    e.preventDefault();
    
    if (editID) {
      $('[data-id=' + editID + ']').addClass('done')
                                   .closest('li')
                                   .removeClass('incomplete')
                                   .addClass('complete');
     
      groupTodosByDate();
      modalToggle();
      saveAsComplete(editID);
    } else {
      alert("Cannot mark as complete because item has not yet been created.");
    }
  });
  
  $todoList.on('click', 'li', function(e) {
    var $li = $(this);
    
    if (e.target === this) {
      editID = $li.find('a:first').data('id');
      
      $li.toggleClass('incomplete')
         .toggleClass('complete');
      
      if ($li.hasClass('complete')) {
        saveAsComplete(editID);
        $li.find('a:first').addClass('done');
      } else {
        saveAsComplete(editID, false)
        $li.find('a:first').removeClass('done');
      }
      
      groupTodosByDate();
    }
  });

  $todoList.on('click', '.todo-name', function(e) {
    e.preventDefault();
    
    var id = $(this).data('id');
    
    editID = id;
    fillOutForm(id);
    modalToggle();
  });

  $todoList.on('click', '.delete', function(e) {
    e.preventDefault();
    
    var $li = $(this).closest('li'),
        id = $li.find('a:first').data('id');
    
    delete localStorage[id];
    $li.remove();
    groupTodosByDate();
  });

  $nav.on('click', 'tr', function() {
    var date = $(this).data('name'),
        $li = $todoList.find('li');
    
    $li.hide();
    
    if ($(this).hasClass('show-all-todos')) {
      $li.show();
    } else if ($(this).hasClass('show-all-completed')) {
      $todoList.find('li.complete').show();
    } else if ($(this).closest('table').hasClass('all-todos')) {
      $li.each(function(_, li) {
        if ($(li).data('date') === date) { $(li).show(); }
      });
    } else {
      $todoList.find('li.complete').each(function(_, li) {
        if ($(li).data('date') === date) { $(li).show(); }
      });
    }
  });

  
  appendDays();
  appendYears();
  getData();
  groupTodosByDate();
});
