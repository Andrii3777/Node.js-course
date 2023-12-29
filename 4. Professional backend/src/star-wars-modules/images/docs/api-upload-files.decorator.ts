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
                'Upload an image',
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
