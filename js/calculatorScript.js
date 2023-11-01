$(document).ready(() => {

    // Function to highlight field and display error message
    const displayErrorAndHighlightField = (fieldId, errorMessage) => {
        $(fieldId).next('.error').text(errorMessage);
        $(fieldId).css('border-color', 'red');
    }

    // Function to clear error and remove highlighting
    const clearErrorAndHighlightField = (fieldId) => {
        $(fieldId).next('.error').text(''); // Clear error message
        $(fieldId).css('border-color', ''); // Remove red border
    }

    // Perform number validations
    const numberValidation = (value, id) => {
        id = `#${id}`

        // Null check
        if (!value) {
            displayErrorAndHighlightField(id, "Field cannot be empty");
            return false
        }

        // Check for only numbers
        const numbersRegex = /^[0-9]+$/;
        if (!numbersRegex.test(value)) {
            displayErrorAndHighlightField(id, "Field should contain only numbers");
            return false
        }

        // Check for special characters
        const specialCharactersRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (specialCharactersRegex.test(value)) {
            displayErrorAndHighlightField(id, "Field should not contain special characters");
            return false
        }

        // Infinite value check (if input represents a number)
        if (!isFinite(value)) {
            displayErrorAndHighlightField(id, "Input cannot be infinite");
            return false
        }

        return true
    }


const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : 'Infinity'
};

// Single arrow function to perform the operation
const performOperation = (operation, num1, num2) => operations[operation] ? operations[operation](num1, num2) : 'Invalid Operation';


$('#add, #subtract, #multiply, #divide').on('click', (event) => {
    const operation = event.target.id;
    const num1 = parseFloat($('#number1').val());
    const num2 = parseFloat($('#number2').val());
    const result = performOperation(operation, num1, num2);
    $('#result').val(result);
});

    // Event listeners for operation buttons
    $('#add, #subtract, #multiply, #divide').on('click', (event) => {
        const operation = event.target.id;
        performOperation(operation);
    });

    // Perform input validations
    $('#number1, #number2').on('keyup', (event) => {
        const value = $(event.target).val().trim();
        const id = event.target.id;

        // Validation logic for number inputs
        const isValid = numberValidation(value, id)

        if(isValid)
            clearErrorAndHighlightField(`#${id}`);
    });
});
