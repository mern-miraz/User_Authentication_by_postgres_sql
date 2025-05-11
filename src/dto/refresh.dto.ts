import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({ description: 'Refresh token', example: 'uuid-refresh-token' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
