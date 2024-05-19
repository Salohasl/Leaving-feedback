const car = document.querySelector('#car');
const local = JSON.parse(localStorage.getItem('transfer'));
car.value = local.auto + ' ' + local.transfer;

