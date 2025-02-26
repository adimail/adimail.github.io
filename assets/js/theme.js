// Immediately set theme when script loads
(function () {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

const createThemeToggle = () => {
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.id = 'theme-toggle';

  document.body.appendChild(themeToggle);
  return themeToggle;
};

const initTheme = () => {
  const themeToggle =
    document.getElementById('theme-toggle') || createThemeToggle();
  const html = document.documentElement;

  const currentTheme = html.getAttribute('data-theme');
  themeToggle.textContent = currentTheme === 'light' ? '🌙 Dark' : '☀️ Light';

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙 Dark' : '☀️ Light';
  });
};

document.addEventListener('DOMContentLoaded', initTheme);
