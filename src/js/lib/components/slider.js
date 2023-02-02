import $ from "../core";

$.prototype.slider = function({autoplay = false, speed = 1, delay = 1} = {}) {
    for (let i = 0; i < this.length; i++) {
        const width = window.getComputedStyle(this[i].querySelector('.slider_inner')).width;
        const slides = this[i].querySelectorAll('.slider_item');
        const slidesField = this[i].querySelector('.slider_slides');
        const dots = this[i].querySelectorAll('.slider_indicators li');
        let intervalSlides;
        slidesField.style.width = 100 * slides.length + '%';
        slides.forEach(elem=> {
            elem.style.width = width;
        });

        let offset = 0;
        let slideIndex = 0;

        if (delay > speed) {
            delay = speed;
        }
        slidesField.style.transition = `all ${delay}s`;

        const toNextSlide = () => {
            if (offset == (+width.replace(/\D/g,'') * (slides.length - 1))) {
                offset = 0;
            } else {
                offset += +width.replace(/\D/g,'');
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == slides.length - 1) {
                slideIndex = 0;
            } else {
                slideIndex++;
            }

            dots.forEach(item => item.classList.remove('active'));
            dots[slideIndex].classList.add('active');
        };

        const toPrevSlide = () => {
            if (offset == 0) {
                offset = +width.replace(/\D/g,'') * (slides.length - 1);
            } else {
                offset -= +width.replace(/\D/g,'');
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == 0) {
                slideIndex = slides.length - 1;
            } else {
                slideIndex--;
            }

            dots.forEach(item => item.classList.remove('active'));
            dots[slideIndex].classList.add('active');
        };

        const autoPlaySlides = () => {
                intervalSlides = setInterval(toNextSlide, speed*1000);
        };

        const stopPlaySlides = () => {
            if (intervalSlides) {
                clearInterval(intervalSlides);
            }
        };

        $(this[i].querySelector('[data-slide="next"]')).click((e) => {
            e.preventDefault();
            toNextSlide();
        });

        $(this[i].querySelector('[data-slide="prev"]')).click((e) => {
            e.preventDefault();
            toPrevSlide();
        });

        const sliderId = this[i].getAttribute('id');
        $(`#${sliderId} .slider_indicators li`).click(e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.replace(/\D/g,'') * slideTo;

            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(item => item.classList.remove('active'));
            dots[slideIndex].classList.add('active');
        });

        if (autoplay) {
            autoPlaySlides();
            this[i].addEventListener('mouseenter', stopPlaySlides);
            this[i].addEventListener('mouseleave', autoPlaySlides);
        }
    }
};

$.prototype.createSlider = function({id = 'newSlide', dots = true, prev = true, next = true, items, 
    autoplay = true, speed = 1, delay = 1} = {}) {
    for (let i = 0; i < this.length; i++) {

        // Задание параметров основного блок слайдера
        this[i].classList.add('slider');
        this[i].setAttribute('id', id);

        // Создание блока индикаторов-точек
        const indicators = document.createElement('ol');
        indicators.classList.add('slider_indicators');
        for (let j = 0; j < items.length; j++) {
            let dot = document.createElement('li');
            if (j === 0) {
                dot.classList.add('active');
            }
            dot.setAttribute('data-slide-to', `${j}`);
            indicators.append(dot);
        }

        // Создание блока со слайдерами
        const innerTag = document.createElement('div');
        const slidesTag = document.createElement('div');
        innerTag.classList.add('slider_inner');
        slidesTag.classList.add('slider_slides');
        for (let j = 0; j < items.length; j++) {
            let slide = document.createElement('div');
            slide.classList.add('slider_item');
            slide.innerHTML = `
                <img src="${items[j].src}" alt="${items[j].alt}">
            `;
            slidesTag.append(slide);
        }
        innerTag.append(slidesTag);

        // Создание кнопки "назад"
        const prevTag = document.createElement('a');
        prevTag.classList.add('slider_prev');
        prevTag.setAttribute('href', '#');
        prevTag.setAttribute('data-slide', 'prev');
        prevTag.innerHTML = `
            <span class="slider_prev-icon">&lt;</span>
        `;

        // Создание кнопки "вперед"
        const nextTag = document.createElement('a');
        nextTag.classList.add('slider_next');
        nextTag.setAttribute('href', '#');
        nextTag.setAttribute('data-slide', 'next');
        nextTag.innerHTML = `
            <span class="slider_next-icon">&gt;</span>
        `;

        // Добавление точек под слайдером если dots: true
        if (dots) {
            this[i].append(indicators);
        }

        // Добавление кнопки "назад" если prev: true
        if (prev) {
            this[i].append(prevTag);
        }

        // Добавление кнопки "вперед" если next: true
        if (next) {
            this[i].append(nextTag);
        }
    
        // Добавление слайдов в карусель
        this[i].append(innerTag);

        // Вызов слайдера с помощью ранее созданное функции
        $(this[i]).slider({
            autoplay: autoplay,
            speed: speed,
            delay: delay
        });
    }
};