import path from 'path';

import copy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
    },
    plugins: [
        resolve(),
        commonjs(),
        typescript(),
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
    ],
};
