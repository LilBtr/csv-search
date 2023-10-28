const list = document.getElementById('list')
const search = document.getElementById('search')
const searchBtn = document.getElementById('searchBtn')

async function searchInfo(body) {
	let response = await fetch(`/?search=${body}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	let result = await response.json()
	for (let i = 0; i < result.result.length; i++) {
		list.insertAdjacentHTML('afterbegin', wrapper(result.result[i], i))
	}
}

const wrapper = (item, index) => {
	return `<li data-index="${index}" class="short"><span><b>Код:</b>${item[0]} <b>ФИО:</b>${item[1]} <b>ГЕО:</b>${item[3]}</span><span></br>${item[2]} ${item[4]} ${item[5]} ${item[6]}</span></li>`
}

list.addEventListener('click', (e) => {
	if (e.target.localName === 'li') {
		e.target.classList.contains('short')
			? e.target.classList.remove('short')
			: e.target.classList.add('short')
	}
})

searchBtn.addEventListener('click', () => {
	if (search.value) {
		list.innerHTML = ''
		searchInfo(search.value)
	}
})
