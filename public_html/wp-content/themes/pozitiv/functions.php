<?php

require_once __DIR__ . '/functions-common.php';   
require_once __DIR__ . '/system/functions-pozitiv.php';    // Функции инициализации API


/* 
*	Добавляем кастомные настройки для темы
*/
// add_action('customize_register', function($customizer) {
//     $customizer->add_section('custom_site_configs', array(
//         'title' => 'Настройки сайта',
//         'description' => 'Некоторые кастомные настройки',
//         'priority' => 11,
//     ));
//     $customizer->add_setting('phone-main-1', array('default' => ''));
//     $customizer->add_setting('phone-main-2', array('default' => ''));
//     $customizer->add_setting('email-contact', array('default' => ''));


//     $customizer->add_control('phone-main-1', array(
//             'label' => 'Основной телефон 1',
//             'section' => 'custom_site_configs',
//             'type' => 'text',)
//     );
//     $customizer->add_control('phone-main-2', array(
//             'label' => 'Основной телефон 2',
//             'section' => 'custom_site_configs',
//             'type' => 'text',)
//     );
//     $customizer->add_control('email-contact', array(
//             'label' => 'Основной e-mail',
//             'section' => 'custom_site_configs',
//             'type' => 'text',)
//     );
// });

add_theme_support('post-thumbnails', ['tour'] ); 

// Настроим ширину Gutenberg в Админке
add_action( 'after_setup_theme', 'GutenbergCSS' ); 
function GutenbergCSS(){ 
    add_theme_support( 'editor-styles' ); // if you don't add this line, your stylesheet won't be added
    add_editor_style( 'gutenberg-style.css' ); // tries to include style-editor.css directly from your theme folder 
}

// Добавим поддержку формата WebP
function webp_upload_mimes( $existing_mimes ) {
    $existing_mimes['webp'] = 'image/webp';

    return $existing_mimes;
}
add_filter( 'mime_types', 'webp_upload_mimes' );
