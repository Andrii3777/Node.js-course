window.onload = () => {
    const bookItems = document.querySelectorAll('.book_item');
    const apiVersion = data.getAttribute('apiVersion');

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
