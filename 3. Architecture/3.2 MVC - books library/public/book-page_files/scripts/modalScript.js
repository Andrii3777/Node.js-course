const modal = document.getElementById('wantReadModal');
const bookElement = document.getElementById('id');
const apiVersion = bookElement.getAttribute('apiVersion');

function openModal(bookId) {
    modal.style.display = 'block';

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    fetch(`/api/v${apiVersion}/book/wanted/${bookId}`, { method: "GET" })
        .then(response => {
            if (response.status !== 200) throw new Error('Increment book wanted error!');
        })
        .catch(error => console.error('Error occured:', error));
}

function closeModal() {
    modal.style.display = 'none';
}