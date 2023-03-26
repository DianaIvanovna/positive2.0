<?php

require_once 'pozitivModel.class.php';
class TripModel extends PozitivModel {

    function __construct() {
        parent::__construct();
    }

    public function GetByID(int $tripID) {

        if ($tripID <= 0) { return false; }

        $res = new WP_Query([
            'post_type' => 'trip',
            'p'         => $tripID,
        ]);

        while ($res->have_posts()) {
            $res->the_post();

            $out = [
                'id'            => get_the_ID(),
                'dateStart'     => get_field('dateStart'),
                'dateEnd'       => get_field('dateEnd'),
                'touristLimit'  => get_field('touristLimit'),
                'cost'          => get_field('cost'),
            ];
        }
        wp_reset_postdata();

        return $out;
    }


    public function GetAll() {

        $res = new WP_Query([
            'post_type'      => 'trip',
        ]);

        while ($res->have_posts()) {
            $res->the_post();

            $out[] = [
                'id'            => get_the_ID(),
                'name'          => get_the_title(),
                'dateStart'     => get_field('dateStart'),
                'dateEnd'       => get_field('dateEnd'),
                'touristLimit'  => get_field('touristLimit'),
                'cost'          => get_field('cost'),
                'services'      => get_field('services'),
            ];
        }
        wp_reset_postdata();

        return $out;
    }
}