<?php

/**
 * 
 */


// Создание маршрутов
add_action( 'rest_api_init', function(){

    define('POZITIV_API_NAMESPACE', 'pozitiv/v1');

    // Маршрут Туров
    register_rest_route(
        POZITIV_API_NAMESPACE,
        'tour/(?P<method>[a-z]+)/',
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

            }
        ]
    );


    // Маршрут Поездка
    register_rest_route(
        POZITIV_API_NAMESPACE,
        'trip/(?P<method>[a-z]+)/',
        [
            'methods'   => 'POST',
            'callback'  => 'EndpointTrip',
            'args'      => [
                'paramName'     =>  [
                    'default'               => null,            // значение параметра по умолчанию
                    'required'              => null,            // является ли параметр обязательным. Может быть только true
                    'validate_callback'     => 'function_name', // функция проверки значения параметра. Должна вернуть true/false
                    'sanitize_callback'     => 'function_name', // функция очистки значения параметра. Должна вернуть очищенное значение
                ]
            ],
            'permission_callback' => function ( $request ) {

            }
        ]
    );

    // Маршрут Заказ
    register_rest_route(
        POZITIV_API_NAMESPACE,
        'order/(?P<method>[a-z]+)/',
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

            }
        ]
    );

    // Маршрут Пользователь
    register_rest_route(
        POZITIV_API_NAMESPACE,
        'user/(?P<method>[a-z]+)/',
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

            }
        ]
    );

    // Маршрут Платеж
    register_rest_route(
        POZITIV_API_NAMESPACE,
        'payment/(?P<method>[a-z]+)/',
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

            }
        ]
    );

    // Маршрут Допуслуга
    register_rest_route(
        POZITIV_API_NAMESPACE,
        'service/(?P<method>[a-z]+)/',
        [
            'methods'   => 'POST',
            'callback'  => 'EndpointService',
            'args'      => [
                'paramName'     =>  [
                    'default'               => null,            // значение параметра по умолчанию
                    'required'              => null,            // является ли параметр обязательным. Может быть только true
                    'validate_callback'     => 'function_name', // функция проверки значения параметра. Должна вернуть true/false
                    'sanitize_callback'     => 'function_name', // функция очистки значения параметра. Должна вернуть очищенное значение
                ]
            ],
            'permission_callback' => function ( $request ) {

            }
        ]
    );
} );


function EndpointTour(WP_REST_Request $request) { }
function EndpointTrip(WP_REST_Request $request) { }
function EndpointOrder(WP_REST_Request $request) { }
function EndpointUser(WP_REST_Request $request) { }
function EndpointPayment(WP_REST_Request $request) { }
function EndpointService(WP_REST_Request $request) { }

// // функция обработчик конечной точки (маршрута)
// function my_awesome_func( WP_REST_Request $request ){

// 	$posts = get_posts( [
// 		'author' => (int) $request['id'],
// 	] );

// 	if ( empty( $posts ) ) {
// 		return new WP_Error( 'no_author_posts', 'Записей не найдено', [ 'status' => 404 ] );
// 	}

// 	return $posts;
// }
