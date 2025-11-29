const usernameInput = document.getElementById('username'); 
        const passwordInput = document.getElementById('password');
        const rePasswordInput = document.getElementById('rePassword'); 
        const continueButton = document.getElementById('continueButton');
        const btnStudent = document.getElementById('btn-student');
        const btnTutor = document.getElementById('btn-tutor');
        const body = document.body;

        // --- 1. LOGIKA VALIDASI SIGN UP ---
        function validateForm() {
            const isUsernameFilled = usernameInput.value.trim() !== '';
            const isPasswordFilled = passwordInput.value.trim() !== '';
            const isRePasswordFilled = rePasswordInput.value.trim() !== '';
            const isPasswordMatch = passwordInput.value === rePasswordInput.value;

            if (isUsernameFilled && isPasswordFilled && isRePasswordFilled && isPasswordMatch) {
                continueButton.disabled = false; 
            } else {
                continueButton.disabled = true; 
            }
        }

        usernameInput.addEventListener('input', validateForm);
        passwordInput.addEventListener('input', validateForm);
        rePasswordInput.addEventListener('input', validateForm);

        // --- 2. LOGIKA TOMBOL SIGN UP (SIMPAN DATA) ---
        const signupForm = document.getElementById('signupForm');

        signupForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            if (!continueButton.disabled) {
                // Ambil nilai input
                const username = usernameInput.value.trim();
                const password = passwordInput.value.trim();

                // Buat objek user
                const userData = {
                    username: username,
                    password: password
                };

                // SIMPAN KE LOCALSTORAGE
                // Kita ubah objek jadi string JSON agar bisa disimpan
                localStorage.setItem('clevrUser', JSON.stringify(userData));

                console.log('Sign up berhasil, data disimpan:', userData);
                
                // Beri notifikasi kecil (opsional)
                alert("Sign Up Berhasil! Silakan Log In.");

                // Arahkan ke halaman login
                window.location.href = 'login.html'; 
            }
        });

        // --- 3. LOGIKA SLIDING BACKGROUND ---
        btnStudent.addEventListener('click', () => {
            btnStudent.classList.add('active');
            btnTutor.classList.remove('active');
            body.classList.remove('tutor-mode');
        });

        btnTutor.addEventListener('click', () => {
            btnTutor.classList.add('active');
            btnStudent.classList.remove('active');
            body.classList.add('tutor-mode');
        });