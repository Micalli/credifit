import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;
}

export const env: Env = plainToInstance(Env, {
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
});

const error = validateSync(env);

if (error.length > 0) {
  throw new Error(JSON.stringify(error, null, 2));
}
