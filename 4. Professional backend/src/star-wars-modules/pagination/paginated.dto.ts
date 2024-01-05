import { ApiProperty } from '@nestjs/swagger';

class PaginationMeta {
  @ApiProperty({ example: 1 })
  itemCount: number;
  @ApiProperty({ example: 1 })
  totalItems?: number;
  @ApiProperty({ example: 10 })
  itemsPerPage: number;
  @ApiProperty({ example: 1 })
  totalPages?: number;
  @ApiProperty({ example: 1 })
  currentPage: number;
}
export class PaginatedDto<TData> {
  data: TData[];
  @ApiProperty()
  meta: PaginationMeta;
}
