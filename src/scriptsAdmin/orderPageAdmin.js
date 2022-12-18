class OrderPageAdmin {
    constructor() {
        if (typeof jQuery != 'function') { console.warn('jQuery not found. Die.')}

        this.orderData = document.orderData;
        this.services = document.tripServices;

        this.jRootForm = jQuery('.pozitiv__order-edit-form');
        this.sectionTourists = this.jRootForm.find('#section-tourists');

        //= Повесим обработчики
        this.sectionTourists.find('.tourist-item__header__toggler').click( jQuery.proxy( this.TouristToggleClick, this ));
    }


    /**
     * Реагирует на сворачивание разворачивание туриста
     */
    TouristToggleClick(e) {
        var jTourist = jQuery(e.target).parents('.tourist-item');

        if (jTourist.hasClass('opened')) {
            jTourist.find('.tourist-item__data').css({'height': 0});
            jTourist.removeClass('opened');
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
     * Покажет услуги выбранного туриста
     */
    TouristShowServices(jTourist) {
        var touristID = jTourist.data('tourist-id');
        console.log(this.orderData.tourists[touristID].services);
        console.log(this.services);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    var orderPageAdmin = new OrderPageAdmin();
}, false);
