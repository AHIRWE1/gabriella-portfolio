document.addEventListener("DOMContentLoaded", () => {
  // === Contact Form Validation ===
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (!email.includes("@") || message.trim() === "") {
        e.preventDefault();
        alert("Please enter a valid email and message.");
      }
    });
  }

  // === Show GitHub Projects ===
  const showBtn = document.getElementById("show-projects");
  const repoContainer = document.getElementById("repo-container");
  const username = "AHIRWE1"; // ✅ Your GitHub username

  showBtn?.addEventListener("click", () => {
    showBtn.hidden = true; // Hide the button after click
    repoContainer.hidden = false;
    repoContainer.classList.add("fade-in");

    fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((repos) => {
        repoContainer.innerHTML = "";

        const recentRepos = repos
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, 6); // Show 6 most recent

        recentRepos.forEach((repo) => {
          const card = document.createElement("div");
          card.className = "repo-card";
          card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description provided."}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
          `;
          repoContainer.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Error loading repos:", error);
        repoContainer.innerHTML = "<p>Could not load repositories.</p>";
      });
  });
});
