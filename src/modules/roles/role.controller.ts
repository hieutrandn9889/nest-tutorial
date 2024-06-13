import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/constant/decorator';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(protected readonly roleService: RoleService) {}

  @Get('')
  @Public()
  async list(): Promise<any> {
    try {
      const roleRes = await this.roleService.findAll();
      return roleRes;
    } catch (error) {
      return null;
    }
  }
}
