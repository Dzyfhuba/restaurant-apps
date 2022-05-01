// load json from ../DATA.json
let data = require('../DATA.json');

// print data to .list
let list = document.querySelector('.explore .list');
list.innerHTML = data['restaurants'].map(item => {
    return `
    <div class="wrapper">
        <article class="card">
            <span class="city">City</span>
            <img src="${item.pictureId}" alt="">
            <div class="content">
                <span class="rating">Rating: ${item.rating}</span>
                <header>
                    <h1>${item.name}</h1>
                </header>
                <p class="description">
                    ${item.description}
                </p>
            </div>
        </article>
    </div>
    `;
    }).join('');

    