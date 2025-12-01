/**********************login sesction*****************/
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.email === email);

  if (!user) {
    document.getElementById('errorMessage').textContent = 'Email not found.';
    return;
  }

  // Compare encrypted passwords
  const encryptedPassword = btoa(password); // Simple base64 encoding for demonstration
  if (user.password !== encryptedPassword) {
    document.getElementById('errorMessage').textContent = 'Wrong password or email.';
    return;
  }

  alert('Login successful!');
  window.location.href = 'index.html';
});