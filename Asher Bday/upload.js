document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const photoInput = document.getElementById('photo');
    const file = photoInput.files[0];

    const formData = new FormData();
    formData.append('photo', file);

    fetch('https://asher-birthday-7824e366fbbf.herokuapp.com/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Photo uploaded successfully!');
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Photo upload failed!');
    });
});
