// Translation system for EcoPoints website
const translations = {
    en: {
        // Navigation
        nav: {
            brand: 'EcoPoints',
            dashboard: 'Dashboard',
            recordAction: 'Record Action',
            leaderboard: 'Leaderboard',
            rewards: 'Rewards',
            connectWallet: 'Connect Wallet',
            connected: 'Connected'
        },
        // Hero Section
        hero: {
            title: 'Make Every Action Count',
            subtitle: 'Earn rewards for your environmental impact on the blockchain',
            activeUsers: 'Active Users',
            ecoActions: 'Eco Actions',
            pointsIssued: 'Points Issued',
            carbonSaved: 'kg CO₂ Saved'
        },
        // Dashboard
        dashboard: {
            title: 'Your Impact Dashboard',
            level: 'Level',
            points: 'Points',
            recentActivities: 'Recent Activities',
            connectPrompt: {
                title: 'Connect Your Wallet',
                description: 'Connect to the Constellation Network to start earning EcoPoints'
            }
        },
        // Record Action
        actions: {
            title: 'Record Environmental Action',
            actionType: 'Action Type',
            selectAction: 'Select an action',
            quantity: 'Quantity',
            quantityPlaceholder: 'e.g., kg recycled, km traveled',
            description: 'Description',
            descriptionPlaceholder: 'Describe your environmental action...',
            photoEvidence: 'Photo Evidence (Optional)',
            includeGPS: 'Include GPS Location',
            estimatedPoints: 'Estimated Points:',
            submitAction: 'Submit Action',
            actionTypes: {
                recycling: 'Recycling',
                bikeCommute: 'Bike Commute',
                publicTransport: 'Public Transport',
                solarEnergy: 'Solar Energy Use',
                treePlanting: 'Tree Planting',
                waterConservation: 'Water Conservation',
                composting: 'Composting'
            }
        },
        // Leaderboard
        leaderboard: {
            title: 'Environmental Champions',
            allTime: 'All Time',
            thisMonth: 'This Month',
            thisWeek: 'This Week'
        },
        // Rewards
        rewards: {
            title: 'Redeem Your Points',
            redeem: 'Redeem',
            items: {
                plantTree: {
                    title: 'Plant a Tree',
                    description: 'Support reforestation efforts'
                },
                coffeeVoucher: {
                    title: 'Eco Coffee Voucher',
                    description: 'Free sustainable coffee'
                },
                bikeMaintenance: {
                    title: 'Bike Maintenance',
                    description: 'Free bike tune-up service'
                },
                transitPass: {
                    title: 'Public Transit Pass',
                    description: '1-month transit pass'
                }
            }
        },
        // Footer
        footer: {
            networkTitle: 'EcoPoints Network',
            poweredBy: 'Powered by Constellation Network',
            metagraphId: 'Metagraph ID:',
            networkStatus: 'Network Status',
            checking: 'Checking...',
            online: 'Online',
            offline: 'Offline',
            nodes: 'nodes'
        },
        // Achievements
        achievements: {
            firstStep: {
                name: 'First Step',
                description: 'Record your first eco action'
            },
            recyclingHero: {
                name: 'Recycling Hero',
                description: 'Recycle 100kg of materials'
            },
            greenCommuter: {
                name: 'Green Commuter',
                description: 'Travel 500km by bike'
            },
            treeHugger: {
                name: 'Tree Hugger',
                description: 'Plant 10 trees'
            },
            solarPioneer: {
                name: 'Solar Pioneer',
                description: 'Use solar energy for 30 days'
            },
            waterGuardian: {
                name: 'Water Guardian',
                description: 'Save 1000L of water'
            }
        },
        // Toast messages
        toasts: {
            connectingWallet: 'Connecting to Constellation Network...',
            walletConnected: 'Wallet connected successfully!',
            walletFailed: 'Failed to connect wallet',
            connectFirst: 'Please connect your wallet first',
            submittingAction: 'Submitting action to blockchain...',
            actionRecorded: 'Action recorded! You earned',
            insufficientPoints: 'Insufficient EcoPoints for this reward',
            redeeming: 'Redeeming',
            redeemed: 'Successfully redeemed'
        },
        // Time
        time: {
            hoursAgo: 'hours ago',
            dayAgo: 'day ago',
            daysAgo: 'days ago'
        },
        // Visualizations
        viz: {
            weeklyActivity: 'Weekly Activity',
            impactBreakdown: 'Impact Breakdown',
            monthlyGoals: 'Monthly Goals',
            points: 'Points',
            actions: 'Actions'
        },
        // Goals
        goals: {
            recycling: 'Recycling Goal',
            cycling: 'Cycling Goal',
            energy: 'Energy Saving'
        },
        // Calculator
        calc: {
            title: 'Carbon Footprint Calculator',
            transport: 'Daily Commute (km)',
            electricity: 'Monthly Electricity (kWh)',
            gas: 'Monthly Gas (m³)',
            waste: 'Weekly Waste (kg)',
            calculate: 'Calculate Impact',
            comparison: 'Compared to average:',
            belowAverage: 'below average 🌱',
            aboveAverage: 'above average'
        }
    },
    nl: {
        // Navigation
        nav: {
            brand: 'EcoPunten',
            dashboard: 'Dashboard',
            recordAction: 'Actie Registreren',
            leaderboard: 'Ranglijst',
            rewards: 'Beloningen',
            connectWallet: 'Wallet Verbinden',
            connected: 'Verbonden'
        },
        // Hero Section
        hero: {
            title: 'Elke Actie Telt',
            subtitle: 'Verdien beloningen voor jouw milieu-impact op de blockchain',
            activeUsers: 'Actieve Gebruikers',
            ecoActions: 'Eco Acties',
            pointsIssued: 'Punten Uitgegeven',
            carbonSaved: 'kg CO₂ Bespaard'
        },
        // Dashboard
        dashboard: {
            title: 'Jouw Impact Dashboard',
            level: 'Niveau',
            points: 'Punten',
            recentActivities: 'Recente Activiteiten',
            connectPrompt: {
                title: 'Verbind Je Wallet',
                description: 'Verbind met het Constellation Network om EcoPunten te verdienen'
            }
        },
        // Record Action
        actions: {
            title: 'Registreer Milieuactie',
            actionType: 'Type Actie',
            selectAction: 'Selecteer een actie',
            quantity: 'Hoeveelheid',
            quantityPlaceholder: 'bijv. kg gerecycled, km gereisd',
            description: 'Beschrijving',
            descriptionPlaceholder: 'Beschrijf je milieuactie...',
            photoEvidence: 'Foto Bewijs (Optioneel)',
            includeGPS: 'GPS Locatie Toevoegen',
            estimatedPoints: 'Geschatte Punten:',
            submitAction: 'Actie Indienen',
            actionTypes: {
                recycling: 'Recycling',
                bikeCommute: 'Fietsen naar Werk',
                publicTransport: 'Openbaar Vervoer',
                solarEnergy: 'Zonne-energie Gebruik',
                treePlanting: 'Bomen Planten',
                waterConservation: 'Water Besparen',
                composting: 'Composteren'
            }
        },
        // Leaderboard
        leaderboard: {
            title: 'Milieukampioenen',
            allTime: 'Alle Tijden',
            thisMonth: 'Deze Maand',
            thisWeek: 'Deze Week'
        },
        // Rewards
        rewards: {
            title: 'Wissel Je Punten In',
            redeem: 'Inwisselen',
            items: {
                plantTree: {
                    title: 'Plant een Boom',
                    description: 'Steun herbebossingsprojecten'
                },
                coffeeVoucher: {
                    title: 'Eco Koffie Voucher',
                    description: 'Gratis duurzame koffie'
                },
                bikeMaintenance: {
                    title: 'Fiets Onderhoud',
                    description: 'Gratis fiets onderhoudsbeurt'
                },
                transitPass: {
                    title: 'OV Abonnement',
                    description: '1 maand OV-kaart'
                }
            }
        },
        // Footer
        footer: {
            networkTitle: 'EcoPunten Netwerk',
            poweredBy: 'Aangedreven door Constellation Network',
            metagraphId: 'Metagraph ID:',
            networkStatus: 'Netwerk Status',
            checking: 'Controleren...',
            online: 'Online',
            offline: 'Offline',
            nodes: 'nodes'
        },
        // Achievements
        achievements: {
            firstStep: {
                name: 'Eerste Stap',
                description: 'Registreer je eerste eco-actie'
            },
            recyclingHero: {
                name: 'Recycling Held',
                description: 'Recycle 100kg materialen'
            },
            greenCommuter: {
                name: 'Groene Forens',
                description: 'Reis 500km per fiets'
            },
            treeHugger: {
                name: 'Bomenknuffelaar',
                description: 'Plant 10 bomen'
            },
            solarPioneer: {
                name: 'Zonne-energie Pionier',
                description: 'Gebruik 30 dagen zonne-energie'
            },
            waterGuardian: {
                name: 'Water Bewaker',
                description: 'Bespaar 1000L water'
            }
        },
        // Toast messages
        toasts: {
            connectingWallet: 'Verbinden met Constellation Network...',
            walletConnected: 'Wallet succesvol verbonden!',
            walletFailed: 'Wallet verbinding mislukt',
            connectFirst: 'Verbind eerst je wallet',
            submittingAction: 'Actie naar blockchain verzenden...',
            actionRecorded: 'Actie geregistreerd! Je verdiende',
            insufficientPoints: 'Onvoldoende EcoPunten voor deze beloning',
            redeeming: 'Inwisselen',
            redeemed: 'Succesvol ingewisseld'
        },
        // Time
        time: {
            hoursAgo: 'uur geleden',
            dayAgo: 'dag geleden',
            daysAgo: 'dagen geleden'
        },
        // Visualizations
        viz: {
            weeklyActivity: 'Wekelijkse Activiteit',
            impactBreakdown: 'Impact Verdeling',
            monthlyGoals: 'Maandelijkse Doelen',
            points: 'Punten',
            actions: 'Acties'
        },
        // Goals
        goals: {
            recycling: 'Recycling Doel',
            cycling: 'Fiets Doel',
            energy: 'Energie Besparen'
        },
        // Calculator
        calc: {
            title: 'CO₂ Voetafdruk Calculator',
            transport: 'Dagelijks Woon-Werk (km)',
            electricity: 'Maandelijks Elektriciteit (kWh)',
            gas: 'Maandelijks Gas (m³)',
            waste: 'Wekelijks Afval (kg)',
            calculate: 'Bereken Impact',
            comparison: 'Vergeleken met gemiddeld:',
            belowAverage: 'onder gemiddeld 🌱',
            aboveAverage: 'boven gemiddeld'
        }
    }
};

// Current language state
let currentLanguage = localStorage.getItem('language') || 'en';

// Get translation for a key path
function t(keyPath) {
    const keys = keyPath.split('.');
    let value = translations[currentLanguage];
    
    for (const key of keys) {
        if (value && value[key]) {
            value = value[key];
        } else {
            // Fallback to English if translation not found
            value = translations['en'];
            for (const k of keys) {
                if (value && value[k]) {
                    value = value[k];
                } else {
                    return keyPath; // Return key if not found
                }
            }
            break;
        }
    }
    
    return value;
}

// Switch language
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updatePageTranslations();
}

// Update all translations on the page
function updatePageTranslations() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.hasAttribute('placeholder')) {
                element.placeholder = t(key);
            }
        } else {
            element.textContent = t(key);
        }
    });
    
    // Update select options for action types
    const actionSelect = document.getElementById('actionType');
    if (actionSelect) {
        const currentValue = actionSelect.value;
        actionSelect.innerHTML = `
            <option value="">${t('actions.selectAction')}</option>
            <option value="recycling">♻️ ${t('actions.actionTypes.recycling')}</option>
            <option value="bike_commute">🚴 ${t('actions.actionTypes.bikeCommute')}</option>
            <option value="public_transport">🚌 ${t('actions.actionTypes.publicTransport')}</option>
            <option value="solar_energy">☀️ ${t('actions.actionTypes.solarEnergy')}</option>
            <option value="tree_planting">🌳 ${t('actions.actionTypes.treePlanting')}</option>
            <option value="water_conservation">💧 ${t('actions.actionTypes.waterConservation')}</option>
            <option value="composting">🌱 ${t('actions.actionTypes.composting')}</option>
        `;
        actionSelect.value = currentValue;
    }
    
    // Update placeholders
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.placeholder = t('actions.quantityPlaceholder');
    }
    
    const descriptionTextarea = document.getElementById('description');
    if (descriptionTextarea) {
        descriptionTextarea.placeholder = t('actions.descriptionPlaceholder');
    }
    
    // Update language toggle button
    const langBtn = document.getElementById('languageToggle');
    if (langBtn) {
        langBtn.textContent = currentLanguage === 'en' ? '🇳🇱 NL' : '🇬🇧 EN';
    }
    
    // Update document title
    document.title = currentLanguage === 'en' 
        ? 'EcoPoints - Environmental Impact Rewards' 
        : 'EcoPunten - Milieubeloningen';
    
    // Re-render dynamic content if needed
    if (typeof loadAchievements === 'function' && appState.connected) {
        loadAchievements();
    }
    if (typeof loadRecentActivities === 'function' && appState.connected) {
        loadRecentActivities();
    }
    
    // Update charts with new language
    if (typeof updateChartsLanguage === 'function') {
        updateChartsLanguage();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    currentLanguage = localStorage.getItem('language') || 'en';
    
    // Add language toggle button if not exists
    if (!document.getElementById('languageToggle')) {
        const navWallet = document.querySelector('.nav-wallet');
        if (navWallet) {
            const langBtn = document.createElement('button');
            langBtn.id = 'languageToggle';
            langBtn.className = 'btn btn-outline language-toggle';
            langBtn.textContent = currentLanguage === 'en' ? '🇳🇱 NL' : '🇬🇧 EN';
            langBtn.onclick = () => {
                switchLanguage(currentLanguage === 'en' ? 'nl' : 'en');
            };
            navWallet.insertBefore(langBtn, navWallet.firstChild);
        }
    }
    
    // Initial translation update
    setTimeout(() => updatePageTranslations(), 100);
});