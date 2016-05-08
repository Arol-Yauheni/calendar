function createCalendar(year, month) {

  var elem = document.querySelector('#calendar');
  var titleDate = document.querySelector('#title-date');

  console.log(titleDate);

  var date = new Date(year, month);

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
    template += '<div class="cell"><p>' + date.getDate() + '</p></div>';
    date.setDate(date.getDate() + 1);
  }

  if (getDay(date) != 0) {
    for (var i = getDay(date); i < 7; i++) {
      template += '<div class="cell"></div>';
    }
  }
  elem.innerHTML = template;
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

  console.log(currentMonth);

  var prevArrow = document.querySelector('.prev');
  prevArrow.addEventListener('click', function (e) {
    currentMonth -= 1;
    createCalendar(currentYear, currentMonth);
    console.log(currentMonth);
  });


  var nextArrow = document.querySelector('.next');
  nextArrow.addEventListener('click', function (e) {
    currentMonth += 1;
    console.log(currentMonth);
    createCalendar(currentYear, currentMonth);
  });

});
