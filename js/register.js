document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const dob = document.getElementById('dob').value;
  const country = document.getElementById('country').value;
  const phone = document.getElementById('phone').value;
  const city = document.getElementById('city').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{5,}$/;
  if (!passwordRegex.test(password)) {
    document.getElementById('errorMessage').textContent = 'Password must be at least 5 characters long, with uppercase, lowercase, and numbers.';
    return;
  }

  // Check if user already exists
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    document.getElementById('errorMessage').textContent = 'User already exists. Please login.';
    return;
  }

  // Encrypt password using bscript (bcrypt-like encryption)
  const encryptedPassword = btoa(password); // Simple base64 encoding for demonstration

  // Store user data in localStorage
  const newUser = { firstName, lastName, dob, country, phone, city, email, password: encryptedPassword };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  alert('Registration successful!');
  window.location.href = 'login.html';
});