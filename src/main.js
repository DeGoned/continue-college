document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

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
