const elForm = document.querySelector('.js-form');
const elInput = document.querySelector('.js-input');
const elList = document.querySelector('.js-list');
const elAll = document.querySelector('.js-all');
const elComplated = document.querySelector('.js-complated');
const elUncomplated = document.querySelector('.js-uncomplated');
const elBtns = document.querySelector('.js-btns');
const elButtn = document.querySelector('.js-buttn');
const localData = JSON.parse(window.localStorage.getItem('List'));
const itemFragment = document.createDocumentFragment();
var theme = false;

const todos = localData || [];

const renderTodos = (array, node) => {
	elAll.textContent = todos.length;
	elComplated.textContent = todos.filter((item) => item.isComplated).length;
	elUncomplated.textContent = todos.filter((item) => !item.isComplated).length;
	elList.innerHTML = '';
	array.forEach((item) => {
		let newItem = document.createElement('li');
		let newSpan = document.createElement('span');
		let newButton = document.createElement('button');
		let newInp = document.createElement('input');

		newSpan.textContent = item.text;
		newInp.type = 'checkbox';
		newButton.textContent = 'Delete';

		newItem.appendChild(newInp);
		newItem.appendChild(newSpan);
		newItem.appendChild(newButton);

		newItem.setAttribute('class', 'd-flex align-items-center mb-2');
		newInp.setAttribute('class', 'form-check-input me-2 js-checkbo');
		newButton.setAttribute('class', 'ms-auto btn btn-danger js-button');
		newButton.dataset.todoId = item.id;
		newInp.dataset.todoId = item.id;

		itemFragment.appendChild(newItem);

		if (item.isComplated) {
			newSpan.setAttribute('class', 'text-decoration-line-through');
			newInp.checked = true;
		}
	});
	node.appendChild(itemFragment)
};

renderTodos(todos, elList);

elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	let elInVal = elInput.value;
	elInput.value = '';
	todos.push({
		id: todos.length ? todos[todos.length - 1].id + 1 : 1,
		text: elInVal,
		isComplated: false,
	});

	renderTodos(todos, elList);
	window.localStorage.setItem('List', JSON.stringify(todos));
});

elList.addEventListener('click', (evt) => {
	if (evt.target.matches('.js-button')) {
		let todoId = evt.target.dataset.todoId;

		let findedIndex = todos.findIndex((el) => el.id == todoId);

		todos.splice(findedIndex, 1);
		renderTodos(todos, elList);
		window.localStorage.setItem('List', JSON.stringify(todos));
	}
	if (evt.target.matches('.js-checkbo')) {
		let todoId = +evt.target.dataset.todoId;

		let findedItem = todos.find((el) => el.id === todoId);

		findedItem.isComplated = !findedItem.isComplated;
		renderTodos(todos, elList);
		window.localStorage.setItem('List', JSON.stringify(todos));
	}
});

elBtns.addEventListener('click', (evt) => {
	if (evt.target.matches('.js-all-btn')) {
		renderTodos(todos, elList);
	}
	if (evt.target.matches('.js-comp-btn')) {
		const filteredArr = todos.filter((item) => item.isComplated);
		renderTodos(filteredArr, elList);
	}
	if (evt.target.matches('.js-uncomp-btn')) {
		const filteredArr = todos.filter((item) => !item.isComplated);
		renderTodos(filteredArr, elList);
	}
	if (evt.target.matches('.js-danger-btn')) {
		window.localStorage.removeItem('List');
		window.location.reload();
		renderTodos(filteredArr, elList);
	}
});

elButtn.addEventListener('click', () => {
	theme = !theme;
	window.localStorage.setItem('theme', theme ? 'dark' : 'light');
	changeTheme();
});

function changeTheme() {
	if (window.localStorage.getItem('theme') == 'dark') {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
}
changeTheme();
