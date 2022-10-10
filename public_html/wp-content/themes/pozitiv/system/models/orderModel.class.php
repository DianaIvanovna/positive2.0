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
            throw new ErrorException('dsdsadas');
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
     * 
     */
    public function Get() {
        
    }
}