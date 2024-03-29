<?php

class OrderAPIController extends WP_REST_Controller {

    private $sourceRequest;

    public function Init($request) {
        require_once __DIR__ . '/../models/orderModel.class.php';

        $this->sourceRequest = $request;
        $this->orderModel = new OrderModel();

        switch ($request->get_param('action')) {
            case 'create':
                $result = $this->Create();
                break;

            case 'update':
                $result = $this->Update();
                break;

            case 'getmy':
                $result = $this->GetMy();
                break;

            default: break;
        }

        return $result;
    }

    /**
     * Создать заказ из данных запроса
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
            $login = str_replace( ['@','_','.'], '_', $emailOwner );
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

            wp_new_user_notification($idUserOwner, null, 'user');
        }


        //= Создать заказ
        $curTimestamp = time();
        $arOrder = $this->orderModel->Create(
            [
                'tourID'            => $this->sourceRequest->get_param('tourID'),
                'tripID'            => $this->sourceRequest->get_param('tripID'),
                'idUserOwner'       => $objWPUser->ID,
                'phoneOwner'        => $phoneClean,
                'emailOwner'        => $emailOwner,
                'firstNameOwner'    => $this->sourceRequest->get_param('firstNameOwner'),
                'lastNameOwner'     => $this->sourceRequest->get_param('lastNameOwner'),
                'data'              => json_encode(json_decode($this->sourceRequest->get_param('data'), true)),
                'history'           => json_encode([
                    $curTimestamp => [
                        'message'       => 'заказ создан пользователем',
                        'order'         => [
                            'phoneOwner'        => $phoneClean,
                            'emailOwner'        => $emailOwner,
                            'firstNameOwner'    => $this->sourceRequest->get_param('firstNameOwner'),
                            'lastNameOwner'     => $this->sourceRequest->get_param('lastNameOwner'),
                            'data'              => json_decode($this->sourceRequest->get_param('data'), true),
                        ]
                    ]
                ])
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
    private function Update() { }


    /**
     *
     */
    private function GetMy() {

        $user = wp_get_current_user();
        $userRole = $user->get_role_caps();

        if ($user->ID == 0) { return ['result' => 0]; }
        if (!isset($userRole['pozitiv_user'])) { return ['result' => 0]; }

        $arOrders = $this->orderModel->GetByOwnerID($user->ID);

        foreach ($arOrders as $ind => $order) {
            $arOrders[$ind]->data = json_decode($order->data, true);
            $arOrders[$ind]->history = json_decode($order->history, true);
        }

        return ['result' => 1, 'orders' => $arOrders ];
    }
}