const params = new URLSearchParams(window.location.search);
const projectId = parseInt(params.get("id"));

const project = projects.find(p => p.id === projectId);

if (project) {
  document.getElementById("title").textContent = project.title;
  document.getElementById("description").textContent = project.description;
  document.getElementById("project-image").src = project.image;
  document.getElementById("demo-link").href = project.demolink;
  document.getElementById("source-link").href = project.sourceLink;
} else {
  document.getElementById("title").textContent = "پروژه یافت نشد!";}