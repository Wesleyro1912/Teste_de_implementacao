<?php

function validate_cpf($cpf) {
    // Remove non-numeric characters
    $cpf = preg_replace('/[^0-9]/', '', $cpf);

    // Check length and repeated sequences
    if (strlen($cpf) != 11 || preg_match('/(\d)\1{10}/', $cpf)) {.
        return false;
    }

    // Calculate verification digits
    for ($t = 9; $t < 11; $t++) {
        $sum = 0;
        for ($c = 0; $c < $t; $c++) {
            $sum += $cpf[$c] * (($t + 1) - $c);
        }

        $d = ((10 * $sum) % 11) % 10;
        if ($cpf[$c] != $d) {
            return false;
        }
    }

    return true;
}

function validate_cep($cep) {
    // Remove non-numeric characters
    $cep = preg_replace('/[^0-9]/', '', $cep);

    // Check length
    if (strlen($cep) != 8) {
        return false;
    }

    // Optional: Check existence via API
    $url = "https://viacep.com.br/ws/{$cep}/json/";
    $response = @file_get_contents($url);
    $data = json_decode($response, true);

    return isset($data['cep']) ? $data : false;
}

// Process form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cpf = $_POST['cpf'] ?? '';
    $cep = $_POST['cep'] ?? '';

    $isCPFValid = validate_cpf($cpf);
    $cepData = validate_cep($cep);

    $output = '';

    if (!$isCPFValid) {
        $output .= "CPF inválido.<br>";
    } else {
        $output .= "CPF válido.<br>";
    }

    if (!$cepData) {
        $output .= "CEP inválido.<br>";
    } else {
        $output .= "CEP válido.<br>";
        $output .= "Cidade: " . $cepData['localidade'] . "<br>";
        $output .= "Estado: " . $cepData['uf'] . "<br>";
    }

    echo $output; // Send the result back to the AJAX request
}
