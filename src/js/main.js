import $ from './lib/lib';

$('#trigger').click(() => $('#trigger').createModal({
    text: {
        title: 'Modal huy chlen',
        body: 'Kjksdjds JKSdjks dksd sdjdhshjdgshjgdfhsfg wuf7gffgdhfjsgdhf dhftgyewgfdhsjfdhjsgfhdsgfhsgfhjbsdgfdsdsdds'
    },
    btns: {
        count: 3,
        settings: [
            [
                'Close',
                ['btn-danger', 'mr10'],
                true
            ],
            [
                'Save changes',
                ['btn-success', 'mr10'],
                false,
                () => {
                    alert('Huy');
                }
            ],
            [
                'Another button',
                ['btn-dark', 'ml10'],
                false,
                () => {
                    alert('Pesda');
                }
            ]
        ]
    }
}));

$('[data-tabpanel] .tab-item').tab();
$('.dropdown-toggle').dropdown();
$('[data-toggle="modal"]').modal();
$('.accordion-head').accordion();
$('.slider').slider(
    {
        autoplay: true,
        speed: 5,
        delay: 2
    });

$('.test').createSlider(
    {
        id: 'fuckenshit',
        dots: true,
        prev: true,
        next: true,
        items: [
            {
                src: "https://cdn.meta.ua/meta_news/d8/01001in1-d887.jpeg",
                alt: "Huy"
            },
            {
                src: "https://i.ytimg.com/vi/lsKAkcOwiq0/maxresdefault.jpg",
                alt: "Huy2"
            },
            {
                src: "https://rau.ua/wp-content/uploads/2018/09/40157794_923785607831878_144863367083851776_n.jpg",
                alt: "Huy3"
            },
            {
                src: "https://drohobych.city/upload/article/o_1fv3mgdlgb4uj9bppk10qt12eg7h.jpg",
                alt: 'Chlen'
            }
        ]
    });