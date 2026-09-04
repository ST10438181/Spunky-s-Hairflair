// ========================================
// Spunky's Hairflair - Complete Website
// All features fully functional
// ========================================

// Data
let currentUser = null;
let userBookings = [];
let currentBooking = {
    service: null,
    price: 0,
    stylistId: null,
    stylistName: null,
    date: null,
    time: null
};

// Services Data
const services = [
    { id: 1, name: "Wash & Blow", price: 150, icon: "fa-hand-sparkles", duration: "45 min" },
    { id: 2, name: "Trim & Style", price: 120, icon: "fa-scissors", duration: "30 min" },
    { id: 3, name: "Box Braids", price: 450, icon: "fa-crown", duration: "3-4 hours" },
    { id: 4, name: "Sew-in Weave", price: 350, icon: "fa-feather", duration: "2-3 hours" },
    { id: 5, name: "Relaxer Treatment", price: 250, icon: "fa-oil-can", duration: "1.5 hours" },
    { id: 6, name: "Full Style & Blowout", price: 200, icon: "fa-wind", duration: "1 hour" }
];

// Stylists Data
const stylists = [
    { id: 1, name: "Asenathi Valashiya", specialty: "Braiding Specialist", rating: 4.9, reviews: 24, icon: "fa-female" },
    { id: 2, name: "Siphokazi Nofemele", specialty: "Cuts & Relaxers", rating: 4.8, reviews: 18, icon: "fa-female" },
    { id: 3, name: "Rethabile Minnaar", specialty: "Weaves & Extensions", rating: 4.9, reviews: 31, icon: "fa-female" }
];

// Time Slots
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderServices();
    renderStylists();
    renderDatePicker();
    renderTimePicker();
    renderFullServices();
    checkLoginStatus();
    setupEventListeners();
});

function loadData() {
    const savedUser = localStorage.getItem('spunky_user');
    const savedBookings = localStorage.getItem('spunky_bookings');
    
    if (savedUser) currentUser = JSON.parse(savedUser);
    if (savedBookings) userBookings = JSON.parse(savedBookings);
}

function saveData() {
    if (currentUser) localStorage.setItem('spunky_user', JSON.stringify(currentUser));
    localStorage.setItem('spunky_bookings', JSON.stringify(userBookings));
}

// ============ CHECK LOGIN STATUS ============
function checkLoginStatus() {
    const loginBanner = document.getElementById('loginBanner');
    const bookingForm = document.getElementById('bookingForm');
    const userNameDisplay = document.getElementById('userNameDisplay');
    
    if (currentUser) {
        loginBanner.style.display = 'none';
        bookingForm.style.display = 'block';
        userNameDisplay.innerHTML = currentUser.name.split(' ')[0];
        showToast(`Welcome back, ${currentUser.name.split(' ')[0]}! ✨`);
    } else {
        loginBanner.style.display = 'block';
        bookingForm.style.display = 'none';
        userNameDisplay.innerHTML = 'Account';
    }
}

// ============ AUTH MODAL ============
function showAuthModal() {
    document.getElementById('authModal').classList.add('active');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

function registerUser() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    
    if (!name || !email || !phone) {
        showToast('Please fill in all fields!', 'error');
        return;
    }
    
    currentUser = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        joined: new Date().toISOString()
    };
    
    saveData();
    closeAuthModal();
    checkLoginStatus();
    showToast(`Welcome ${name.split(' ')[0]}! You can now book appointments. 🎉`);
}

// ============ LOGOUT ============
function logout() {
    currentUser = null;
    saveData();
    resetBooking();
    checkLoginStatus();
    showToast('Logged out successfully');
    switchPage('home');
}

// ============ RENDER FUNCTIONS ============
function renderServices() {
    const container = document.getElementById('servicesGrid');
    if (!container) return;
    
    container.innerHTML = services.map(service => `
        <div class="service-item" data-id="${service.id}" data-name="${service.name}" data-price="${service.price}">
            <i class="fas ${service.icon}"></i>
            <div class="service-name">${service.name}</div>
            <div class="service-price">R${service.price}</div>
            <div style="font-size:0.75rem; color:var(--gray);">${service.duration}</div>
        </div>
    `).join('');
    
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('click', () => selectService(item));
    });
}

function renderStylists() {
    const container = document.getElementById('stylistsGrid');
    if (!container) return;
    
    container.innerHTML = stylists.map(stylist => `
        <div class="stylist-item" data-id="${stylist.id}" data-name="${stylist.name}">
            <i class="fas ${stylist.icon}"></i>
            <div class="stylist-name">${stylist.name}</div>
            <div class="stylist-specialty">${stylist.specialty}</div>
            <div class="stylist-rating">⭐ ${stylist.rating} (${stylist.reviews} reviews)</div>
        </div>
    `).join('');
    
    document.querySelectorAll('.stylist-item').forEach(item => {
        item.addEventListener('click', () => selectStylist(item));
    });
}

function renderDatePicker() {
    const container = document.getElementById('datePicker');
    if (!container) return;
    
    const today = new Date();
    const dates = [];
    
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date);
    }
    
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    
    container.innerHTML = `
        <div class="dates-grid">
            ${dates.map(date => `
                <div class="date-item" data-date="${date.toISOString().split('T')[0]}">
                    <div class="date-day">${weekdays[date.getDay()]}</div>
                    <div class="date-number">${date.getDate()}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    document.querySelectorAll('.date-item').forEach(item => {
        item.addEventListener('click', () => selectDate(item));
    });
}

function renderTimePicker() {
    const container = document.getElementById('timePicker');
    if (!container) return;
    
    container.innerHTML = `
        <div class="times-grid">
            ${timeSlots.map(time => `
                <div class="time-item" data-time="${time}">⏰ ${time}</div>
            `).join('')}
        </div>
    `;
    
    document.querySelectorAll('.time-item').forEach(item => {
        item.addEventListener('click', () => selectTime(item));
    });
}

function renderFullServices() {
    const container = document.getElementById('servicesFullGrid');
    if (!container) return;
    
    container.innerHTML = services.map(service => `
        <div class="service-full-card">
            <i class="fas ${service.icon}"></i>
            <h3>${service.name}</h3>
            <div class="service-price">R${service.price}</div>
            <div style="color:var(--gray);">Duration: ${service.duration}</div>
            <button class="btn-primary" style="margin-top:1rem; padding:0.5rem 1rem;" onclick="switchPage('home')">Book Now</button>
        </div>
    `).join('');
}

// ============ SELECTION FUNCTIONS ============
function selectService(element) {
    if (!currentUser) { showToast('Please login first!', 'error'); showAuthModal(); return; }
    
    document.querySelectorAll('.service-item').forEach(s => s.classList.remove('selected'));
    element.classList.add('selected');
    
    currentBooking.service = element.dataset.name;
    currentBooking.price = parseInt(element.dataset.price);
    
    updateSummary();
    showToast(`${currentBooking.service} selected! 💇‍♀️`);
}

function selectStylist(element) {
    if (!currentUser) { showToast('Please login first!', 'error'); showAuthModal(); return; }
    
    document.querySelectorAll('.stylist-item').forEach(s => s.classList.remove('selected'));
    element.classList.add('selected');
    
    currentBooking.stylistId = parseInt(element.dataset.id);
    currentBooking.stylistName = element.dataset.name;
    
    updateSummary();
    showToast(`${currentBooking.stylistName} is your stylist! ✨`);
}

function selectDate(element) {
    if (!currentUser) { showToast('Please login first!', 'error'); showAuthModal(); return; }
    
    document.querySelectorAll('.date-item').forEach(d => d.classList.remove('selected'));
    element.classList.add('selected');
    
    currentBooking.date = element.dataset.date;
    
    updateSummary();
    showToast(`Date selected! 📅`);
}

function selectTime(element) {
    if (!currentUser) { showToast('Please login first!', 'error'); showAuthModal(); return; }
    
    document.querySelectorAll('.time-item').forEach(t => t.classList.remove('selected'));
    element.classList.add('selected');
    
    currentBooking.time = element.dataset.time;
    
    updateSummary();
    showToast(`Time selected: ${currentBooking.time} ⏰`);
}

// ============ UPDATE SUMMARY ============
function updateSummary() {
    const summaryContent = document.getElementById('summaryContent');
    const confirmBtn = document.getElementById('confirmBtn');
    
    if (currentBooking.service && currentBooking.stylistName && currentBooking.date && currentBooking.time) {
        const deposit = currentBooking.price * 0.5;
        const balance = currentBooking.price - deposit;
        
        summaryContent.innerHTML = `
            <div class="summary-details">
                <div class="summary-row"><span>✨ Service:</span><strong>${currentBooking.service}</strong></div>
                <div class="summary-row"><span>💇 Stylist:</span><strong>${currentBooking.stylistName}</strong></div>
                <div class="summary-row"><span>📅 Date:</span><strong>${formatDate(currentBooking.date)}</strong></div>
                <div class="summary-row"><span>⏰ Time:</span><strong>${currentBooking.time}</strong></div>
                <div class="summary-row"><span>💰 Total:</span><strong>R${currentBooking.price}</strong></div>
                <div class="summary-row"><span>💳 Deposit (50%):</span><strong>R${deposit}</strong></div>
                <div class="summary-row total"><span>Balance at salon:</span><strong>R${balance}</strong></div>
            </div>
        `;
        confirmBtn.disabled = false;
    } else {
        summaryContent.innerHTML = '<p class="empty-summary">Select a service, stylist, date and time to see your summary</p>';
        confirmBtn.disabled = true;
    }
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// ============ CONFIRM BOOKING ============
function confirmBooking() {
    if (!currentUser) {
        showToast('Please login to confirm booking', 'error');
        showAuthModal();
        return;
    }
    
    if (!currentBooking.service || !currentBooking.stylistName || !currentBooking.date || !currentBooking.time) {
        showToast('Please complete all selections', 'error');
        return;
    }
    
    const newBooking = {
        id: Date.now(),
        userId: currentUser.id,
        service: currentBooking.service,
        price: currentBooking.price,
        stylistName: currentBooking.stylistName,
        date: currentBooking.date,
        time: currentBooking.time,
        deposit: currentBooking.price * 0.5,
        status: 'confirmed',
        bookedOn: new Date().toISOString()
    };
    
    userBookings.push(newBooking);
    saveData();
    
    showToast(`Booking confirmed for ${currentBooking.service}! 📅`);
    
    resetBooking();
    renderUserBookings();
    switchPage('bookings');
}

function resetBooking() {
    currentBooking = {
        service: null,
        price: 0,
        stylistId: null,
        stylistName: null,
        date: null,
        time: null
    };
    
    document.querySelectorAll('.service-item, .stylist-item, .date-item, .time-item').forEach(el => {
        el.classList.remove('selected');
    });
    
    updateSummary();
}

// ============ RENDER USER BOOKINGS ============
function renderUserBookings() {
    const container = document.getElementById('bookingsList');
    if (!container) return;
    
    const userSpecificBookings = userBookings.filter(b => b.userId === currentUser?.id);
    
    if (userSpecificBookings.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-plus"></i>
                <h3>No Bookings Yet</h3>
                <p>Book your first appointment to see it here</p>
                <button class="btn-primary" onclick="switchPage('home')">Book Now</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = userSpecificBookings.map(booking => `
        <div class="booking-item">
            <div class="booking-info">
                <h4>${booking.service}</h4>
                <p><i class="fas fa-user-tie"></i> ${booking.stylistName}</p>
                <p><i class="fas fa-calendar"></i> ${formatDate(booking.date)} at ${booking.time}</p>
                <p><i class="fas fa-credit-card"></i> Deposit: R${booking.deposit}</p>
                <span class="booking-status">${booking.status.toUpperCase()}</span>
            </div>
            <button class="btn-cancel" onclick="cancelBooking(${booking.id})">Cancel</button>
        </div>
    `).join('');
}

function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        userBookings = userBookings.filter(b => b.id !== bookingId);
        saveData();
        renderUserBookings();
        showToast('Booking cancelled successfully');
    }
}

// ============ NAVIGATION ============
function switchPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`${pageName}Page`).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === pageName) {
            btn.classList.add('active');
        }
    });
    
    if (pageName === 'bookings' && currentUser) {
        renderUserBookings();
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBooking() {
    switchPage('home');
    document.getElementById('loginBanner')?.scrollIntoView({ behavior: 'smooth' });
}

// ============ SETUP EVENT LISTENERS ============
function setupEventListeners() {
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchPage(btn.dataset.page);
        });
    });
    
    // Confirm booking button
    const confirmBtn = document.getElementById('confirmBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmBooking);
    }
    
    // Close modal on outside click
    window.onclick = function(event) {
        const modal = document.getElementById('authModal');
        if (event.target === modal) {
            closeAuthModal();
        }
    };
}

// ============ TOAST NOTIFICATION ============
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.background = type === 'error' ? '#dc3545' : '#28a745';
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}