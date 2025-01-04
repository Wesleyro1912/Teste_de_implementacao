function applyCPFMask() {
    const field = document.getElementById("cpf");
    const form = document.getElementById("form_user");

    // Add input event to apply the mask
    field.addEventListener("input", () => {
        let value = field.value;

        // Remove non-numeric characters
        value = value.replace(/\D/g, '');

        // Limit the number of digits to 11
        if (value.length > 11) {
            value = value.substring(0, 11);
        }

        // Add mask in the format 000.000.000-00
        if (value.length > 3) {
            value = value.replace(/^(\d{3})(\d)/, '$1.$2');
        }
        if (value.length > 6) {
            value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        }
        if (value.length > 9) {
            value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
        }

        // Update the field value
        field.value = value;
    });

    // Function to validate CPF
    function validarCPF(cpf) {
        // Remove the non-numeric characters (mask)
        cpf = cpf.replace(/[^\d]+/g, '');

        // Check if the CPF length is correct
        if (cpf.length !== 11) {
            return false;
        }

        // Eliminate known invalid CPFs (e.g., 11111111111, 22222222222, etc.)
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        // Calculate the first verifier digit
        let soma = 0;
        let peso = 10;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * peso;
            peso--;
        }

        let resto = soma % 11;
        let primeiroDigito = (resto < 2) ? 0 : 11 - resto;
        if (parseInt(cpf.charAt(9)) !== primeiroDigito) {
            return false;
        }

        // Calculate the second verifier digit
        soma = 0;
        peso = 11;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * peso;
            peso--;
        }

        resto = soma % 11;
        let segundoDigito = (resto < 2) ? 0 : 11 - resto;
        if (parseInt(cpf.charAt(10)) !== segundoDigito) {
            return false;
        }

        return true; // The CPF is valid
    }

    // Before submitting, remove the mask and validate the CPF
    form.addEventListener("submit", (event) => {
        const cleanValue = field.value.replace(/\D/g, ''); // Remove the mask
        if (!validarCPF(cleanValue)) {
            alert("CPF Inválido, por favor digite fornerça um válido");
            event.preventDefault(); // Prevent form submission if CPF is invalid
        }
    });
}

function applyRGMask() {
    const field = document.getElementById("rg");
    const form = document.getElementById("form_user");

    // Add input event to apply the mask
    field.addEventListener("input", () => {
        let value = field.value;

        // Remove non-numeric characters
        value = value.replace(/\D/g, '');

        // Limit the number of digits to 9 (adjust if needed)
        if (value.length > 9) {
            value = value.substring(0, 9);
        }

        // Add mask in the format 00.000.000-0
        if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        }
        if (value.length > 5) {
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        }
        if (value.length > 8) {
            value = value.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
        }

        // Update the field value
        field.value = value;
    });

    // Function to validate RG
    function validarRG(rg) {
        // Remove the non-numeric characters (mask)
        rg = rg.replace(/[^\d]+/g, '');

        // Check if the RG length is correct (9 digits)
        if (rg.length !== 9) {
            return false;
        }

        // RG is generally valid if it has 9 digits (Brazilian RG usually has this format)
        // There is no complex mathematical validation as with CPF, but we can check if it's only numeric
        return /^\d{9}$/.test(rg);  // It must be exactly 9 digits long
    }

    // Before submitting, remove the mask and validate the RG
    form.addEventListener("submit", (event) => {
        const cleanValue = field.value.replace(/\D/g, ''); // Remove the mask
        if (!validarRG(cleanValue)) {
            alert("Invalid RG. Please enter a valid RG.");
            event.preventDefault(); // Prevent form submission if RG is invalid
        } else {
            alert("RG sent: " + cleanValue); // Show the clean RG
        }
    });
}
