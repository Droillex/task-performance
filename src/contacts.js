const contacts = document.getElementsByClassName("contacts")[0];
const contactsContainer = document.getElementsByClassName("contacts-container")[0];
const stickyHeader = document.getElementsByClassName("stickyHeader")[0];

const ITEM_HEIGHT = 18.5;
const CONTAINER_HEIGHT = 300;
const ITEM_COUNT = 50000;
const TOLERANCE = 10;
let config = {from: 0, to: 0};

function rerenderList() {
  const newConfig = calculateVisibleRange();
  if (newConfig.from !== config.from || newConfig.to !== config.to) {
    contactsContainer.innerHTML = "";
    for(let i = newConfig.from; i < newConfig.to; i++) {
      const child = document.createElement("div");
      child.textContent = i;
      child.classList.add("contact");
      contactsContainer.appendChild(child);
    }
    contactsContainer.style.paddingTop = `${newConfig.topOffset}px`;
    contactsContainer.style.paddingBottom = `${newConfig.bottomOffset}px`;
  }
  config = newConfig;
}

function calculateVisibleRange() {
  const from = Math.max(0, Math.floor(contacts.scrollTop / ITEM_HEIGHT) - TOLERANCE);
  const topOffset = from * ITEM_HEIGHT;
  const to = Math.min(ITEM_COUNT, Math.ceil(from + (CONTAINER_HEIGHT / ITEM_HEIGHT)) + TOLERANCE);
  const bottomOffset = (ITEM_COUNT - to) * ITEM_HEIGHT;
  return {from, to, topOffset, bottomOffset};
}

contacts.addEventListener("scroll", (e) => {
  rerenderList();
  const contactIndex = Math.floor(contacts.scrollTop / ITEM_HEIGHT);
  stickyHeader.textContent = contactIndex.toString();
});

rerenderList();