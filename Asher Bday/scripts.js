document.addEventListener('DOMContentLoaded', () => {
    fetch('https://asher-birthday.herokuapp.com/photos')
        .then(response => response.json())
        .then(photos => {
            const photoGallery = document.getElementById('photo-gallery');
            photos.forEach(photo => {
                const img = document.createElement('img');
                img.src = `https://asher-birthday-7824e366fbbf.herokuapp.com/${photo.path}`;
                photoGallery.appendChild(img);
            });
        })
        .catch(error => {
            console.error('Error fetching photos:', error);
        });

    // Similar logic for videos and audios
});
