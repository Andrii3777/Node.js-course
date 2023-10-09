window.onload = () => {
    const bookElement = document.getElementById('id');
    const imageId = bookElement.getAttribute("book-imageId");

    fetch(`/api/v1/image/${imageId}`)
        .then(response => response.blob())
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            document.getElementById('imageDisplay').src = imageUrl;
        })
        .catch(error => console.error('Error fetching image:', error));
};