$(document).ready( function () {

  var addBtn = document.getElementById('add-members');
  var popup = document.getElementById('users-popup');

  addBtn.addEventListener('click', function (e) {
    popup.style.display = "block";
  });

  var closeBtn = document.getElementById('button-close');

  closeBtn.addEventListener('click', function (e) {
    popup.style.display = "none";
  });

});
