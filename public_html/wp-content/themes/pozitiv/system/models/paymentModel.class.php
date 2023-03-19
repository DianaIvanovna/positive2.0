<?php

require_once 'pozitivModel.class.php';
class PaymentModel extends PozitivModel {

    function __construct() {
        parent::__construct();
    }


    function CreateManual(array $arPayment) {
        global $wpdb;

        $res = $wpdb->insert(
            'pozitiv_payments',
            $arPayment
        );

        if (!$res) {
            throw new ErrorException('Не удалось записать платеж в базу: (SQL' . $wpdb->last_query . ') (Error: ' . $wpdb->last_error . ')' );
        }

        $arPayment['id'] = $wpdb->insert_id;
        return $arPayment;
    }


    function GetByOrderID(int $orderID) {
        global $wpdb;

        $res = $wpdb->get_results("SELECT * FROM pozitiv_payments WHERE orderID = {$orderID} ORDER BY dateCreate DESC");
        return $res;
    }


    function Update(array $data) {

    }


    function Remove(int $paymentID) {
        global $wpdb;

        $res = $wpdb->delete( 'pozitiv_payments', [ 'id' => $paymentID ] );

        return (bool)$res;
    }


    /**
     * Рассчитает оплаченную сумму по ID заказа
     */
    function PaidByOrder(int $orderID) {
        $arPayments = $this->GetByOrderID($orderID);

        $paymentSum = 0;
        foreach ($arPayments as $payment) {
            if ($payment->status == 'success') {
                $paymentSum += round( ($payment->amount / 100));
            }
        }

        return $paymentSum;
    }
}