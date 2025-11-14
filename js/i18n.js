// Internationalization (i18n) library for TravelHub

class I18n {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.translations = {};
        this.initialized = false;
    }

    async init() {
        await this.loadTranslations();
        this.applyTranslations();
        this.initialized = true;
    }

    async loadTranslations() {
        try {
            const response = await fetch(`data/translations/${this.currentLanguage}.json`);
            this.translations = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to English if translation file fails to load
            if (this.currentLanguage !== 'en') {
                this.currentLanguage = 'en';
                await this.loadTranslations();
            }
        }
    }

    translate(key, defaultText = '') {
        const keys = key.split('.');
        let value = this.translations;

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return defaultText || key;
            }
        }

        return value || defaultText || key;
    }

    applyTranslations() {
        // Translate all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.getAttribute('placeholder')) {
                    element.placeholder = translation;
                }
            } else {
                element.textContent = translation;
            }
        });

        // Translate elements with data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.translate(key);
        });

        // Translate elements with data-i18n-title
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.translate(key);
        });

        // Translate elements with data-i18n-value
        document.querySelectorAll('[data-i18n-value]').forEach(element => {
            const key = element.getAttribute('data-i18n-value');
            element.value = this.translate(key);
        });
    }

    async setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        await this.loadTranslations();
        this.applyTranslations();

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Dispatch custom event for language change
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }

    getLanguage() {
        return this.currentLanguage;
    }

    // Helper method for dynamic content translation
    t(key, defaultText = '') {
        return this.translate(key, defaultText);
    }
}

// Create global i18n instance
const i18n = new I18n();

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', async () => {
    await i18n.init();

    // Set HTML lang attribute
    document.documentElement.lang = i18n.getLanguage();
});

// Create language switcher component
function createLanguageSwitcher() {
    const nav = document.querySelector('nav .nav-links');
    if (!nav) return;

    // Create language switcher element
    const langSwitcher = document.createElement('li');
    langSwitcher.className = 'language-switcher';
    langSwitcher.style.cssText = `
        position: relative;
        cursor: pointer;
    `;

    const currentLang = i18n.getLanguage();
    const flagIcon = currentLang === 'en'
        ? '🇺🇸' // US flag for English
        : '🇨🇳'; // Chinese flag for Mandarin

    langSwitcher.innerHTML = `
        <div class="lang-button" style="
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            transition: background-color 0.3s;
        ">
            <span style="font-size: 1.5rem;">${flagIcon}</span>
            <span style="font-size: 0.9rem; font-weight: 500;">${currentLang.toUpperCase()}</span>
        </div>
    `;

    langSwitcher.addEventListener('click', function(e) {
        e.stopPropagation();

        // Toggle language
        const newLang = i18n.getLanguage() === 'en' ? 'zh' : 'en';
        i18n.setLanguage(newLang).then(() => {
            // Update flag icon and text
            const newFlagIcon = newLang === 'en' ? '🇺🇸' : '🇨🇳';
            langSwitcher.querySelector('.lang-button').innerHTML = `
                <span style="font-size: 1.5rem;">${newFlagIcon}</span>
                <span style="font-size: 0.9rem; font-weight: 500;">${newLang.toUpperCase()}</span>
            `;
        });
    });

    // Add hover effect
    const langButton = langSwitcher.querySelector('.lang-button');
    langSwitcher.addEventListener('mouseenter', () => {
        langButton.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
    });
    langSwitcher.addEventListener('mouseleave', () => {
        langButton.style.backgroundColor = 'transparent';
    });

    // Insert before auth buttons or user menu
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const insertBefore = authButtons || userMenu;

    if (insertBefore && insertBefore.parentNode) {
        insertBefore.parentNode.insertBefore(langSwitcher, insertBefore);
    } else {
        nav.appendChild(langSwitcher);
    }
}

// Initialize language switcher on DOM load
document.addEventListener('DOMContentLoaded', createLanguageSwitcher);
