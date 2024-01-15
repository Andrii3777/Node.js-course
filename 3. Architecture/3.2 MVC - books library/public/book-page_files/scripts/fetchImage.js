window.onload = () => {
    const bookElement = document.getElementById('id');
    const imageId = bookElement.getAttribute("book-imageId");
    const apiVersion = bookElement.getAttribute('apiVersion');

    fetch(`/api/v${apiVersion}/image/${imageId}`)
        .then(response => response.blob())
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            document.getElementById('imageDisplay').src = imageUrl;
        })
        .catch(error => console.error('Error fetching image:', error));
};