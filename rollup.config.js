import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import buble from '@rollup/plugin-buble';

const production = !process.env.ROLLUP_WATCH && !process.env.DEV;
/** globals process, __dirname **/

const type = production ? '.min' : '';

module.exports = {
    input: 'src/index.ts',

    output: [
        {
            file: `dist/index.umd${type}.js`,
            format: 'umd',
            name: 'index'
        },
        {
            file: `dist/index${type}.js`,
            format: 'cjs',
            name: 'index'
        },
        {
            file: `dist/index.esm${type}.js`,
            format: 'esm',
            name: 'index',
        },
    ],
    plugins: [
        typescript(),
        buble({
            include: 'dist/*.esm.js'
        }),
        production && terser({
            output: {
                comments: false
            },
            compress: true,
        })
    ]
};
