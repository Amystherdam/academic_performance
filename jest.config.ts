import type { Config } from 'jest';
import * as aliases from "./jsconfig.aliases.json"

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
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./setupTests.ts'],
};

export default config;
