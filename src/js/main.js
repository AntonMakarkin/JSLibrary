import $ from './lib/lib';

$('#first').on('click', () => {
    $('div').eq(1).fadeToggle(800);
});

$('[data-count="second"]').on('click', () => {
    $('div').eq(2).fadeToggle(800);
});

$('button').eq(2).on('click', () => {
    $('.w-500').fadeToggle(800);
});

$('[data-toggle="modal"]').modal(500);

$('#trigger').click(() => $('#trigger').createModal({
    animTime: 300,
    text: {
        title: 'Modal title',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus nobis quaerat eligendi est fugit enim tempora commodi suscipit? Aliquam nisi itaque quibusdam molestias placeat neque, et asperiores at ipsa explicabo!'    
    },
    btns: {
        count: 3,
        settings: [
            [
                'Close',
                ['btn-danger', 'mr-10'],
                true
            ],
            [
                'Safe changes',
                ['btn-success'],
                false,
                () => {
                    alert('Данные сохранены');
                }
            ],
            [
                'Another btn',
                ['btn-warning', 'ml-10'],
                false,
                () => {
                    alert('Hello world');
                }
            ]
        ]
    }
}));

$('.carousel').carousel();

/*$('.wrap').html(
    `
    <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" id="dropdownMenuBtn">Dropdown button</button>
        <div class="dropdown-menu" data-toggle-id="dropdownMenuBtn">
            <a href="#" class="dropdown-item">Action #1</a>
            <a href="#" class="dropdown-item">Action #2</a>
            <a href="#" class="dropdown-item">Action #3</a>
        </div>
    </div>`
);*/

//$('.dropdown-toggle').dropdown();

