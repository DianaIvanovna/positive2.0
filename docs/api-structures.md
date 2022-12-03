[<-назад](/README.md)

# Описание структур

## Тур (tour)
- id                - ID тура
- nameWP            - название в WP
- name              - название тура для FE
- description       - описание тура
- descriptionShort  - краткое описание
- season            - сезон тура
- duration          - продолжительность тура
- place             - место тура
- plan              - описание плана поездки
- planPicture       - картинка плана поездки
- video             - ссылка на видео о туре
- images            - изображения, массив
- trips             - массив с поездками
- thumbnail         - базовое изображение тура
- order             - сортировка

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
- idUserOwner       - ID пользователя в системе на которого оформлен заказ (заказчик)
- phoneOwner        - Телефон заказчика
- emailOwner        - Почта заказчика
- firstNameOwner    - Имя заказчика
- lastNameOwner     - Фамилия заказчика
- status            - Статус заказа created | payed | confirmed | canceled
                        created     - пользователь только отправил заказ
                        payed       - пользователь оплатил заказ
                        confirmed   - администратор подтвердил заказ
                        canceled    - заказ был отменен
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




