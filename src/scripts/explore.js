// load json from ../DATA.json
let data = require('../DATA.json');
data = data['restaurants']
// load DETAIL.json
let detail = require('../DETAIL.json');
detail = detail['restaurants']

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
            <article class="card">
                <span class="city">City</span>
                <img src="${item.pictureId}" alt="${item.name}">
                <div class="content">
                    <span class="rating">Rating: ${item.rating}</span>
                    <header>
                    <h1>${item.name}</h1>
                    </header>
                    <p class="description">
                    ${item.description}
                    </p>
                    <div class="right"><button type="button" class="btn-detail" modal-target="${item.id}">Detail Lainnya</button></div>
                </div>
            </article>
        </div>
        <div class="modal" id="${item.id}">
            <article class="modal-content">
                <header class="modal-header">
                    <h1>${item.name} | Detail</h1>
                    <span class="close">&times;</span>
                </header>
                <img src="${item.pictureId}" alt="${item.name}" class="img-thumbnail">
                <div class="modal-body">
                    <table>
                        <tr>
                            <td>Address</td>
                            <td>${item.address}</td>
                        </tr>
                        <tr>
                            <td>Menu</td>
                            <td>
                                <ul>
                                    ${menu}
                                </ul>
                            </td>
                    </table>
                </div>
            </article>
        </div>
        `;
        }).join('');