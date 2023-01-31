<?php

require_once 'pozitivModel.class.php';
class OrderModel extends PozitivModel {

    function __construct() {
        parent::__construct();
    }

    /**
     * 
     */
    public function Create(array $arOrder) {

        global $wpdb;

        $res = $wpdb->insert(
            'pozitiv_orders',
            [
                'tourID'            => $arOrder['tourID'],
                'tripID'            => $arOrder['tripID'],
                'idUserOwner'       => $arOrder['idUserOwner'],
	            'phoneOwner'        => $arOrder['phoneOwner'],
	            'emailOwner'        => $arOrder['emailOwner'],
	            'firstNameOwner'    => $arOrder['firstNameOwner'],
	            'lastNameOwner'     => $arOrder['lastNameOwner'],
	            'data'              => $arOrder['data'],
                'history'           => $arOrder['history'],
            ]
        );

        if (!$res) {
            throw new ErrorException('Не удалось записать заказ в базу: (SQL' . $wpdb->last_query . ') (Error: ' . $wpdb->last_error . ')' );
        }

        $arOrder['id'] = $wpdb->insert_id;
        return $arOrder;
    }


    /**
     * Вернет все заказы в системе
     */
    public function GetAll() {
        global $wpdb;

        return $wpdb->get_results(
            'SELECT * FROM `pozitiv_orders` ORDER BY id DESC',
            'OBJECT'
        );
    }


    /**
     * Обновить данные
     */
    public function Update(array $data) {
        global $wpdb;

        $orderID = $data['id'];
        
        unset($data['id']);
        unset($data['action']);
        
        //= Сохраним текущий заказ в истории
        $orderPrev = $this->GetByID($orderID);
        $history = json_decode($orderPrev->history, true);
        $history[time()] = $data;

        $data['data']       = stripcslashes($data['data']);
        $data['history']    = json_encode($history);

        $res = $wpdb->update(
            'pozitiv_orders',
            $data,
            ['id' => $orderID]
        );
        
        return (bool) $res;
    }


    /**
     * 
     */
    public function GetByID(int $orderID) {
        if ($orderID <=0) {
            throw new ErrorException();
        }
        
        global $wpdb;

        return array_shift($wpdb->get_results(
            "SELECT * FROM `pozitiv_orders` WHERE ID={$orderID} ORDER BY id DESC",
            'OBJECT'
        ));
    }


    public function GetByOwnerID(int $ownerID) {
        if ($ownerID <=0) {
            throw new ErrorException();
        }
        
        global $wpdb;

        return $wpdb->get_results(
            "SELECT * FROM `pozitiv_orders` WHERE idUserOwner={$ownerID} ORDER BY id ASC",
            'OBJECT'
        );
    }
}