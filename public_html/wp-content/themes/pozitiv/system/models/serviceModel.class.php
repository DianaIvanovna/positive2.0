<?php

class ServiceModel extends PagesAdmin {

    function __construct() {
        parent::__construct();
    }

    function GetByTripID(int $tripID) {

    }


    function GetByID(int $serviceID) {
        if ($serviceID <= 0) { return false; }

        $res = new WP_Query([
            'post_type' => 'service',
            'p'         => $serviceID,
        ]);

        while ($res->have_posts()) {
            $res->the_post();
            $out = [
                'cost'          => get_field('cost'),
                'prepayment'    => get_field('prepayment'),
            ];
        }
        wp_reset_postdata();

        return $out;
    }
}