[<-назад](/README.md)


# Методы API

## Работа с турами

### Получить туры
POST-запрос на адрес /wp-json/pozitiv/v1/tour/get/  
Если вызвать без параметров - вернет список всех туров.  
Параметры:  
- id    ID требуемого тура  

Вернет список туров с поездками поездки с перечнем допуслуг


## Работа с Заказами 

### Создание заказа
POST-запрос на адрес /wp-json/pozitiv/v1/order/create/  
Очищает телефон от лишних символов, проверяет валидность написания почты, проверяет валидность переданного json.  
Попытается найти существующего пользователя по e-mail если не найдет - создаст нового.  
Параметры:
- phoneOwner        - телефон владельца заказа, обязательный
- emailOwner        - почта владельца заказа, обязательный
- firstNameOwner    - имя владельца заказа, не обязательный
- lastNameOwner     - фамилия владельца заказа, не обязательный
- data              - данные заказа, json-строка. [Структура данных заказа](api-structures.md#orderStructure)

В случае успеха вернет: {result:1, order:{объект_заказа}}

