import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class BaseRolesGuard {
  async verifyAuthorization(context: ExecutionContext): Promise<any> {
    const ctx = GqlExecutionContext.create(context).getContext();

    const accessToken = ctx.req.headers.authorization.split(' ')[1];

    return true;
  }
}
