document.getElementById('greeting-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const greeting = document.getElementById('greeting').value;
    let greetings = JSON.parse(localStorage.getItem('greetings')) || [];
    greetings.push(greeting);
    localStorage.setItem('greetings', JSON.stringify(greetings));
    alert('Thank you for your greeting!');
    window.location.href = 'index.html';
});
