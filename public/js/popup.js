$(document).ready( function () {

  var addBtn = document.getElementById('add-members');
  var popup = document.getElementById('users-popup');

  addBtn.addEventListener('click', function (e) {
    popup.style.display = "block";
  });

});
