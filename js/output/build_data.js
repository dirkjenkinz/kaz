`use strict`

const fieldNames = [`INIT`, `CODE`, `DATE`, `ADDRESS`, `NINO`, `PARAGRAPH`, `PHONE`, `EMAIL`, `NAME`, `RADIOGROUP`, `HEADER`]

const buildData = () => {
    let casa = buildCasaObject();
    console.log(casa.fields)
    return casa;
}

const buildCasaObject = () => {
    let casa = {};
    casa.fields = []

    let input = $(`#input`).val();
    for (let i = 0; i < input.length; i++) {
        fieldNames.forEach(fname => {
            if (input.substring(i, i + fname.length) === fname) {
                let part = dissect(input.substring(i));
                switch (fname) {
                    case 'INIT':
                        init(part, casa);
                        break;
                    case 'CODE':
                        code(part, casa);
                        break;
                    case 'DATE':
                        date(part, casa);
                        break;
                    case 'PHONE':
                        phone(part, casa);
                        break;
                    case 'NINO':
                        nino(part, casa);
                        break;
                    case 'NAME':
                        nino(part, casa);
                        break;
                    case 'ADDRESS':
                        address(part, casa)
                        break;
                    case 'HEADER':
                        header(part, casa)
                        break;
                    case 'PARAGRAPH':
                        paragraph(part, casa)
                        break;
                    case 'EMAIL':
                        email(part, casa)
                        break;
                    case 'RADIOGROUP':
                        radio_group(part, casa)
                        break;
                }
            }
        })
    }
    console.log(casa)
    return casa;
}

const dissect = (part) => {
    let end = part.indexOf(`[`);
    if (end > -1) {
        part = part.substring(0, end)
    }
    return `[${part}]`;
}

const paragraph = (part, casa) => {
    let endOfFirstLine = part.indexOf(`\n`);
    let field = {};
    field['field-name'] = `paragraph`;
    field.fragment = part.substring(endOfFirstLine);
    casa.fields.push(field);
}

const email = (part, casa) => {
    let endOfFirstLine = part.indexOf(`\n`);
    let field = {};
    field['field-name'] = `email`;
    field.fragment = part.substring(endOfFirstLine);
    casa.fields.push(field);
}

const header = (part, casa) => {
    let lineArray = part.split('\n');
    let field = {};
    field['field-name'] = `header`;
    lineArray.forEach(line => {
        if (line.substring(0, 5) === `Data:`) {
            field['text-form-data'] = line.substring(5).trim();
        } else if (line.substring(0, 7) === `Header:`) {
            field[`text-header`] = line.substring(7).trim();
        } else if (line.substring(0, 5) === `Hint:`) {
            field[`text-hint`] = line.substring(5).trim();
        };
    });
    casa.fields.push(field);
}

const name = (part, casa) => {
    let lineArray = part.split('\n');
    let field = {};
    field['field-name'] = `name`;
    lineArray.forEach(line => {
        if (line.substring(0, 5) === `Data:`) {
            field['text-form-data'] = line.substring(5).trim();
        } else if (line.substring(0, 7) === `Header:`) {
            field[`text-header`] = line.substring(7).trim();
        } else if (line.substring(0, 5) === `Hint:`) {
            field[`text-hint`] = line.substring(5).trim();
        };
    });
    casa.fields.push(field);
}

const radio_group = (part, casa) => {
    let lineArray = part.split('\n');
    let field = {};
    field.buttons = [];
    field['field-name'] = `radio_group`;
    lineArray.forEach(line => {
        if (line.substring(0, 5) === `Data:`) {
            field['text-form-data'] = line.substring(5).trim();
        } else if (line.substring(0, 7) === `Header:`) {
            field[`text-header`] = line.substring(7).trim();
        } else if (line.substring(0, 5) === `Hint:`) {
            field[`text-hint`] = line.substring(5).trim();
        } else if (line.substring(0, 6) === `Inline:`) {
            field[`text-hint`] = line.substring(6).trim();
        };
    });
    let partSplit = part.split(`Button`);

    for (let i = 0; i < partSplit.length; i++) {
        let item = partSplit[i].trim();
        if (item.substring(0, 6) === "Value:") {
            field.buttons.push(item.substring(6));
        } else if (item.substring(0, 5) === "Text:") {
            field.buttons.push(item.substring(5));
        }
    }
    casa.fields.push(field);
}

const init = (part, casa) => {
    casa.prevalidate = false;
    casa.postvalidate = false;
    let lineArray = part.split('\n');
    lineArray.forEach(line => {
        if (line.substring(0, 7) === `Folder:`) {
            casa.folder = line.substring(7).trim();
        } else if (line.substring(0, 5) === `File:`) {
            casa[`page-name`] = line.substring(5).trim();
        } else if (line.substring(0, 7) === `Header:`) {
            casa[`page-header`] = line.substring(7).trim();
        } else if (line.substring(0, 11) === `Prevalidate:`) {
            casa.prevalidate = true;
        } else if (line.substring(0, 12) === `Postvalidate:`) {
            casa.postvalidate = true;
        }
    });
};

const date = (part, casa) => {
    let lineArray = part.split('\n');
    let field = {};
    field['field-name'] = `date`;
    lineArray.forEach(line => {
        if (line.substring(0, 5) === `Data:`) {
            field['text-form-data'] = line.substring(5).trim();
        } else if (line.substring(0, 7) === `Header:`) {
            field[`text-header`] = line.substring(7).trim();
        } else if (line.substring(0, 5) === `Hint:`) {
            field[`text-hint`] = line.substring(5).trim();
        };
    });
    casa.fields.push(field);
}

const nino = (part, casa) => {
    let lineArray = part.split('\n');
    let field = {};
    field['field-name'] = `nino`;
    lineArray.forEach(line => {
        if (line.substring(0, 5) === `Data:`) {
            field['text-form-data'] = line.substring(5).trim();
        } else if (line.substring(0, 7) === `Header:`) {
            field[`text-header`] = line.substring(7).trim();
        } else if (line.substring(0, 5) === `Hint:`) {
            field[`text-hint`] = line.substring(5).trim();
        };
    });
    casa.fields.push(field);
}

const phone = (part, casa) => {
    let lineArray = part.split('\n');
    let field = {};
    field['field-name'] = `phone`;
    lineArray.forEach(line => {
        if (line.substring(0, 5) === `Data:`) {
            field['text-form-data'] = line.substring(5).trim();
        } else if (line.substring(0, 7) === `Header:`) {
            field[`text-header`] = line.substring(7).trim();
        } else if (line.substring(0, 5) === `Hint:`) {
            field[`text-hint`] = line.substring(5).trim();
        };
    });
    casa.fields.push(field);
}

const code = (part, casa) => {
    let endOfFirstLine = part.indexOf(`\n`);
    let field = {};
    field['field-name'] = `fragment`;
    field.fragment = part.substring(endOfFirstLine);
    casa.fields.push(field);
}

const address = (part, casa) => {
    const error1 = `Error Lines 1 & 2:`;
    const error2 = `Invalid Regex:`;
    const error3 = `Mandatory and Regex Errors:`;

    let lineArray = part.split('\n');
    let field = {};
    field['field-name'] = `address`;
    lineArray.forEach(line => {
        if (line.substring(0, 5) === `Data:`) {
            field['text-form-data'] = line.substring(5).trim();
        } else if (line.substring(0, 7) === `Header:`) {
            field[`text-header`] = line.substring(7).trim();
        } else if (line.substring(0, 5) === `Hint:`) {
            field[`text-hint`] = line.substring(5).trim();
        } else if (line.substring(0, error1.length) === error1) {
            field.error1 = line.substring(error1.length).trim();
        } else if (line.substring(0, error2.length) === error2) {
            field.error2 = line.substring(error2.length).trim();
        } else if (line.substring(0, error3.length) === error3) {
            field.error3 = line.substring(error3.length).trim();
        }
    });

    casa.fields.push(field);
}

/*
    

    let nodes = $(`.field-build`).children();

    for (let i = 0; i < nodes.length; i++) {
        let id = (nodes[i].id);
        let _class = ($(`#${id}`).attr(`class`));
        if (_class.includes(`field`)) {
            let field = {}
            field[`field-name`] = id.substring(3);
            let inputs = $(`#${id}`).find(`input`);
            for (let i = 0; i < inputs.length; i++) {
                id = inputs[i].id;
                if (id.includes(`text-form-data`)) {
                    field[`text-form-data`] = $(`#${id}`).val();
                } else if (id.includes(`text-header`)) {
                    field[`text-header`] = $(`#${id}`).val();
                } else if (id.includes(`text-hint`)) {
                    field[`text-hint`] = $(`#${id}`).val();
                } else {
                    headerBreakdown(id, field);
                }
            }
            if (field[`field-name`] === `address`) {
                addressExtras(id.substring(0, 2), field);
            } else if (field[`field-name`] === `radio_group`) {
                radioGroupExtras(id.substring(0, 2), field, inputs);
            } else if (field[`field-name`] === `fragment`) {
                field.fragment = $(`#${id}-textarea`).val();
            } else if (field[`field-name`] === `paragraph`) {
                field.paragraph = $(`#${id.substring(0, 12)}-textarea`).val();
            }
            fields.push(field)
        }
    }
    casa.fields = fields;
    return casa;
}

let addressExtras = (prefix, field) => {
    field.error1 = $(`#${prefix}-address-error1-value`).val();
    field.error2 = $(`#${prefix}-address-error2-value`).val();
    field.error3 = $(`#${prefix}-address-error3-value`).val();
}

let radioGroupExtras = (prefix, field, inputs) => {
    field.inline = $(`#${prefix}-radio_group-radio_group-inline-yes`).prop(`checked`);
    let buttons = [];
    for (let i = 0; i < inputs.length; i++) {
        let id = inputs[i].id;
        let sub = inputs[i].id.substring(18);
        if (sub.substring(0, 4) === `text`) {
            buttons.push($(`#${id}`).val());
        } else if (sub.substring(0, 5) === `value`) {
            buttons.push($(`#${id}`).val());
        }
    }
    if (buttons) {
        field.buttons = buttons;
    }
}

const headerBreakdown = (id, field) => {
    if (id.includes(`header-h1`)) {
        if (field[`header-header-value`] = $(`#${id}`).prop(`checked`)) {
            field[`header-size`] = 1;
        }
    } else if (id.includes(`header-h2`)) {
        if (field[`header-header-value`] = $(`#${id}`).prop(`checked`)) {
            field[`header-size`] = 2;
        }
    } else if (id.includes(`header-h3`)) {
        if (field[`header-header-value`] = $(`#${id}`).prop(`checked`)) {
            field[`header-size`] = 3;
        }
    } else if (id.includes(`header-h4`)) {
        if (field[`header-header-value`] = $(`#${id}`).prop(`checked`)) {
            field[`header-size`] = 4;
        }
    } else if (id.includes(`header-h5`)) {
        if (field[`header-header-value`] = $(`#${id}`).prop(`checked`)) {
            field[`header-size`] = 5;
        }
    } else if (id.includes(`header-h6`)) {
        if (field[`header-header-value`] = $(`#${id}`).prop(`checked`)) {
            field[`header-size`] = 6;
        }
    }
}
*/