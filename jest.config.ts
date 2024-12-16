import type { Config } from 'jest';
import * as aliases from "./tsconfig.aliases.json"

const buildAliases = () => {
  const { paths, baseUrl } = aliases.compilerOptions;
  const pathObject = {};

  for (const path in paths) {
    pathObject[`^${path.replace("/*", "/(.*)")}$`] =
      `<rootDir>/${baseUrl}/${paths[path]}`.replace("/*", "/$1");
  }

  return pathObject;
};

const config: Config = {
  preset: 'ts-jest',
  moduleNameMapper: {
    ...buildAliases(),
  },
  testMatch: [
    "<rootDir>/__tests__/**/*.test.tsx",  // Jest test directory
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default config;
