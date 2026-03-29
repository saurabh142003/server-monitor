import { Module } from '@nestjs/common';
import { RemoteServersService } from './remote-servers.service';
import { RemoteServersController } from './remote-servers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemoteServer } from './entities/remote-server.entity';
import { MonitoringService } from './monitoring/monitoring.service';
import { QueriesModule } from 'src/queries';

@Module({
  imports: [TypeOrmModule.forFeature([RemoteServer]), QueriesModule],
  controllers: [RemoteServersController],
  providers: [RemoteServersService, MonitoringService],
  exports: [RemoteServersService]
})
export class RemoteServersModule { }
