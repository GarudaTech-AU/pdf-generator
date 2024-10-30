interface Result {
  error: string;
  environment: Record<EnvKeys, string>;
}

const ENV_VARS = ["CORS_URLS", "PORT"];

export type EnvKeys = (typeof ENV_VARS)[number];

export default () => {
  const { environment, error } = ENV_VARS.reduce(
    (prev, key) => {
      const envVar = process.env[key] as EnvKeys | undefined;

      if (!envVar) {
        prev.error = `${prev.error},${key} `;
      } else {
        prev.environment[key] = envVar;
      }

      return prev;
    },
    {
      error: "",
      environment: {},
    } as Result,
  );

  if (error) {
    // eslint-disable-next-line
    console.log(`Add the following vars into .env file: ${error}`);
    return null;
  }

  return environment;
};
