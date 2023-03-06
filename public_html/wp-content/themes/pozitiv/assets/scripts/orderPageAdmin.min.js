class OrderPageAdmin {
    constructor() {
        if (typeof jQuery != 'function') { console.warn('jQuery not found. Die.')}

        //= Определим данные
        this.orderData = document.orderData;
        this.services = document.tripServices;

        //= Определим блоки
        this.jRootForm = jQuery('.pozitiv__order-edit-form');
        this.sectionTourists = this.jRootForm.find('#section-tourists');
        this.sectionPayments = this.jRootForm.find('#section-payments');
        this.listTourists = this.sectionTourists.find('#orderListTourist');
        this.listTouristServices = this.sectionTourists.find('#orderListServices');
        this.listTouristServicesAvailable = this.sectionTourists.find('#servicesListAvailable');
        this.listPayments = this.sectionPayments.find('#orderListPayments');
        
        //= Повесим обработчики
        //== Развернуть / свернуть туриста
        this.sectionTourists.on('click', '.tourist-item__header__toggler', jQuery.proxy( this.TouristToggleClick, this ));
        //== Удалить услугу туриста
        this.listTouristServices.on('click', '.tourist-service-item button', jQuery.proxy( this.TouristServiceRemove, this));
        //== Изменить услугу
        this.listTouristServices.on('change', '.tourist-service-item input', jQuery.proxy( this.TouristServiceChange, this) );
        //== Удалить туриста
        this.sectionTourists.on('click', '.tourist-item__remove', jQuery.proxy( this.TouristRemove, this));
        //== Добавить туриста
        this.sectionTourists.find('#btnTouristAdd').click( jQuery.proxy( this.TouristAdd, this) );
        //== Показать доступные услуги
        this.sectionTourists.find('#btnTouristServiceAdd').click( jQuery.proxy( this.TouristServicesAvailableShow, this) );
        //== Скрыть блок доступных услуг
        this.listTouristServicesAvailable.find('.closer').click( jQuery.proxy( this.TouristServicesAvailableShow, this) );
        //== Добавить услугу
        this.listTouristServicesAvailable.find('li>button').click( jQuery.proxy( this.TouristServicesAdd, this) );
        //== Добавить платеж
        this.sectionPayments.on('click', '#orderBtnPaymentAdd', jQuery.proxy(this.PaymentAdd, this) );
        
        //== Нажатие кнопки Отмены заказа
        this.jRootForm.find('#orderBtnCancel').click( jQuery.proxy( this.OrderCancel, this) );
        //== Нажатие кнопки Сохранить и подтвердить
        this.jRootForm.find('#orderBtnAccepted').click( jQuery.proxy( this.OrderAccept, this) );
        //== Нажатие кнопки Распечатать заказ
        this.jRootForm.find('#orderBtnPrint').click( jQuery.proxy( this.OrderPrint, this) );

        //== Отправить форму
        this.jRootForm.submit((e)=>{ this.CollectDataOrder(); return true; })
    }


    /**
     * Сворачивание/разворачивание туриста
     */
    TouristToggleClick(e) {
        var jTourist = jQuery(e.target).parents('.tourist-item');

        //= Если кликнутый пользователь развернут
        if (jTourist.hasClass('opened')) {
            jTourist.find('.tourist-item__data').css({'height': 0});
            jTourist.removeClass('opened');
            this.listTouristServices.html('');

            this.sectionTourists.find('.tourist-services-block__footer button').css({"display": "none"});
            this.listTouristServicesAvailable.removeClass('showed');
        }

        //= Если кликнутый пользователь свернут
        else {

            //== свернем другие развернутые пользователи
            this.sectionTourists.find('.tourist-item.opened').each( (e, el) => { 
                jQuery(el).removeClass('opened');
                jQuery(el).find('.tourist-item__data').css({'height': 0});
            });

            jTourist.find('.tourist-item__data').css({'height': 'auto'});
            jTourist.addClass('opened');

            this.TouristShowServices(jTourist);

            this.sectionTourists.find('.tourist-services-block__footer button').css({"display": "block"});
        }
    }


    /**
     * Удаление туриста
     */
    TouristRemove(e) {
        var jTourist = jQuery(e.currentTarget).parents('.tourist-item');
        var touristID = jTourist.data('tourist-id');

        //= Удалим блок отображения туриста
        jTourist.remove();

        //= Удалим туриста из данных
        this.orderData.tourists.splice(touristID, 1);

        //= Удалим отображение услуг удаленного туриста
        this.listTouristServices.html('');
    }


    /**
     * Добавление туриста
     */
    TouristAdd() {

        if (typeof this.orderData.tourists == 'undefined') {
            this.orderData.tourists = [];
        }
        
        var numberTourists = this.orderData.tourists.length;
        var numberTouristsNew = numberTourists + 1;
        var indTouristNew = numberTourists;

        var touristHTML = '<div class="tourist-item" data-tourist-id="' + indTouristNew + '"><div class="tourist-item__header"><span class="tourist-item__header__number">' + numberTouristsNew + '</span><span class="tourist-item__header__name"></span><div class="tourist-item__header__toggler">&#9660;</div></div><div class="tourist-item__data"><div class="pozitiv__order-edit-form__row"><div class="pozitiv__order-edit-form__col-1-2"><div class="pozitiv__order-edit-form__field"><label for="lbTourName">Имя</label><input type="text" value=""></div><div class="pozitiv__order-edit-form__field"><label for="lbTourName">Фамилия</label><input type="text" value=""></div><div class="pozitiv__order-edit-form__field"><label for="lbTourName">Отчество</label><input type="text" value=""></div> <div class="pozitiv__order-edit-form__field"> <label for="lbTourName">Дата рождения</label> <input type="text" value=""> </div> <button type="button" class="pos-ui__button pos-ui__button--red tourist-item__remove" title="Удалить туриста">Удалить</button></div> <div class="pozitiv__order-edit-form__col-1-2"> <div class="pozitiv__order-edit-form__field"> <label for="lbTourName">Паспорт: серия</label> <input type="text" value=""> </div> <div class="pozitiv__order-edit-form__field"> <label for="lbTourName">Паспорт: номер</label> <input type="text" value=""> </div> <div class="pozitiv__order-edit-form__field"> <label for="lbTourName">Паспорт: дата выдачи</label> <input type="text" value=""> </div> <div class="pozitiv__order-edit-form__field"> <label for="lbTourName">Паспорт: кем выдан</label> <input type="text" value=""> </div> <div class="pozitiv__order-edit-form__field"> <label for="lbTourName">Паспорт: код подразделения</label> <input type="text" value=""> </div> </div> </div> </div> </div>';

        this.listTourists.append(touristHTML);


        this.orderData.tourists.push({
            birthday: "",
            firstName: "",
            lastName: "",
            middleName: "",
            passportCodeDivision: "",
            passportDateIssue: "",
            passportNumber: "",
            passportSeries: "",
            passportWhoIssue: "",
            services: [],
        });
    }


    /**
     * Добавить платеж
     */
    PaymentAdd() {
        var paymentHTML = '<div class="payment-item-new"> <div class="pozitiv__order-edit-form__field"> <label for="lbNewPaymentDate">Дата платежа</label> <input type="date" id="lbNewPaymentDate"> </div> <div class="pozitiv__order-edit-form__field"> <label for="lbNewPaymentType">Тип оплаты</label> <select id="lbNewPaymentType"> <option value="cash">Наличными</option> <option value="transfer">Переводом</option> </select> </div> <div class="pozitiv__order-edit-form__field"> <label for="lbNewPaymentAmount">Сумма</label> <input type="number" id="lbNewPaymentAmount"> </div> <div class="pozitiv__order-edit-form__field"> <label for="lbNewPaymentDescription">Описание</label> <input type="text" id="lbNewPaymentDescription"> </div><div class="payment-item-new__button"><button id="paymentSave" class="pos-ui__button pos-ui__button--green" type="button" title="Сохранить платеж">Сохранить платеж</button></div></div>';
        this.listPayments.append(paymentHTML);
    }


    /**
     * Покажет услуги выбранного туриста
     */
    TouristShowServices(jTourist) {
        var touristID = jTourist.data('tourist-id');

        var touristServices = [];
        var tripServices = this.services;

        var htmlTouristServices =  '';
        for (var i in this.orderData.tourists[touristID].services) {
            
            var curTouristService = this.orderData.tourists[touristID].services[i];

            //== Если в разрешенных услугах поездки есть услуга из данных туриста
            if (tripServices.hasOwnProperty(curTouristService.id)) {
                touristServices.push({
                    'id': tripServices[curTouristService.id],
                    'name': tripServices[curTouristService.id].title,
                    'description': tripServices[curTouristService.id].description,
                    'quantity':  curTouristService.quantity
                });
                htmlTouristServices += '<div class="tourist-service-item" data-tourist-id="' + touristID + '" data-service-id="' + tripServices[curTouristService.id].id + '"><span>' + tripServices[curTouristService.id].title + '</span><input type="number" pattern = \"[0-9]\" value="' + curTouristService.quantity + '"><button type=\"button\" class=\"pos-ui__button pos-ui__button--red\" title=\"Удалить услугу\">&#10006;</button></div>';
            } else {
                delete(this.orderData.tourists[touristID].services[i]);
            }
        }

        this.listTouristServices.html(htmlTouristServices);
    }


    /**
     * Удаление услуги туриста
     */
    TouristServiceRemove(e) {
        var jService = jQuery(e.currentTarget).parents('.tourist-service-item');
        var touristID = jService.data('tourist-id');
        var serviceID = jService.data('service-id');

        //= Удалим отображение услуги
        jService.remove();

        //= Удалим услугу из данных
        for (var indServ in this.orderData.tourists[touristID].services) {
            var curService = this.orderData.tourists[touristID].services[indServ];

            // Если нашли услугу по ID удалим ее из массива
            if (curService.id == serviceID) {
                this.orderData.tourists[touristID].services.splice(indServ, 1);
                break;
            }
        }
    }


    /**
     * Покажет/скроет блок с доступными услугами
     */
    TouristServicesAvailableShow() {
        if (this.listTouristServicesAvailable.hasClass('opened')) {
            this.listTouristServicesAvailable.removeClass('opened');
        } else {
            this.listTouristServicesAvailable.addClass('opened');
        }
    }


    /**
     * Добавит выбранную услугу текущему туристу
     */
    TouristServicesAdd(e) {
        //= Определить id открытого турист
        var jTourist = this.listTourists.find('.tourist-item.opened')
        var touristID = jTourist.data('tourist-id');

        //= Определить id добавляемой услуги
        var serviceAddID = jQuery(e.currentTarget).parents('li').data('service-id');
        var serviceAddName = jQuery(e.currentTarget).parents('li').data('service-name');

        //= Проверить что в данных у этого туриста нет такой услуги
        var servicesCurTourist = this.orderData.tourists[touristID].services;
        for (var i in servicesCurTourist) {
            if (servicesCurTourist[i].id == serviceAddID) {
                return false;
            }
        }

        //= Добавить услугу в данные с нулевым количеством
        if (typeof this.orderData.tourists[touristID].services == "undefined") {
            this.orderData.tourists[touristID].services = [];
        }
        this.orderData.tourists[touristID].services.push({
            id: serviceAddID,
            quantity: 0
        });

        //= Отрисовать услугу в блоке услуг
        this.TouristShowServices(jTourist);
    }


    /**
     * Сохранит изменение количества услуг
     */
    TouristServiceChange(e) {
        //= Определить id открытого турист
        var jTourist = this.listTourists.find('.tourist-item.opened')
        var touristID = jTourist.data('tourist-id');

        var services = [];
        this.listTouristServices.find('.tourist-service-item').each((i,el) => {
            var jService = jQuery(el);
            var idService = jService.data('service-id');
            var quantityService = jService.find('input').val();

            services.push({
                id: idService,
                quantity: quantityService
            });
        })
        this.orderData.tourists[touristID].services = services;
        console.log(this.orderData);
    }


    /**
     * Соберет данные заказа
     */
    CollectDataOrder() {

        //= Соберем данные туристов
        var touristsData = [];
        this.listTourists.find('.tourist-item').each((i, el) => {
            var jTourist= jQuery(el);
            var touristID = jTourist.data('tourist-id');

            touristsData[touristID] = {
                firstName:              jTourist.find('.tourist-item__filed-firstname').val(),
                lastName:               jTourist.find('.tourist-item__filed-lasttname').val(),
                middleName:             jTourist.find('.tourist-item__filed-middlename').val(),
                birthday:               jTourist.find('.tourist-item__filed-birthday').val(),
                passportSeries:         jTourist.find('.tourist-item__filed-pserises').val(),
                passportNumber:         jTourist.find('.tourist-item__filed-pnumber').val(),
                passportDateIssue:      jTourist.find('.tourist-item__filed-pdate').val(),
                passportWhoIssue:       jTourist.find('.tourist-item__filed-pwho').val(),
                passportCodeDivision:   jTourist.find('.tourist-item__filed-pcode').val(),
                services:               this.orderData.tourists[touristID].services,
            }
        });

        this.jRootForm.find('input[name=data]').val(JSON.stringify({tourists:touristsData}));
    }


    /**
     * Отменить заказ
     */
    OrderCancel(e) {
        this.jRootForm.find('input[name=status]').val('canceled');
        this.jRootForm.submit();
    }


    /**
     * Подтвердить заказ
     */
    OrderAccept(e) {
        this.jRootForm.find('input[name=status]').val('confirmed');
        this.jRootForm.submit();
    }


    /**
     * Распечатать заказ
     */
    OrderPrint(e) {
        alert('функция в разработке');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    var orderPageAdmin = new OrderPageAdmin();
}, false);
