$('[data-toggle="modal"]').modal(500);

$('.carousel').carousel();

const name = 'John';
$('h2').eq(0).html(`Предложение специально для вас, ${name}`);