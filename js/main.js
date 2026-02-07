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
					if (entry.target.tagName === 'SECTION') {
						const id = entry.target.getAttribute('id');
						if (id) {
							navLinks.forEach((link) => {
								const match = link.getAttribute('href') === `#${id}`;
								link.classList.toggle('active', match);
							});
						}
					}
				}
			});
		},
		{ threshold: 0.25 }
	);

	sections.forEach((section, idx) => {
		section.classList.add('reveal');
		section.style.transitionDelay = `${Math.min(idx * 80, 240)}ms`;
	});

	const revealItems = document.querySelectorAll('.reveal');
	revealItems.forEach((el) => observer.observe(el));

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
		for (let i = 0; i < 13; i++) {
			const piece = document.createElement('div');
			piece.className = 'confetti-piece';
			confettiContainer.appendChild(piece);
		}
		document.body.appendChild(confettiContainer);

		setTimeout(() => {
			document.body.classList.remove('party-mode');
			document.body.removeChild(confettiContainer);
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
