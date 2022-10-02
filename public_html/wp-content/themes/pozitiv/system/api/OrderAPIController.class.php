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
        //= Проверить почту
        //= Проверить json
        //= Создать пользователя
        $orderModel = new OrderModel();
        $arOrder = $orderModel->Create(
            [
                // 'idUserOwner'       => $this->sourceRequest->get_param('idUserOwner'),
                'idUserOwner'       => rand(10,99),
                'phoneOwner'        => GetCleanPhone($this->sourceRequest->get_param('phoneOwner')),
                'emailOwner'        => $this->sourceRequest->get_param('emailOwner'),
                'firstNameOwner'    => $this->sourceRequest->get_param('firstNameOwner'),
                'lastNameOwner'     => $this->sourceRequest->get_param('lastNameOwner'),
                'data'              => $this->sourceRequest->get_param('data'),
            ]
        );

        return $arOrder;
    }


    /**
     * Обновить заказ
     */
    private function Update() {
        
    }
}