/* eslint-disable */
export default {
  displayName: 'ngrx-effect-selector',
  preset: '../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/subscription-setup.ts'],
  globals: {},
  coverageDirectory: '../../../coverage/apps/ngrx/effect-selector',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
