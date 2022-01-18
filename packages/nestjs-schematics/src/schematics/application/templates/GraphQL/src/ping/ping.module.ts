import { Module } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { PingController } from "./ping.controller"
import { PingService } from "./ping.service"
<% if (architecture === 'GraphQL') { %>import { PingResolver } from './ping.resolver'<% } %>

@Module({
  controllers: [PingController],
  providers: [
    PrismaService, 
    PingService,
    <% if (architecture === 'GraphQL') { %>PingResolver<% } %>
  ],
})
export class PingModule {}
