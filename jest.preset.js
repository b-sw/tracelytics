const nxPreset = require('@nx/jest/preset').default;

module.exports = { ...nxPreset, compilerOptions: { esModuleInterop: true, allowSyntheticDefaultImports: true } };
