const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

function openMenu() {
  hamburger.classList.add('open');
  mobileNav.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
}

hamburger.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeMenu() : openMenu();
});

mobileNav.addEventListener('click', (e) => {
  if (e.target === mobileNav) closeMenu();
});
