<script>
        // Menjalankan kode setelah seluruh halaman selesai dimuat
        document.addEventListener('DOMContentLoaded', function() {
            
            // Mengambil elemen layar kalkulator, gambar status, dan semua tombol
            const display = document.getElementById('display');
            const statusImage = document.getElementById('statusImage');
            const buttons = document.querySelectorAll('.btn-calc');

            // Menyimpan URL gambar status kalkulator (normal, sukses, error)
            const imgNormal = 'https://placehold.co/400x100/374151/E5E7EB?text=Kalkulator';
            const imgSuccess = 'https://placehold.co/400x100/16A34A/FFFFFF?text=Sukses!';
            const imgError = 'https://placehold.co/400x100/DC2626/FFFFFF?text=Error!';

            /**
             * Mengubah gambar atas sesuai status kalkulator
             */
            function changeImage(state) {
                if (state === 'success') {
                    statusImage.src = imgSuccess;
                    statusImage.alt = "Perhitungan Sukses";
                } else if (state === 'error') {
                    statusImage.src = imgError;
                    statusImage.alt = "Error Perhitungan";
                } else {
                    // Mengembalikan gambar ke mode normal
                    statusImage.src = imgNormal;
                    statusImage.alt = "Status Kalkulator";
                }
            }

            /**
             * Menghapus seluruh tampilan display
             */
            function clearDisplay() {
                display.value = '';
                changeImage('normal'); // Mengembalikan gambar status ke normal
            }

            /**
             * Menghapus satu karakter terakhir dari display
             */
            function deleteLastChar() {
                display.value = display.value.slice(0, -1);
            }

            /**
             * Menambahkan karakter (angka/operator) ke display
             */
            function appendToDisplay(value) {
                display.value += value;
            }

            /**
             * Menghitung hasil dari input user di display
             */
            function calculateResult() {
                // Jika input kosong, tampilkan error
                if (display.value === '') {
                    changeImage('error');
                    display.value = 'Kosong!';
                    // Membersihkan kembali setelah 1.5 detik
                    setTimeout(clearDisplay, 1500);
                    return;
                }

                try {
                    // Menjalankan perhitungan, termasuk mengubah % menjadi /100
                    let result = eval(display.value
                        .replace(/%/g, '/100') // Mengubah persen menjadi operasi matematika
                    ); 
                    
                    // Mengecek apakah hasil valid (bukan infinity atau NaN)
                    if (isFinite(result)) {
                        display.value = result;
                        changeImage('success'); // Mengubah gambar status menjadi sukses
                    } else {
                        throw new Error("Hasil tidak valid");
                    }

                } catch (error) {
                    console.error("Error kalkulasi:", error);
                    display.value = 'Error';
                    changeImage('error'); // Menampilkan gambar error
                    setTimeout(clearDisplay, 1500);
                }
            }


            // Menambahkan event klik pada setiap tombol kalkulator
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const value = button.getAttribute('data-value');

                    // Menentukan aksi tombol berdasarkan value-nya
                    switch(value) {
                        case 'C':
                            // Aksi tombol Clear untuk menghapus semua
                            clearDisplay();
                            break;
                        case 'DEL':
                            // Aksi tombol Delete untuk menghapus satu karakter
                            deleteLastChar();
                            break;
                        case '=':
                            // Menjalankan perhitungan
                            calculateResult();
                            break;
                        default:
                            // Jika sebelumnya muncul hasil sukses/error, reset display dulu
                            if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                                clearDisplay();
                            }
                            appendToDisplay(value);
                            break;
                    }
                });
            });

            // Event untuk menangani input dari keyboard
            document.addEventListener('keydown', (e) => {
                const key = e.key;

                if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
                    // Jika sebelumnya status sukses/error, bersihkan dulu
                    if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                        clearDisplay();
                    }
                    appendToDisplay(key);
                    e.preventDefault();
                } else if (key === 'Enter' || key === '=') {
                    calculateResult();
                    e.preventDefault();
                } else if (key === 'Backspace') {
                    deleteLastChar();
                    e.preventDefault();
                } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                    clearDisplay();
                    e.preventDefault();
                }
            });

        });
    </script>
