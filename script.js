const editor = document.querySelector("#editor");
const titleInput = document.querySelector("#documentTitle");
const fileInput = document.querySelector("#fileInput");
const newDocButton = document.querySelector("#newDoc");
const downloadButton = document.querySelector("#downloadDoc");
const copyButton = document.querySelector("#copyDoc");
const tabbar = document.querySelector("#tabbar");
const saveState = document.querySelector("#saveState");
const lineCount = document.querySelector("#lineCount");
const wordCount = document.querySelector("#wordCount");
const charCount = document.querySelector("#charCount");

const STORAGE_KEY = "notepad-app-tabs";
const LEGACY_STORAGE_KEY = "notepad-app-draft";
let saveTimer;
let documents = [];
let activeDocumentId;

function createDocument(title = "Untitled", text = "") {
  return {
    id: window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
    title,
    text,
  };
}

function getActiveDocument() {
  return documents.find((doc) => doc.id === activeDocumentId) || documents[0];
}

function pluralize(count, label) {
  return `${count} ${label}${count === 1 ? "" : "s"}`;
}

function updateStats() {
  const text = editor.value;
  const lines = text.length === 0 ? 1 : text.split(/\n/).length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  lineCount.textContent = pluralize(lines, "line");
  wordCount.textContent = pluralize(words, "word");
  charCount.textContent = pluralize(text.length, "character");
}

function syncActiveDocument() {
  const activeDoc = getActiveDocument();
  if (!activeDoc) return;

  activeDoc.title = titleInput.value.trim() || "Untitled";
  activeDoc.text = editor.value;
}

function renderTabs() {
  tabbar.innerHTML = "";

  documents.forEach((doc) => {
    const tab = document.createElement("button");
    tab.className = "document-tab";
    tab.type = "button";
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(doc.id === activeDocumentId));
    tab.title = doc.title || "Untitled";
    tab.dataset.documentId = doc.id;

    const label = document.createElement("span");
    label.textContent = doc.title || "Untitled";
    tab.append(label);

    if (documents.length > 1) {
      const close = document.createElement("span");
      close.className = "tab-close";
      close.textContent = "x";
      close.setAttribute("aria-hidden", "true");
      tab.append(close);
    }

    tabbar.append(tab);
  });
}

function displayActiveDocument() {
  const activeDoc = getActiveDocument();
  if (!activeDoc) return;

  activeDocumentId = activeDoc.id;
  titleInput.value = activeDoc.title || "Untitled";
  editor.value = activeDoc.text || "";
  renderTabs();
  updateStats();
}

function persistDraft() {
  syncActiveDocument();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      activeDocumentId,
      documents,
    }),
  );
  saveState.textContent = "Draft saved";
  renderTabs();
}

function queueSave() {
  saveState.textContent = "Saving...";
  clearTimeout(saveTimer);
  saveTimer = window.setTimeout(persistDraft, 250);
}

function loadDraft() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    const legacySaved = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacySaved) {
      try {
        const draft = JSON.parse(legacySaved);
        documents = [createDocument(draft.title || "Untitled", draft.text || "")];
        activeDocumentId = documents[0].id;
        displayActiveDocument();
        persistDraft();
        return;
      } catch {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      }
    }

    documents = [createDocument()];
    activeDocumentId = documents[0].id;
    displayActiveDocument();
    return;
  }

  try {
    const draft = JSON.parse(saved);
    documents = Array.isArray(draft.documents)
      ? draft.documents.map((doc) => ({
          id: doc.id || createDocument().id,
          title: doc.title || "Untitled",
          text: doc.text || "",
        }))
      : [];
    activeDocumentId = draft.activeDocumentId;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  if (documents.length === 0) {
    documents = [createDocument()];
  }

  if (!documents.some((doc) => doc.id === activeDocumentId)) {
    activeDocumentId = documents[0].id;
  }

  displayActiveDocument();
}

function addDocument(title = "Untitled", text = "") {
  syncActiveDocument();

  const newDoc = createDocument(title, text);
  documents.push(newDoc);
  activeDocumentId = newDoc.id;
  displayActiveDocument();
  persistDraft();
  editor.focus();
}

function switchDocument(documentId) {
  if (documentId === activeDocumentId) return;

  syncActiveDocument();
  activeDocumentId = documentId;
  displayActiveDocument();
  persistDraft();
  editor.focus();
}

function closeDocument(documentId) {
  if (documents.length === 1) return;

  syncActiveDocument();

  const closingIndex = documents.findIndex((doc) => doc.id === documentId);
  if (closingIndex === -1) return;

  const closingDocument = documents[closingIndex];
  const hasContent = closingDocument.text.trim() || closingDocument.title.trim() !== "Untitled";
  if (hasContent && !window.confirm(`Close "${closingDocument.title || "Untitled"}"?`)) return;

  documents.splice(closingIndex, 1);

  if (documentId === activeDocumentId) {
    const nextDocument = documents[closingIndex] || documents[closingIndex - 1] || documents[0];
    activeDocumentId = nextDocument.id;
  }

  displayActiveDocument();
  persistDraft();
  editor.focus();
}

function downloadDocument() {
  const title = titleInput.value.trim() || "Untitled";
  const fileName = `${title.replace(/[\\/:*?"<>|]+/g, "-") || "Untitled"}.txt`;
  const blob = new Blob([editor.value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

async function copyDocument() {
  try {
    await navigator.clipboard.writeText(editor.value);
    saveState.textContent = "Copied";
    window.setTimeout(() => {
      saveState.textContent = "Draft saved";
    }, 1000);
  } catch {
    editor.select();
    document.execCommand("copy");
  }
}

function openFile(event) {
  const [file] = event.target.files;
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    addDocument(file.name.replace(/\.[^.]+$/, "") || "Untitled", String(reader.result || ""));
  });
  reader.readAsText(file);
  fileInput.value = "";
}

editor.addEventListener("input", () => {
  updateStats();
  syncActiveDocument();
  queueSave();
});

titleInput.addEventListener("input", () => {
  syncActiveDocument();
  renderTabs();
  queueSave();
});
newDocButton.addEventListener("click", () => addDocument());
downloadButton.addEventListener("click", downloadDocument);
copyButton.addEventListener("click", copyDocument);
fileInput.addEventListener("change", openFile);
tabbar.addEventListener("click", (event) => {
  const tab = event.target.closest(".document-tab");
  if (!tab) return;

  const documentId = tab.dataset.documentId;
  if (event.target.closest(".tab-close")) {
    closeDocument(documentId);
    return;
  }

  switchDocument(documentId);
});

window.addEventListener("keydown", (event) => {
  const shortcut = event.ctrlKey || event.metaKey;
  if (!shortcut) return;

  if (event.key.toLowerCase() === "s") {
    event.preventDefault();
    downloadDocument();
  }

  if (event.key.toLowerCase() === "o") {
    event.preventDefault();
    fileInput.click();
  }
});

loadDraft();

// Register Service Worker for PWA support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch((error) => {
    console.log('Service Worker registration failed:', error);
  });
}

