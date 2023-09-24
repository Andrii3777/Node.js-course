const data = document.getElementById('paginationData');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const baseUrl = data.getAttribute('baseUrl');
const offsetStep = Number(data.getAttribute('offsetStep'));
const offset = Number(data.getAttribute('offset'));
const booksNumber = Number(data.getAttribute('booksNumber'));
const booksSearchedNumber = Number(data.getAttribute('booksSearchedNumber'));
const searchTerm = data.getAttribute('searchTerm');

(function () {
    if (booksNumber) {
        prevBtn.href = offset > 0 ? `${baseUrl}/api/v1/?offset=${offset - offsetStep}` : '#';
        prevBtn.classList.toggle('disabled', offset <= 0 || booksNumber === 0);

        nextBtn.href = offset + offsetStep < booksNumber ? `${baseUrl}/api/v1/?offset=${offset + offsetStep}` : '#';
        nextBtn.classList.toggle('disabled', (offset + offsetStep) >= booksNumber || booksNumber ===0);
    } else if (booksSearchedNumber) {
        prevBtn.href = offset > 0 ? `${baseUrl}/api/v1/?offset=${offset - offsetStep}&search=${searchTerm}` : '#';
        prevBtn.classList.toggle('disabled', offset <= 0);

        nextBtn.href = offset + offsetStep < booksSearchedNumber ? `${baseUrl}/api/v1/?offset=${offset + offsetStep}&search=${searchTerm}` : '#';
        nextBtn.classList.toggle('disabled', offset + offsetStep >= booksSearchedNumber);
    }
})();