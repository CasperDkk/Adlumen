function validateSignUp() {
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const repeatPassword = document.getElementById('repeatPassword').value;

    if (password !== repeatPassword) {
        alert("Passwords do not match!");
        return false; 
    }

   // Additional validation can be added here
   alert("Sign Up successful!");

   return true; // Allow form submission
}

function validateSignIn() {
   const email = document.getElementById('signInEmail').value;

   // Add any additional validation if needed
   if (!email) {
       alert("Please enter your email.");
       return false; // Prevent form submission
   }

   alert("Sign In successful!");

   return true; // Allow form submission
}