import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    public canActivate(context: ExecutionContext): Promise<boolean> {
        return Promise.resolve(super.canActivate(context) as boolean);
    }
}
