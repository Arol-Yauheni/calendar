function createCalendar(year, month) {

  var elem = document.querySelector('#calendar');
  var titleDate = document.querySelector('#title-date');

  var date = new Date(year, month);

  var numberOfMonth = date.getMonth();
  var currYear = date.getFullYear();
  var dateReq;
  if (numberOfMonth < 9) {
    dateReq = currYear + "-0" + (numberOfMonth + 1);
  } else {
    dateReq = currYear + "-" + (numberOfMonth + 1);
  }

  var options = {
    year: 'numeric',
    month: 'long'
  };

  var templateDate = '<p>' + date.toLocaleString("ru", options) + '</p>';
  titleDate.innerHTML = templateDate;

  var template = '<div class="day"><p>ПН</p></div><div class="day"><p>ВТ</p></div><div class="day"><p>СР</p></div><div class="day"><p>ЧТ</p></div><div class="day"><p>ПТ</p></div> <div class="day"><p>СБ</p></div><div class="day"><p>ВС</p></div>';

  for (var i = 0; i < getDay(date); i++) {
    template += '<div class="cell"></div>';
  }

  while (date.getMonth() == month) {
    if (date.getDate() < 10) {
      template += '<div id="' + dateReq + '-0' + date.getDate() + '" class="cell"><p>' + date.getDate() + '</p></div>';
    } else {
      template += '<div id="' + dateReq + '-' + date.getDate() + '" class="cell"><p>' + date.getDate() + '</p></div>';
    }
    date.setDate(date.getDate() + 1);
  }

  if (getDay(date) != 0) {
    for (var i = getDay(date); i < 7; i++) {
      template += '<div class="cell"></div>';
    }
  }
  elem.innerHTML = template;

  $.get("/api/data/" + dateReq, success, "json");
}

function success(data) {
  for (var i = 0; i < data.length; i++) {
    var selector = "#" + data[i].date;
    if (document.querySelector(selector)) {
      console.log(data[i].date);
    }
  }
  console.log(data);
}

function getDay(date) {
  var day = date.getDay();
  if (day == 0) {
    day = 7;
  }
  return day - 1;
}

$(document).ready( function () {

  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();
  var currentYear = currentDate.getFullYear();

  createCalendar(currentYear, currentMonth);

  var prevArrow = document.querySelector('.prev');
  prevArrow.addEventListener('click', function (e) {
    currentMonth -= 1;
    createCalendar(currentYear, currentMonth);
  });

  var nextArrow = document.querySelector('.next');
  nextArrow.addEventListener('click', function (e) {
    currentMonth += 1;
    createCalendar(currentYear, currentMonth);
  });

});
