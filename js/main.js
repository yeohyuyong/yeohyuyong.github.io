(function () {
	// Selectors
	const progress = document.querySelector('.progress-bar');
	const navLinks = Array.from(document.querySelectorAll('.nav-link'));
	const sections = Array.from(document.querySelectorAll('section'));
	const mobileMenuBtn = document.getElementById('mobile-menu-btn');
	const navLinksContainer = document.getElementById('nav-links');

	// Mobile Menu Toggle
	if (mobileMenuBtn && navLinksContainer) {
		mobileMenuBtn.addEventListener('click', () => {
			navLinksContainer.classList.toggle('show');
			const icon = mobileMenuBtn.querySelector('i');
			if (icon) {
				if (navLinksContainer.classList.contains('show')) {
					icon.classList.remove('fa-bars');
					icon.classList.add('fa-times');
				} else {
					icon.classList.remove('fa-times');
					icon.classList.add('fa-bars');
				}
			}
		});

		// Close menu when a link is clicked
		navLinks.forEach(link => {
			link.addEventListener('click', () => {
				navLinksContainer.classList.remove('show');
				const icon = mobileMenuBtn.querySelector('i');
				if (icon) {
					icon.classList.remove('fa-times');
					icon.classList.add('fa-bars');
				}
			});
		});
	}

	// Scroll progress indicator
	window.addEventListener('scroll', () => {
		const docHeight = document.documentElement.scrollHeight - window.innerHeight;
		const scrolled = window.scrollY;
		const percent = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
		if (progress) {
			progress.style.width = `${percent}%`;
		}
	});

	// Reveal on view + active nav highlighting
	const observerOptions = {
		threshold: 0.2,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// Add visible class for animation
				entry.target.classList.add('visible');

				// Update active nav link
				if (entry.target.tagName === 'SECTION') {
					const id = entry.target.getAttribute('id');
					if (id) {
						navLinks.forEach((link) => {
							const href = link.getAttribute('href');
							const match = href === `#${id}`;
							link.classList.toggle('active', match);
						});
					}
				}
			}
		});
	}, observerOptions);

	// Observe sections for active link highlighting
	sections.forEach((section) => {
		observer.observe(section);
	});

	// Observe fade-in elements
	const fadeElements = document.querySelectorAll('.fade-in-up');
	fadeElements.forEach((el, idx) => {
		// Staggered delay for initial load if they are already in view
		// This is a simple improvement; for more complex staggering we'd need more logic
		// regarding *when* they are viewed.
		// For now, let CSS transitions handle the smoothness.
		observer.observe(el);
	});

	// Smooth scrolling fallback (if scroll-behavior: smooth is not supported)
	navLinks.forEach((link) => {
		link.addEventListener('click', (e) => {
			const hash = link.getAttribute('href');
			if (hash && hash.startsWith('#')) {
				e.preventDefault();
				const target = document.querySelector(hash);
				if (target) {
					// Offset for fixed header
					const headerOffset = 80;
					const elementPosition = target.getBoundingClientRect().top;
					const offsetPosition = elementPosition + window.scrollY - headerOffset;

					window.scrollTo({
						top: offsetPosition,
						behavior: "smooth"
					});
				}
			}
		});
	});

	// -- YOLO Mode --
	const konamiCode = [
		'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
		'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
		'b', 'a'
	];
	let konamiIndex = 0;

	const triggerYoloMode = () => {
		document.body.classList.add('party-mode');

		const confettiContainer = document.createElement('div');
		confettiContainer.className = 'confetti';
		// More confetti!
		for (let i = 0; i < 30; i++) {
			const piece = document.createElement('div');
			piece.className = 'confetti-piece';
			piece.style.left = `${Math.random() * 100}%`;
			piece.style.animationDelay = `${Math.random() * 2}s`;
			confettiContainer.appendChild(piece);
		}
		document.body.appendChild(confettiContainer);

		setTimeout(() => {
			document.body.classList.remove('party-mode');
			if (confettiContainer.parentNode) {
				document.body.removeChild(confettiContainer);
			}
		}, 8000); // Party for 8 seconds
	};

	document.addEventListener('keydown', (e) => {
		if (e.key === konamiCode[konamiIndex]) {
			konamiIndex++;
			if (konamiIndex === konamiCode.length) {
				konamiIndex = 0;
				triggerYoloMode();
			}
		} else {
			konamiIndex = 0;
		}
	});
})();
