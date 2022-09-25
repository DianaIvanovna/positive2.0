[<-назад](/README.md)

# Описание структур

## Тур (tour)
- id                - ID тура
- name              - название тура
- description       - описание тура
- image             - изображение тура
- trips             - массив с поездками

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

## Заказ
- id                - ID заказа
- idUserOwner       - ID пользователя в системе на которого оформлен заказ (заказчик)
- phoneOwner        - Телефон заказчика
- emailOwner        - Почта заказчика
- firstNameOwner    - Имя заказчика
- lastNameOwner     - Фамилия заказчика
- data              - Данные заказа: список туристов, данные туристов, допуслуги для туристов
                        {
                            tourists: [
                                {
                                    firstName: 'dfsdfdfs',
                                    lastName: 'dfsdfdfs',
                                    middleName: 'dfsdfdfs',
                                    passportSeries:
                                    passportNumber:
                                    passportDateIssue:
                                    passportWhoIssue:
                                    passportCodeDivision: 
                                    birthday:
                                    services: [
                                        {
                                            id:
                                            quantity:
                                        }
                                    ]
                                }
                            ]

                        }



