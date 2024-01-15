//new DataTable('#example'); // problems with displaying images using pagination!!!

const table = new DataTable('#example', {
    paging: false,
    scrollY: '350px'
});

function addAuthorField() {
    const authorsContainer = document.getElementById('authors-container');
    const authorContainer = document.createElement('div');
    authorContainer.className = 'author-container';

    const authorInput = Object.assign(document.createElement('input'), {
        type: 'text',
        name: 'authors[]',
        required: true,
        placeholder: 'Another author'
    });

    const removeButton = Object.assign(document.createElement('button'), {
        className: 'deleteAuthorBtn formBtn',
        type: 'button',
        textContent: 'Delete',
        onclick() { authorContainer.remove(); }
    });

    authorContainer.append(authorInput, removeButton);
    authorsContainer.appendChild(authorContainer);
}

function showImagePreview() {
    const imageInput = document.getElementById('imageInput');
    const previewImage = document.getElementById('previewImage');
    const selectedFile = imageInput.files[0];

    if (selectedFile) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };

        reader.readAsDataURL(selectedFile);
    } else {
        previewImage.src = '#';
        previewImage.style.display = 'none';
    }
}

const apiVersion = document.getElementById('dataApiVersion').getAttribute('data-apiVersion');

function logout() {
    if (confirm('Do you really want to logout from admin page?')) {

        fetch(`/admin/api/v${apiVersion}/logout`, { method: "GET" })
            .then(response => {
                if (response.status === 401) {
                    window.location.href = `/admin/api/v${apiVersion}/`;
                    alert("Logout successfully!");
                } else throw new Error("Logout error!");
            })
            .catch(error => console.error('An error occurred while logging out from admin page:', error))
    }
}

function deleteBook(bookId, deleteBookBtn) {
    if (confirm('Do you really want to delete this book?')) {
        fetch(`/admin/api/v${apiVersion}/delete/${bookId}`, {
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                deleteBookBtn.closest('tr').remove();
                console.log('Book deleted successfully!');
            } else throw new Error("Delete book error!");
        })
            .catch(error => console.error('An error occured while deleting book:', error));
    }
}