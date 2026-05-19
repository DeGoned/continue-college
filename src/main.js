import { createIcons, icons } from 'lucide';
import EmblaCarousel from 'embla-carousel';
import EmblaCarouselAutoplay from 'embla-carousel-autoplay';
import { getTeacherById } from './teachers.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons (bundled — no CDN)
    createIcons({ icons });

    // Teacher detail page renderer — only runs on teacher-detail.html
    renderTeacherDetail();

    // Mobile drawer navigation
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavPanel = document.getElementById('mobileNavPanel');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const closeMobileNav = document.getElementById('closeMobileNav');

    if (mobileMenuBtn && mobileNav && mobileNavPanel) {
        function openMobileNav() {
            mobileNav.classList.remove('hidden');
            requestAnimationFrame(() => {
                mobileNavOverlay && mobileNavOverlay.classList.remove('opacity-0');
                mobileNavPanel.classList.remove('translate-x-full');
            });
            document.body.style.overflow = 'hidden';
        }

        function closeDrawer() {
            mobileNavOverlay && mobileNavOverlay.classList.add('opacity-0');
            mobileNavPanel.classList.add('translate-x-full');
            setTimeout(() => {
                mobileNav.classList.add('hidden');
            }, 250);
            document.body.style.overflow = '';
        }

        mobileMenuBtn.addEventListener('click', openMobileNav);
        if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeDrawer);
        if (closeMobileNav) closeMobileNav.addEventListener('click', closeDrawer);

        mobileNav.querySelectorAll('[data-mobile-submenu-toggle]').forEach(toggle => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('[data-mobile-submenu-icon]');

            toggle.addEventListener('click', () => {
                const isOpen = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', String(!isOpen));

                if (content) {
                    content.classList.toggle('hidden', isOpen);
                }

                if (icon) {
                    icon.classList.toggle('rotate-180', !isOpen);
                }
            });
        });

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeDrawer);
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !mobileNav.classList.contains('hidden')) {
                closeDrawer();
            }
        });
    }

    // Initialize Calendar Carousel
    const calendarNode = document.getElementById('calendar-embla');
    if (calendarNode) {
        const calendarOptions = { loop: true, align: 'start' };
        const calendarPlugins = [EmblaCarouselAutoplay({ delay: 4000, stopOnInteraction: false })];
        const calendarEmbla = EmblaCarousel(calendarNode, calendarOptions, calendarPlugins);

        const prevBtn = document.getElementById('calendar-prev');
        const nextBtn = document.getElementById('calendar-next');

        if (prevBtn) prevBtn.addEventListener('click', () => calendarEmbla.scrollPrev());
        if (nextBtn) nextBtn.addEventListener('click', () => calendarEmbla.scrollNext());
    }

    // Initialize Faculty Carousel
    const facultyNode = document.getElementById('faculty-embla');
    if (facultyNode) {
        const facultyOptions = { loop: true, align: 'start' };
        const facultyPlugins = [EmblaCarouselAutoplay({ delay: 3000, stopOnInteraction: false })];
        const facultyEmbla = EmblaCarousel(facultyNode, facultyOptions, facultyPlugins);

        const prevBtn = document.getElementById('faculty-prev');
        const nextBtn = document.getElementById('faculty-next');

        if (prevBtn) prevBtn.addEventListener('click', () => facultyEmbla.scrollPrev());
        if (nextBtn) nextBtn.addEventListener('click', () => facultyEmbla.scrollNext());
    }

    // Search Modal
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const closeSearch = document.getElementById('closeSearch');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn && searchModal) {
        searchBtn.addEventListener('click', function() {
            searchModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            setTimeout(() => searchInput && searchInput.focus(), 100);
        });

        function closeModal() {
            searchModal.classList.add('hidden');
            document.body.style.overflow = '';
        }

        if (closeSearch) closeSearch.addEventListener('click', closeModal);
        if (searchOverlay) searchOverlay.addEventListener('click', closeModal);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md', 'bg-white/90', 'backdrop-blur-md');
            navbar.classList.remove('glass-nav');
        } else {
            navbar.classList.remove('shadow-md', 'bg-white/90', 'backdrop-blur-md');
            navbar.classList.add('glass-nav');
        }
    });
});

/**
 * Render the teacher-detail.html page from URL ?id=... and the TEACHERS data.
 *
 * No-ops when the page is not teacher-detail.html (we detect by the
 * [data-teacher-root] root element). Falls back to a visible "not found"
 * section when the id is missing or unknown — never silently blank.
 */
function renderTeacherDetail() {
    const root = document.querySelector('[data-teacher-root]');
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const teacher = getTeacherById(id);

    const hero = document.getElementById('teacher-hero');
    const body = document.getElementById('teacher-body');
    const notFound = document.getElementById('teacher-not-found');

    if (!teacher) {
        notFound && notFound.classList.remove('hidden');
        return;
    }

    hero && hero.classList.remove('hidden');
    body && body.classList.remove('hidden');

    document.title = `${teacher.name} ${teacher.honorific} - 继续教育学院`;

    const fields = root.querySelectorAll('[data-teacher-field]');
    fields.forEach(el => {
        const key = el.getAttribute('data-teacher-field');
        switch (key) {
            case 'photo':
                el.setAttribute('src', teacher.photo);
                el.setAttribute('alt', `${teacher.name} ${teacher.honorific}`);
                break;
            case 'email':
                el.textContent = teacher.email;
                el.setAttribute('href', `mailto:${teacher.email}`);
                break;
            case 'achievements':
            case 'courses': {
                const items = teacher[key] || [];
                if (items.length === 0) {
                    // 行政岗的领导可能没有学术成果 / 主讲课程，整段隐藏
                    const section = el.closest('[data-teacher-section]') || el.parentElement;
                    section && section.classList.add('hidden');
                    break;
                }
                el.replaceChildren(...items.map(text => {
                    const li = document.createElement('li');
                    li.className = 'flex gap-3';
                    const dot = document.createElement('span');
                    dot.className = 'inline-block w-1.5 h-1.5 rounded-full bg-deep-black/40 mt-2.5 shrink-0';
                    const span = document.createElement('span');
                    span.textContent = text;
                    li.append(dot, span);
                    return li;
                }));
                break;
            }
            default:
                if (typeof teacher[key] === 'string') {
                    el.textContent = teacher[key];
                    // 字符串字段为空时（比如某些领导没有公开邮箱），把所在容器隐藏
                    if (teacher[key] === '') {
                        const section = el.closest('[data-teacher-section]');
                        section && section.classList.add('hidden');
                    }
                }
        }
    });

    // Re-render Lucide icons we just injected (achievements/courses dots are pure HTML, but courses use <i data-lucide>)
    createIcons({ icons });
}
