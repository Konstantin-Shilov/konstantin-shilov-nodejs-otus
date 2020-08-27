import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { Navigation } from './navigation.interface';
import { Auth } from '../auth/auth.decorator';

@Controller()
@Auth()
export class NavigationController {
    constructor(private readonly navigationService: NavigationService) {}

    @Get()
    async get(): Promise<Navigation[]> {
        return this.navigationService.get();
    }

    @Get(':id')
    async getItemById(@Param('id', ParseIntPipe) id: string): Promise<Navigation> {
        return this.navigationService.getItemById(id);
    }
}
