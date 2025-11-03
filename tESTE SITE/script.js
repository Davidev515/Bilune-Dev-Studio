// Menu móvel
const navToggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
const header = document.querySelector('.site-header');

if (navToggle && menu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navToggle.classList.toggle('active');
    menu.classList.toggle('is-open');
    
    // Previne scroll do body quando menu está aberto
    if (!expanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Fecha menu ao clicar em um link
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
  
  // Fecha menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !navToggle.contains(e.target)) {
      menu.classList.remove('is-open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// Header scroll effect
if (header) {
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  });
}

// Animação de revelar ao rolar
const revealables = document.querySelectorAll('[data-reveal], .card, .post, .logo-item, .about-grid, .hero-title, .hero-subtitle, .hero-ctas');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealables.forEach((el) => observer.observe(el));

// Efeitos de parallax suave
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.hero-bg');
  if (parallax) {
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Efeito de typing no título
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Efeito de partículas flutuantes
function createFloatingParticles() {
  const particlesContainer = document.querySelector('.hero-particles');
  if (!particlesContainer) return;

  for (let i = 0; i < 6; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: var(--brand-cyan);
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: float ${Math.random() * 4 + 4}s ease-in-out infinite;
      animation-delay: ${Math.random() * 2}s;
      box-shadow: 0 0 10px var(--brand-cyan);
      opacity: 0.6;
    `;
    particlesContainer.appendChild(particle);
  }
}

// Aplicar efeito de typing ao título principal
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const originalText = heroTitle.textContent;
  setTimeout(() => {
    typeWriter(heroTitle, originalText, 50);
  }, 1000);
}

// Criar partículas flutuantes
setTimeout(() => {
  createFloatingParticles();
}, 2000);

// Animar estatísticas de confiança
function animateTrustStats() {
  const trustStats = document.querySelectorAll('.trust-stat .stat-number');
  const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const text = entry.target.textContent;
        if (text.includes('+')) {
          const number = parseInt(text.replace(/\D/g, ''));
          animateCounter(entry.target, number, 1500);
        } else if (text.includes('%')) {
          const number = parseInt(text.replace(/\D/g, ''));
          animateCounter(entry.target, number, 1500);
        }
        trustObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  trustStats.forEach((stat) => trustObserver.observe(stat));
}

// Inicializar animações de confiança
setTimeout(() => {
  animateTrustStats();
}, 3000);

// Animação de revelação de texto
function initTextReveal() {
  const fadeTexts = document.querySelectorAll('.fade-in-text');
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        textObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  fadeTexts.forEach((text) => textObserver.observe(text));
}

// Animação de checkmarks
function initCheckmarkAnimation() {
  const checkmarkItems = document.querySelectorAll('.checkmark-item');
  const checkmarkObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 200);
        checkmarkObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  checkmarkItems.forEach((item) => checkmarkObserver.observe(item));
}

// Inicializar animações da seção sobre
setTimeout(() => {
  initTextReveal();
  initCheckmarkAnimation();
}, 1000);

// Criar partículas flutuantes para CTA e Footer
function createCTAParticles() {
  const ctaParticles = document.querySelector('.cta-particles');
  if (ctaParticles) {
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.className = 'cta-particle';
      particle.style.animationDelay = `${i * 1}s`;
      ctaParticles.appendChild(particle);
    }
  }
}

function createFooterParticles() {
  const footerParticles = document.querySelector('.footer-particles');
  if (footerParticles) {
    for (let i = 0; i < 4; i++) {
      const particle = document.createElement('div');
      particle.className = 'footer-particle';
      particle.style.animationDelay = `${i * 2}s`;
      footerParticles.appendChild(particle);
    }
  }
}

// Inicializar partículas
document.addEventListener('DOMContentLoaded', () => {
  createCTAParticles();
  createFooterParticles();
});

// Efeito de contador animado
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  
  updateCounter();
}

// Animar contadores quando visíveis
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const text = entry.target.textContent;
      const number = parseInt(text.replace(/\D/g, ''));
      if (number) {
        animateCounter(entry.target, number);
        counterObserver.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.5 });

counters.forEach((counter) => counterObserver.observe(counter));

// Filtros de categoria do blog
const categoryFilters = document.querySelectorAll('.category-filter');
const posts = document.querySelectorAll('.post');

categoryFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    // Remove active class from all filters
    categoryFilters.forEach(f => f.classList.remove('active'));
    // Add active class to clicked filter
    filter.classList.add('active');
    
    const category = filter.getAttribute('data-category');
    
    posts.forEach(post => {
      if (category === 'all' || post.getAttribute('data-category') === category) {
        post.style.display = 'block';
        post.style.animation = 'fadeIn 0.3s ease';
      } else {
        post.style.display = 'none';
      }
    });
  });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);


