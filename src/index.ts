import checkmm from 'checkmm';

const editor = document.getElementById('editor');
const validateButton = document.getElementById('validate');
const output = document.getElementById('output');

if (editor && validateButton && output) {
    fetch('demo0.mm')
        .then((response) => response.text())
        .then((text) => (editor.textContent = text));

    validateButton.onclick = async () => {
        checkmm.data = editor.textContent;
        checkmm.dataPosition = 0;

        try {
            checkmm.processtokens();
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
