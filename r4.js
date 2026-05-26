let shoes = [
    { id: 1, type: 'shoe', name: "Urban Runner X1", price: "₱2,499", image: "https://picsum.photos/id/201/600/600", desc: "Lightweight daily trainer with excellent breathability and responsive cushioning." },
    { id: 2, type: 'shoe', name: "Trail Master Pro", price: "₱3,299", image: "https://picsum.photos/id/237/600/600", desc: "Built for rugged terrain. Waterproof upper and aggressive outsole grip." },
    { id: 3, type: 'shoe', name: "Gibson Classic", price: "₱2,899", image: "https://picsum.photos/id/180/600/600", desc: "Timeless design with modern comfort technology. Perfect for casual wear." },
    { id: 4, type: 'shoe', name: "Velocity Boost", price: "₱3,799", image: "https://picsum.photos/id/1015/600/600", desc: "Maximum energy return. Carbon plate technology for serious athletes." },

    { id: 5, type: 'shoe', name: "Urban Runner X2", price: "₱2,599", image: "https://picsum.photos/id/202/600/600", desc: "", },
    { id: 6, type: 'shoe', name: "Trail Master Pro X2", price: "₱3,399", image: "https://picsum.photos/id/238/600/600", desc: "", },
    { id: 7, type: 'shoe', name: "Gibson Classic X2", price: "₱2,999", image: "https://picsum.photos/id/181/600/600", desc: "", },
    { id: 8, type: 'shoe', name: "Velocity Boost X2", price: "₱3,899", image: "https://picsum.photos/id/1016/600/600", desc: "", },
    { id: 9, type: 'shoe', name: "Street Glide Runner", price: "₱2,699", image: "https://picsum.photos/id/203/600/600", desc: "", },
    { id: 10, type: 'shoe', name: "Summit Trail Guard", price: "₱3,499", image: "https://picsum.photos/id/239/600/600", desc: "", },
    { id: 11, type: 'shoe', name: "Heritage Walk Classic", price: "₱2,999", image: "https://picsum.photos/id/182/600/600", desc: "", },
    { id: 12, type: 'shoe', name: "Sprint Carbon Lite", price: "₱3,999", image: "https://picsum.photos/id/1017/600/600", desc: "", }
];

let techProducts = [
    { id: 'tech-1', type: 'technology', name: "AirFlex Cushioning", price: "₱999", image: "https://picsum.photos/id/180/600/400", desc: "Adaptive pressure technology that reduces fatigue and improves comfort." },
    { id: 'tech-2', type: 'technology', name: "GripTech Outsole", price: "₱1,199", image: "https://picsum.photos/id/201/600/400", desc: "High-traction compound designed for stable grip on any surface." },
    { id: 'tech-3', type: 'technology', name: "FlexGrid Support", price: "₱1,099", image: "https://picsum.photos/id/183/600/400", desc: "" },
    { id: 'tech-4', type: 'technology', name: "ShockLock Heel", price: "₱1,249", image: "https://picsum.photos/id/184/600/400", desc: "" },
    { id: 'tech-5', type: 'technology', name: "VentCore Mesh", price: "₱899", image: "https://picsum.photos/id/185/600/400", desc: "" },
    { id: 'tech-6', type: 'technology', name: "TurboFoam Midsole", price: "₱1,399", image: "https://picsum.photos/id/186/600/400", desc: "" }
];

let otherProducts = [
    { id: 'other-1', type: 'product', name: "Performance Socks", price: "₱399", image: "https://picsum.photos/id/60/600/400", desc: "Moisture-wicking socks with targeted arch support." },
    { id: 'other-2', type: 'product', name: "Care Kit Pro", price: "₱749", image: "https://picsum.photos/id/133/600/400", desc: "Complete cleaner and protector set for premium shoe care." },
    { id: 'other-3', type: 'product', name: "Travel Shoe Bag", price: "₱549", image: "https://picsum.photos/id/201/600/400", desc: "Waterproof, ventilated shoe bag built for travel convenience." }
];

let shoelanders = [
    { id: 'sl-1', type: 'shoe', name: "Shoelander Classic", price: "₱2,199", image: "https://picsum.photos/id/21/600/600", desc: "The original Shoelander silhouette for everyday use." },
    { id: 'sl-2', type: 'shoe', name: "Shoelander Pulse", price: "₱2,399", image: "https://picsum.photos/id/22/600/600", desc: "Enhanced energy return for the urban commuter." }
];

let marikinaCollection = [
    { id: 'm-1', type: 'shoe', name: "Heritage Derby", price: "₱4,500", image: "https://picsum.photos/id/30/600/600", desc: "Genuine leather Derby shoes, handcrafted in Marikina." },
    { id: 'm-2', type: 'shoe', name: "Premium Oxford", price: "₱5,200", image: "https://picsum.photos/id/31/600/600", desc: "Timeless elegance with superior Marikina craftsmanship." }
];

let ppeProducts = [
    { id: 'ppe-1', type: 'product', name: "Industrial Steel Toe", price: "₱3,800", image: "https://picsum.photos/id/40/600/600", desc: "Heavy-duty protection for hazardous work environments." },
    { id: 'ppe-2', type: 'product', name: "Safety Overboots", price: "₱1,200", image: "https://picsum.photos/id/41/600/600", desc: "Waterproof chemical-resistant overboots." }
];

let moreProducts = [
    { id: 'more-1', type: 'product', name: "Compression Sleeves", price: "₱850", image: "https://picsum.photos/id/50/600/400", desc: "Medical grade compression for recovery." }
];

let customerRegistry = [];
const OWNER_PAYROLL_ACCOUNT = {
    holder: "Christopher Jose Nyuda Rodriguez",
    number: "014763572417",
    swift: "GOTYPHM2XXX"
};

let staffRegistry = [];
let payrollHistory = [];

let currentUser = null;
let selectedItem = null;
let targetedOrderId = null; // Tracks order selected for cancellation
let pendingRegistration = null; // Stores temp registration data
let verificationCode = null; // Email verification code
let isGcashPaid = false; // Tracks if GCash payment is simulated

// Persist admin access (simple localStorage session)
const ADMIN_SESSION_KEY = 'resourceManAdminSession';


function loadCustomerRegistry() {
    const saved = localStorage.getItem('resourceManCustomerRegistry');
    if (saved) {
        try {
            customerRegistry = JSON.parse(saved);
        } catch (error) {
            console.warn('Failed to parse saved customers:', error);
            customerRegistry = [];
        }
    }

    if (!customerRegistry.length) {
        // No demo users by default.
        // Users must be created via the registration flow.
        customerRegistry = [];
        saveCustomerRegistry();
    }
}

function loadPayrollData() {
    const savedStaff = localStorage.getItem('resourceManStaffRegistry');
    const savedHistory = localStorage.getItem('resourceManPayrollHistory');
    if (savedStaff) {
        try { staffRegistry = JSON.parse(savedStaff); } catch (e) { staffRegistry = []; }
    }
    if (savedHistory) {
        try { payrollHistory = JSON.parse(savedHistory); } catch (e) { payrollHistory = []; }
    }
}

function savePayrollData() {
    localStorage.setItem('resourceManStaffRegistry', JSON.stringify(staffRegistry));
    localStorage.setItem('resourceManPayrollHistory', JSON.stringify(payrollHistory));
}

function saveCatalog() {
    localStorage.setItem('resourceManShoes', JSON.stringify(shoes));
    localStorage.setItem('resourceManTech', JSON.stringify(techProducts));
    localStorage.setItem('resourceManOther', JSON.stringify(otherProducts));
    localStorage.setItem('resourceManShoelanders', JSON.stringify(shoelanders));
    localStorage.setItem('resourceManMarikina', JSON.stringify(marikinaCollection));
    localStorage.setItem('resourceManPPE', JSON.stringify(ppeProducts));
    localStorage.setItem('resourceManMoreProducts', JSON.stringify(moreProducts));
}

function loadCatalog() {
    const s = localStorage.getItem('resourceManShoes');
    const t = localStorage.getItem('resourceManTech');
    const o = localStorage.getItem('resourceManOther');
    if (s) shoes = JSON.parse(s);
    if (t) techProducts = JSON.parse(t); 
    if (o) otherProducts = JSON.parse(o); 
    const sl = localStorage.getItem('resourceManShoelanders');
    const m = localStorage.getItem('resourceManMarikina');
    const p = localStorage.getItem('resourceManPPE');
    const mp = localStorage.getItem('resourceManMoreProducts');
    if (sl) shoelanders = JSON.parse(sl);
    if (m) marikinaCollection = JSON.parse(m);
    if (p) ppeProducts = JSON.parse(p);
    if (mp) moreProducts = JSON.parse(mp);
}

function saveCustomerRegistry() {
    localStorage.setItem('resourceManCustomerRegistry', JSON.stringify(customerRegistry));
}

function deleteCustomer(email) {
    const clientIndex = customerRegistry.findIndex(c => c.email.toLowerCase() === email.toLowerCase());
    if (clientIndex === -1) return;

    const confirmed = confirm(`Delete customer ${customerRegistry[clientIndex].name} (${customerRegistry[clientIndex].email})? This action cannot be undone.`);
    if (!confirmed) return;

    customerRegistry.splice(clientIndex, 1);
    saveCustomerRegistry();
    buildAdminTerminalData();
    showToast('Customer profile removed from the database.');
}

function adminDeleteAllDemoData() {
    if (!currentUser || !currentUser.isAdmin) {
        showToast('Admin terminal access required.');
        return;
    }

    if (!confirm("⚠️ WARNING: This will permanently delete ALL customers, staff records, payroll history, and product changes. Proceed?")) return;

    // Clear only transactional and demo data
    localStorage.removeItem('resourceManCustomerRegistry');
    localStorage.removeItem('resourceManStaffRegistry');
    localStorage.removeItem('resourceManPayrollHistory');

    showToast("System database wiped. Reloading...");
    setTimeout(() => location.reload(), 1200);
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('mobile-open');
    if (overlay) overlay.classList.toggle('active');
}

function closeSidebarOnMobile() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
}

function navigateTo(page) {
    closeSidebarOnMobile();
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    const activeNav = document.getElementById(`nav-${page}`);
    if (activeNav) activeNav.classList.add('active');
}

// EmailJS credentials (can be updated at runtime via the live-test flow)
// Load persisted EmailJS credentials (if any) so live tests can run without re-prompting
let EMAIL_JS_USER_ID = localStorage.getItem('emailjs_user') || "etEscMwlpKLKSYMJu";
let EMAIL_JS_SERVICE_ID = localStorage.getItem('emailjs_service') || "service_9kbqvrg";
let EMAIL_JS_TEMPLATE_ID = localStorage.getItem('emailjs_template') || "template_3vuepya";
let EMAIL_SUPPORT_EMAIL = localStorage.getItem('email_support') || "zhiausse@gmail.com";

function isEmailJsEnabled() {
    return EMAIL_JS_USER_ID !== "YOUR_EMAILJS_USER_ID" && EMAIL_JS_SERVICE_ID !== "YOUR_SERVICE_ID" && EMAIL_JS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID";
}

function initEmailJS() {
    if (window.emailjs && isEmailJsEnabled()) {
        try { emailjs.init(EMAIL_JS_USER_ID); } catch (e) { console.warn('emailjs.init failed', e); }
    }
}

function saveEmailJsCredentials(uid, sid, tid, supportEmail) {
    if (uid) { EMAIL_JS_USER_ID = uid; localStorage.setItem('emailjs_user', uid); }
    if (sid) { EMAIL_JS_SERVICE_ID = sid; localStorage.setItem('emailjs_service', sid); }
    if (tid) { EMAIL_JS_TEMPLATE_ID = tid; localStorage.setItem('emailjs_template', tid); }
    if (supportEmail) { EMAIL_SUPPORT_EMAIL = supportEmail; localStorage.setItem('email_support', supportEmail); }
    initEmailJS();
}

function configureEmailJs() {
    const uid = prompt('EmailJS user ID:', EMAIL_JS_USER_ID === 'YOUR_EMAILJS_USER_ID' ? '' : EMAIL_JS_USER_ID);
    if (!uid) return false;
    const sid = prompt('EmailJS service ID:', EMAIL_JS_SERVICE_ID === 'YOUR_SERVICE_ID' ? '' : EMAIL_JS_SERVICE_ID);
    if (!sid) return false;
    const tid = prompt('EmailJS template ID:', EMAIL_JS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ? '' : EMAIL_JS_TEMPLATE_ID);
    if (!tid) return false;
    const support = prompt('Admin/support email (receives notifications):', localStorage.getItem('email_support') || EMAIL_SUPPORT_EMAIL);
    saveEmailJsCredentials(uid.trim(), sid.trim(), tid.trim(), support ? support.trim() : null);
    showToast('EmailJS credentials saved for this browser.');
    return true;
}

function sendVerificationEmail(email) {
    const statusEl = document.getElementById('verify-status');
    if (!statusEl) return Promise.resolve();

    if (!window.emailjs || !isEmailJsEnabled()) {
        statusEl.innerHTML = `
            <p style="margin:0;">Email sending is not configured. Replace the EmailJS IDs in r4.js with your actual service settings to enable real verification emails.</p>
            <p style="margin: 10px 0 0; color: var(--success-color); font-weight: 600;">Dev fallback code: ${verificationCode}</p>
        `;
        return Promise.resolve();
    }

    statusEl.innerHTML = `<p style="margin:0;">Sending verification code to ${email}...</p>`;

const templateParams = {
        // Keys required by your EmailJS template_3vuepya
        passcode: verificationCode,
        time: new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),

        // Also include other common variants (harmless if unused)
        email: email,
        to_email: email,
        verification_code: verificationCode,
        otp: verificationCode,
        one_time_password: verificationCode,
        code: verificationCode,

        from_name: "ResourceMan",
        subject: "ResourceMan Account Verification",
        message: `Your ResourceMan verification code is ${verificationCode}. Enter it on the site to complete registration.`,
        reply_to: EMAIL_SUPPORT_EMAIL
    };

    return emailjs.send(EMAIL_JS_SERVICE_ID, EMAIL_JS_TEMPLATE_ID, templateParams)
        .then(() => {
            statusEl.innerHTML = `<p style="margin:0;">Verification code sent to ${email}. Check your inbox (and spam folder).</p>`;
        })
        .catch(error => {
            console.error('EmailJS error', error);
            statusEl.innerHTML = `<p style="margin:0;color:var(--danger);">Email sending failed. Check EmailJS configuration and your EmailJS template variables.</p>`;
            return Promise.reject(error);
        });
}

function sendAdminNotification(subject, message, replyEmail) {
    if (!window.emailjs || !isEmailJsEnabled()) {
        console.log('Admin email notification disabled:', subject, message);
        return Promise.resolve();
    }

    const templateParams = {
        from_name: "ResourceMan System",
        to_email: EMAIL_SUPPORT_EMAIL,
        subject,
        message,
        reply_to: replyEmail || EMAIL_SUPPORT_EMAIL
    };

    return emailjs.send(EMAIL_JS_SERVICE_ID, EMAIL_JS_TEMPLATE_ID, templateParams)
        .then(() => {
            console.log('Admin notification sent:', subject);
        })
        .catch(error => {
            console.error('Admin email error', error);
        });
}

function renderShoes() {
    const container = document.getElementById('shoes-grid');
    container.innerHTML = '';
    renderItemCards(shoes, container);
}

function renderTechProducts() {
    const container = document.getElementById('tech-grid');
    container.innerHTML = '';
    renderItemCards(techProducts, container);
}

function renderOtherProducts() {
    const container = document.getElementById('other-grid');
    container.innerHTML = '';
    renderItemCards(otherProducts, container);
}

function renderShoelanders() {
    const container = document.getElementById('shoelanders-grid');
    if (!container) return;
    container.innerHTML = '';
    renderItemCards(shoelanders, container);
}

function renderMarikina() {
    const container = document.getElementById('marikina-grid');
    if (!container) return;
    container.innerHTML = '';
    renderItemCards(marikinaCollection, container);
}

function renderPPE() {
    const container = document.getElementById('ppe-grid');
    if (!container) return;
    container.innerHTML = '';
    renderItemCards(ppeProducts, container);
}

function renderMoreProducts() {
    const container = document.getElementById('more-products-grid');
    if (!container) return;
    container.innerHTML = '';
    renderItemCards(moreProducts, container);
}

function renderItemCards(items, container) {
    const isPriceUnlocked = (currentUser && !currentUser.isAdmin && !currentUser.isBlocked);

    items.forEach(item => {
        const displayedPrice = isPriceUnlocked ? item.price : "₱?,???";

        const div = document.createElement('div');
        div.className = "shoe-card";
        div.innerHTML = `
            <img src="${item.image}">
            <div class="shoe-card-body">
                <h3>${item.name}</h3>
                <p style="font-size: 14px; color: var(--text-muted); margin-top: 8px;">${item.desc}</p>
                <div class="shoe-card-meta" style="margin-top: 16px;">
                    <p class="price-text ${isPriceUnlocked ? 'price-unlocked-text' : 'price-locked-text'}">${displayedPrice}</p>
                    ${!isPriceUnlocked ? '<span class="lock-badge"><i class="fas fa-lock" style="font-size: 9px; margin-right: 4px;"></i>Sign in</span>' : ''}
                </div>
            </div>
        `;
        div.onclick = () => viewItem(item);
        container.appendChild(div);
    });
}

function viewItem(item) {
    selectedItem = item;

    document.getElementById('modal-shoe-image').src = item.image;
    document.getElementById('modal-shoe-name').textContent = item.name;
    document.getElementById('modal-shoe-desc').textContent = item.desc;

    const priceEl = document.getElementById('modal-shoe-price');
    const badgeEl = document.getElementById('price-status-badge');
    const buyBtn = document.getElementById('modal-buy-btn');

    if (currentUser && !currentUser.isAdmin && !currentUser.isBlocked) {
        priceEl.textContent = item.price;
        priceEl.className = "modal-price-val price-unlocked-text";

        badgeEl.textContent = "Member Price Unlocked";
        badgeEl.className = "badge-status badge-unlocked";

        // Show separate actions
        buyBtn.textContent = `Buy - ${item.price}`;
        buyBtn.disabled = false;
        buyBtn.className = "btn-action";

        // For the modal: keep the existing single button as "Buy";
        // cart is still done via addToCart() from the "Add to Cart" button in the purchase section.
        // (UI change in r4.html may add a separate cart button.)
    } else {
        priceEl.textContent = "₱?,???";
        priceEl.className = "modal-price-val price-locked-text";

        badgeEl.textContent = "Price Locked";
        badgeEl.className = "badge-status badge-locked";

        buyBtn.textContent = "Login to Unlock Price";
        buyBtn.className = "btn-action btn-disabled";
        buyBtn.disabled = true;
    }

    document.getElementById('modal-quantity').value = 1;
    document.getElementById('shoe-modal').classList.remove('hidden');
}

function closeShoeModal() {
    document.getElementById('shoe-modal').classList.add('hidden');
    selectedItem = null;
}

function handleProfileWidgetClick() {
    if (currentUser) {
        if (currentUser.isAdmin) {
            navigateTo(11);
        } else {
            navigateTo(10);
        }
    } else {
        navigateTo(10);
    }
}

function login() {
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-pass').value;

    if (!email || !pass) {
        showToast("Please enter both email and password");
        return;
    }

    // Admin access is controlled only via the secret key sequence.
    // (Removed admin email/password login to prevent bypass.)

    const clientMatch = customerRegistry.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (clientMatch) {
        if (clientMatch.isBlocked) {
            showToast("⛔ Access Denied: Account restricted by admin.");
            return;
        }

        if (clientMatch.password === pass) {
            currentUser = clientMatch;
            localStorage.setItem('resourceManActiveUser', JSON.stringify(currentUser));
            updateUserUI();
            renderShoes();
            document.getElementById('login-email').value = '';
            document.getElementById('login-pass').value = '';
            showToast("Logged in. Real prices unlocked!");
            navigateTo(10);
        } else {
            showToast("Password incorrect. Access Denied.");
        }
    } else {
        showToast("Account missing. Please register first.");
    }
}

function register() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-pass').value;
    const phone = document.getElementById('reg-phone').value.trim();
    const address = document.getElementById('reg-address').value.trim();

    if (!name || !email || !pass) {
        showToast("Please fill out all required fields.");
        return;
    }

    const accountExists = customerRegistry.some(c => c.email.toLowerCase() === email.toLowerCase()) || email === "admin@resourceman.com";
    if (accountExists) {
        showToast("Error: Account email already taken!");
        return;
    }

    verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    pendingRegistration = {
        name: name,
        email: email,
        password: pass,
        phone: phone,
        address: address,
        isBlocked: false,
        cartHistory: [],
        purchaseHistory: []
    };

    document.getElementById('reg-name').value = '';
    document.getElementById('reg-email').value = '';
    document.getElementById('reg-pass').value = '';
    document.getElementById('reg-phone').value = '';
    document.getElementById('reg-address').value = '';

    document.getElementById('verify-email-display').textContent = email;
    document.getElementById('verify-code-input').value = '';
    document.getElementById('verify-status').innerHTML = `<p style="margin:0;">Preparing to send verification email...</p>`;

    sendVerificationEmail(email).catch(() => {
        // continue to verification page even if EmailJS is not set up yet
    });

    showToast("Verification code process started for " + email);
    navigateTo(22);
}

function verifyEmail() {
    const enteredCode = document.getElementById('verify-code-input').value.trim();

    if (!enteredCode) {
        showToast("Please enter the verification code.");
        return;
    }

    if (enteredCode !== verificationCode) {
        showToast("Incorrect code. Please try again.");
        return;
    }

    customerRegistry.push(pendingRegistration);
    saveCustomerRegistry();
    currentUser = pendingRegistration;
    localStorage.setItem('resourceManActiveUser', JSON.stringify(currentUser));

    document.getElementById('verify-code-input').value = '';
    pendingRegistration = null;
    verificationCode = null;

    updateUserUI();
    renderShoes();
    showToast("Email verified! Account created successfully.");
    sendAdminNotification(
        "New ResourceMan account created",
        `A new account was verified for ${currentUser.name} <${currentUser.email}>.\nPhone: ${currentUser.phone || 'not provided'}\nAddress: ${currentUser.address || 'not provided'}`,
        currentUser.email
    );
    navigateTo(10);
}

function cancelVerification() {
    pendingRegistration = null;
    verificationCode = null;
    document.getElementById('verify-code-input').value = '';
    navigateTo(21);
}

function logout() {
    // Reset client state so the UI returns to guest/quest mode.
    currentUser = null;
    selectedItem = null;
    targetedOrderId = null;
    localStorage.removeItem('resourceManActiveUser');

    // Hide profile hub and show guest message.
    updateUserUI();
    const customerView = document.getElementById('customer-view');
    const customerEmptyView = document.getElementById('customer-empty-view');
    if (customerView) customerView.classList.add('hidden');
    if (customerEmptyView) customerEmptyView.classList.remove('hidden');


    // Re-render catalog with locked prices.
    renderShoes();
    renderTechProducts();
    renderOtherProducts();

    showToast("Session disconnected.");
    navigateTo(1);
}

function toggleBlockCustomer(email) {
    const client = customerRegistry.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (!client) return;

    // If admin toggles, admin access is enforced by UI state (currentUser.isAdmin).
    // Keep this function safe anyway.
    if (!currentUser || !currentUser.isAdmin) {
        showToast('Admin only.');
        return;
    }

    client.isBlocked = !client.isBlocked;
    saveCustomerRegistry();

    // If the blocked user is currently logged in, kick them out.
    if (client.isBlocked && currentUser && currentUser.email === client.email) {
        currentUser = null;
        updateUserUI();
        renderShoes();
    }

    showToast(`${client.name} has been ${client.isBlocked ? '⚠️ RESTRICTED' : '✅ REINSTATED'}`);
    buildAdminTerminalData();
}

function updateUserUI() {
    const customerView = document.getElementById('customer-view');

    const customerEmptyView = document.getElementById('customer-empty-view');

    const adminView = document.getElementById('admin-view');
    const adminProductView = document.getElementById('admin-product-view');
    const adminPayrollView = document.getElementById('admin-payroll-view');

    const navPortalText = document.getElementById('nav-portal-text'); // may be null if nav removed
    const adminNavButton = document.getElementById('nav-11');
    const adminProductNavButton = document.getElementById('nav-12');
    const adminPayrollNavButton = document.getElementById('nav-13');

    if (customerView) customerView.classList.add('hidden');
    if (customerEmptyView) customerEmptyView.classList.add('hidden');
    if (adminView) adminView.classList.add('hidden');
    if (adminProductView) adminProductView.classList.add('hidden');
    if (adminPayrollView) adminPayrollView.classList.add('hidden');
    if (adminNavButton) adminNavButton.classList.add('hidden-admin-nav');
    if (adminProductNavButton) adminProductNavButton.classList.add('hidden-admin-nav');
    if (adminPayrollNavButton) adminPayrollNavButton.classList.add('hidden-admin-nav');

    if (currentUser) {
        if (currentUser.isAdmin) {
            if (adminView) adminView.classList.remove('hidden');
            if (adminNavButton) adminNavButton.classList.remove('hidden-admin-nav');

            if (adminProductView) adminProductView.classList.remove('hidden');
            if (adminProductNavButton) adminProductNavButton.classList.remove('hidden-admin-nav');

            if (adminPayrollView) adminPayrollView.classList.remove('hidden');
            if (adminPayrollNavButton) adminPayrollNavButton.classList.remove('hidden-admin-nav');

            if (navPortalText) navPortalText.textContent = "Admin Control";
            buildAdminTerminalData();
            buildAdminPayrollUI();
            buildAdminOrdersUI();
        } else {
            if (customerView) customerView.classList.remove('hidden');
            if (navPortalText) navPortalText.textContent = "Profile";

            document.getElementById('customer-profile-title').textContent = `Hi, ${currentUser.name}!`;
            document.getElementById('customer-profile-subtitle').textContent = currentUser.email;
            document.getElementById('profile-name-text').textContent = currentUser.name;
            document.getElementById('profile-email-text').textContent = currentUser.email;
            document.getElementById('profile-phone-text').textContent = currentUser.phone || 'Not set';
            document.getElementById('profile-address-text').textContent = currentUser.address || 'Not set';
            document.getElementById('profile-status-text').textContent = currentUser.isBlocked ? 'Blocked' : 'Active';

            const purchaseCount = currentUser.purchaseHistory ? currentUser.purchaseHistory.length : 0;
            document.getElementById('profile-orders-count').textContent = purchaseCount || 0;

            document.getElementById('contact-phone').value = currentUser.phone || '';
            document.getElementById('contact-address').value = currentUser.address || '';

            if (typeof buildCustomerCartTable === 'function') buildCustomerCartTable();
            if (typeof buildCustomerPurchaseTable === 'function') buildCustomerPurchaseTable();

            // Hard guard: non-admin should not be able to stay on admin pages.
            const page12 = document.getElementById('page-12');
            if (page12 && page12.classList.contains('active')) navigateTo(10);
        }
    } else {
        if (navPortalText) navPortalText.textContent = "Profile";
        if (customerEmptyView) customerEmptyView.classList.remove('hidden');

        const page11 = document.getElementById('page-11');
        const page12 = document.getElementById('page-12');
        if (page11 && page11.classList.contains('active')) navigateTo(1);
        if (page12 && page12.classList.contains('active')) navigateTo(1);
    }

    renderShoes();
    renderTechProducts();
    renderOtherProducts();
    renderShoelanders();
    renderMarikina();
    renderPPE();
    renderMoreProducts();
}

function parsePriceToNumber(input) {
    const raw = String(input || '').trim();
    if (!raw) return null;

    // Extract numbers: supports "₱2,499", "2499", "2.499" (best-effort)
    const numeric = raw.replace(/₱/g, '').replace(/,/g, '').match(/-?\d+(\.\d+)?/);
    if (!numeric) return null;
    const n = Number(numeric[0]);
    if (!Number.isFinite(n) || n < 0) return null;
    return n;
}

function formatPriceNumber(n) {
    const value = Number(n);
    if (!Number.isFinite(value)) return '';
    // Keep integer styling like existing catalog (₱2,499)
    const intVal = Math.round(value);
    return `₱${intVal.toLocaleString('en-US')}`;
}

function normalizeLookupType(productType) {
    const t = String(productType || '').toLowerCase();
    if (t === 'shoe' || t === 'shoes') return 'shoe';
    if (t === 'technology' || t === 'technologies') return 'technology';
    if (t === 'product' || t === 'other' || t === 'other-products') return 'product'; // 'other' category
    if (t === 'shoelander' || t === 'shoelanders') return 'shoelander';
    if (t === 'marikina' || t === 'marikina premium collection') return 'marikina';
    if (t === 'ppe' || t === 'ppes' || t === 'safety equipment') return 'ppe';
    if (t === 'more products' || t === 'more-products') return 'more-products';
    return null;
}

function getCatalogArray(productType) {
    const t = normalizeLookupType(productType); // Use the normalized type
    if (!t) return null;
    if (t === 'shoe') return shoes;
    if (t === 'technology') return techProducts;
    return otherProducts;
    if (t === 'shoelander') return shoelanders;
    if (t === 'marikina') return marikinaCollection;
    if (t === 'ppe') return ppeProducts;
    if (t === 'more-products') return moreProducts;
}

function findProductByIdOrName(productType, lookupMode, lookupValue) {
    const arr = getCatalogArray(productType);
    if (!arr) return null;

    const value = String(lookupValue || '').trim();
    if (!value) return null;

    if (lookupMode === 'id') {
        // shoe ids are numbers; others are strings
        if (productType === 'shoe') {
            const asNum = parseInt(value, 10);
            if (!Number.isFinite(asNum)) return null;
            return arr.find(p => String(p.id) === String(asNum)) || null;
        }
        return arr.find(p => String(p.id).toLowerCase() === value.toLowerCase()) || null;
    }

    // name lookup: flexible exact match ignoring case
    // (If user enters partial name, we use includes and require uniqueness)
    const q = value.toLowerCase();
    const matches = arr.filter(p => (p.name || '').toLowerCase() === q || (p.name || '').toLowerCase().includes(q));
    if (matches.length === 1) return matches[0];
    if (matches.length > 1) return { __ambiguous: true, matches };
    return null;
}

function updateProductPriceForType(productType, lookupMode, lookupValue, newPriceInput, newDescInput, newImageInput) {
    if (!currentUser || !currentUser.isAdmin) {
        showToast('Admin only.');
        return;
    }

    const arr = getCatalogArray(productType);
    if (!arr) {
        showToast('Invalid product type.');
        return;
    }

    const product = findProductByIdOrName(productType, lookupMode, lookupValue);
    if (!product) {
        showToast('No product found for that lookup.');
        return;
    }
    if (product.__ambiguous) {
        showToast(`Lookup is ambiguous. Matches: ${product.matches.map(m => m.name).slice(0, 4).join(', ')}${product.matches.length > 4 ? '...' : ''}`);
        return;
    }

    const newPrice = parsePriceToNumber(newPriceInput);
    if (newPrice === null) {
        showToast('Invalid new price.');
        return;
    }

    product.price = formatPriceNumber(newPrice);

    const newDesc = String(newDescInput || '').trim();
    if (newDesc) product.desc = newDesc;

    const newImage = String(newImageInput || '').trim();
    if (newImage) product.image = newImage;

    saveCatalog();
    showToast(`Updated: ${product.name} price`);
    renderShoes();
    renderShoelanders();
    renderMarikina();
    renderPPE();
    renderMoreProducts();
    renderTechProducts();
    renderOtherProducts();
}

function adminUpdateProductPrice() {
    const productType = document.getElementById('admin-price-type')?.value;
    const lookupMode = document.getElementById('admin-price-lookup-mode')?.value;
    const lookupValue = document.getElementById('admin-price-lookup-value')?.value;

    const newPrice = document.getElementById('admin-price-new')?.value;
    const newDesc = document.getElementById('admin-price-desc-new')?.value;
    const newImage = document.getElementById('admin-price-image-new')?.value;

    updateProductPriceForType(productType, lookupMode, lookupValue, newPrice, newDesc, newImage);
}

function adminAddProduct() {
    if (!currentUser || !currentUser.isAdmin) {
        showToast('Admin only.');
        return;
    }

    const productType = document.getElementById('admin-add-type')?.value;
    const arr = getCatalogArray(productType);
    if (!arr) {
        showToast('Invalid product type.');
        return;
    }

    const newName = String(document.getElementById('admin-add-name')?.value || '').trim();
    if (!newName) {
        showToast('New Name is required.');
        return;
    }

    const newIdRaw = String(document.getElementById('admin-add-id')?.value || '').trim();
    const newPrice = parsePriceToNumber(document.getElementById('admin-add-price')?.value);
    if (newPrice === null) {
        showToast('Invalid new price.');
        return;
    }

    const newImage = String(document.getElementById('admin-add-image')?.value || '').trim() || 'https://picsum.photos/600/400';
    const newDesc = String(document.getElementById('admin-add-desc')?.value || '').trim();

    const typeForObject = normalizeLookupType(productType);
    let newId = null;

    if (typeForObject === 'shoe') {
        // numeric ids
        if (newIdRaw) {
            const idNum = parseInt(newIdRaw, 10);
            if (!Number.isFinite(idNum)) {
                showToast('Shoes ID must be a number.');
                return;
            }
            newId = idNum;
        } else {
            const maxId = arr.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0);
            newId = maxId + 1;
        }

        if (arr.some(p => String(p.id) === String(newId))) {
            showToast('Duplicate ID for shoes.');
            return;
        }
    } else {
        // technology/other ids are strings
        if (newIdRaw) {
            newId = newIdRaw;
        } else {
            // auto-generate
            const prefix = typeForObject === 'technology' ? 'tech-' : 'other-';
            const nums = arr
                .map(p => String(p.id).toLowerCase().startsWith(prefix) ? Number(String(p.id).slice(prefix.length)) : NaN)
                .filter(n => Number.isFinite(n));
            const next = (nums.length ? Math.max(...nums) : 0) + 1;
            newId = `${prefix}${next}`;
        }

        if (arr.some(p => String(p.id).toLowerCase() === String(newId).toLowerCase())) {
            showToast('Duplicate ID for this product type.');
            return;
        }
    }

    const obj = {
        id: newId,
        type: typeForObject,
        name: newName,
        price: formatPriceNumber(newPrice),
        image: newImage,
        desc: newDesc || ''
    };

    arr.unshift(obj);

    saveCatalog();
    showToast(`Added product: ${obj.name}`);
    renderShoes();
    renderShoelanders();
    renderMarikina();
    renderPPE();
    renderMoreProducts();
    renderTechProducts();
    renderOtherProducts();

    // Clear form fields (best effort)
    const idEl = document.getElementById('admin-add-id');
    if (idEl) idEl.value = '';
    const nameEl = document.getElementById('admin-add-name');
    if (nameEl) nameEl.value = '';
    const priceEl = document.getElementById('admin-add-price');
    if (priceEl) priceEl.value = '';
    const imgEl = document.getElementById('admin-add-image');
    if (imgEl) imgEl.value = '';
    const descEl = document.getElementById('admin-add-desc');
    if (descEl) descEl.value = '';
}
function saveProfile() {
    if (!currentUser || currentUser.isAdmin) return;
    currentUser.phone = document.getElementById('contact-phone').value.trim();
    currentUser.address = document.getElementById('contact-address').value.trim();
    showToast("Shipping metrics updated successfully.");
}

function buildCustomerPurchaseTable() {
    const container = document.getElementById('customer-purchase-rows');
    if (!container) return;
    container.innerHTML = '';

    const purchase = currentUser?.purchaseHistory || [];

    if (purchase.length === 0) {
        container.innerHTML = `<tr><td colspan="5" style="padding: 24px; text-align: center; color: var(--text-muted); font-style: italic;">No purchases found.</td></tr>`;
        return;
    }

    purchase.forEach(order => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="mono-id">${order.id}</td>
            <td style="font-weight: 500; color: #ffffff;">${order.item}</td>
            <td>${order.cost}</td>
            <td>
                <span class="pill-status ${order.status === 'Delivered' ? 'pill-delivered' : 'pill-transit'}">
                    ${order.status}
                </span>
            </td>
            <td style="text-align: right;">
                <button onclick="askCancelOrder('${order.id}')" class="btn-cancel">Cancel Order</button>
            </td>
        `;
        container.appendChild(tr);
    });
}

function buildCustomerCartTable() {
    const container = document.getElementById('customer-cart-rows');
    if (!container) return;
    container.innerHTML = '';

    const cart = currentUser?.cartHistory || [];
    const checkoutBtn = document.getElementById('checkout-all-btn');

    if (cart.length === 0) {
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        container.innerHTML = `<tr><td colspan="5" style="padding: 24px; text-align: center; color: var(--text-muted); font-style: italic;">No items in cart yet.</td></tr>`;
        return;
    }

    if (checkoutBtn) checkoutBtn.style.display = 'block';
    cart.forEach(order => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="mono-id">${order.id}</td>
            <td style="font-weight: 500; color: #ffffff;">${order.item}</td>
            <td>${order.cost}<br><small style="color:var(--text-muted)">via ${order.payment || 'N/A'}</small></td>
            <td>
                <span class="pill-status ${order.status === 'Delivered' ? 'pill-delivered' : 'pill-transit'}">
                    ${order.status}
                </span>
            </td>
            <td style="text-align: right;">
                <button onclick="askCancelOrder('${order.id}')" class="btn-cancel">Cancel Order</button>
            </td>
        `;
        container.appendChild(tr);
    });
}

function checkoutCart() {
    if (!currentUser || !currentUser.cartHistory || currentUser.cartHistory.length === 0) return;
    document.getElementById('payment-modal').classList.remove('hidden');
    toggleGcashPaymentDetails(); // Ensure correct payment details are shown on modal open
}

function closePaymentModal() {
    document.getElementById('payment-modal').classList.add('hidden');
    isGcashPaid = false;
    const statusEl = document.getElementById('gcash-payment-status');
    if (statusEl) statusEl.textContent = '';
}

function confirmCheckoutWithPayment() {
    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;

    if (selectedPaymentMethod === 'GCash' && !isGcashPaid) {
        showToast("Please authorize via PayLingo first.");
        return;
    }

    const selectedPayment = document.querySelector('input[name="payment-method"]:checked')?.value || "COD";
    
    // Move items from cart to purchase history
    const itemsToMove = currentUser.cartHistory.map(item => ({
        ...item,
        status: 'Processing',
        payment: selectedPayment,
        id: 'ORDER-' + Math.floor(1000 + Math.random() * 9000)
    }));

    currentUser.purchaseHistory = [...(currentUser.purchaseHistory || []), ...itemsToMove];
    currentUser.cartHistory = [];

    saveCustomerRegistry();
    
    const totalCostValue = itemsToMove.reduce((sum, i) => sum + (parsePriceToNumber(i.cost) || 0), 0);
    let successMsg = `Checkout successful! Payment method: ${selectedPayment}. Items moved to Purchase History.`;
    const downpaymentStr = selectedPayment === 'COD' ? `\nDownpayment Required (50%): ${formatPriceNumber(totalCostValue * 0.5)}` : '';
    
    if (selectedPayment === 'COD') {
        successMsg = `Checkout successful! 50% Downpayment of ${formatPriceNumber(totalCostValue * 0.5)} is required for COD processing.`;
    }
    showToast(successMsg);
    
    buildCustomerCartTable();
    buildCustomerPurchaseTable();
    
    const itemList = itemsToMove.map(i => i.item).join(', ');

    sendAdminNotification(
        "ResourceMan Order Finalized", 
        `Customer ${currentUser.name} (<${currentUser.email}>) has completed checkout.\nItems: ${itemList}\nTotal Amount: ${formatPriceNumber(totalCostValue)}${downpaymentStr}\nPayment Method: ${selectedPayment}\nDestination: ${OWNER_PAYROLL_ACCOUNT.holder} (${OWNER_PAYROLL_ACCOUNT.number})`, 
        currentUser.email
    );
    closePaymentModal();
}

async function confirmGcashPayment() {
    const statusEl = document.getElementById('gcash-payment-status');
    const authButton = document.querySelector('#gcash-payment-details .btn-sync');

    if (!currentUser || !currentUser.cartHistory.length) return;

    if (statusEl) statusEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening Secure PayLingo Gateway...';
    if (authButton) authButton.disabled = true;

    // Prepare line items for a real payment gateway
    const items = currentUser.cartHistory.map(item => {
        const unitAmount = parsePriceToNumber(item.cost) || 0;
        return {
            price_data: {
                currency: 'php',
                product_data: { name: item.item },
                unit_amount: Math.round(unitAmount * 100), // Stripe expects centavos
            },
            quantity: 1,
        };
    });

    try {
        // Replace the URL below with your actual hosted backend URL (e.g., from Render.com)
        const BACKEND_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? '' : 'https://your-resource-man-backend.onrender.com';

        const response = await fetch(`${BACKEND_URL}/api/create-checkout-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items, customerEmail: currentUser.email })
        });

        const data = await response.json();
        if (data.url) {
            // Final Step: Redirect user to the actual payment page
            window.location.href = data.url;
        } else {
            throw new Error(data.error || 'Gateway connection failed');
        }
    } catch (error) {
        console.error('Actual Payment Error:', error);
        if (statusEl) {
            statusEl.innerHTML = `✗ Gateway Error: ${error.message}`;
            statusEl.style.color = "var(--danger)";
        }
        if (authButton) authButton.disabled = false;
        showToast("Actual payment service unavailable.");
    }
}

function toggleGcashPaymentDetails() {
    const selectedPayment = document.querySelector('input[name="payment-method"]:checked')?.value;
    const gcashDetails = document.getElementById('gcash-payment-details');

    if (gcashDetails) {
        gcashDetails.style.display = selectedPayment === 'GCash' ? 'block' : 'none';
        isGcashPaid = false;
        const statusEl = document.getElementById('gcash-payment-status');
        if (statusEl) statusEl.textContent = '';
    }
}

function askCancelOrder(orderId) {
    targetedOrderId = orderId;
    document.getElementById('cancel-reason-modal').classList.remove('hidden');
}

function closeCancelModal() {
    document.getElementById('cancel-reason-modal').classList.add('hidden');
    targetedOrderId = null;
}

function confirmCancelOrder() {
    if (!targetedOrderId || !currentUser) return;

    const selectedReasonEl = document.querySelector('input[name="cancel-reason"]:checked');
    const cancellationReason = selectedReasonEl ? selectedReasonEl.value : "No reason provided";

    const cart = currentUser.cartHistory || [];
    const purchase = currentUser.purchaseHistory || [];

    if (cart.some(o => o.id === targetedOrderId)) {
        currentUser.cartHistory = cart.filter(order => order.id !== targetedOrderId);
    }
    if (purchase.some(o => o.id === targetedOrderId)) {
        currentUser.purchaseHistory = purchase.filter(order => order.id !== targetedOrderId);
    }

    showToast(`Order ${targetedOrderId} cancelled. Reason: "${cancellationReason}"`);
    sendAdminNotification(

        "ResourceMan order cancellation",
        `Customer ${currentUser.name} <${currentUser.email}> cancelled order ${targetedOrderId}.\nReason: ${cancellationReason}`,
        currentUser.email
    );

    saveCustomerRegistry();
    closeCancelModal();
    if (typeof buildCustomerCartTable === 'function') buildCustomerCartTable();
    if (typeof buildCustomerPurchaseTable === 'function') buildCustomerPurchaseTable();
}


function buildAdminTerminalData() {
    document.getElementById('stat-profiles').textContent = customerRegistry.length;

    let totalOrdersCount = 0;
    let blockedCount = 0;

    customerRegistry.forEach(c => {
        totalOrdersCount += (c.purchaseHistory || []).length;

        if (c.isBlocked) blockedCount++;
    });

    document.getElementById('stat-orders').textContent = totalOrdersCount;
    document.getElementById('stat-blocked').textContent = blockedCount;

    const container = document.getElementById('admin-customer-rows');
    container.innerHTML = '';

    customerRegistry.forEach(client => {
        const tr = document.createElement('tr');
        if (client.isBlocked) tr.className = "row-blocked";

        let ordersSummary = (client.purchaseHistory || [])

            .map(h => `<div style="font-size: 12px; color: #a1a1aa;">${h.id}: ${h.item} (${h.payment || 'N/A'})</div>`)
            .join('') || '<span style="font-size: 12px; color: #52525b; font-style: italic;">No orders</span>';

        let contactBlock = `<div style="font-size: 12px; color: #e4e4e7;">${client.phone || 'No Phone'}</div><div style="font-size: 11px; color: var(--text-muted); max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${client.address || 'No Address'}</div>`;

        tr.innerHTML = `
            <td>
                <div class="inline-block-tag" style="font-weight: 600; color: #ffffff;">
                    ${client.name}
                    ${client.isBlocked ? '<span class="badge-blocked-alert">Blocked</span>' : ''}
                </div>
            </td>
            <td style="font-family: monospace; font-size: 12px; color: #a1a1aa;">${client.email}</td>
            <td style="font-family: monospace; font-size: 12px; color: #eab308; font-weight: 700;">${client.password}</td>
            <td>${contactBlock}</td>
            <td>${ordersSummary}</td>
            <td style="text-align: center;">
                <button onclick="deleteCustomer('${client.email}')" class="btn-delete">Delete Customer</button>
            </td>
        `;

        container.appendChild(tr);
    });
}

function buildAdminOrdersUI() {
    const container = document.getElementById('admin-orders-rows');
    if (!container) return;
    container.innerHTML = '';

    let allOrders = [];
    customerRegistry.forEach(client => {
        const history = client.purchaseHistory || [];
        history.forEach(order => {
            allOrders.push({
                ...order,
                clientName: client.name,
                clientEmail: client.email
            });
        });
    });

    if (allOrders.length === 0) {
        container.innerHTML = `<tr><td colspan="6" style="padding: 24px; text-align: center; color: var(--text-muted); font-style: italic;">No purchase history found in system.</td></tr>`;
        return;
    }

    // Display newest orders at the top
    allOrders.reverse().forEach(order => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="mono-id">${order.id}</td>
            <td>
                <div style="font-weight: 600; color: #ffffff;">${order.clientName}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${order.clientEmail}</div>
            </td>
            <td style="font-weight: 500; color: #ffffff;">${order.item}</td>
            <td class="price-unlocked-text">${order.cost}</td>
            <td><span class="pill-status pill-delivered">${order.payment || 'N/A'}</span></td>
            <td><span class="pill-status ${order.status === 'Delivered' ? 'pill-delivered' : 'pill-transit'}">${order.status}</span></td>
        `;
        container.appendChild(tr);
    });
}

function buildAdminPayrollUI() {
    const staffContainer = document.getElementById('admin-staff-rows');
    const historyContainer = document.getElementById('admin-payroll-history-rows');
    const ownerAccountDisplay = document.getElementById('admin-owner-account-info');

    // Calculate Total Revenue from all purchases in the registry
    let totalRevenue = 0;
    customerRegistry.forEach(client => {
        const history = client.purchaseHistory || [];
        history.forEach(order => {
            totalRevenue += (parsePriceToNumber(order.cost) || 0);
        });
    });

    if (ownerAccountDisplay) {
        ownerAccountDisplay.innerHTML = `
            <p><strong>Owner:</strong> ${OWNER_PAYROLL_ACCOUNT.holder}</p>
            <p><strong>Account:</strong> ${OWNER_PAYROLL_ACCOUNT.number} | <strong>SWIFT:</strong> ${OWNER_PAYROLL_ACCOUNT.swift}</p>
            <div style="background: var(--surface-secondary); padding: 16px; border-radius: 8px; border-left: 4px solid var(--primary);">
                <h4 style="color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 8px;">Total Owner Revenue (Sales)</h4>
                <div style="font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 12px;">${formatPriceNumber(totalRevenue)}</div>
                <p style="font-size: 13px; margin-bottom: 4px;">Payable to: <strong>${OWNER_PAYROLL_ACCOUNT.holder}</strong></p>
                <p style="font-size: 11px; color: var(--text-muted);">Acc: ${OWNER_PAYROLL_ACCOUNT.number} | SWIFT: ${OWNER_PAYROLL_ACCOUNT.swift}</p>
            </div>
        `;
    }

    if (!staffContainer || !historyContainer) return;

    staffContainer.innerHTML = '';
    staffRegistry.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight:600; color:#fff;">${s.name}</td>
            <td style="color:var(--text-muted);">${s.position}</td>
            <td class="price-unlocked-text">${formatPriceNumber(s.salary)}</td>
            <td style="text-align:right;">
                <button onclick="adminDeleteStaff('${s.id}')" class="btn-delete">Remove</button>
            </td>
        `;
        staffContainer.appendChild(tr);
    });

    historyContainer.innerHTML = '';
    payrollHistory.forEach(h => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="mono-id">${h.id}</td>
            <td>${h.date}</td>
            <td>${h.count} Staff</td>
            <td style="font-weight:700; color:#fff;">${h.total}</td>
            <td><span class="pill-status pill-delivered">${h.status}</span></td>
        `;
        historyContainer.appendChild(tr);
    });
}

function adminAddStaff() {
    const name = document.getElementById('staff-name')?.value.trim();
    const pos = document.getElementById('staff-pos')?.value.trim();
    const salary = parsePriceToNumber(document.getElementById('staff-salary')?.value);

    if (!name || !pos || salary === null) {
        showToast("Please fill all staff fields correctly.");
        return;
    }

    const newStaff = {
        id: 'EMP-' + Math.floor(1000 + Math.random() * 9000),
        name, position: pos, salary
    };

    staffRegistry.push(newStaff);
    savePayrollData();
    showToast(`Staff ${name} added.`);
    buildAdminPayrollUI();
}

function adminDeleteStaff(id) {
    staffRegistry = staffRegistry.filter(s => s.id !== id);
    savePayrollData();
    buildAdminPayrollUI();
}

function adminProcessPayroll() {
    if (staffRegistry.length === 0) {
        showToast("No staff members to pay.");
        return;
    }

    const totalAmount = staffRegistry.reduce((sum, s) => sum + s.salary, 0);
    const payrollEntry = {
        id: 'PAY-' + Date.now().toString().slice(-6),
        date: new Date().toLocaleDateString(),
        count: staffRegistry.length,
        total: formatPriceNumber(totalAmount),
        status: 'Disbursed'
    };

    payrollHistory.unshift(payrollEntry);
    savePayrollData();
    showToast(`Processed payroll for ${staffRegistry.length} employees.`);
    buildAdminPayrollUI();
}

function addToCart() {
    if (!selectedItem) return;

    const item = selectedItem;
    const quantityInput = parseInt(document.getElementById('modal-quantity').value, 10);
    const quantity = Number.isInteger(quantityInput) && quantityInput > 0 ? quantityInput : 1;

    if (!currentUser) {
        showToast("Please sign in to make a purchase.");
        closeShoeModal();
        navigateTo(10);
        return;
    }

    if (currentUser.isAdmin) {
        showToast("Admin profiles cannot issue checkout transactions.");
        closeShoeModal();
        return;
    }

    const rawPrice = item.price.replace(/[^0-9\.]/g, '').replace(/,/g, '');
    const baseValue = parseFloat(rawPrice) || 0;
    const totalValue = baseValue * quantity;
    const formattedTotal = `₱${totalValue.toLocaleString('en-US')}`;
    const displayName = quantity > 1 ? `${item.name} x${quantity}` : item.name;

    const txId = "TX-" + Math.floor(1000 + Math.random() * 9000);

    (currentUser.cartHistory || (currentUser.cartHistory = [])).unshift({

        id: txId,
        item: displayName,
        cost: formattedTotal,
        status: "In Transit"
    });

    saveCustomerRegistry();
    showToast(`Success! ${displayName} added to cart.`);
    if (typeof buildCustomerCartTable === 'function') buildCustomerCartTable();

    sendAdminNotification(
        "New ResourceMan purchase recorded",
        `Customer ${currentUser.name} <${currentUser.email}> purchased ${displayName} for ${formattedTotal}.\nOrder ID: ${txId}`,
        currentUser.email
    );
    closeShoeModal();
}

function handleAdminImageUpload(mode) {
    let fileInputId, imagePreviewId, filenameDisplayId, urlInputId;

    if (mode === 'update') {
        fileInputId = 'admin-price-image-file';
        imagePreviewId = 'admin-price-image-preview';
        filenameDisplayId = 'admin-price-image-filename';
        urlInputId = 'admin-price-image-new';
    } else if (mode === 'add') {
        fileInputId = 'admin-add-image-file';
        imagePreviewId = 'admin-add-image-preview';
        filenameDisplayId = 'admin-add-image-filename';
        urlInputId = 'admin-add-image';
    } else {
        console.error('Invalid mode for handleAdminImageUpload:', mode);
        return;
    }

    const fileInput = document.getElementById(fileInputId);
    const imagePreview = document.getElementById(imagePreviewId);
    const filenameDisplay = document.getElementById(filenameDisplayId);
    const urlInput = document.getElementById(urlInputId);

    if (!fileInput || !imagePreview || !filenameDisplay || !urlInput) {
        console.error('Missing elements for image upload handler:', { fileInputId, imagePreviewId, filenameDisplayId, urlInputId });
        return;
    }

    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            urlInput.value = e.target.result; // Update the URL input with the Data URL
        };
        reader.readAsDataURL(file);
        filenameDisplay.textContent = file.name;
    } else {
        imagePreview.src = ''; // Clear preview
        urlInput.value = ''; // Clear URL input
        filenameDisplay.textContent = 'No file selected';
    }
}

function sendTestEmail() {
    // generate a fresh code and attempt to send a verification email to admin
    verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        showToast('Preparing test verification...');
        // Try to send verification email to support/admin address
        sendVerificationEmail(EMAIL_SUPPORT_EMAIL)
            .then(() => {
                showToast('Test verification triggered (check fallback or inbox).');
            })
            .catch(() => {
                showToast('Test send failed. Check console for details.');
            });

        // Also send an admin notification (will use fallback if EmailJS unset)
        sendAdminNotification(
            'Test notification from ResourceMan',
            `This is a system test. Verification code: ${verificationCode}`,
            EMAIL_SUPPORT_EMAIL
        );
        // If EmailJS isn't configured, surface the code locally for quick testing
        if (!isEmailJsEnabled() || !window.emailjs) {
            console.log('Dev test verification code:', verificationCode);
            alert('Dev test verification code: ' + verificationCode);
        }
    } catch (err) {
        console.error('Test email error', err);
        showToast('Error while attempting test send.');
    }
}

function sendLiveTest() {
    if (!window.emailjs) {
        alert('EmailJS library not loaded. Make sure r4.html includes the EmailJS script.');
        return;
    }

    // If credentials not set, open a single configure prompt (saves to localStorage)
    if (!isEmailJsEnabled()) {
        const ok = configureEmailJs();
        if (!ok) { showToast('Live test cancelled'); return; }
    }

    // generate verification code and attempt a live send
    verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    sendVerificationEmail(EMAIL_SUPPORT_EMAIL)
        .then(() => {
            showToast('Live verification sent to ' + EMAIL_SUPPORT_EMAIL);
        })
        .catch(() => {
            showToast('Live send failed. Check console for details.');
        });

    sendAdminNotification('Live test notification', `Live test code: ${verificationCode}`, EMAIL_SUPPORT_EMAIL);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => toast.classList.add('hidden'), 2500);
}

window.onload = function () {
    loadCustomerRegistry();
    loadPayrollData();
    initEmailJS();
    renderShoes();
    renderTechProducts();
    renderOtherProducts();
    renderShoelanders();
    renderMarikina();
    renderPPE();
    renderMoreProducts();
    // Avoid showing/hiding profile-related DOM on initial load before any login
    currentUser = null;
    pendingRegistration = null;
    verificationCode = null;
    updateUserUI();
    navigateTo(1);


    const SECRET_SEQUENCE = 'qwerty';
    let secretBuffer = '';

    function tryUnlockAdminBySecretSequence() {
        const target = SECRET_SEQUENCE;
        const buf = secretBuffer.toLowerCase();
        if (buf.endsWith(target)) {
            // Unlock admin session via secret key sequence
            currentUser = { name: "System Admin", email: "admin@resourceman.com", isAdmin: true };
            secretBuffer = '';
            updateUserUI();
            renderShoes();
            showToast('Admin Terminal unlocked.');
            navigateTo(11);
        }
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === "Escape") {
            closeShoeModal();
            closeCancelModal();
            closePaymentModal();
            return;
        }

        // Ignore modifier combos
        if (e.ctrlKey || e.altKey || e.metaKey) return;

        // Ignore keys with no actual character input
        if (e.key.length !== 1) return;

        // Buffer only letters (keeps it stable with other keys)
        if (!/[a-zA-Z]/.test(e.key)) {
            secretBuffer = '';
            return;
        }

        secretBuffer += e.key;
        if (secretBuffer.length > SECRET_SEQUENCE.length) {
            secretBuffer = secretBuffer.slice(-SECRET_SEQUENCE.length);
        }

        tryUnlockAdminBySecretSequence();
    });
};
