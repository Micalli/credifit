// error-handler.util.ts
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export function handleError(
  error: any,
  defaultMessage = 'Internal server error',
) {
  // Log para debug
  Logger.error(error);

  // Se já for um HttpException, apenas repassa
  if (error instanceof HttpException) {
    throw error;
  }

  // Erros conhecidos (ex: Prisma unique constraint)
  if (error.code === 'P2002') {
    throw new HttpException(
      `Duplicate value for field: ${error.meta?.target}`,
      HttpStatus.CONFLICT,
    );
  }

  // Erro genérico
  throw new HttpException(defaultMessage, HttpStatus.INTERNAL_SERVER_ERROR);
}
