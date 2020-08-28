import { Module } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { NavigationController } from './navigation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Navigation } from './navigation.model';

@Module({
    imports: [SequelizeModule.forFeature([Navigation])],
    controllers: [NavigationController],
    providers: [NavigationService],
})
export class NavigationModule {}
