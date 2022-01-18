import { Global, Module } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "./guard";
import { ValidateService } from "./service";

@Global()
@Module({
  providers: [ValidateService, AuthGuard, Reflector],
  exports: [ValidateService, Reflector]
})
export class AuthModule {}