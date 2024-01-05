import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiResponseData = <TModel extends Type<any>>(
  model: TModel,
  status = 200,
) => {
  return applyDecorators(
    ApiResponse({
      status,
      schema: {
        properties: {
          data: { $ref: getSchemaPath(model) },
        },
      },
    }),
  );
};
