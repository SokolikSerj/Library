import $ from './lib/lib';

$('button').click(() => {
    $('div').eq(2).toggleClass('active');
});

$('div').click(function() {
    console.log($(this).index());
});

// console.log($('div').find('.more'));

// console.log($('.some').eq(0).siblings());

$('button').fadeIn(1800);
