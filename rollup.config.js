import buble from 'rollup-plugin-buble';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';

const production = !process.env.ROLLUP_WATCH && !process.env.DEV;
/** globals process, __dirname **/

module.exports = {
    input: 'src/index.js',
    output: [
        {
            file: `dist/colors${production ? '.min' : ''}.js`,
            format: 'umd',
            name: 'colors',
        },
        {
            file: `index${production ? '.min' : ''}.js`,
            format: 'cjs',
            name: 'index',
        }
    ],
    plugins: [
        commonjs(),
        buble({
            transforms: { dangerousForOf: true },
            objectAssign: 'Object.assign'
        }),
        production && terser()
    ]
};
