document.addEventListener("DOMContentLoaded", () => {
    // Signup Form Handler
    const signupForm = document.getElementById("signupForm");
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;
  
      if (email && password) {
        // Save user data locally (for demo purposes)
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        alert("Signup successful!");
        signupForm.reset();
      } else {
        alert("Please fill in all fields.");
      }
    });
  
    // Login Form Handler
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
  
      const savedEmail = localStorage.getItem("userEmail");
      const savedPassword = localStorage.getItem("userPassword");
  
      if (email === savedEmail && password === savedPassword) {
        alert("Login successful!");
        loginForm.reset();
      } else {
        alert("Invalid email or password.");
      }
    });
  });
  