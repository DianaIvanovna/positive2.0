class OrderPageAdmin {
    constructor() {
        if (typeof jQuery != 'function') { console.warn('jQuery not found. Die.')}

        this.orderData = document.orderData;
        this.services = document.tripServices;

        this.jRootForm = jQuery('.pozitiv__order-edit-form');
        this.sectionTourists = this.jRootForm.find('#section-tourists');
        this.listTouristServices = this.sectionTourists.find('#orderListServices');
        
        //= Повесим обработчики

        //== Развернуть / свернуть туриста
        this.sectionTourists.find('.tourist-item__header__toggler').click( jQuery.proxy( this.TouristToggleClick, this ));

        //== Удалить услугу туриста
        this.listTouristServices.on('click', '.tourist-service-item button', jQuery.proxy( this.TouristServiceRemove, this));

        //== Удалить туриста
        this.sectionTourists.on('click', '.tourist-item__remove', jQuery.proxy( this.TouristRemove, this));
    }


    /**
     * Реагирует на сворачивание разворачивание туриста
     */
    TouristToggleClick(e) {
        var jTourist = jQuery(e.target).parents('.tourist-item');

        if (jTourist.hasClass('opened')) {
            jTourist.find('.tourist-item__data').css({'height': 0});
            jTourist.removeClass('opened');
            this.listTouristServices.html('');
        } else {
            //== свернем другие развернутые пользователи
            this.sectionTourists.find('.tourist-item.opened').each( (e, el) => { 
                jQuery(el).removeClass('opened');
                jQuery(el).find('.tourist-item__data').css({'height': 0});
            });

            jTourist.find('.tourist-item__data').css({'height': 'auto'});
            jTourist.addClass('opened');
            this.TouristShowServices(jTourist);
        }
    }


    /**
     * Удаление туриста
     */
    TouristRemove(e) {
        var jTourist = jQuery(e.currentTarget).parents('.tourist-item');
        jTourist.remove();

        this.listTouristServices.html('');

        // TODO Удалить туриста из данных
        // TODO скрыть показанные для туриста услуги
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
                htmlTouristServices += '<div class="tourist-service-item" data-service-id="' + tripServices[curTouristService.id].id + '"><span>' + tripServices[curTouristService.id].title + '</span><input type="number" pattern = \"[0-9]\" value="' + curTouristService.quantity + '"><button type=\"button\" class=\"pos-ui__button pos-ui__button--red\" title=\"Удалить услугу\">&#10006;</button></div>';
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
        var jBtn = jQuery(e.currentTarget);
        jBtn.parents('.tourist-service-item').remove();

        // TODO Удалить услугу из данных
    }
}


document.addEventListener('DOMContentLoaded', function() {
    var orderPageAdmin = new OrderPageAdmin();
}, false);
