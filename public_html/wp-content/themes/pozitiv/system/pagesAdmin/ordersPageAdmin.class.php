<?php

require_once 'pagesAdmin.class.php';

class OrdersPageAdmin extends PagesAdmin {

    function __construct() {
        parent::__construct();
    }


    function ShowTable() {

    }
}

class OrderTableAdmin extends WP_List_Table {

    // Мануал по таблицам
    // https://wp-kama.ru/function/wp_list_table?ysclid=lbghqhajmx238804204

    private $orders;

    function __construct(array $orders) {
        parent::__construct();

        $this->orders = $orders;

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

        // пагинация
		$this->set_pagination_args( array(
			'total_items' => count($this->orders),
			'per_page'    => 20,
		) );
		$cur_page = (int) $this->get_pagenum();

        
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


            $out[] = (object)[
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

    protected function column_default( $item, $column_name ) {

        return 'dfsafdasd';
    }

    function column_id ($item) {
        return 'sdasd';

    }
}