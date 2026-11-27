document.querySelectorAll('[data-plan-picker]').forEach(picker => {
  const control = picker.querySelector('.guide-plan-choice');
  const select = control.querySelector('select');
  const cards = picker.querySelectorAll('[data-plan-peer]');
  const showSelected = () => {
    cards.forEach(card => { card.hidden = card.dataset.planPeer !== select.value; });
  };
  select.addEventListener('change', showSelected);
  window.addEventListener('pageshow', showSelected);
  showSelected();
  control.hidden = false;
});
