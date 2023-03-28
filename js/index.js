const BACKEND_ROOT_URL = 'http://localhost:3001';
const list = document.querySelector('#todolist');
const input = document.querySelector('#newtodo');
input.disabled = true;
fetch(BACKEND_ROOT_URL)
    .then(response => response.json())
    .then((response) => {
    response.forEach(node => {
        renderTask(node.description);
    });
    input.disabled = false;
}, (error) => {
    alert(error);
});
/*
input.addEventListener('keypress',event => {
    if(event.key === "Enter"){
        event.preventDefault()
        const text = input.value.trim()
        if(text !== ''){
            renderTask(text)
            input.value = ''
        }
    }
})
*/
input.addEventListener('keypress', event => {
    if (event.key === "Enter") {
        event.preventDefault();
        const text = input.value.trim();
        if (text !== '') {
            const json = JSON.stringify({ description: text });
            fetch(BACKEND_ROOT_URL + '/new', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
                .then(response => response.json())
                .then((respose) => {
                renderTask(text);
                input.value = '';
            }, (error) => {
                alert(error);
            });
        }
    }
});
const renderTask = (text) => {
    const list_item = document.createElement('li');
    list_item.setAttribute('class', 'list-group-item');
    list_item.innerHTML = text;
    list.append(list_item);
};
