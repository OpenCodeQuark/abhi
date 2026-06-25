const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

const stats = [
  { label: 'Territories managed', value: 18, suffix: '+' },
  { label: 'Revenue growth', value: 22, suffix: '%' },
  { label: 'Team members led', value: 12, suffix: '+' },
];

const statElements = document.querySelectorAll('[data-stat-value]');

const animateStat = (element, target) => {
  let current = 0;
  const duration = 1400;
  const stepTime = Math.max(Math.floor(duration / target), 16);

  const increment = () => {
    current += 1;
    element.textContent = `${current}${element.dataset.statSuffix}`;
    if (current < target) {
      requestAnimationFrame(() => setTimeout(increment, stepTime));
    }
  };

  increment();
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const value = Number(entry.target.dataset.statValue);
        if (!entry.target.dataset.animated) {
          animateStat(entry.target, value);
          entry.target.dataset.animated = 'true';
        }
      }
    });
  },
  { threshold: 0.4 }
);

statElements.forEach((element) => observer.observe(element));
