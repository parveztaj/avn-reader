const chapterPicker = document.getElementById('chapter-picker');
const legacyChapters = {'chapter-0': 'part-1-chapter-1'};
function syncHash() {
  const oldId = location.hash.slice(1);
  if (!oldId) return;
  let id = legacyChapters[oldId] || oldId;
  let target = document.getElementById(id);
  if (!target) {
    id = 'prologue';
    target = document.getElementById(id);
  }
  const chapter = target?.closest('.chapter');
  if (!chapter) return;
  chapterPicker.value = chapter.id;
  if (id !== oldId) {
    history.replaceState(null, '', `#${id}`);
    target.scrollIntoView();
  }
}
chapterPicker.addEventListener('change', () => {
  const chapter = document.getElementById(chapterPicker.value);
  if (!chapter) return;
  chapter.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  history.replaceState(null, '', `#${chapter.id}`);
});
if ('IntersectionObserver' in window) {
  const chapterObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) chapterPicker.value = entry.target.closest('article').id;
    }
  }, {rootMargin: '0px 0px -65% 0px', threshold: 0});
  document.querySelectorAll('.chapter-heading').forEach(heading => chapterObserver.observe(heading));
}
window.addEventListener('hashchange', syncHash);
syncHash();
