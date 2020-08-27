import { Injectable, NotFoundException } from '@nestjs/common';
import { Navigation } from './navigation.interface';
import * as navigations from '../../mocks/routes.json';

@Injectable()
export class NavigationService {
    private readonly navigations: Navigation[] = navigations;

    get(): Navigation[] {
        return this.navigations;
    }

    getItemById(id: string): Navigation {
        const nav = this.navigations.find(n => n.id == id);
        if (!nav) {
            throw new NotFoundException();
        }
        return nav;
    }
}
