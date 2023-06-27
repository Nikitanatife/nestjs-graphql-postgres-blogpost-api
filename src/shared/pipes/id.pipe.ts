import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: number) {
    if (!value || value <= 0) {
      throw new BadRequestException('ID must be positive number');
    }

    return value;
  }
}
