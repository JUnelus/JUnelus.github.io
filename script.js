document.addEventListener("DOMContentLoaded", () => {
  const roles = [
	"QA Automation Engineer",
	"Data Engineer",
	"FinTech Quality Specialist"
  ];
  const roleEl = document.getElementById("dynamic-role");
  let roleIndex = 0;

  if (roleEl) {
	roleEl.textContent = roles[0];
	window.setInterval(() => {
	  roleIndex = (roleIndex + 1) % roles.length;
	  roleEl.textContent = roles[roleIndex];
	}, 2200);
  }

  const yearEl = document.getElementById("year");
  if (yearEl) {
	yearEl.textContent = String(new Date().getFullYear());
  }

  const statNumbers = document.querySelectorAll(".stat-number");
  const runCounter = (el) => {
	const target = Number(el.dataset.target || "0");
	let current = 0;
	const increment = Math.max(1, Math.ceil(target / 40));
	const timer = window.setInterval(() => {
	  current += increment;
	  if (current >= target) {
		el.textContent = `${target}+`;
		window.clearInterval(timer);
	  } else {
		el.textContent = String(current);
	  }
	}, 30);
  };

  const statObserver = new IntersectionObserver(
	(entries, observer) => {
	  entries.forEach((entry) => {
		if (entry.isIntersecting) {
		  runCounter(entry.target);
		  observer.unobserve(entry.target);
		}
	  });
	},
	{ threshold: 0.6 }
  );

  statNumbers.forEach((el) => statObserver.observe(el));

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll("#project-grid .project-card");

  filterButtons.forEach((button) => {
	button.addEventListener("click", () => {
	  const filter = button.dataset.filter || "all";

	  filterButtons.forEach((btn) => btn.classList.remove("active"));
	  button.classList.add("active");

	  projectCards.forEach((card) => {
		const categories = card.dataset.category || "";
		const shouldShow = filter === "all" || categories.includes(filter);
		card.classList.toggle("hidden", !shouldShow);
	  });
	});
  });

  const revealBlocks = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
	(entries) => {
	  entries.forEach((entry) => {
		if (entry.isIntersecting) {
		  entry.target.classList.add("visible");
		}
	  });
	},
	{ threshold: 0.1 }
  );
  revealBlocks.forEach((block) => revealObserver.observe(block));

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const navObserver = new IntersectionObserver(
	(entries) => {
	  entries.forEach((entry) => {
		if (!entry.isIntersecting) {
		  return;
		}

		const id = entry.target.getAttribute("id");
		navLinks.forEach((link) => {
		  const isActive = link.getAttribute("href") === `#${id}`;
		  link.classList.toggle("active", isActive);
		});
	  });
	},
	{
	  rootMargin: "-45% 0px -45% 0px",
	  threshold: 0
	}
  );
  sections.forEach((section) => navObserver.observe(section));

  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
	const toggleBackToTop = () => {
	  const isVisible = window.scrollY > 500;
	  backToTop.classList.toggle("visible", isVisible);
	};

	window.addEventListener("scroll", toggleBackToTop, { passive: true });
	toggleBackToTop();

	backToTop.addEventListener("click", () => {
	  window.scrollTo({ top: 0, behavior: "smooth" });
	});
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
	const popCards = document.querySelectorAll(".card, .project-card, .timeline-item, .stat-card");

	popCards.forEach((card) => {
	  card.addEventListener("mousemove", (event) => {
		const rect = card.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const rotateY = ((x / rect.width) - 0.5) * 8;
		const rotateX = (0.5 - (y / rect.height)) * 8;
		card.style.transform = `translateY(-6px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
	  });

	  card.addEventListener("mouseleave", () => {
		card.style.transform = "";
	  });
	});
  }
});
