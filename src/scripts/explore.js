// load json from ../DATA.json
let data = require('../DATA.json');
data = data['restaurants'];
// load DETAIL.json
let detail = require('../DETAIL.json');
detail = detail['restaurants'];

// join data and detail
let data_detail = data.map(function(d, i) {
    return Object.assign(d, detail[i]);
});

// print data_list to .list
let list = document.querySelector('.explore .list');
list.innerHTML = data_detail.map(item =>{
    const menu = item.menu.map(d => `<li>${d}</li>`).join('');
    return `
        <div class="wrapper">
            <article class="card" tabindex="0">
                <span class="city">${item.city}</span>
                <img src="${item.pictureId}" alt="${item.name}">
                <div class="content">
                    <span class="rating">Rating: ${item.rating}</span>
                    <header>
                    <h1 tabindex="0">${item.name}</h1>
                    </header>
                    <p class="description" tabindex="0">
                    ${item.description}
                    </p>
                    <div class="right"><button type="button" tabindex="0" class="btn-detail" modal-target="${item.id}">More Detail</button></div>
                </div>
                
            </article>
        </div>
        <div class="modal" id="${item.id}">
            <div class="helper" tabindex="0">
                Modal has been opened. Press escape to close.
            </div>
            <article class="modal-content">
                <header class="modal-header">
                    <h1 tabindex="0">${item.name} | Detail</h1>
                    <span class="close">&times;</span>
                </header>
                <img src="${item.pictureId}" alt="${item.name}" class="img-thumbnail">
                <div class="modal-body">
                    <table>
                        <tr tabindex="0">
                            <td>Address</td>
                            <td>${item.address}</td>
                        </tr>
                        <tr tabindex="0">
                            <td>Menu</td>
                            <td>
                                <ul>
                                    ${menu}
                                </ul>
                            </td>
                    </table>
                </div>
            </article>
            <button class="helper close" tabindex="0">
                Press enter at this point or press escape to close modal.
            </button>
        </div>
        <a href="#skipContent" class="helper">Press enter to back to main helper or press tab to the next card</a>
        `;
}).join('');