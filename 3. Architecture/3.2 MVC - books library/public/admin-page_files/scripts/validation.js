document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addBookForm');

    form.addEventListener('submit', function (event) {
        if (!validateForm()) event.preventDefault();
    });

    function validateForm() {
        const validationData = [
            { fieldName: 'title', validationFn: validateTitle, errorMsg: 'Invalid title' },
            { fieldName: 'pages', validationFn: validatePageNumber, errorMsg: 'Invalid number of pages' },
            { fieldName: 'year', validationFn: validateYear, errorMsg: 'Invalid year' },
            { fieldName: 'authors[]', validationFn: validateAuthorName, errorMsg: 'Invalid author name' },
            { fieldName: 'description', validationFn: validateDescription, errorMsg: 'Invalid description' }
        ];

        const validationResults = validationData.map(data => {
            const inputs = form.querySelectorAll(`[name="${data.fieldName}"]`);
            const isValid = Array.from(inputs).every(input => data.validationFn(input.value));
            return { isValid, errorMsg: data.errorMsg };
        });

        const isValid = validationResults.every(result => result.isValid);

        if (!isValid) {
            const invalidField = validationResults.find(result => !result.isValid);
            alert(invalidField.errorMsg);
        }

        return isValid;
    }
});

function validateTitle(title) {
    return (title.length >= 2 && title.length <= 100);
}

function validatePageNumber(pages) {
    return (!isNaN(pages) && pages > 0);
}

function validateYear(year) {
    const currentYear = new Date().getFullYear();

    return (!isNaN(year) && year >= 1000 && year <= currentYear);
}

function validateAuthorName(authorName) {
    return /^[A-Za-zА-Яа-я\s.'-]+$/.test(authorName) && authorName.length < 100;
}

function validateDescription(description) {
    return (description.length >= 2 && description.length <= 1000);
}