<?php

require_once 'pagesAdmin.class.php';

class OrdersTablePageAdmin extends WP_List_Table {

    // Мануал по таблицам
    // https://wp-kama.ru/function/wp_list_table?ysclid=lbghqhajmx238804204

    private $orders;

    function __construct(array $orders) {
        parent::__construct();

        $this->orders = $orders;

        $this->bulk_action_handler();

		// screen option
		add_screen_option( 'per_page', array(
			'label'   => 'Показывать на странице',
			'default' => 20,
			'option'  => 'logs_per_page',
		) );

        $this->prepare_items();
    }

    function get_columns() {
        return [
			'id'            => 'ID',
			'dateCreate'    => 'Дата создания',
			'client'        => 'Клиент',
			'tourists'      => 'Туристы',
			'amount'        => 'Сумма',
			'status'        => 'Статус',
        ];
    }

    function prepare_items() {

        $columns = $this->get_columns();
        $hidden = array();
        $sortable = $this->get_sortable_columns();
        $this->_column_headers = array($columns, $hidden, $sortable);
        
        $out = [];
        foreach ($this->orders as $order) {
            
            //== Сформируем список туристов
            $dataOrder = json_decode($order->data);
            $orderTouristsList = '';
            foreach ($dataOrder->tourists as $tourist) {
                $orderTouristsList .= $tourist->name . '<br/>';
            }

            //== Определим статус
            switch ($order->status) {
                case 'created':
                    $orderStatus = 'Создан';
                    break;
                case 'payed':
                    $orderStatus = 'Оплачен';
                    break;
                case 'confirmed':
                    $orderStatus = 'Подтвержден';
                    break;
                case 'canceled':
                    $orderStatus = 'Отменен';
                    break;
                default:
                    $orderStatus = '-ОШИБКА-';
                    break;
            }


            $out[] = [
                'id'            => $order->id,
                'dateCreate'    => $order->dateCreate,
                'client'        => $order->lastNameOwner . ' ' . $order->firstNameOwner,
                'tourists'      => $orderTouristsList,
                'amount'        => 0,
                'status'        => $orderStatus,
            ];
        }

        $this->items = $out;
    }

    function column_default($item, $column_name ) {
        if (isset($item[$column_name])) {
            return $item[$column_name];
        }
    }

    function column_id ($item) {
        $actions = [
            'edit'      => "<a href=\"?page=pozitiv_orders&action=edit&id={$item['id']}\">Изменить</a>",
        ];
        
        return $item['id'] . ' ' .$this->row_actions($actions);
        
    }

    function get_sortable_columns() {
        return [
            'id' => array('booktitle',false),
            'dateCreate' => array('author',false),
            'client'   => array('isbn',false)
        ];
    }

}

class OrderEditPageAdmin extends PagesAdmin {

    private $order;

    function __construct() {
        parent::__construct();

        // получить данные заказа
        $this->order = [];
    }


    function Display() {
        echo "
            <form action=\"\" method=\"POST\" class=\"pozitiv__order-edit-form\">
                <input type=\"hidden\" name=\"id\" value=\"{$this->order->id}\">
                <input type=\"hidden\" name=\"action\" value=\"change\">

                <section class=\"pozitiv__order-edit-form__section\">
                    <h2 class=\"pozitiv__order-edit-form__h\">Информация о туре</h2>
                    
                    <div class=\"pozitiv__order-edit-form__field\">
                        <label for=\"lbTourName\">Тур</label>
                        <input type=\"text\" value=\"{$this->order->tour}\" readonly>
                    </div>

                    <div class=\"pozitiv__order-edit-form__field\">
                        <label for=\"lbTourName\">Поездка</label>
                        <input type=\"text\" value=\"{$this->order->trip}\" readonly>
                    </div>
                </section>
                    
                <section class=\"pozitiv__order-edit-form__section\">
                    <h2 class=\"pozitiv__order-edit-form__h\">Заказчик</h2>

                    <input type=\"hidden\" name=\"idUserOwner\" value=\"{$this->order->idUserOwner}\">

                    <div class=\"pozitiv__order-edit-form__row\">
                        <div class=\"pozitiv__order-edit-form__field\">
                            <label for=\"lbTourName\">Фамилия</label>
                            <input type=\"text\" value=\"{$this->order->lastNameOwner}\">
                        </div>

                        <div class=\"pozitiv__order-edit-form__field\">
                            <label for=\"lbTourName\">Имя</label>
                            <input type=\"text\" value=\"{$this->order->firstNameOwner}\">
                        </div>
                    </div>

                    <div class=\"pozitiv__order-edit-form__row\">
                        <div class=\"pozitiv__order-edit-form__field\">
                            <label for=\"lbTourName\">Телефон</label>
                            <input type=\"text\" value=\"{$this->order->phoneOwner}\">
                        </div>

                        <div class=\"pozitiv__order-edit-form__field\">
                            <label for=\"lbTourName\">E-mail</label>
                            <input type=\"text\" value=\"{$this->order->emailOwner}\">
                        </div>
                    </div>
                </section>

                <section class=\"pozitiv__order-edit-form__section\">
                    <h2 class=\"pozitiv__order-edit-form__h\">Туристы и услуги</h2>

                </section>

                <section class=\"pozitiv__order-edit-form__section\">
                    <h2 class=\"pozitiv__order-edit-form__h\">Платежи</h2>
                    
                </section>

                <button class=\"button action\" type=\"submit\">Сохранить</button>
            </form>
        ";
    }
}