<?php

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
            'supports' => [ 'title', 'editor', 'thumbnail', 'page-attributes' ],
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