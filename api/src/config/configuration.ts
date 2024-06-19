import { registerAs } from '@nestjs/config';

export default registerAs('api-nestjs-config', () => ({
  appEnviroment: process.env.APP_ENV,
  appPort: parseInt(process.env.APP_PORT, 10) || 3000, // Ensure port is an integer
  appActiveSwagger: process.env.ACTIVATE_SWAGGER === 'true', // Convert to boolean
  appActiveDataBase: process.env.ACTIVATE_DATABASE === 'true', // Convert to boolean
  appUserIdTokenSSO: process.env.USERID_SSO_TOKEN_KEY,
  appValidateUserIdTokenSSO: process.env.VALIDATE_SSO_TOKEN,
  appCheckEnviroment: process.env.CHECK_ENVIRONMENT,
}));