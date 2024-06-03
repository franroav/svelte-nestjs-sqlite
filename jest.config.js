module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testRegex: '.*\\.spec\\.ts$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    coverageDirectory: 'coverage',  // Directory where Jest should output its coverage files
    coverageReporters: ['text', 'lcov', 'json', 'html'],  // Specifies the coverage reports that Jest will generate
    collectCoverageFrom: [
      'src/**/*.{ts,js}',  // Specify the files for which coverage information should be collected
      '!src/**/*.d.ts',  // Exclude definition files
      '!src/main.ts',  // Exclude specific files like the main bootstrap file if not relevant
      '!src/**/*module.ts',  // Exclude module files if they don't contain logic
      '!src/**/index.ts'  // Exclude barrel files
    ],
  };