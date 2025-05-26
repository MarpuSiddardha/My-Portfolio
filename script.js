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

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });

  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.querySelector(".close-btn");

  window.toggleDetails = function (card) {
  const title = card.querySelector("h3").innerText;
  const rawDetails = card.querySelector(".project-details").cloneNode(true);
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body");

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
