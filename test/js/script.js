window.addEventListener('DOMContentLoaded', () => {
    $('.slider').slider(
        {
            autoplay: true
        });

    $('[data-toggle="modal"]').modal();

    $('[data-tabpanel] .tab-item').tab();

    $('.accordion-head').accordion();


    const name = 'Jhon';

    $('h2').eq(0).html(`Это предложение именно для вас, ${name}`);
});
