const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const continueButton = document.getElementById('continueButton');
        const btnStudent = document.getElementById('btn-student');
        const btnTutor = document.getElementById('btn-tutor');
        const body = document.body;

        // --- LOGIKA SLIDING BACKGROUND ---
        
        btnStudent.addEventListener('click', () => {
            btnStudent.classList.add('active');
            btnTutor.classList.remove('active');
            
            // Mode student (Hapus class tutor-mode)
            body.classList.remove('tutor-mode');
        });

        btnTutor.addEventListener('click', () => {
            btnTutor.classList.add('active');
            btnStudent.classList.remove('active');
            
            // Mode tutor (Tambah class tutor-mode)
            body.classList.add('tutor-mode');
        });

        // --- LOGIKA VALIDASI ---

        function validateForm() {
            // DIUBAH: Cek isUsernameFilled
            const isUsernameFilled = usernameInput.value.trim() !== '';
            const isPasswordFilled = passwordInput.value.trim() !== '';

            if (isUsernameFilled && isPasswordFilled) {
                continueButton.disabled = false; 
            } else {
                continueButton.disabled = true; 
            }
        }

        usernameInput.addEventListener('input', validateForm);
        passwordInput.addEventListener('input', validateForm);

        const loginForm = document.getElementById('loginForm');

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            if (!continueButton.disabled) {
                
                // === PERUBAHAN UTAMA DI SINI ===
                
                // 1. Cek Mode Login (Student atau Tutor)
                if (btnTutor.classList.contains('active')) {
                    
                    // --- MODE TUTOR (LOGIKA LAMA - BYPASS DATA) ---
                    console.log('Mode Tutor: Navigasi ke tutorhome.html...');
                    window.location.href = 'tutorhome.html'; 

                } else {
                    
                    // --- MODE STUDENT (LOGIKA BARU - CEK LOCALSTORAGE) ---
                    const enteredUsername = usernameInput.value.trim();
                    const enteredPassword = passwordInput.value.trim();

                    // Ambil data user dari LocalStorage
                    const storedUserJSON = localStorage.getItem('clevrUser');

                    if (storedUserJSON) {
                        const storedUser = JSON.parse(storedUserJSON);

                        // Cek kecocokan Username DAN Password
                        if (enteredUsername === storedUser.username && enteredPassword === storedUser.password) {
                            
                            // BERHASIL
                            console.log('Mode Student: Login Berhasil! Navigasi ke home.html...');
                            window.location.href = 'home.html'; 

                        } else {
                            // GAGAL (Password atau Username Salah)
                            alert('Username atau Password salah!');
                        }
                    } else {
                        // DATA TIDAK DITEMUKAN (Belum pernah Sign Up)
                        alert('Username belum terdaftar! Silakan Sign Up terlebih dahulu.');
                    }
                }
            }
        });