<?php

/**
 * Вернет очищенный от лишних символов номер телефона или 
 * false если не удалось преобразовать телефон к стандартному виду
 * 
 * @return false | string
 */
function GetCleanPhone($phoneString) {
    if (empty($phoneString)) {
        return false; 
    }
    $arrStr = str_split($phoneString);

    $out = '';
    // Если первый символ +
    if ($arrStr[0] == '+') {
        $out = '+';
        for ($i = 1; $i < count($arrStr); $i++) {
            if (is_numeric($arrStr[$i])) {
                $out .= $arrStr[$i];
            }
        }
    }

    // Если первый символ 8,  заменим на +7
    elseif ($arrStr[0] == 8) {
        $out = '+7';
        for ($i = 1; $i < count($arrStr); $i++) {
            if (is_numeric($arrStr[$i])) { $out .= $arrStr[$i]; }
        }
    }

    // Если первый символ число, но не 8
    elseif (is_numeric($arrStr[0]) && (count($arrStr) > 10)) {
        $out = '';
        for ($i = 0; $i < count($arrStr); $i++) {
            if (is_numeric($arrStr[$i])) { $out .= $arrStr[$i]; }
        }
    }

    // Если первый символ '(' добавим российский +7
    elseif ($arrStr[0] == '(') {
        $out = '+7';
        for ($i = 0; $i < count($arrStr); $i++) {
            if (is_numeric($arrStr[$i])) { $out .= $arrStr[$i]; }
        }
    }

    elseif(count($arrStr) == 10) {
        $out = '+7';
        for ($i = 0; $i < count($arrStr); $i++) {
            if (is_numeric($arrStr[$i])) { $out .= $arrStr[$i]; }
        }
    }

    // Международные номера могут быть длинной от 11 до 16 символов
    if ( (strlen($out) >= 11) && (strlen($out) <= 16) ) {
        return $out;
    }

    return false;
}


/**
 * Сгенерирует случайную буквенно-цифровую строку заданной длинны
 * @param int $length=6
 * @return string
 */
function GetRandomString(int $length = 6) {

    $chars = 'qazxswedcvfrtgbnhyujmkiolp1234567890QAZXSWEDCVFRTGBNHYUJMKIOLP';
    $size = strlen($chars) - 1;
    $password = '';

    while($length--) {
        $password .= $chars[random_int(0, $size)];
    }

    return $password;
}