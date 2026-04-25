import path from 'path';

import copy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';

const replacement = path.resolve('src/empty.js');

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
    },
    plugins: [
        resolve(),
        commonjs(),
        copy({
            targets: [
                { src: 'src/index.html', dest: 'dist' },
                { src: 'src/demo0.mm', dest: 'dist' },
                {
                    src: 'node_modules/github-fork-ribbon-css/gh-fork-ribbon.css',
                    dest: 'dist',
                },
            ],
        }),
        alias({
            entries: [
                {
                    find: 'fs/promises',
                    replacement,
                },
                {
                    find: 'path',
                    replacement,
                },
                {
                    find: 'process',
                    replacement,
                },
            ],
        }),
        replace({ preventAssignment: true, process: null }),
    ],
};
