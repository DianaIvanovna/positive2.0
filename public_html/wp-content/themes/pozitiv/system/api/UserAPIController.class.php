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
        }

        return $result;
    }

    private function Login() {

        $login = $this->sourceRequest->get_param('login');
        $pass = $this->sourceRequest->get_param('pass');

        $user = wp_signon([
            'user_login'    => $this->sourceRequest->get_param('login'),
            'user_password' => $this->sourceRequest->get_param('pass'),
            'remember'      => true,
        ]);
        
        if (get_class($user) == 'WP_Error') {
            return ['result' => 0, 'message' => strip_tags($user->get_error_message())];
        } else {
            return [
                'result' => 1,
                'user'   => (array) $user,
            ];
        }
    }

    private function Logout() {
        wp_logout();
        return ['result' => 1];
    }
}