/**
 * EZEOUGU JOSHUA UCHECHUKWU - PORTFOLIO INTERACTIVE SCRIPT
 * Video Editor & Motion Graphics Designer
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initContactForm();
  initCopyButtons();
});

/* 1. Navbar Scroll State & Mobile Toggle */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Handle header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  if (mobileToggle && navLinks) {
    const toggleMenu = (open) => {
      const shouldOpen = typeof open === 'boolean' ? open : !navLinks.classList.contains('mobile-open');
      if (shouldOpen) {
        navLinks.classList.add('mobile-open');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-locked');
      } else {
        navLinks.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-locked');
      }
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking nav links
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          toggleMenu(false);
        }
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
        toggleMenu(false);
      }
    });

    // Close when clicking outside of the header
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('mobile-open') && !header.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Reset on window resize if larger than tablet breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navLinks.classList.contains('mobile-open')) {
        toggleMenu(false);
      }
    });
  }
}

/* 2. Interactive Contact Form (Email Auto-Composer) */
function initContactForm() {
  const form = document.getElementById('projectInquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName').value.trim();
    const email = document.getElementById('clientEmail').value.trim();
    const projectType = document.getElementById('clientProjectType').value;
    const details = document.getElementById('clientDetails').value.trim();

    if (!name || !email || !details) {
      alert('Please fill out all required fields.');
      return;
    }

    const subject = encodeURIComponent(`Project Inquiry: ${projectType} - from ${name}`);
    const body = encodeURIComponent(
      `Hello Joshua,\n\nI reviewed your portfolio and would like to collaborate.\n\n` +
      `Client Name: ${name}\n` +
      `Client Email: ${email}\n` +
      `Project Category: ${projectType}\n\n` +
      `Project Overview & Details:\n${details}\n\n` +
      `Looking forward to hearing from you!`
    );

    window.location.href = `mailto:ezeouguj@gmail.com?subject=${subject}&body=${body}`;

    const submitBtn = form.querySelector('.form-submit-btn');
    const origText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Opening Email Client...</span>';
    submitBtn.style.opacity = '0.8';

    setTimeout(() => {
      submitBtn.innerHTML = origText;
      submitBtn.style.opacity = '1';
    }, 3000);
  });
}

/* 3. Quick Copy for Email & Phone */
function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      const textToCopy = el.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalTitle = el.getAttribute('title') || '';
        el.setAttribute('title', 'Copied to clipboard!');
        
        // Show temporary visual feedback
        const notification = document.createElement('div');
        notification.textContent = `Copied "${textToCopy}" to clipboard!`;
        notification.style.position = 'fixed';
        notification.style.bottom = '24px';
        notification.style.right = '24px';
        notification.style.background = '#d4a373';
        notification.style.color = '#141211';
        notification.style.padding = '10px 18px';
        notification.style.borderRadius = '8px';
        notification.style.fontWeight = '700';
        notification.style.fontSize = '0.88rem';
        notification.style.zIndex = '9999';
        notification.style.boxShadow = '0 8px 24px rgba(212, 163, 115, 0.4)';
        document.body.appendChild(notification);

        setTimeout(() => {
          notification.remove();
          el.setAttribute('title', originalTitle);
        }, 2500);
      }).catch(() => {
        // Fallback or ignore
      });
    });
  });
}
