document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/photos')
        .then(response => response.json())
        .then(photos => {
            const photoGallery = document.getElementById('photo-gallery');
            photos.forEach(photo => {
                const img = document.createElement('img');
                img.src = `http://localhost:3000/${photo.path}`;
                photoGallery.appendChild(img);
            });
        })
        .catch(error => {
            console.error('Error fetching photos:', error);
        });

    // Similar logic for videos and audios
});
