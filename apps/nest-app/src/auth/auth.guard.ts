import { CanActivate, ExecutionContext } from "@nestjs/common";
import { User } from "./current-user.interface";

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const currentUser: User = { id: "1", name: "John Doe", email: "abc@example.com" };
        request.user = currentUser;
        return true;
    }
}