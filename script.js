lucide.createIcons();
// ==========================================
        // AREA PENGELOLAAN PRODUK (TAMBAH/HAPUS DI SINI)
        // ==========================================
        // TIPS UNTUK GAMBAR:
        // 1. Gambar Lokal: Jika file ada di folder yang sama, pakai nama filenya. Contoh: img: "pestisida.jpg"
        // 2. Gambar Internet: Pakai link lengkap. Contoh: img: "https://alamat-web.com/gambar.png"
		
const products = [
    { id: 1, name: "Insektisida Prevathon 100ml", price: 125000, img: "Insektisida Prevathon 100ml.jpeg" },
    { id: 2, name: "Pupuk NPK Mutiara 16-16-16 1kg", price: 18000, img: "mutiara_pupuk-npk-mutiara-16-16-16--1kg_full02.jpg" },
    { id: 3, name: "Tangki Semprot Elektrik 16L", price: 450000, img: "Tangki Semprot Elektrik 16L.jpg" },
    { id: 4, name: "Fungisida Amistartop 250ml", price: 215000, img: "Fungisida Amistartop 250ml.jpg" },
    { id: 5, name: "Pupuk Gandasil D 100gr", price: 12000, img: "Pupuk Gandasil D 100gr.jpg" },
    { id: 6, name: "Gunting Stek Ranting Pro", price: 45000, img: "Gunting Stek Ranting Pro.jpg" },
];

let cart = [];

        // Render Produk
        function renderProducts() {
            const container = document.getElementById('product-container');
            container.innerHTML = products.map(p => `
                <div class="product-card">
                    <img src="${p.img}" alt="${p.name}" class="product-img">
                    <div class="product-info">
                        <h3>${p.name}</h3>
                        <span class="product-price">Rp ${p.price.toLocaleString('id-ID')}</span>
                        <div style="display: flex; align-items: center;">
                            <input type="number" value="1" min="1" id="qty-${p.id}" class="qty-input">
                            <button class="btn btn-primary" onclick="addToCart(${p.id})" style="padding: 8px 15px; font-size: 0.9rem;">
                                + Keranjang
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Fungsi Keranjang
        function toggleCart() {
            const sidebar = document.getElementById('cart-sidebar');
            const overlay = document.getElementById('overlay');
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        }

        document.getElementById('overlay').onclick = toggleCart;

        function addToCart(id) {
            const product = products.find(p => p.id === id);
            const qty = parseInt(document.getElementById(`qty-${id}`).value);
            
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.qty += qty;
            } else {
                cart.push({ ...product, qty });
            }
            
            updateCartUI();
            
            // Animasi Feedback
            const btn = event.target;
            const originalText = btn.innerHTML;
            btn.innerHTML = "Berhasil!";
            btn.style.background = "#1f6f43";
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = "";
            }, 1000);
        }

        function updateCartUI() {
            const list = document.getElementById('cart-items-list');
            const count = document.getElementById('cart-count');
            const totalDisplay = document.getElementById('total-price');
            
            let total = 0;
            let totalQty = 0;

            if (cart.length === 0) {
                list.innerHTML = '<p style="text-align: center; margin-top: 50px; color: #888;">Keranjang kosong</p>';
            } else {
                list.innerHTML = cart.map((item, index) => {
                    total += item.price * item.qty;
                    totalQty += item.qty;
                    return `
                        <div class="cart-item">
                            <div>
                                <h4 style="font-size: 0.9rem;">${item.name}</h4>
                                <small>${item.qty} x Rp ${item.price.toLocaleString('id-ID')}</small>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-weight: bold;">Rp ${(item.price * item.qty).toLocaleString('id-ID')}</span>
                                <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ff4444; cursor: pointer;">
                                    <i data-lucide="trash-2" size="16"></i>
                                </button>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            count.innerText = totalQty;
            totalDisplay.innerText = `Rp ${total.toLocaleString('id-ID')}`;
            lucide.createIcons();
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartUI();
        }

        function checkoutWhatsApp() {
            if (cart.length === 0) {
                alert("Keranjang Anda Masih Kosong!");
                return;
            }
			
			const buyerName = document.getElementById("buyer-name").value.trim();

			if (buyerName === "") {
				alert("Silakan isi nama dan alamat terlebih dahulu!");
				return;
			}

            const phone = "6285850255105"; // Format internasional tanpa '+'
            let message = "*PESANAN BARU - TANI AGUNG*\n";
			message += ` Nama Pembeli : ${buyerName}\n`;
            message += "--------------------------------\n";
            
            let total = 0;
            cart.forEach((item, i) => {
                const subtotal = item.price * item.qty;
                total += subtotal;
                message += `${i+1}. *${item.name}*\n`;
                message += `   Qty : ${item.qty}\n`;
                message += `   Harga : Rp ${item.price.toLocaleString('id-ID')}\n`;
                message += `   Subtotal : Rp ${subtotal.toLocaleString('id-ID')}\n\n`;
            });

            message += "--------------------------------\n";
            message += `*TOTAL PEMBAYARAN : Rp ${total.toLocaleString('id-ID')}*\n\n`;
            message += "Mohon konfirmasi ketersediaan stok dan total akhir. Terima kasih!";

            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
        }

        // Jalankan saat load
        window.onload = () => {
            renderProducts();
        };