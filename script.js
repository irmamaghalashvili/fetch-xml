'use strict';
// davaleba 1
function getNameAndYear() {
    fetch('https://reqres.in/api/unknown', {
        method: 'GET'
    })
    .then(function(gotAsText){
        if (gotAsText.status !== 200) {
            throw gotAsText.status;
        }
            return gotAsText.json();
    })
    .then(function(gotAsJs) {
        gotAsJs.data.forEach(item => {
            let li = document.createElement('li');
            li.innerText = `${item.name} ${item.year}`;
            li.classList = 'li-fetch';
    
            document.getElementById('fetch-ul').appendChild(li);
        });
    })
    .catch(function() {

    })
}
getNameAndYear();

// davaleba 2
let currentPage = 1;
let totalPages;

function getUsers(page) {
    let requist = new XMLHttpRequest();

requist.addEventListener('load', function() {
    let gotInfoText = requist.responseText;
    let gotIfoJs = JSON.parse(gotInfoText);

    const fragment = new DocumentFragment();
    gotIfoJs.data.forEach(item => {
        let li = document.createElement('li');
        li.innerText = `${item.first_name} ${item.last_name}`;
        li.classList = 'li-xml';
        fragment.appendChild(li);  
    });
    document.getElementById('ul-id').innerHTML = ' ';
    document.getElementById('ul-id').appendChild(fragment);

    totalPages = gotIfoJs.total_pages;
});

requist.addEventListener('error', function () {
    let p = document.createElement('p');
    p.innerText = 'Server Error';
    document.getElementById('div-id').appendChild(p);
});

requist.open('GET', 'https://reqres.in/api/users?page=' + page);
requist.send();
}

document.getElementById('prev-btn-id').addEventListener('click' , function() {
    if (currentPage == 1) {
        return;
    }
    currentPage --;
    getUsers(currentPage);
});
document.getElementById('next-btn-id').addEventListener('click' , function() {
    if (currentPage == totalPages) {
        return;
    }
    currentPage ++;
    getUsers(currentPage);
});
getUsers(currentPage);