'use strict'

const buildAddress = () => {
    let output = `\n[ADDRESS]\n`;
    output += `Data: \n`;
    output += `Header: \n`;
    output += `\Hint: \n`;
    output += `Error Lines 1 & 2: \n`;
    output += `Invalid Regex: \n`;
    output += `Mandatory and Regex Errors: \n`;
    insertField(output);
}

const buildInit = () => {
    $('textarea').focus();
    let text = `[INIT]\nFolder: \nFile: \n\Header: \n` + $(`#input`).val();
    $(`#input`).val(text);
}

const buildFragment = () => {
    insertField(`\n[CODE]\n`);
}

const buildHeader = () => {
    insertField(`\n[HEADER]\nData: \nHeader: \nHeader Size: \n`);
}

const buildDate = () => {
    insertField(`\n[DATE]\nData: \nHeader: \nHint: \n`);
}

const buildName = () => {
    insertField(`\n[NAME]\nData: \nHeader: \nHint: \n`);
}

const buildPhoneNumber = () => {
    insertField(`\n[PHONE]\nData: \nHeader: \nHint: \n`);
}

const buildNino = () => {
    insertField(`\n[NINO]\nData: \nHeader: \nHint: \n`);
}

const buildRadioGroup = () => {
    insertField(`\n[RADIOGROUP]\nData: \nHeader: \nHint: \nInline: \n`);
    insertField(`Button Text: \nButton Value: \nButton Text: \nButton Value: \n`);
}

const buildEmail = () => {
    insertField(`\n[EMAIL]\nData: \nHeader: \nHint: \n`);
}

const buildParagraph = () => {
    insertField(`\n[PARAGRAPH]\nData: \n`);
}

const insertField = output => {
    var caretPos = document.getElementById(`input`).selectionStart;
    var caretEnd = document.getElementById(`input`).selectionEnd;
    var textAreaTxt = $(`#input`).val();
    $(`#input`).val(textAreaTxt.substring(0, caretPos) + output + textAreaTxt.substring(caretEnd));
    $('#input').focus();
    document.getElementById('input').selectionStart = caretPos + output.length
    document.getElementById('input').selectionEnd = caretPos + output.length
}