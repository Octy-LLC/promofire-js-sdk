const { writeFileSync } =  require('fs');
const { resolve } =  require('path');
const { version } =  require('./package.json');

const out = `
/**
 * Auto-generated file — do not edit.
 */
export const SDK_VERSION = '${version}';
`;

writeFileSync(resolve(__dirname, './src/contracts/constants/sdk.contract.ts'), out);
console.log('Prebuild finished');
