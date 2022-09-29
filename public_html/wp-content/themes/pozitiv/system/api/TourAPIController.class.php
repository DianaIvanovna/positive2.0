<?php

class TourAPIController extends WP_REST_Controller {

    private $sourceRequest;

    function __construct() {
     
    }

    public function Init($request) {

        $this->sourceRequest = $request;

        switch ($request->get_param('action')) {
            case 'get':
                $result = $this->Get();
                break;
        }

        return $result;
    }


    /**
     * 
     */
    private function Get() {

        $reqID = $this->sourceRequest->get_param('id');
        if  (is_numeric($reqID)) {
            $args = [
                'post_type' => 'tour',
                'p' => $reqID
            ];
        } else {
            $args = [
                'post_type' => 'tour',
            ];
        }

        $res = new WP_Query($args);

        //= Соберем данные по турам
        $out = [];
        if ($res->have_posts()) {
            while ($res->have_posts()) {
                $res->the_post();

                $arTour = [
                    'id'            => get_the_ID(),
                    'name'          => get_the_title(),
                    'description'   => get_the_content(),
                    'image'         => get_the_post_thumbnail_url(get_the_ID()),
                ];

                //== Прицепим данные о поездках
                $trips = get_field('trips');
                $arTrips = [];
                if (count($trips)) {
                    foreach ($trips as $tripID) {

                        $resTrip = new WP_Query([
                            'post_type'     => 'trip',
                            'p'             => $tripID
                        ]);

                        while ($resTrip->have_posts()) {
                            $resTrip->the_post();

                            $arTrip = [
                                'id'            => $resTrip->post->ID,
                                'dateStart'     => get_field('dateStart', $resTrip->post->ID),
                                'dateEnd'       => get_field('dateEnd', $resTrip->post->ID),
                                'touristLimit'  => get_field('touristLimit', $resTrip->post->ID),
                                'cost'          => get_field('cost', $resTrip->post->ID),
                            ];

                            //=== Добавим информацию по допуслугам
                            $services = get_field('services', $resTrip->post->ID);
                            if (is_numeric($services) || (is_array($services) && count($services))) {

                                if (is_numeric($services)) {
                                    $argsServ = [
                                        'post_type' => 'service',
                                        'p'         => $services
                                    ];
                                } elseif (is_array($services)) {
                                    $argsServ = [
                                        'post_type' => 'service',
                                        'post__in'  => $services
                                    ];
                                }

                                $resServ = new WP_Query($argsServ);

                                $arServs = [];
                                while ($resServ->have_posts()) {
                                    $resServ->the_post();

                                    $arServs[] = [
                                        'id'            => $resServ->post->ID,
                                        'name'          => $resServ->post->post_title,
                                        'description'   => $resServ->post->post_content,
                                        'cost'          => get_field('cost', $resServ->post->ID),
                                        'prepayment'    => get_field('prepayment', $resServ->post->ID),
                                    ];
                                }
                            }

                            $arTrip['services'] = $arServs;

                            $arTrips[] = $arTrip;
                        }
                    }
                }

                $arTour['trips'] = $arTrips;
                $out[] = $arTour;
            }
            wp_reset_postdata();
        }

        $out['number'] = count($out);

        return $out;
    }
}