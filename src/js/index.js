const orderUrl = 'https://testologia.ru/checkout'

$(document).ready(() => {
    // Карусель
    $(".products .owl-carousel").owlCarousel({
        loop: true,
        nav: true,
        navText: [
            '<div><img src="../../assets/images/icons/icon_arrow_left.png"></div>',
            '<div><img src="../../assets/images/icons/icon_arrow_right.png"></div>'
        ],
        responsive: {
            600: {
                items: 2,
                slideBy: 2,
            },
            768: {
                items: 3
            },
            1200: {
                items: 4
            }
        },
    });
    $(".reviews .owl-carousel").owlCarousel({
        loop: true,
        nav: true,
        navText: [
            '<div><img src="../../assets/images/icons/icon_arrow_left.png"></div>',
            '<div><img src="../../assets/images/icons/icon_arrow_right.png"></div>'
        ],
        responsive: {
            600: {
                items: 1
            },
            768: {
                items: 2
            },
            1100: {
                items: 3
            }
        },
    });

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
            menu.removeChild(address)
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

    // Закрываем всплывающее окно
    $('.close-button').click(() => closePopup('success-block'))

    // Обратный отсчет в форме заказа
    timer(min=30, sec=0)
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
