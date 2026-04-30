/**
 * MobileMenu Module
 * Menú hamburguesa para móvil
 */

export function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', function() {
        const isOpen = navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
        
        if (isOpen && !document.querySelector('.mobile-menu')) {
            createMobileMenu(navLinks);
        }
    });
    
    document.addEventListener('click', function(e) {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
}

function createMobileMenu(navLinks) {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        const clonedLink = link.cloneNode(true);
        clonedLink.className = 'mobile-menu-link';
        mobileMenu.appendChild(clonedLink);
    });
    
    const ctaButton = document.querySelector('.site-header .btn');
    if (ctaButton) {
        const clonedCta = ctaButton.cloneNode(true);
        clonedCta.className = 'mobile-menu-cta';
        mobileMenu.appendChild(clonedCta);
    }
    
    document.body.appendChild(mobileMenu);
    
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: var(--secondary-1);
            padding: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            box-shadow: var(--shadow-lg);
            z-index: 999;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        .mobile-menu.active {
            transform: translateY(0);
            opacity: 1;
        }
        .mobile-menu-link {
            color: var(--white);
            padding: 1rem;
            font-size: 1.1rem;
            border-bottom: 1px solid var(--white-subtle);
        }
        .mobile-menu-cta {
            text-align: center;
            margin-top: 1rem;
        }
    `;
    document.head.appendChild(style);
}

export default initMobileMenu;