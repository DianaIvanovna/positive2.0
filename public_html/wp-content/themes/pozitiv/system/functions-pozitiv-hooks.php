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

//= Формируем slug тура (tour) при сохранении поста  в админке
add_action(
    'save_post',
    function ($postID, $post, $update) {
        if ($post->post_type == 'tour') {
            
            $existSlug = get_field('slug');
            if (empty($existSlug)) {
                $slug = wp_unique_post_slug($post->post_title, $post->ID, $post->post_status, 'tour', 0);
            } else {
                $slug = $existSlug;
            }
            
            update_field('slug', $slug, $post->ID);
        }

        return true;
    }, 
    10, 
    3 
);