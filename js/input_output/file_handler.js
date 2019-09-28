'use strict'

const save_file = () => {
    let text = $(`#input`).val();
    let start = text.indexOf('[INIT');

    if (start > -1) {
        text = text.substring(start + 6);
        let folder = text.substring(text.indexOf('Folder:') + 7);
        folder = folder.substring(0, folder.indexOf(`\n`));
        text = text.substring(start + 6);
        let file = text.substring(text.indexOf('File:') + 5);
        file = file.substring(0, file.indexOf(`\n`));
        folder = folder.trim();
        file = file.trim();
        let item = `kaz-${folder}/${file}`;
        console.log('>' + item + '<');
        localStorage.setItem(item, JSON.stringify($(`#input`).val()));
    }
}

const file_list = () => {
    $('#file-display').show();
    $('#main-display').hide();
    $(`#list-of-files`).remove();
    let items = `<div id="list-of-files"><br/><button class="button btn-sm btn-danger btn-block field-button" id="return-to-build">Return to Build</button><br/>`
    items += `<div class="row"><h5>&nbsp;&nbsp;Saved Pages...</h5><br/><br/></div>`;
    for (let i = 0; i < localStorage.length; i++) {
        let key = window.localStorage.key(i);
        let key_transformed = key.replace('/', '_');
        if (key.substring(0, 4) === `kaz-`) {
            key = key.substring(4)
            console.log(key)
            items += `
        <div class="row load-btn-row">
          <div class="col-md-2"><button class="${BTN} del-file-btn" id="del-file-${key_transformed}">Del</button></div>
          <div class="col"><h5>${key}</h5></div>
          <div class="col-md-3"><button class="${BTN} load-btn" id="${key_transformed}">Load</button></div>
        </div>`
        }
    }
    items += `</div>`
    $('#file-display').append(items);
}

const load_casa = (id) => {
    console.log(id)
    let key = id.replace('_', '/')
    let input = JSON.parse(localStorage.getItem(key));
    $(`#input`).val(input);
    $("#file-display").hide();
    $("#main-display").show();
}



const delete_file = (id) => {
    id = id.substring(9);
    localStorage.removeItem(id.replace('_', '/'));
    file_list();
}