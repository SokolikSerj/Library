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