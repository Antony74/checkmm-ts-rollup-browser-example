import checkmm, { getCheckmmState, setCheckmmState } from 'checkmm';

const editor = document.getElementById('editor');
const validateButton = document.getElementById('validate');
const output = document.getElementById('output');

if (editor && validateButton && output && editor instanceof HTMLTextAreaElement) {
    const initialState = getCheckmmState();

    fetch('demo0.mm')
        .then((response) => response.text())
        .then((text) => (editor.value = text));

    validateButton.onclick = async () => {
        setCheckmmState(initialState);
        checkmm.data = editor.value;

        try {
            const fileInclusion = checkmm.readtokenstofileinclusion();

            if (fileInclusion) {
                throw new Error(
                    `File inclusions not supported in this example`,
                );
            }

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
