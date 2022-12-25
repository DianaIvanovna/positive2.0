class OrderPageAdmin {
    constructor() {
        if (typeof jQuery != 'function') { console.warn('jQuery not found. Die.')}

        //= Определим данные
        this.orderData = document.orderData;
        this.services = document.tripServices;

        //= Определим блоки
        this.jRootForm = jQuery('.pozitiv__order-edit-form');
        this.sectionTourists = this.jRootForm.find('#section-tourists');
        this.listTourists = this.sectionTourists.find('#orderListTourist');
        this.listTouristServices = this.sectionTourists.find('#orderListServices');
        
        //= Повесим обработчики
        //== Развернуть / свернуть туриста
        this.sectionTourists.on('click', '.tourist-item__header__toggler', jQuery.proxy( this.TouristToggleClick, this ));
        //== Удалить услугу туриста
        this.listTouristServices.on('click', '.tourist-service-item button', jQuery.proxy( this.TouristServiceRemove, this));
        //== Удалить туриста
        this.sectionTourists.on('click', '.tourist-item__remove', jQuery.proxy( this.TouristRemove, this));
        //== Добавить туриста
        this.sectionTourists.find('#btnTouristAdd').click( jQuery.proxy( this.TouristAdd, this) );
        //== Добавить услугу
        this.sectionTourists.find('#btnTouristServiceAdd').click( jQuery.proxy( this.TouristServiceAdd, this) );
    }


    /**
     * Реагирует на сворачивание разворачивание туриста
     */
    TouristToggleClick(e) {
        var jTourist = jQuery(e.target).parents('.tourist-item');

        //= Если кликнутый пользователь развернут
        if (jTourist.hasClass('opened')) {
            jTourist.find('.tourist-item__data').css({'height': 0});
            jTourist.removeClass('opened');
            this.listTouristServices.html('');

            this.sectionTourists.find('.tourist-services-block__footer button').css({"display": "none"});
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
     * Добавит услугу туристу
     */
    TouristServiceAdd() {

    }
}


document.addEventListener('DOMContentLoaded', function() {
    var orderPageAdmin = new OrderPageAdmin();
}, false);
