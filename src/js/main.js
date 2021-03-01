import $ from './lib/lib';

$('button').on('click', function() {
    $('div').eq(1).toggleClass('active');
});

$('div').click(function() {
    console.log($(this).index());
});

$('button').fadeIn(1800);
//console.log($('.some').closest('.findme'));
//console.log($('div').eq(2).find('.some'));

//console.log($('button').html('Hello'));

//$('.active').getAttr('disabled');

