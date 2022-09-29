<?php

class OrderAPIController extends WP_REST_Controller {

    private $sourceRequest;

    function __construct() {
        parent::__construct();
    }

    public function Init($request) {
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

    }


    /**
     * Обновить заказ
     */
    private function Update() {
        
    }
}