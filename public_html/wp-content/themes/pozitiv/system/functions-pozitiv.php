<?php

require_once 'functions-pozitiv-hooks.php';
require_once 'functions-pozitiv-types.php';

// Добавление роли для пользователей позитива
// $result = add_role(
//     'pozitiv_user',
//     'Пользователь pozitiv',
// 	[
// 		'read'         => true,
//     ]
// );


// Создание маршрутов
add_action( 'rest_api_init', function(){

    define('POZITIV_API_NAMESPACE', 'pozitiv/v1');

    // Маршрут Туров
    $res = register_rest_route(
        POZITIV_API_NAMESPACE,
        '/tour/(?P<action>[a-z]+)/',
        [
            'methods'   => 'POST',
            'callback'  => 'EndpointTour',
            'args'      => [
                'paramName'     =>  [
                    'default'               => null,            // значение параметра по умолчанию
                    'required'              => null,            // является ли параметр обязательным. Может быть только true
                    'validate_callback'     => 'function_name', // функция проверки значения параметра. Должна вернуть true/false
                    'sanitize_callback'     => 'function_name', // функция очистки значения параметра. Должна вернуть очищенное значение
                ]
            ],
            'permission_callback' => function ( $request ) {
                return true;
            }
        ]
    );

    // Маршрут заказов
    $res = register_rest_route(
        POZITIV_API_NAMESPACE,
        '/order/(?P<action>[a-z]+)/',
        [
            'methods'   => 'POST',
            'callback'  => 'EndpointOrder',
            'args'      => [
                'paramName'     =>  [
                    'default'               => null,            // значение параметра по умолчанию
                    'required'              => null,            // является ли параметр обязательным. Может быть только true
                    'validate_callback'     => 'function_name', // функция проверки значения параметра. Должна вернуть true/false
                    'sanitize_callback'     => 'function_name', // функция очистки значения параметра. Должна вернуть очищенное значение
                ]
            ],
            'permission_callback' => function ( $request ) {
                return true;
            }
        ]
    );

    // Маршрут Пользователь
    register_rest_route(
        POZITIV_API_NAMESPACE,
        '/user/(?P<action>[a-z]+)/',
        [
            'methods'   => 'POST',
            'callback'  => 'EndpointUser',
            'args'      => [
                'paramName'     =>  [
                    'default'               => null,            // значение параметра по умолчанию
                    'required'              => null,            // является ли параметр обязательным. Может быть только true
                    'validate_callback'     => 'function_name', // функция проверки значения параметра. Должна вернуть true/false
                    'sanitize_callback'     => 'function_name', // функция очистки значения параметра. Должна вернуть очищенное значение
                ]
            ],
            'permission_callback' => function ( $request ) {
                return true;
            }
        ]
    );

    // Маршрут Платеж
    register_rest_route(
        POZITIV_API_NAMESPACE,
        '/payment/(?P<action>[a-zA-Z]+)/',
        [
            'methods'   => 'POST',
            'callback'  => 'EndpointPayment',
            'args'      => [
                'paramName'     =>  [
                    'default'               => null,            // значение параметра по умолчанию
                    'required'              => null,            // является ли параметр обязательным. Может быть только true
                    'validate_callback'     => 'function_name', // функция проверки значения параметра. Должна вернуть true/false
                    'sanitize_callback'     => 'function_name', // функция очистки значения параметра. Должна вернуть очищенное значение
                ]
            ],
            'permission_callback' => function ( $request ) {
                return true;
            }
        ]
    );

    {
        // Маршрут Поездка
        // register_rest_route(
        //     POZITIV_API_NAMESPACE,
        //     'trip/(?P<method>[a-z]+)/',
        //     [
        //         'methods'   => 'POST',
        //         'callback'  => 'EndpointTrip',
        //         'args'      => [
        //             'paramName'     =>  [
        //                 'default'               => null,            // значение параметра по умолчанию
        //                 'required'              => null,            // является ли параметр обязательным. Может быть только true
        //                 'validate_callback'     => 'function_name', // функция проверки значения параметра. Должна вернуть true/false
        //                 'sanitize_callback'     => 'function_name', // функция очистки значения параметра. Должна вернуть очищенное значение
        //             ]
        //         ],
        //         'permission_callback' => function ( $request ) {

        //         }
        //     ]
        // );

        // Маршрут Заказ
        // register_rest_route(
        //     POZITIV_API_NAMESPACE,
        //     'order/(?P<method>[a-z]+)/',
        //     [
        //         'methods'   => 'POST',
        //         'callback'  => 'EndpointOrder',
        //         'args'      => [
        //             'paramName'     =>  [
        //                 'default'               => null,            // значение параметра по умолчанию
        //                 'required'              => null,            // является ли параметр обязательным. Может быть только true
        //                 'validate_callback'     => 'function_name', // функция проверки значения параметра. Должна вернуть true/false
        //                 'sanitize_callback'     => 'function_name', // функция очистки значения параметра. Должна вернуть очищенное значение
        //             ]
        //         ],
        //         'permission_callback' => function ( $request ) {

        //         }
        //     ]
        // );

        // Маршрут Допуслуга
        // register_rest_route(
        //     POZITIV_API_NAMESPACE,
        //     'service/(?P<method>[a-z]+)/',
        //     [
        //         'methods'   => 'POST',
        //         'callback'  => 'EndpointService',
        //         'args'      => [
        //             'paramName'     =>  [
        //                 'default'               => null,            // значение параметра по умолчанию
        //                 'required'              => null,            // является ли параметр обязательным. Может быть только true
        //                 'validate_callback'     => 'function_name', // функция проверки значения параметра. Должна вернуть true/false
        //                 'sanitize_callback'     => 'function_name', // функция очистки значения параметра. Должна вернуть очищенное значение
        //             ]
        //         ],
        //         'permission_callback' => function ( $request ) {

        //         }
        //     ]
        // );
    }
} );


function EndpointTour(WP_REST_Request $request) {
    require_once __DIR__ . '/api/TourAPIController.class.php';
    $tourProcessor = new TourAPIController();
    return $tourProcessor->Init($request);
}

function EndpointOrder(WP_REST_Request $request) {
    require_once __DIR__ . '/api/OrderAPIController.class.php';
    $tourProcessor = new OrderAPIController();
    return $tourProcessor->Init($request);
}

function EndpointUser(WP_REST_Request $request) {
    require_once __DIR__ . '/api/UserAPIController.class.php';
    $userProcessor = new UserAPIController();
    return $userProcessor->Init($request);
}

function EndpointPayment(WP_REST_Request $request) {
    require_once __DIR__ . '/api/PaymentAPIController.class.php';
    $paymentProcessor = new PaymentAPIController();
    return $paymentProcessor->Init($request);
}


// Отключаем проверку nonce кодов
add_filter( 'rest_authentication_errors', function($errors) {

    if (empty($errors)) { return true; }
});



// Добавим меню Заказы в админку
add_action(
    'admin_menu',
    function(){

        //= Зарегистрируем страницу Заказов
        $pageOrder = add_menu_page(
            'Позитив - Заказы', // тайтл страницы
            'Заказы', // текст ссылки в меню
            'manage_options', // права пользователя, необходимые для доступа к странице
            'pozitiv_orders', // ярлык страницы
            'PozitivOrderPage', // функция, которая выводит содержимое страницы
            'dashicons-palmtree', // иконка, в данном случае из Dashicons
            20 // позиция в меню
        );

        //= Добавим страницу управления поездками
        $pageTrip = add_submenu_page( 
            'edit.php?post_type=trip', 
            'Управление поездками', 
            'Отчеты по поездкам', 
            'manage_options', 
            'pozitiv_trip_control',
            'PozitivTripControl',
            30
        );

        //= Подключим скрипты и стили к странице Заказов
        // add_action('load-' . $pageOrder, function(){
        //     wp_enqueue_style( 'pozitiv-admin', get_template_directory_uri() . '/assets/styles/pozitiv-admin.min.css' );
        //     wp_enqueue_style( 'order-page-admin', get_template_directory_uri() . '/assets/styles/orders-page-admin.min.css' );
        // });
    },
    25
);

function PozitivOrderPage(){
    require_once __DIR__ . '/models/orderModel.class.php';
    require_once __DIR__ . '/pagesAdmin/ordersPageAdmin.class.php';

    $orderModel = new OrderModel(); 

    switch ($_REQUEST['action']) {
        case 'edit':    // `показать страницу редактирования заказа
            echo '<div class="pozitiv__admin-page pozitiv__admin-page--edit">';
            echo '<h1>Изменение заказа ID ' . $_REQUEST['id'] . '</h1>';

            $order = $orderModel->GetByID($_REQUEST['id']);

            $orderEditPageAdmin = new OrderEditPageAdmin();
            $orderEditPageAdmin->Display($order);

            echo '</div>';

            break;

        case 'change':  // обновить заказ
            $orderEditPageAdmin = new OrderEditPageAdmin();
            $orderEditPageAdmin->Change();

            wp_redirect('/wp-admin/admin.php?page=pozitiv_orders');

        default:        // отобразить таблицу заказов
            echo '<div class="pozitiv__admin-page pozitiv__admin-page--list">';
            echo '<h1>Управление заказами</h1>';
        
            $orders = $orderModel->GetAll();
            $objOrdersTable = new OrdersTablePageAdmin($orders);
            $objOrdersTable->display();

            echo '</div>';

            break;

        
    }
    
}


/** 
 * Функция обрабатывает страницу управления поездками
*/
function PozitivTripControl() {
    require_once __DIR__ . '/models/tripModel.class.php';
    require_once __DIR__ . '/pagesAdmin/tripsPageAdmin.class.php';

    $tripModel = new TripModel(); 

    switch ($_REQUEST['action']) {
        case 'show': 
            $trip = $tripModel->GetByID($_REQUEST['id']);

            $tripControlPageAdmin = new TripControlPageAdmin();
            $tripControlPageAdmin->Display($trip);

            break;

        case 'update': 
            break;

        default: 
            echo '<div class="pozitiv__admin-page pozitiv__admin-page--list">';
            echo '<h1>Управление поездками</h1>';
        
            $trips = $tripModel->GetAll();
            
            $objTripsTable = new TripsTablePageAdmin($trips);
            $objTripsTable->display();

            echo '</div>';
            break; 
    }
}