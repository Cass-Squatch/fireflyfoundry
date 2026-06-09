const list = document.getElementById('review-list')
const filterBtns = document.querySelectorAll('[data-filter]')
const sortBtns = document.querySelectorAll('[data-sort]')

let currentFilter = 'all'
let currentSort = 'rating'

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
    currentSort = btn.dataset.sort
    sortBtns.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    apply()
  })
})

function apply() {
  const all = Array.from(list.querySelectorAll('.review-entry'))

  all.forEach(entry => {
    entry.hidden = currentFilter !== 'all' && entry.dataset.genre !== currentFilter
  })

  const visible = all.filter(e => !e.hidden)
  visible.sort((a, b) => {
    if (currentSort === 'rating') return b.dataset.rating - a.dataset.rating
    if (currentSort === 'title')  return a.dataset.title.localeCompare(b.dataset.title)
    return 0
  })

  visible.forEach(entry => list.appendChild(entry))
}
