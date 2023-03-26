<?php

require_once 'pagesAdmin.class.php';


/**
 * Класс отвечает за отображение таблицы заказов
 */
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
			'amount'        => 'Оплачено / Сумма заказа',
			'status'        => 'Статус',
        ];
    }

    function prepare_items() {

        require_once __DIR__ . '/../models/paymentModel.class.php';
        $paymentModel = new PaymentModel();

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
                $orderTouristsList .= $tourist->firstName . '<br/>';
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

            //== Определимся с оплаченостью заказа и цветом в таблице
            $paymentSum = $paymentModel->PaidByOrder($order->id);
            if ($paymentSum == 0) { $sumColor = 'red';}
            if ( ($paymentSum > 0) && ($paymentSum < $order->amount) ) { $sumColor = 'orange'; }
            if ($paymentSum == $order->amount) { $sumColor = 'green'; }
 

            $out[] = [
                'id'            => $order->id,
                'dateCreate'    => $order->dateCreate,
                'client'        => $order->lastNameOwner . ' ' . $order->firstNameOwner,
                'tourists'      => $orderTouristsList,
                'amount'        => "<span style=\"color:{$sumColor}\">{$paymentSum} / {$order->amount}</span>",
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


/**
 * Класс отвечает за обработку страницы редактирования заказа
 */
class OrderEditPageAdmin extends PagesAdmin {

    private $order;

    function __construct() {
        parent::__construct();

        wp_enqueue_script( 'js', get_template_directory_uri() . '/assets/scripts/orderPageAdmin.min.js');

        // получить данные заказа
        $this->order = [];
    }


    function Display($order) {

        if (!is_object($order)) { throw new ErrorException; }

        //= Получим данные тура и поездки
        $tourPost = array_shift(get_posts([
            'post_type'     => 'tour',
            'p'             => $order->tourID
        ] ));

        $tripPost = array_shift(get_posts([
            'post_type'     => 'trip',
            'p'             => $order->tripID,
        ]));


        //= Достанем доступные в поездке услуги и сформируем из них массив с услугами
        $availableServices = get_field('services', $tripPost->ID);

        $services = get_posts([
            'post_type'     => 'service',
            'post__in'      => $availableServices
        ]);

        $servicesList = [];
        $servicesListHTML = '';
        foreach ($services as $service) {
            $servicesList[$service->ID] = [
                'id'    => $service->ID,
                'title' => $service->post_title,
                'description'   => strip_tags($service->post_content),
            ];

            $servicesListHTML .= "
                <li data-service-id=\"{$service->ID}\">
                    <span class=\"service-name\">{$service->post_title}</span>
                    <button class=\"pos-ui__button pos-ui__button--blue\" type=\"button\">Добавить</button>
                </li>
            ";
        }

        $jsonServiceList = json_encode($servicesList);
       

        //= Получим данные заказа
        $orderData = json_decode($order->data, true);


        //= Сформируем список туристов с данными
        $touristsList = '';
        foreach ($orderData['tourists'] as $ind => $tourist) {

            $number = $ind + 1;

            $touristsList .= "
                <div class=\"tourist-item\" data-tourist-id=\"{$ind}\">
                    <div class=\"tourist-item__header\">
                        <span class=\"tourist-item__header__number\">{$number}</span>
                        <span class=\"tourist-item__header__name\">
                            {$tourist['lastName']} {$tourist['firstName']} {$tourist['middleName']}
                        </span>
                        <div class=\"tourist-item__header__toggler\">&#9660;</div>
                    </div>
                    <div class=\"tourist-item__data\">
                        <div class=\"pozitiv__order-edit-form__row\">
                            <div class=\"pozitiv__order-edit-form__col-1-2\">
                                <div class=\"pozitiv__order-edit-form__field\">
                                    <label>Имя</label>
                                    <input type=\"text\" class=\"tourist-item__filed-firstname\" value=\"{$tourist['firstName']}\">
                                </div>
                                <div class=\"pozitiv__order-edit-form__field\">
                                    <label for=\"lbTourName\">Фамилия</label>
                                    <input type=\"text\" class=\"tourist-item__filed-lasttname\" value=\"{$tourist['lastName']}\">
                                </div>
                                <div class=\"pozitiv__order-edit-form__field\">
                                    <label for=\"lbTourName\">Отчество</label>
                                    <input type=\"text\" class=\"tourist-item__filed-middlename\" value=\"{$tourist['middleName']}\">
                                </div>
                                <div class=\"pozitiv__order-edit-form__field\">
                                    <label for=\"lbTourName\">Дата рождения</label>
                                    <input type=\"text\" class=\"tourist-item__filed-birthday\" value=\"{$tourist['birthday']}\">
                                </div>

                                <button type=\"button\" class=\"pos-ui__button pos-ui__button--red tourist-item__remove\" title=\"Удалить туриста\">Удалить</button>
                            </div>
                            <div class=\"pozitiv__order-edit-form__col-1-2\">
                                <div class=\"pozitiv__order-edit-form__field\">
                                    <label for=\"lbTourName\">Паспорт: серия</label>
                                    <input type=\"text\" class=\"tourist-item__filed-pserises\" value=\"{$tourist['passportSeries']}\">
                                </div>
                                <div class=\"pozitiv__order-edit-form__field\">
                                    <label for=\"lbTourName\">Паспорт: номер</label>
                                    <input type=\"text\" class=\"tourist-item__filed-pnumber\" value=\"{$tourist['passportNumber']}\">
                                </div>
                                <div class=\"pozitiv__order-edit-form__field\">
                                    <label for=\"lbTourName\">Паспорт: дата выдачи</label>
                                    <input type=\"text\" class=\"tourist-item__filed-pdate\" value=\"{$tourist['passportDateIssue']}\">
                                </div>
                                <div class=\"pozitiv__order-edit-form__field\">
                                    <label for=\"lbTourName\">Паспорт: кем выдан</label>
                                    <input type=\"text\" class=\"tourist-item__filed-pwho\" value=\"{$tourist['passportWhoIssue']}\">
                                </div>
                                <div class=\"pozitiv__order-edit-form__field\">
                                    <label for=\"lbTourName\">Паспорт: код подразделения</label>
                                    <input type=\"text\" class=\"tourist-item__filed-pcode\" value=\"{$tourist['passportCodeDivision']}\">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ";
        }


        //= Сформируем статус заказа
        $orderStatus = '';
        switch ($order->status) {
            case 'created':
                $orderStatus = 'Не обработан';
                break;
            
            case 'canceled':
                $orderStatus = 'Отменен';
                break;

            case 'confirmed':
                $orderStatus = 'Подтвержден';
                break;

            case 'payed':
                $orderStatus = 'Оплачен';
                break;

            case 'completed':
                $orderStatus = 'Завершен';
                break;
        }

        //= Оплаченная сумма
        require_once __DIR__ . '/../models/paymentModel.class.php';
        $paymentModel = new PaymentModel();

        $paid = $paymentModel->PaidByOrder($order->id);

        echo "
            <form action=\"\" method=\"POST\" class=\"pozitiv__order-edit-form\">
                <input type=\"hidden\" name=\"id\" value=\"{$order->id}\">
                <input type=\"hidden\" name=\"action\" value=\"change\">
                <input type=\"hidden\" name=\"status\" value=\"{$order->status}\">

                <div class=\"pozitiv__order-edit-form__control-block\">
                    <div class=\"pozitiv__order-edit-form__paystatus\">Оплачено / Общая стоимость:&nbsp;<span>{$paid}&nbsp;/&nbsp;{$order->amount}&nbsp;руб.</span></div>
                    <div class=\"pozitiv__order-edit-form__status\">Статус заказа: <span>{$orderStatus}</span></div>
                    <button type=\"button\" id=\"orderBtnCancel\" class=\"pos-ui__button pos-ui__button--red pos-ui__button--big\" title=\"Отменить заказ и сохранить\">Отменить</button>
                    <button type=\"submit\" id=\"orderBtnSubmit\" class=\"pos-ui__button pos-ui__button--blue pos-ui__button--big\" title=\"Сохранить заказ без изменения статуса\">Сохранить</button>
                    <button type=\"button\" id=\"orderBtnAccepted\" class=\"pos-ui__button pos-ui__button--green pos-ui__button--big\" title=\"Сохранить заказ и подтвердить\">Подтвердить заказ</button>
                    <button type=\"button\" id=\"orderBtnPrint\" class=\"pos-ui__button pos-ui__button--gray pos-ui__button--big\" title=\"Распечатать заказ\">🖨</button>
                </div>

                <section class=\"pozitiv__order-edit-form__section\">
                    <input type=\"hidden\" name=\"tourID\" value=\"{$order->tourID}\">
                    <input type=\"hidden\" name=\"tripID\" value=\"{$order->tripID}\">
                    <input type=\"hidden\" name=\"data\" value=\"\">
                    
                    <h2>Тур и поездка</h2>

                    <div class=\"pozitiv__order-edit-form__row\">
                        <div class=\"pozitiv__order-edit-form__col-1-2\">
                            <div class=\"pozitiv__order-edit-form__field\">
                                <label for=\"lbTourName\">Тур</label>
                                <input type=\"text\" value=\"{$tourPost->post_title}\" readonly>
                            </div>
                        </div>
                        <div class=\"pozitiv__order-edit-form__col-1-2\">
                            <div class=\"pozitiv__order-edit-form__field\">
                                <label for=\"lbTourName\">Поездка</label>
                                <input type=\"text\" value=\"{$tripPost->post_title}\" readonly>
                            </div>
                        </div>
                    </div>
                </section>
                    
                <section class=\"pozitiv__order-edit-form__section\">
                    <input type=\"hidden\" name=\"idUserOwner\" value=\"{$order->idUserOwner}\">
                    <h2>Заказчик</h2>

                    <div class=\"pozitiv__order-edit-form__row\">
                        <div class=\"pozitiv__order-edit-form__col-1-2\">
                            <div class=\"pozitiv__order-edit-form__field\">
                                <label for=\"lbOwnerLastName\">Фамилия</label>
                                <input type=\"text\" id=\"lbOwnerLastName\" name=\"lastNameOwner\" value=\"{$order->lastNameOwner}\">
                            </div>

                            <div class=\"pozitiv__order-edit-form__field\">
                                <label for=\"lbOwnerFirstName\">Имя</label>
                                <input type=\"text\" id=\"lbOwnerFirstName\" name=\"firstNameOwner\" value=\"{$order->firstNameOwner}\">
                            </div>

                            <div class=\"pozitiv__order-edit-form__field\">
                                <label for=\"lbOwnerPhone\">Телефон</label>
                                <input type=\"text\" id=\"lbOwnerPhone\" name=\"phoneOwner\" value=\"{$order->phoneOwner}\">
                            </div>

                            <div class=\"pozitiv__order-edit-form__field\">
                                <label for=\"lbOwnerEmail\">E-mail</label>
                                <input type=\"text\" id=\"lbOwnerEmail\" name=\"emailOwner\" value=\"{$order->emailOwner}\">
                            </div>
                        </div>
                        <div class=\"pozitiv__order-edit-form__col-1-2\">
                            <div class=\"pozitiv__order-edit-form__field\" style=\"height:100%;\">
                                <label for=\"lbOwnerMessage\">Комментарий заказчика</label>
                                <div class=\"form-field\" style=\"width:100%;height:100%\">
                                    <textarea name=\"messageClient\" id=\"lbOwnerMessage\" style=\"height:216px;\" readonly placeholder=\"Комментарий заказчика\">{$order->messageClient}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class=\"pozitiv__order-edit-form__section\" id=\"section-tourists\">
                    <h2>Туристы и услуги</h2>

                    <div class=\"pozitiv__order-edit-form__row\">
                        <div class=\"pozitiv__order-edit-form__col-2-3\">
                            <div id=\"orderListTourist\">
                                {$touristsList}
                            </div>
                            <button class=\"pos-ui__button pos-ui__button--blue\" id=\"btnTouristAdd\" type=\"button\">Добавить туриста</button>
                        </div>
                        <div class=\"pozitiv__order-edit-form__col-1-3\">
                            <div class=\"tourist-services-block\">
                                <span class=\"pozitiv__order-edit-form__block-h\">Услуги туриста</span>
                                <div id=\"orderListServices\"></div>
                                <div class=\"tourist-services-block__footer\">
                                    <button class=\"pos-ui__button pos-ui__button--blue\" id=\"btnTouristServiceAdd\" type=\"button\">Добавить услугу</button>
                                </div>
                                <div id=\"servicesListAvailable\">
                                    <button type=\"button\" class=\"closer\">&times;</button>
                                    <span class=\"pozitiv__order-edit-form__block-h\">Доступные услуги</span>
                                    <ul>
                                        {$servicesListHTML}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class=\"pozitiv__order-edit-form__section\" id=\"section-payments\">
                    <h2>Платежи</h2>
                    <div id=\"orderListPayments\"></div>
                    <button type=\"button\" id=\"orderBtnPaymentAdd\" class=\"pos-ui__button pos-ui__button--blue\" title=\"Добавить платеж\">Добавить платеж</button>
                </section>

                <section class=\"pozitiv__order-edit-form__section\">
                    <h2>Комментарий администратора</h2>
                    <div class=\"form-field\">
                        <textarea class=\"\" name=\"messageAdmin\" placeholder=\"Комментарий администратора\">{$order->messageAdmin}</textarea>
                    </div>
                </section>
            </form>
            <script>
                document.orderData = {$order->data};
                document.tripServices = {$jsonServiceList};
            </script>
        ";
    }

    function Change() {

        $_POST['phoneOwner'] = GetCleanPhone($_POST['phoneOwner']);

        //= Пересчитаем стоимость заказа перед сохранением
        $_POST['amount'] = $this->CalcSumOrder($_POST);

        $orderModel = new OrderModel();
        $orderModel->Update($_POST);
    }


    /**
     * Рассчитаем стоимость заказа
     */
    private function CalcSumOrder(array $order) {

        require_once __DIR__ . '/../models/tripModel.class.php';
        require_once __DIR__ . '/../models/serviceModel.class.php';
        $tripModel = new TripModel();
        $serviceModel = new ServiceModel();

        $trip = $tripModel->GetByID($order['tripID']);

        $data = json_decode(stripcslashes($order['data']), true);
        $tourists = $data['tourists'];

        $amount = 0;
        if (!is_null($tourists)) {

            //== Рассчитаем стоимость заказа за туристов
            $amount += (int)$trip['cost'] * count($tourists);

            foreach ($tourists as $tourist) {

                if (count($tourist['services']) > 0) {
                    foreach ($tourist['services'] as $service) {
                        $arService = $serviceModel->GetByID($service['id']);
                        $amountService = (int)$arService['cost'] * (int)$service['quantity'];

                        $amount += $amountService;

                    }
                }
            }
        }
        
        return $amount;
    }
}