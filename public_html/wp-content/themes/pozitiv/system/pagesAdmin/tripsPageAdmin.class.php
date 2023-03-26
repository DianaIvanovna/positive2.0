<?php

require_once 'pagesAdmin.class.php';


/**
 *  Отвечает зы вывод
 */
class TripsTablePageAdmin extends WP_List_Table {
    // Мануал по таблицам
    // https://wp-kama.ru/function/wp_list_table?ysclid=lbghqhajmx238804204

    private $trips;

    function __construct(array $trips) {
        parent::__construct();

        $this->trips = $trips;

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
			'name'          => 'Поездка',
			'date'          => 'Даты поездки',
        ];
    }

    function prepare_items() {

        $columns = $this->get_columns();
        $hidden = array();
        $sortable = $this->get_sortable_columns();
        $this->_column_headers = array($columns, $hidden, $sortable);
        
        $out = [];
        foreach ($this->trips as $trip) {
            $out[] = [
                'id'        => $trip['id'],
                'name'      => $trip['name'],
                'date'      => $trip['dateStart'] . '<br/>' . $trip['dateEnd'],
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
            'edit'      => "<a href=\"admin.php?page=pozitiv_trip_control&action=show&id={$item['id']}\">Изменить</a>",
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


/**
 *
 */
class TripControlPageAdmin extends PagesAdmin {

    private $trip;

    function __construct() {
        parent::__construct();

        // wp_enqueue_script( 'js', get_template_directory_uri() . '/assets/scripts/tripPageAdmin.min.js');
    }

    function Display($trip) {

        require_once __DIR__ . '/../models/orderModel.class.php';

        
        $orderModel = new OrderModel();
        $ordersTrip = $orderModel->GetByTripID($trip['id']);
        
        $tripNumberTourists = 0;
        foreach ($ordersTrip as $order) {
            // Пропустим не подтвержденные заказы
            if ($order->status != 'confirmed') { continue; }

            $orderData = json_decode(stripslashes($order->data), true);

            $tripNumberTourists += count($orderData['tourists']);
        }
        

        echo "
            <div class=\"pozitiv__trip-control-form\">
                <section class=\"pozitiv__admin-page__section pozitiv__admin-page__section--trip-info\">
                    <h2>Поездка</h2>
                    <span> Всего туристов: {$tripNumberTourists} </span>
                    <button>Сформировать отчет по поездке</button>
                    <button>Завершить поездку</button>
                </section>

                <section class=\"pozitiv__admin-page__section pozitiv__admin-page__section--orders\">
                    <h2>Заказы</h2>

                </section>
            </div>
        ";
    }
}