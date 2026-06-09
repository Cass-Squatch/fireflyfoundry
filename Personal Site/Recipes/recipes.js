const grid = document.getElementById('recipe-grid')
const filterBtns = document.querySelectorAll('[data-filter]')
const sortBtns = document.querySelectorAll('[data-sort]')

let currentFilter = 'all'

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter
    filterBtns.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    apply()
  })
})

sortBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    sortBtns.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    apply()
  })
})

function apply() {
  const all = Array.from(grid.querySelectorAll('.recipe-card'))

  all.forEach(card => {
    card.hidden = currentFilter !== 'all' && card.dataset.category !== currentFilter
  })

  const visible = all.filter(c => !c.hidden)
  visible.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title))
  visible.forEach(card => grid.appendChild(card))
}
