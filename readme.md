# Дипломная работа

___
Для запуска задачи gulp необходимо в командной строке ввести команду: `gulp`
___

## Техническое задание на дипломную работу

Необходимо разработать сайт для бургерной в соответствии с приложенным макетом PSD.

### Требования к выполнению:

- Полное соответствие сайта с psd-макетами десктопной и мобильной версии.
- Корректное отображение сайта на любом устройстве с шириной от 320 до 1920 пикселей
- Пункты меню должны прокручивать страницу к соответствующим блокам.
- Кнопка «Забронировать стол» прокручивает страницу к блоку с формой внизу.
- Категории в блоке «Меню» переключаются по клику на блоки с иконками и названиями под заголовком. На каждой вкладке
  находится слайдер, в котором расположены карусели с товарами. Товары можно взять из интернета или придумать
  самостоятельно.
- В блоке с отзывами реализовать не менее 6 элементов в слайдер. Отзывы придумать самостоятельно или взять из интернета.
- При нажатии на кнопку «Забронировать стол» в последнем блоке обязательно должна производиться валидация полей, и в
  случае ошибок отображение их под полями вместе с красными рамками текстовых полей. Сообщение о заказе звонка должно
  отправляться в виде POST запроса на адрес https://testologia.ru/checkout с указанными данными. Если отправляется name
  itlogia - в ответ приходит объект со свойством success равным 1, если другие данные - success со значением 0. В первом
  случае необходимо вывести пользователю ошибку через alert, во втором - показать модальное окно, расположенное на
  скрытом слое в макете. Маску для номера телефона можно реализовать по желанию.
- Использовать на странице анимацию для плавного появления блоков (библиотека wow.js)
- Иконки соц. сетей при наведении должны становиться 90% непрозрачности

### По желанию:

- Реализовать обратный отсчет в таймере в блоке «Забронировать стол».
- Применить маску для номера телефона.
- Использовать sass/less
- Использовать grunt/gulp
- Использовать любые необходимые библиотеки для улучшения визуальной или технической части сайта
- Добавить эффекты при наведении на кнопки и другие элементы.
