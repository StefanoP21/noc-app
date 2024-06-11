import { envs } from './envs.plugin';

describe('envs.plugin.ts', () => {
  it('should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'aldair142015@gmail.com',
      MAILER_SECRET_KEY: 'yygrfpaertlefrbs',
      PROD: false,
      MONGO_URL: 'mongodb://stefano:123456test@localhost:27017',
      MONGO_DB_NAME: 'nocdb-test',
      MONGO_USER: 'stefano',
      MONGO_PASSWORD: '123456test',
    });
  });

  it('should throw an error if the env is not defined', async () => {
    jest.resetModules();
    process.env.PORT = undefined;

    try {
      await import('./envs.plugin');

      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
