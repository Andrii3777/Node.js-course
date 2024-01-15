window.onload = () => {
    const apiVersion = document.getElementById('dataApiVersion').getAttribute('data-apiVersion');
    const bookItems = document.querySelectorAll('.table_row');

    bookItems.forEach(bookItem => {
        const imageId = bookItem.getAttribute('data-image-id');
        const imageElement = bookItem.querySelector(`#imageDisplay${imageId}`);

        fetch(`/api/v${apiVersion}/image/${imageId}`)
            .then(response => response.blob())
            .then(blob => {
                const imageUrl = URL.createObjectURL(blob);
                imageElement.src = imageUrl;
            })
            .catch(error => console.error('Error fetching image:', error));
    });
};
