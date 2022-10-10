<?php

/**
 *
 */

// Добавим типы данных
function cptui_register_my_cpts() {

    $pluginName = 'pozitiv';

	/**
	 * Post Type: Туры.
	 */
	register_post_type(
        'tour',
        [
            'label' => esc_html__( 'Туры', 'custom-post-type-ui' ),
            'labels' => [
                'name' => esc_html__( 'Туры', 'custom-post-type-ui' ),
                'singular_name' => esc_html__( 'Тур', 'custom-post-type-ui' ),
                'menu_name' => esc_html__( 'Туры', 'custom-post-type-ui' ),
                'all_items' => esc_html__( 'Все туры', 'custom-post-type-ui' ),
                'add_new' => esc_html__( 'Добавить новый', 'custom-post-type-ui' ),
                'add_new_item' => esc_html__( 'Добавить новый тур', 'custom-post-type-ui' ),
                'edit_item' => esc_html__( 'Изменить тур', 'custom-post-type-ui' ),
                'new_item' => esc_html__( 'Новый тур', 'custom-post-type-ui' ),
                'view_item' => esc_html__( 'Просмотр тура', 'custom-post-type-ui' ),
                'view_items' => esc_html__( 'Просмотр туров', 'custom-post-type-ui' ),
                'search_items' => esc_html__( 'Поиск туров', 'custom-post-type-ui' ),
                'not_found' => esc_html__( 'не найдено', 'custom-post-type-ui' ),
                'not_found_in_trash' => esc_html__( 'не найдено в корзине', 'custom-post-type-ui' ),
            ],
            'description' => '',
            'public' => false,
            'publicly_queryable' => false,
            'show_ui' => true,
            'show_in_rest' => true,
            'rest_base' => 'tour',
            // 'rest_controller_class' => 'WP_REST_Posts_Controller',
            // 'rest_namespace' => "{$pluginName}/v1",
            'has_archive' => false,
            'show_in_menu' => true,
            'show_in_nav_menus' => false,
            'delete_with_user' => false,
            'exclude_from_search' => false,
            'capability_type' => 'post',
            'map_meta_cap' => true,
            'hierarchical' => false,
            'can_export' => false,
            'rewrite' => false,
            'query_var' => true,
            'menu_icon' => 'dashicons-palmtree',
            'supports' => [ 'title', 'editor', 'thumbnail' ],
            'taxonomies' => [ 'category' ],
            'show_in_graphql' => false,
        ]
    );


	/**
	 * Post Type: Поездки.
	 */
	register_post_type(
        'trip',
        [
            'label' => esc_html__( 'Поездки', 'custom-post-type-ui' ),
            'labels' => [
                'name' => esc_html__( 'Поездки', 'custom-post-type-ui' ),
                'singular_name' => esc_html__( 'Поездка', 'custom-post-type-ui' ),
                'menu_name' => esc_html__( 'Поездки', 'custom-post-type-ui' ),
                'all_items' => esc_html__( 'Все поездки', 'custom-post-type-ui' ),
                'add_new' => esc_html__( 'Добавить новую', 'custom-post-type-ui' ),
                'add_new_item' => esc_html__( 'Добавить новую поездку', 'custom-post-type-ui' ),
                'edit_item' => esc_html__( 'Изменить поездку', 'custom-post-type-ui' ),
                'new_item' => esc_html__( 'Новая поездка', 'custom-post-type-ui' ),
                'view_item' => esc_html__( 'Просмотр поездки', 'custom-post-type-ui' ),
                'view_items' => esc_html__( 'Просмотр поездок', 'custom-post-type-ui' ),
                'search_items' => esc_html__( 'Поиск поездок', 'custom-post-type-ui' ),
                'not_found' => esc_html__( 'не найдено', 'custom-post-type-ui' ),
                'not_found_in_trash' => esc_html__( 'не найдено в корзине', 'custom-post-type-ui' ),
            ],
            'description' => '',
            'public' => false,
            'publicly_queryable' => false,
            'show_ui' => true,
            'show_in_rest' => true,
            'rest_base' => 'trip',
            'rest_controller_class' => 'WP_REST_Posts_Controller',
            'rest_namespace' => "{$pluginName}/v1",
            'has_archive' => false,
            'show_in_menu' => true,
            'show_in_nav_menus' => false,
            'delete_with_user' => false,
            'exclude_from_search' => false,
            'capability_type' => 'post',
            'map_meta_cap' => true,
            'hierarchical' => false,
            'can_export' => false,
            'rewrite' => false,
            'query_var' => true,
            'menu_icon' => 'dashicons-palmtree',
            'supports' => [ 'title', 'editor', 'thumbnail' ],
            'taxonomies' => [],
            'show_in_graphql' => false,
        ]
    );


	/**
	 * Post Type: Допуслуга.
	 */
	register_post_type(
        'service',
        [
            'label' => esc_html__( 'Услуги', 'custom-post-type-ui' ),
            'labels' => [
                'name' => esc_html__( 'Услуги', 'custom-post-type-ui' ),
                'singular_name' => esc_html__( 'Услуга', 'custom-post-type-ui' ),
                'menu_name' => esc_html__( 'Услуги', 'custom-post-type-ui' ),
                'all_items' => esc_html__( 'Все услуги', 'custom-post-type-ui' ),
                'add_new' => esc_html__( 'Добавить новую', 'custom-post-type-ui' ),
                'add_new_item' => esc_html__( 'Добавить новую услугу', 'custom-post-type-ui' ),
                'edit_item' => esc_html__( 'Изменить услугу', 'custom-post-type-ui' ),
                'new_item' => esc_html__( 'Новая услуга', 'custom-post-type-ui' ),
                'view_item' => esc_html__( 'Просмотр услуги', 'custom-post-type-ui' ),
                'view_items' => esc_html__( 'Просмотр услуг', 'custom-post-type-ui' ),
                'search_items' => esc_html__( 'Поиск услуг', 'custom-post-type-ui' ),
                'not_found' => esc_html__( 'не найдено', 'custom-post-type-ui' ),
                'not_found_in_trash' => esc_html__( 'не найдено в корзине', 'custom-post-type-ui' ),
            ],
            'description' => '',
            'public' => false,
            'publicly_queryable' => false,
            'show_ui' => true,
            'show_in_rest' => true,
            'rest_base' => 'service',
            'rest_controller_class' => 'WP_REST_Posts_Controller',
            'rest_namespace' => "{$pluginName}/v1",
            'has_archive' => false,
            'show_in_menu' => true,
            'show_in_nav_menus' => false,
            'delete_with_user' => false,
            'exclude_from_search' => false,
            'capability_type' => 'post',
            'map_meta_cap' => true,
            'hierarchical' => false,
            'can_export' => false,
            'rewrite' => false,
            'query_var' => true,
            'menu_icon' => 'dashicons-palmtree',
            'supports' => [ 'title', 'editor'],
            'taxonomies' => ['category'],
            'show_in_graphql' => false,
        ]
    );
}
add_action( 'init', 'cptui_register_my_cpts' );

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

    // Маршрут Пользователь
    // register_rest_route(
    //     POZITIV_API_NAMESPACE,
    //     'user/(?P<method>[a-z]+)/',
    //     [
    //         'methods'   => 'POST',
    //         'callback'  => 'EndpointUser',
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

    // Маршрут Платеж
    // register_rest_route(
    //     POZITIV_API_NAMESPACE,
    //     'payment/(?P<method>[a-z]+)/',
    //     [
    //         'methods'   => 'POST',
    //         'callback'  => 'EndpointPayment',
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

/**
 * Добавим меню Заказы в админку
 */
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

        //= Подключим скрипты и стили к странице Заказов
        add_action('load-' . $pageOrder, function(){
            wp_enqueue_style( 'pozitiv-admin', get_template_directory_uri() . '/assets/styles/pozitiv-admin.min.css' );
            wp_enqueue_style( 'order-page-admin', get_template_directory_uri() . '/assets/styles/orders-pages-admin.min.css' );
            // wp_enqueue_script('less', get_template_directory_uri() . '/assets/scripts/vendor/less.min.js');

            //== Добавим класс странице Заказов
            add_filter( 'admin_body_class', function() { return 'pozitiv-admin pozitiv-admin--orders'; });
        });
    },
    25
);



function PozitivOrderPage(){
    require_once __DIR__ . '/models/orderModel.class.php';

    $orderModel = new OrderModel();
    $orders = $orderModel->GetAll();
	echo '
        <h1>Управление заказами</h1>

        <div class="pozitiv-admin__table-wrapper">
            <table class="pozitiv-admin__table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Дата создания</th>
                        <th>Клиент</th>
                        <th>Туристы</th>
                        <th>Сумма</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
    ';

    foreach ($orders as $order) {

        //== Колонки ID, даты создания, имя заказчика
        echo "
            <tr>
                <td>{$order->id}</td>
                <td>{$order->dateCreate}</td>
                <td>{$order->lastNameOwner} {$order->firstNameOwner}</td>
        ";

        //== Колонка туристов
        $dataOrder = json_decode($order->data);
        echo '<td>';
        foreach ($dataOrder->tourists as $tourist) {
            echo $tourist->name . '<br/>';
        }
        echo '</td>';

        //== Колонка Суммы
        echo '<td>&nbsp;</td>';


        //== Колонка статуса
        switch ($order->status) {
            case 'created': 
                $orderStatusLabel = 'Создан';
                break;
            case 'payed': 
                $orderStatusLabel = 'Оплачен';
                break;
            case 'confirmed': 
                $orderStatusLabel = 'Подтвержден';
                break;
            case 'canceled': 
                $orderStatusLabel = 'Отменен';
                break;
            default:
                $orderStatusLabel = '-ОШИБКА-';
                break;
        }
        echo "<td>{$orderStatusLabel}</td>";

        echo '</tr>';
    }

    echo '
                </tbody>
            </table>
        </div>
    ';

    

}