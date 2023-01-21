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
        $out['tours'] = [];

        while ($res->have_posts()) {
            $res->the_post();

            $season = get_field('season');

            //== Фильтрация по параметрам
            if (!empty($this->sourceRequest->get_param('season')) && ($season != $this->sourceRequest->get_param('season')) ) { continue; }

            //== Соберем массив фотографий тура
            $arImages = [];
            for ($i = 1; $i <= 5; $i++) {
                $curImage = get_field('image' . $i);
                if (!empty($curImage)) {
                    $arImages[] = $curImage;
                }
            }

            global $post;

            //== Соберем массив ответа
            $arTour = [
                'id'                => get_the_ID(),
                'nameWP'            => get_the_title(),
                'name'              => get_field('name'),
                'description'       => get_the_content(),
                'descriptionShort'  => get_field('descriptionShort'),
                'season'            => $season,
                'duration'          => get_field('duration'),
                'place'             => get_field('place'),
                'plan'              => get_field('plan'),
                'planPicture'       => get_field('planPicture'),
                'video'             => get_field('video'),
                'images'            => $arImages,
                'thumbnail'         => get_the_post_thumbnail_url(get_the_ID()),
                'order'             => $post->menu_order,
            ];

            //== Прицепим данные о поездках
            $trips = get_field('trips');
            $arTrips = [];
            if (is_array($trips) && count($trips)) {
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
            $out['tours'][] = $arTour;
        }
        wp_reset_postdata();

        $out['numberTours'] = count($out['tours']);

        return $out;
    }
}