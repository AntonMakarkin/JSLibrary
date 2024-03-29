import $ from '../core';

$.prototype.carousel = function() {
    for (let i = 0; i < this.length; i++) {
        const width = window.getComputedStyle(this[i].querySelector('.carousel-inner')).width,
        slides = this[i].querySelectorAll('.carousel-item'),
        slidesField = this[i].querySelector('.carousel-slides'),
        dots = this[i].querySelectorAll('.carousel-indicators li');

        slidesField.style.width = 100 * slides.length + '%'; //width of the slide tap
        slides.forEach(slide => {
            slide.style.width = width;
        });

        let offset = 0,
        slideIndex = 0;

        $(this[i].querySelector('[data-slide="next"]')).click(e => { //next button
            e.preventDefault();
            if (offset == (+width.replace(/\D/g, '') * (slides.length - 1))) {
                offset = 0;
            } else {
                offset += +width.replace(/\D/g, '');
            }

            slidesField.style.transform = `translateX(-${offset}px)`; //moving slider tape

            if (slideIndex == slides.length - 1) {
                slideIndex = 0;
            } else {
                slideIndex++;
            }

            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active'); //mark current slide by current dot
        });

        $(this[i].querySelector('[data-slide="prev"]')).click(e => { //prev button
            e.preventDefault();
            if (offset == 0) {
                offset = +width.replace(/\D/g, '') * (slides.length - 1);
            } else {
                offset -= +width.replace(/\D/g, '');
            }

            slidesField.style.transform = `translateX(-${offset}px)`; //moving slider tape

            if (slideIndex == 0) {
                slideIndex = slides.length - 1;
            } else {
                slideIndex--;
            }

            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active'); //mark current slide by current dot
        });

        const sliderId = this[i].getAttribute('id');
        $(`#${sliderId} .carousel-indicators li`).click(e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.replace(/\D/g, '') * slideTo;

            slidesField.style.transform = `translateX(-${offset}px)`; //moving slider tape
            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active'); //mark current slide by current dot
        });
    }
};

//I have to made programm creation of the slider

$.prototype.createCarousel = function() {

};