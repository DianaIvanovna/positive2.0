<?php

//= Редирект pozitiv-пользователей в личный кабинет
add_action( 'admin_init', function() {
    $user = wp_get_current_user();
    $roles = ( array ) $user->roles;

    if (in_array('pozitiv_user', $roles)) {
        wp_redirect( '/account' );
    }
});

//= Редирект pozitiv-пользователей в личный кабинет
add_action( 'admin_menu', function() {
    $user = wp_get_current_user();
    $roles = ( array ) $user->roles;

    if (in_array('pozitiv_user', $roles)) {
        wp_redirect( '/account' );
    }
});