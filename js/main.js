// ============================================
// openSUSE Adaptive Branding — Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // --- openSUSE universe toolbar panel ---
  const uniBtn   = document.getElementById('uni-btn');
  const uniPanel = document.getElementById('uni-panel');

  if (uniBtn && uniPanel) {
    const setOpen = open => {
      uniPanel.classList.toggle('open', open);
      uniBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    uniBtn.addEventListener('click', () => {
      setOpen(!uniPanel.classList.contains('open'));
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && uniPanel.classList.contains('open')) {
        setOpen(false);
        uniBtn.focus();
      }
    });

    document.addEventListener('click', event => {
      if (!uniPanel.classList.contains('open')) return;
      if (uniPanel.contains(event.target) || uniBtn.contains(event.target)) return;
      setOpen(false);
    });
  }

  // --- Active page-section link highlight on scroll ---
  const pageAnchors = Array.from(document.querySelectorAll('.page-links a'));
  const anchorTargets = pageAnchors
    .map(link => ({ link, target: document.getElementById(link.hash.slice(1)) }))
    .filter(({ target }) => target);

  const markActive = () => {
    const scrollY = window.scrollY + 100;
    let activeHash = '';

    anchorTargets.forEach(({ link, target }) => {
      const top = target.offsetTop;
      const bottom = top + target.offsetHeight;
      if (scrollY >= top && scrollY < bottom) activeHash = link.hash;
    });

    pageAnchors.forEach(link => {
      link.classList.toggle('active', link.hash === activeHash);
    });
  };
  window.addEventListener('scroll', markActive, { passive: true });
  markActive();

  // --- Copy hex on swatch click (product DNA + project brand) ---
  document.querySelectorAll('.color-swatch, .pb-swatch').forEach(swatch => {
    swatch.style.cursor = 'pointer';
    swatch.title = 'Click to copy hex';
    swatch.addEventListener('click', () => {
      const code = swatch.querySelector('code');
      if (!code) return;
      const hex = code.textContent.trim();
      navigator.clipboard.writeText(hex).then(() => {
        const original = code.textContent;
        code.textContent = 'Copied!';
        swatch.classList.add('copied');
        setTimeout(() => {
          code.textContent = original;
          swatch.classList.remove('copied');
        }, 1200);
      });
    });
  });

  // --- Subtle entrance animation (Intersection Observer) ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .color-swatch').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(el);
  });
});
