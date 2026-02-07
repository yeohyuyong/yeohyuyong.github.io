(function () {
	const progress = document.querySelector('.progress-bar');
	const navLinks = Array.from(document.querySelectorAll('.nav-link'));
	const sections = Array.from(document.querySelectorAll('section'));

	// Scroll progress indicator
	window.addEventListener('scroll', () => {
		const docHeight = document.documentElement.scrollHeight - window.innerHeight;
		const scrolled = window.scrollY;
		const percent = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
		progress.style.width = `${percent}%`;
	});

	// Reveal on view + active nav highlighting
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					const id = entry.target.getAttribute('id');
					if (id) {
						navLinks.forEach((link) => {
							const match = link.getAttribute('href') === `#${id}`;
							link.classList.toggle('active', match);
						});
					}
				}
			});
		},
		{ threshold: 0.35 }
	);

	sections.forEach((section, idx) => {
		section.classList.add('reveal');
		section.style.transitionDelay = `${Math.min(idx * 80, 240)}ms`;
		observer.observe(section);
	});

	// Smooth scrolling fallback for browsers without native support
	navLinks.forEach((link) => {
		link.addEventListener('click', (e) => {
			const hash = link.getAttribute('href');
			if (hash && hash.startsWith('#')) {
				e.preventDefault();
				const target = document.querySelector(hash);
				if (target) {
					target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			}
		});
	});
})();
