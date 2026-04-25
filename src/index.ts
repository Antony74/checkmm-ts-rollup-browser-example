import { checkText } from 'checkmm';

const editor = document.getElementById('editor');
const validateButton = document.getElementById('validate');
const output = document.getElementById('output');

if (
    editor &&
    validateButton &&
    output &&
    editor instanceof HTMLTextAreaElement
) {
    fetch('demo0.mm')
        .then((response) => response.text())
        .then((text) => (editor.value = text));

    validateButton.onclick = async () => {
        try {
            await checkText(editor.value);
            output.textContent = 'Validated OK';
        } catch (e) {
            if (e instanceof Error) {
                output.textContent = e.message;
            } else {
                output.textContent = 'Unknown error';
            }
        }
    };
}
