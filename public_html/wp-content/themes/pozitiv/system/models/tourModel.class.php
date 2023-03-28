<?php

require_once 'pozitivModel.class.php';
class TourModel extends PozitivModel {

    function __construct() {
        parent::__construct();
    }

    public function GetByID(int $tourID) {
        if ($tourID <= 0) { return false; }

        $res = new WP_Query([
            'post_type' => 'tour',
            'p'         => $tourID,
        ]);

        while ($res->have_posts()) {
            $res->the_post();

            $out = [
                'id'               => get_the_ID(),
                'title'            => get_the_title(),
                'name'             => get_field('name'),
                'season'           => get_field('season'),
                'duration'         => get_field('duration'),
                'place'            => get_field('place'),
                'descriptionShort' => get_field('descriptionShort'),
                'plan'             => get_field('plan'),
                'planPicture'      => get_field('planPicture'),
                'video'            => get_field('video'),
                'image1'           => get_field('image1'),
                'image2'           => get_field('image2'),
                'image3'           => get_field('image3'),
                'image4'           => get_field('image4'),
                'image5'           => get_field('image5'),
                'trips'            => get_field('trips'),
                'slug'             => get_field('slug'),
            ];
        }
        wp_reset_postdata();

        return $out;
    }
}