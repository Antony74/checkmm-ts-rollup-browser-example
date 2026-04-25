import checkmm, { Assertion, type Hypothesis } from 'checkmm';
import { getCheckmmState, setCheckmmState } from 'checkmm/dist/state';
import { createTokenArray } from 'checkmm/dist/tokens';

type CheckmmState = ReturnType<typeof getCheckmmState>;

const editor = document.getElementById('editor');
const validateButton = document.getElementById('validate');
const output = document.getElementById('output');

if (editor && validateButton && output && editor instanceof HTMLTextAreaElement) {
    const getCleanState = (): CheckmmState => {
        const state = getCheckmmState();

        return {
            ...state,
            data: '',
            dataPosition: 0,
            tokens: createTokenArray(),
            constants: new Set<string>(),
            hypotheses: new Map<string, Hypothesis>(),
            variables: new Set<string>(),
            assertions: new Map<string, Assertion>(),
            scopes: [],
            mmfilenamesalreadyencountered: new Set<string>,
        };
    };

    fetch('demo0.mm')
        .then((response) => response.text())
        .then((text) => (editor.value = text));

    validateButton.onclick = async () => {
        setCheckmmState(getCleanState());
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
