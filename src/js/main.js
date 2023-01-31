import $ from './lib/lib';

$('button').click(() => {
    $('.findme').fadeToggle(800);
});

// console.log($('div').find('.more'));

// console.log($('.some').eq(0).siblings());

// $('button').fadeIn(1800);

$('.wrap').html(
    `<div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" id="dropdownMenuButton">Dropdown button</button>
        <div class="dropdown-menu" data-toggle-id="dropdownMenuButton">
            <a href="#" class="dropdown-item">Action</a>
            <a href="#" class="dropdown-item">Action #2</a>
            <a href="#" class="dropdown-item">Action #3</a>
        </div>
    </div>`
);

$('.dropdown-toggle').dropdown();
