const usernameInput = document.getElementById('username-input');

usernameInput.addEventListener('input', function() {
    const username = this.value.trim();
    if (username) {
        getProfileInfo(username);
    } else {
        clearProfileInfo();
    }
});

function getProfileInfo(username) {
    fetch(`https://api.github.com/users/${username}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('User not found');
        }
        return response.json();
    })
    .then(data => {
        displayProfileInfo(data);
    })
    .catch(error => {
        console.log("Error:", error);
    });
}

function displayProfileInfo(data) {
    const profileContent = document.getElementById('profile-content');
    profileContent.style.display = 'block';
    document.getElementById('profile-picture').src = data.avatar_url;
    document.getElementById('full-name').textContent = data.name || data.login;
    document.getElementById('bio').textContent = data.bio || 'No bio available';
    document.getElementById('github-link').href = data.html_url;
    document.getElementById('mail').href = `mailto:${data.email || ''}`;
}

function clearProfileInfo() {
    const profileContent = document.getElementById('profile-content');
    profileContent.style.display = 'none';
    document.getElementById('profile-picture').src = '';
    document.getElementById('full-name').textContent = 'Full Name';
    document.getElementById('bio').textContent = 'Bio';
    document.getElementById('github-link').href = '#';
    document.getElementById('mail').href = 'mailto:';
}
