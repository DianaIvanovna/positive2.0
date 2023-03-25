[<-назад](/README.md)

# Описание структур

## Пользователь (user) 
- id                - ID пользователя
- login             - логин пользователя (e-mail)
- email             - e-mail пользователя
- firstName         - Имя пользователя в системе pozitiv (мета-поле)
- lastName          - Фамилия пользователя в системе pozitiv (мета-поле)
- phone             - Телефон пользователя в системе pozitiv (мета-поле)


## Тур (tour)
- id                - ID тура
- nameWP            - название в WP
- name              - название тура для FE
- description       - описание тура
- descriptionShort  - краткое описание
- season            - сезон тура: winter - зима | summer - лето
- duration          - продолжительность тура
- place             - место тура
- plan              - описание плана поездки
- planPicture       - картинка плана поездки
- video             - ссылка на видео о туре
- images            - изображения, массив
- trips             - массив с поездками
- thumbnail         - базовое изображение тура
- order             - сортировка
- slug              - часть url 


## Поездка (trip)
- id                - ID поездки
- dateStart         - timestamp начала поездки
- dateEnd           - timestamp завершения поездки
- touristLimit      - общее количество туристов в поездке
- cost              - стоимость за одного человека
- services          - массив id возможных допуслуг


## Допуслуга (service)
- id                - ID допуслуги
- name              - название допуслуги
- description       - описание допуслуги
- cost              - стоимость допуслуги, может быть 0
- prepayment        - предоплата, может быть 0


## Заказ <a name="orderStructure"></a>
- id                - ID заказа
- tourID            - ID тура
- tripID            - ID поездки
- idUserOwner       - ID пользователя в системе на которого оформлен заказ (заказчик)
- phoneOwner        - Телефон заказчика
- emailOwner        - Почта заказчика
- firstNameOwner    - Имя заказчика
- lastNameOwner     - Фамилия заказчика
- messageClient     - Комментарий заказчика по заказу
- messageAdmin      - Комментарий администратора системы по заказу
- status            - Статус заказа created | payed | confirmed | canceled
                        created     - пользователь только отправил заказ
                        payed       - пользователь оплатил заказ
                        confirmed   - администратор подтвердил заказ
                        canceled    - заказ был отменен
                        completed   - заказ завершен
- data              - Данные заказа: список туристов, данные туристов, допуслуги для туристов
```JSON
{
    "tourists": [
        {
            "firstName": "dfsdfdfs",
            "lastName": "dfsdfdfs",
            "middleName": "dfsdfdfs",
            "passportSeries": "432432423",
            "passportNumber": "32131",
            "passportDateIssue": "01.01.2001",
            "passportWhoIssue": "dfsdfdsfasdasd",
            "passportCodeDivision":  "333-444",
            "birthday": "01.01.1999",
            "services": [
                {
                    "id": 123,
                    "quantity": 1
                }
            ]
        }
    ]

}
```
- history           - история изменения заказа, изменяется только при выполнении кода, пользователи могут только просматривать
```JSON
{
    "21312312312": {    // timestamp изменения
        "message": "описание изменения"
        "order": {      // новое состояние заказа
            "phoneOwner": "",
            "emailOwner": "",
            "firstNameOwner": "",
            "lastNameOwner": "",
            "data": { объект_данных_заказа}
        }
    }
}
```


## Платеж
```JSON
{
    "id": 100500,
    "type": "acquiring",                            // Источник платежа, возможные значения: 
                                                    // - acquiring - оплачено через эквайринг
                                                    // - cash      - оплачено наличными
                                                    // - transfer  - оплачено переводом на карту
    "orderID": 100500,                              // ID заказа в системе к которому относится платеж
    "externalID": "sdfds4rc857t78b74398cb238xh29",  // Внешний ID платежа, ID платежа в банке, используется только если платеж выполнен через эквайринг
    "userID": 100500,                               // ID пользователя в системе
    "userEmail": "example@email.ru",                // Email пользователя осуществившего платеж
    "userPhone": "79123456789",                     // Телефон пользователя осуществившего платеж
    "amount": 300000,                               // Сумма платежа в копейках
    "description": "Произвольное описание",         // Описание платежа задаваемое оператором системы
    "formURL": "https://sdfdfdsgfsfsdfsdfsd",       // URL формы оплаты, используется только для платежей через эквайринг
    "dateCreate": 34234234234,                      // Timestamp создания платежа
    "status": "dfdsaasdda",                         // Статус платежа, возможные значения: 
                                                    // - success
                                                    // - fail 
                                                    // - process
                                                    // - new
}