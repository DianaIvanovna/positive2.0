<?php

class OrderAPIController extends WP_REST_Controller {

    private $sourceRequest;

    public function Init($request) {
        require_once __DIR__ . '/../models/orderModel.class.php';

        $this->sourceRequest = $request;

        switch ($request->get_param('action')) {
            case 'create':
                $result = $this->Create();
                break;
            
            case 'update':
                $result = $this->Update();
                break;
            
            default: break;
        }

        return $result;
    }

    /**
     * Создать заказ
     */
    private function Create() {

        //= Проверить телефон
        $phoneClean = GetCleanPhone($this->sourceRequest->get_param('phoneOwner'));
        if (empty($phoneClean)) {
            return ['result' => 0, 'message' => 'ошибка в номере телефона'];
        }


        //= Проверить почту
        $emailOwner = $this->sourceRequest->get_param('emailOwner');
        if (!filter_var($emailOwner, FILTER_VALIDATE_EMAIL)) {
           return ['result' => 0, 'message' => 'ошибка в e-mail'];
        }


        //= Проверить json
        if (empty(json_decode($this->sourceRequest->get_param('data')))) {
            return ['result' => 0, 'message' => 'данные туристов невалидны'];
        }

        

        //= Разберемся с пользователем
        $objWPUser = get_user_by('email', $emailOwner);

        //== Если не удалось найти пользователя по email
        if (empty($objWPUser)) {
            //=== Сгенерируем логин и создадим пользователя
            $login = str_replace(['@','_','.'], '_', $emailOwner );
            $idUserOwner = wp_create_user(
                $login,
                GetRandomString(12),
                $emailOwner
            );

            //=== Заполним данные пользователя
            update_user_meta($idUserOwner, 'first_name', $this->sourceRequest->get_param('firstNameOwner'));
            update_user_meta($idUserOwner, 'last_name', $this->sourceRequest->get_param('lastNameOwner'));
            update_user_meta($idUserOwner, 'phone', $phoneClean);

            //=== Назначим роль пользователю
            $objWPUser = new WP_User($idUserOwner);
            $objWPUser->set_role('pozitiv_user');
        }


        //= Создать заказ
        $orderModel = new OrderModel();
        $arOrder = $orderModel->Create(
            [
                'idUserOwner'       => $objWPUser->ID,
                'phoneOwner'        => $phoneClean,
                'emailOwner'        => $emailOwner,
                'firstNameOwner'    => $this->sourceRequest->get_param('firstNameOwner'),
                'lastNameOwner'     => $this->sourceRequest->get_param('lastNameOwner'),
                'data'              => $this->sourceRequest->get_param('data'),
            ]
        );

        return [
            'result' => 1,
            'order'  => $arOrder
        ];
    }


    /**
     * Обновить заказ
     */
    private function Update() {
        
    }
}