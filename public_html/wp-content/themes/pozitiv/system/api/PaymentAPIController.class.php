<?php

class PaymentAPIController extends WP_REST_Controller {
    private $sourceRequest;

    public function Init($request) {

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


    private function CreateManual() {
        
    }


}