import {
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export const ApiUploadFiles = () =>
    applyDecorators(
        ApiOperation({
            summary:
                'Upload files they will be located at /uploads/{hashed_filename} like 3ee1db5a-b671-496b-8772-d8ba9cafa815.png',
        }),
        ApiResponse({ status: 200 }),
        ApiConsumes('multipart/form-data'),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    files: {
                        type: 'array',
                        items: {
                            type: 'file',
                            format: 'binary',
                        },
                    },
                },
            },
        }),
    );
