const editor = document.getElementById("editor");
const loadBtn = document.getElementById("load-file");
const downloadBtn = document.getElementById("download-file");
const copyBtn = document.getElementById("copy-file");

async function loadFromSite() {
  try {
    const res = await fetch("../menu-data.js", { cache: "no-store" });
    if (!res.ok) throw new Error("Falha ao carregar menu-data.js");
    const text = await res.text();
    editor.value = text;
  } catch (err) {
    editor.value = "// Não foi possível carregar menu-data.js automaticamente.\n" +
      "// Cole o conteúdo aqui e edite.\n";
  }
}

function downloadFile() {
  const content = editor.value.trim() + "\n";
  const blob = new Blob([content], { type: "application/javascript" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "menu-data.js";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function copyAll() {
  try {
    await navigator.clipboard.writeText(editor.value);
    copyBtn.textContent = "Copiado";
    setTimeout(() => (copyBtn.textContent = "Copiar tudo"), 1200);
  } catch (err) {
    copyBtn.textContent = "Falha ao copiar";
    setTimeout(() => (copyBtn.textContent = "Copiar tudo"), 1200);
  }
}

loadBtn.addEventListener("click", loadFromSite);

downloadBtn.addEventListener("click", downloadFile);
copyBtn.addEventListener("click", copyAll);

loadFromSite();
