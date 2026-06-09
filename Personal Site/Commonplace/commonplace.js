const grid = document.getElementById('cp-grid')
const filterBtns = document.querySelectorAll('.cp-filter-btn')

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter
    filterBtns.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')

    grid.querySelectorAll('.cp-card').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.type !== filter
    })
  })
})
