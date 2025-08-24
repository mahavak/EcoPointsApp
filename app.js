// EcoPoints Web Application
const METAGRAPH_L0_URL = 'http://localhost:9200';
const CURRENCY_L1_URL = 'http://localhost:9300';
const METAGRAPH_ID = 'DAG1ny6YCngJUPoSert5Kd3AYCCnVNdvPzWwN14G';

// Application State
let appState = {
    connected: false,
    userAddress: null,
    userProfile: null,
    networkStatus: 'checking',
    currentSection: 'dashboard'
};

// Mock data for demonstration
const mockData = {
    users: [
        { address: 'DAG1ny6YCngJUPoSert5Kd3AYCCnVNdvPzWwN14G', name: 'Alice Green', points: 2450, level: 5 },
        { address: 'DAG2bc7ZDfgKLMnOpQrst6Le4BZDDoOQefQaXxO25H', name: 'Bob Earth', points: 1890, level: 4 },
        { address: 'DAG3cd8AEghLMoPqRstuVMf5CAEEpPRfgRbYyP36I', name: 'Carol Nature', points: 1650, level: 4 },
        { address: 'DAG4de9BFhiMNpQrSuvWNg6DBFFqQSghScZzQ47J', name: 'David Eco', points: 1200, level: 3 },
        { address: 'DAG5ef0CGijNOqRtVwXOh7ECGGrRThiTdAaR58K', name: 'Eve Forest', points: 980, level: 3 }
    ],
    recentActions: [
        { type: 'recycling', user: 'Alice Green', points: 50, time: '2 hours ago', icon: '♻️' },
        { type: 'bike_commute', user: 'Bob Earth', points: 30, time: '3 hours ago', icon: '🚴' },
        { type: 'tree_planting', user: 'Carol Nature', points: 100, time: '5 hours ago', icon: '🌳' },
        { type: 'solar_energy', user: 'David Eco', points: 60, time: '1 day ago', icon: '☀️' },
        { type: 'water_conservation', user: 'Eve Forest', points: 40, time: '1 day ago', icon: '💧' }
    ],
    achievements: [
        { name: 'First Step', description: 'Record your first eco action', icon: '🌱', unlocked: true },
        { name: 'Recycling Hero', description: 'Recycle 100kg of materials', icon: '♻️', unlocked: true },
        { name: 'Green Commuter', description: 'Travel 500km by bike', icon: '🚴', unlocked: false },
        { name: 'Tree Hugger', description: 'Plant 10 trees', icon: '🌳', unlocked: false },
        { name: 'Solar Pioneer', description: 'Use solar energy for 30 days', icon: '☀️', unlocked: false },
        { name: 'Water Guardian', description: 'Save 1000L of water', icon: '💧', unlocked: true }
    ]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    checkNetworkStatus();
    loadDashboardStats();
});

function initializeApp() {
    // Show dashboard by default
    showSection('dashboard');
    
    // Initialize stats with animation
    setTimeout(() => {
        animateValue('totalUsers', 0, 1247, 2000);
        animateValue('totalActions', 0, 8439, 2000);
        animateValue('totalPoints', 0, 45780, 2000);
        animateValue('carbonSaved', 0, 3250, 2000);
    }, 500);
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('href').substring(1);
            showSection(section);
            updateActiveNavLink(link);
        });
    });

    // Connect Wallet Button
    document.getElementById('connectWallet').addEventListener('click', connectWallet);

    // Action Form
    document.getElementById('actionForm').addEventListener('submit', submitAction);
    document.getElementById('actionType').addEventListener('change', updateEstimatedPoints);
    document.getElementById('quantity').addEventListener('input', updateEstimatedPoints);

    // Leaderboard Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.tab-btn.active').classList.remove('active');
            btn.classList.add('active');
            loadLeaderboard(btn.dataset.period);
        });
    });

    // Reward Cards
    document.querySelectorAll('.reward-card button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.reward-card');
            const rewardName = card.querySelector('h3').textContent;
            const cost = parseInt(card.querySelector('.reward-cost').textContent);
            redeemReward(rewardName, cost);
        });
    });
}

// Navigation Functions
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        appState.currentSection = sectionId;
        
        // Load section-specific data
        if (sectionId === 'leaderboard') {
            loadLeaderboard('all');
        }
    }
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Wallet Connection
async function connectWallet() {
    try {
        // Simulate wallet connection
        showToast(t('toasts.connectingWallet'), 'info');
        
        // In a real app, this would connect to a Constellation wallet
        setTimeout(() => {
            appState.connected = true;
            appState.userAddress = 'DAG1ny6YCngJUPoSert5Kd3AYCCnVNdvPzWwN14G';
            
            // Update UI
            const walletBtn = document.getElementById('connectWallet');
            walletBtn.innerHTML = `<i class="fas fa-check-circle"></i> ${t('nav.connected')}`;
            walletBtn.classList.add('connected');
            
            // Load user profile
            loadUserProfile();
            
            showToast(t('toasts.walletConnected'), 'success');
        }, 1500);
    } catch (error) {
        showToast(t('toasts.walletFailed'), 'error');
    }
}

// User Profile
function loadUserProfile() {
    if (!appState.connected) return;
    
    // Hide connect prompt, show profile
    document.getElementById('connectPrompt').style.display = 'none';
    document.getElementById('userProfile').style.display = 'block';
    
    // Load user data (mock for now)
    const userData = mockData.users[0];
    document.getElementById('userAddress').textContent = 
        userData.address.substring(0, 10) + '...' + userData.address.substring(userData.address.length - 8);
    document.getElementById('userLevel').textContent = userData.level;
    document.getElementById('userPoints').textContent = userData.points;
    
    // Load achievements
    loadAchievements();
    
    // Load recent activities
    loadRecentActivities();
}

function loadAchievements() {
    const grid = document.getElementById('achievementsGrid');
    grid.innerHTML = mockData.achievements.map(achievement => `
        <div class="achievement-card ${achievement.unlocked ? 'unlocked' : ''}">
            <div style="font-size: 2rem;">${achievement.icon}</div>
            <div style="font-weight: 600;">${achievement.name}</div>
            <div style="font-size: 0.8rem; color: #6b7280;">${achievement.description}</div>
        </div>
    `).join('');
}

function loadRecentActivities() {
    const list = document.getElementById('recentActivities');
    list.innerHTML = mockData.recentActions.map(action => `
        <div class="activity-item">
            <div class="activity-icon">${action.icon}</div>
            <div class="activity-details">
                <div><strong>${action.user}</strong> completed ${action.type.replace('_', ' ')}</div>
                <div style="font-size: 0.9rem; color: #6b7280;">${action.time}</div>
            </div>
            <div class="activity-points">+${action.points} pts</div>
        </div>
    `).join('');
}

// Action Submission
function updateEstimatedPoints() {
    const actionType = document.getElementById('actionType').value;
    const quantity = parseFloat(document.getElementById('quantity').value) || 0;
    
    const pointsMap = {
        'recycling': 10,
        'bike_commute': 5,
        'public_transport': 3,
        'solar_energy': 20,
        'tree_planting': 50,
        'water_conservation': 8,
        'composting': 12
    };
    
    const points = (pointsMap[actionType] || 0) * Math.max(1, quantity);
    document.getElementById('estimatedPoints').textContent = points;
}

async function submitAction(e) {
    e.preventDefault();
    
    if (!appState.connected) {
        showToast(t('toasts.connectFirst'), 'error');
        return;
    }
    
    const formData = {
        actionType: document.getElementById('actionType').value,
        quantity: document.getElementById('quantity').value,
        description: document.getElementById('description').value,
        useLocation: document.getElementById('useLocation').checked
    };
    
    showToast(t('toasts.submittingAction'), 'info');
    
    // Simulate blockchain transaction
    setTimeout(() => {
        const points = document.getElementById('estimatedPoints').textContent;
        showToast(`${t('toasts.actionRecorded')} ${points} EcoPoints!`, 'success');
        
        // Reset form
        document.getElementById('actionForm').reset();
        document.getElementById('estimatedPoints').textContent = '0';
        
        // Update stats
        const currentPoints = parseInt(document.getElementById('totalPoints').textContent);
        animateValue('totalPoints', currentPoints, currentPoints + parseInt(points), 1000);
    }, 2000);
}

// Leaderboard
function loadLeaderboard(period) {
    const list = document.getElementById('leaderboardList');
    
    // Sort users by points
    const sortedUsers = [...mockData.users].sort((a, b) => b.points - a.points);
    
    list.innerHTML = sortedUsers.map((user, index) => {
        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
        return `
            <div class="leaderboard-entry">
                <div class="leaderboard-rank ${rankClass}">${index + 1}</div>
                <div class="leaderboard-user">
                    <div style="font-weight: 600;">${user.name}</div>
                    <div style="font-size: 0.9rem; color: #6b7280;">Level ${user.level}</div>
                </div>
                <div class="leaderboard-points">${user.points} pts</div>
            </div>
        `;
    }).join('');
}

// Rewards
function redeemReward(rewardName, cost) {
    if (!appState.connected) {
        showToast(t('toasts.connectFirst'), 'error');
        return;
    }
    
    const userPoints = parseInt(document.getElementById('userPoints').textContent);
    
    if (userPoints < cost) {
        showToast(t('toasts.insufficientPoints'), 'error');
        return;
    }
    
    showToast(`${t('toasts.redeeming')} ${rewardName}...`, 'info');
    
    setTimeout(() => {
        showToast(`${t('toasts.redeemed')} ${rewardName}!`, 'success');
        
        // Update user points
        const newPoints = userPoints - cost;
        document.getElementById('userPoints').textContent = newPoints;
    }, 1500);
}

// Network Status
async function checkNetworkStatus() {
    try {
        const response = await fetch(`${METAGRAPH_L0_URL}/cluster/info`);
        if (response.ok) {
            const data = await response.json();
            updateNetworkStatus(true, data.length);
        }
    } catch (error) {
        updateNetworkStatus(false, 0);
    }
    
    // Check again in 30 seconds
    setTimeout(checkNetworkStatus, 30000);
}

function updateNetworkStatus(online, nodeCount) {
    const indicator = document.getElementById('networkStatus');
    const text = document.getElementById('networkText');
    
    if (online) {
        indicator.classList.add('online');
        text.textContent = `${t('footer.online')} (${nodeCount} ${t('footer.nodes')})`;
    } else {
        indicator.classList.remove('online');
        indicator.classList.add('offline');
        text.textContent = t('footer.offline');
    }
}

// Load Dashboard Stats
async function loadDashboardStats() {
    try {
        // Try to fetch real stats from blockchain
        const response = await fetch(`${METAGRAPH_L0_URL}/node/info`);
        if (response.ok) {
            const data = await response.json();
            console.log('Connected to metagraph:', data);
        }
    } catch (error) {
        console.log('Using mock data for demonstration');
    }
}

// Utility Functions
function animateValue(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    const range = end - start;
    const increment = range / (duration / 10);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 10);
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '<i class="fas fa-check-circle"></i>',
        error: '<i class="fas fa-exclamation-circle"></i>',
        info: '<i class="fas fa-info-circle"></i>'
    };
    
    toast.innerHTML = `${icons[type]} <span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 3000);
}