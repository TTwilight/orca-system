import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  code: number;
  data: T;
  msg: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // 如果返回的数据中已经包含了code和msg字段，则不进行转换
        if (
          data &&
          typeof data === 'object' &&
          'code' in data &&
          'msg' in data
        ) {
          return data;
        }

        return {
          code: '0',
          data,
          msg: '成功',
        };
      }),
    );
  }
}
