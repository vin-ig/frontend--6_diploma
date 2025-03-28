const orderUrl = 'https://testologia.ru/checkout'

$(document).ready(() => {

    // WOW.js
    new WOW({
        animateClass: 'animate__animated',
        offset: 300,
    }).init()

    // Работа с меню в мобильной версии
    let menu = document.getElementById('menu')
    let address = document.getElementById('address').cloneNode(true)
    document.getElementById('burger').onclick = function () {
        menu.classList.add('open')
        address.style.display = 'flex'
        menu.append(address)
    }
    document.querySelectorAll('#menu *').forEach((item) => {
        item.onclick = () => {
            closePopup('menu')
            if (menu.contains(address)) {
                menu.removeChild(address)
            }
        }
    })


    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
        });
    });


    // Обработка формы
    $('#submit-order').click(() => {
        const nameInput = $('#name-input')
        const phoneInput = $('#phone-input')
        const loader = $('.loader')
        $('.error-input').css({visibility: 'hidden'})
        let hasError = false

        for (let input of $('.order-form input')) {
            input = $(input)
            input.css({borderColor: 'initial'})

            if (!input.val()) {
                input.css({borderColor: 'red'})
                input.next().css({visibility: 'visible'})
                hasError = true
            }
        }

        if (!hasError) {
            loader.css({display: 'flex'})
            $.ajax({
                method: 'POST',
                url: orderUrl,
                data: {
                    name: nameInput.val(),
                    phone: phoneInput.val(),
                }
            }).done((message) => {
                loader.hide()
                if (message.success) {
                    $('#success-block').addClass('open')
                    nameInput.val('')
                    phoneInput.val('')
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                }
            })
        }
    })

    document.getElementById('phone-input').oninput = (event) => {
        let value = event.target.value.replace(/\D/g, '')
        let formatted = '';
        if (value.length > 0) {
            formatted += '+7 (';
        }
        if (value.length > 1) {
            formatted += value.slice(1, 4);
        }
        if (value.length >= 4) {
            formatted += ') ' + value.slice(4, 7);
        }
        if (value.length >= 7) {
            formatted += '-' + value.slice(7, 9);
        }
        if (value.length >= 9) {
            formatted += '-' + value.slice(9, 11);
        }
        event.target.value = formatted
    }


    // Закрываем всплывающее окно
    $('.close-button').click(() => closePopup('success-block'))


    // Обратный отсчет в форме заказа
    timer(min = 30, sec = 0)


    // Переключение вкладок в "Меню"
    const productTab = $('.ingredient')
    const productSlider = $('.products-items')
    productTab.click((event) => {
        let clickedElem = $(event.target)
        let ingredientId = clickedElem.attr('id')
        while (!ingredientId) {
            clickedElem = clickedElem.parent()
            ingredientId = clickedElem.attr('id')
        }

        productTab.removeClass('active')
        productSlider.removeClass('active')

        $(document.getElementById(ingredientId)).addClass('active')
        $(document.getElementById(ingredientId.split('-')[1])).addClass('active')
    })


    // Слайдер
    const productSwiper = new Swiper('.products-items.swiper', {
        loop: true,
        spaceBetween: 75,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                grid: {
                    rows: 2,
                    fill: 'row',
                },
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            }
        }
    });

    const reviewSwiper = new Swiper('.reviews-items.swiper', {
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                grid: {
                    rows: 3,
                    fill: 'row',
                },
                slidesPerView: 1,
                slidesPerGroup: 3,
                spaceBetween: 20,
            },
            630: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 70,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
})


function closePopup(elemId) {
    document.getElementById(elemId).classList.remove('open')
}


function timer(min, sec) {
    let timeDelta = (min * 60 + sec) * 1000
    let minute1 = $('#minute-1')
    let minute2 = $('#minute-2')
    let second1 = $('#second-1')
    let second2 = $('#second-2')
    const timerInterval = setInterval(() => {
        if (timeDelta == 0) {
            clearInterval(timerInterval);
            $('.timer-cell').css({
                color: 'gray',
                boxShadow: '0 0 5px 1px red',
            })
        }
        let time = getTimeFromDelta(timeDelta)
        minute1.text(Math.floor(time.min / 10))
        minute2.text(time.min % 10)
        second1.text(Math.floor(time.sec / 10))
        second2.text(time.sec % 10)
        timeDelta -= 1000
    }, 1000)
}

function getTimeFromDelta(timedelta) {
    let totalSeconds = timedelta / 1000
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = totalSeconds % 60

    return {
        min: minutes,
        sec: seconds
    }
}
