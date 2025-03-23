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

    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open')
    }

    document.querySelectorAll('#menu *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open');
        }
    })


    $('#submit-order').click(() => {
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
                    product: $('#product-input').val(),
                    name: $('#name-input').val(),
                    phone: $('#phone-input').val(),
                }
            }).done((message) => {
                loader.hide()
                if (message.success) {
                    let form = $('.order-form')
                    form.hide()
                    let successBlock = $('<div class="success-block">Спасибо за Ваш заказ. Мы скоро свяжемся с Вами!</div>')
                    successBlock.css({
                        width: form.width(),
                        // height: form.height(),  // Выглядит некрасиво, поэтому высоту не трогаем
                    })
                    form.after(successBlock)
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                }
            })
        }
    })
})