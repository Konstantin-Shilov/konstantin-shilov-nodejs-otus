import { Module } from '@nestjs/common';
import { NavigationModule } from './navigation/navigation.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), NavigationModule],
})
export class AppModule {}
