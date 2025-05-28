document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    observer.observe(section);
  });

  const text = "Software Engineer";
  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      document.getElementById("typing-text").innerHTML += text.charAt(index);
      index++;
      setTimeout(typeEffect, 50);
    }
  }
  typeEffect();

  const toggle = document.getElementById('theme-toggle');
  const themeLink = document.createElement('link');
  themeLink.rel = 'stylesheet';
  document.head.appendChild(themeLink);

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    themeLink.href = 'dark-mode.css';
    toggle.checked = true;
  } else {
    themeLink.href = 'light-mode.css';
    toggle.checked = false;
  }

  // Toggle theme on switch
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      themeLink.href = 'dark-mode.css';
      localStorage.setItem('theme', 'dark');
    } else {
      themeLink.href = 'light-mode.css';
      localStorage.setItem('theme', 'light');
    }
  });

  // Modal logic
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.querySelector(".close-btn");

  window.toggleDetails = function (card) {
    const title = card.querySelector("h3").innerText;
    const rawDetails = card.querySelector(".project-details").cloneNode(true);

    const enhanced = document.createElement("div");
    enhanced.classList.add("modal-enhanced");

    rawDetails.querySelectorAll("p").forEach(p => {
      const strong = p.querySelector("strong");
      if (strong) {
        const label = strong.innerText.replace(":", "");
        const value = p.innerHTML.replace(strong.outerHTML, "").trim();
        enhanced.innerHTML += `
          <div class="modal-block">
            <div class="modal-label"><i class="fas fa-tag"></i> ${label}</div>
            <div class="modal-value">${value}</div>
          </div>
        `;
      } else {
        enhanced.innerHTML += `<p class="modal-desc">${p.innerText}</p>`;
      }
    });

    const ul = rawDetails.querySelector("ul");
    if (ul) {
      enhanced.innerHTML += `
        <div class="modal-tasks">
          <h4><i class="fas fa-tasks"></i> Responsibilities</h4>
          <ul>${ul.innerHTML}</ul>
        </div>
      `;
    }

    const link = rawDetails.querySelector("a");
    if (link) {
      enhanced.innerHTML += `<a href="${link.href}" target="_blank" class="modal-link"><i class="fab fa-github"></i> View on GitHub</a>`;
    }

    modalBody.innerHTML = `<h3>${title}</h3>${enhanced.outerHTML}`;
    modal.style.display = "block";
  };

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});