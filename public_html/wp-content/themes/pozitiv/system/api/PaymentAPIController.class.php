<?php

class PaymentAPIController extends WP_REST_Controller {
    
    private $sourceRequest;
    private $paymentModel;

    public function Init($request) {

        require_once __DIR__ . '/../models/paymentModel.class.php';

        $this->sourceRequest = $request;
        $this->paymentModel = new PaymentModel();

        switch ($request->get_param('action')) {
            case 'create_manual':
                $result = $this->CreateManual();
                break;

            case 'get':
                $result = $this->Get();

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
        
    }


    private function Get() {

    }


}