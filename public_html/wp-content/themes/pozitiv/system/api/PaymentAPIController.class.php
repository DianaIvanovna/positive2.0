<?php

class PaymentAPIController extends WP_REST_Controller {
    
    private $sourceRequest;
    private $paymentModel;

    public function Init($request) {

        require_once __DIR__ . '/../models/paymentModel.class.php';

        $this->sourceRequest = $request;
        $this->paymentModel = new PaymentModel();

        switch ($request->get_param('action')) {
            case 'createManual':
                $result = $this->CreateManual();
                break;

            case 'getPayments':
                $result = $this->GetByOrderID($request->get_param('orderID'));
                break;

            case 'delete':
                $result = $this->Delete((int)$request->get_param('paymentID'));
                break;

            case 'get':
                $result = $this->Get();
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


    private function CreateManual() {
        // TODO Добавить проверку прав на создание платежей

        // TODO проверить все входящие данные

        require_once __DIR__ . '/../models/orderModel.class.php';
        $orderModel = new OrderModel();
        $arOrder = $orderModel->GetByID($this->sourceRequest->get_param('orderID'));
        
        $arPayment = $this->paymentModel->CreateManual(
            [
                'type'          => $this->sourceRequest->get_param('type'),
                'orderID'       => (int)$arOrder->id,
                'externalID'    => '---',
                'userID'        => (int)$arOrder->idUserOwner,
                'userEmail'     => $arOrder->emailOwner,
                'userPhone'     => $arOrder->phoneOwner,
                'amount'        => (int)$this->sourceRequest->get_param('amount') * 100,
                'description'   => $this->sourceRequest->get_param('description'),
                'formURL'       => '---',
                'dateCreate'    => $this->sourceRequest->get_param('dateCreate'),
                'status'        => 'success',
            ]
        );

        return ['result' => 1, 'payment' => $arPayment];
    }


    private function GetByOrderID($orderID) {
        $listPayments = $this->paymentModel->GetByOrderID($orderID);

        $out = [];
        foreach ($listPayments as $payment) {
            $out[] = (array)$payment;
        }

        return ['result' => 1, 'payments' => $out];
    }


    private function Get() {

    }


    private function Delete(int $paymentID) {

        $res = $this->paymentModel->Remove($paymentID);

        return ['result' => (int)$res];
    }


}