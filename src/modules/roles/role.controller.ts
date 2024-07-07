import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Public, Roles } from 'src/constant/decorator';
import { Role, ServerMessage } from 'src/constant/enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleService } from './role.service';
import { promises as fsPromises} from 'fs';

export type SearchByNameReq = {
  name: string;
  page: number;
  pageSize: number;
};

@Controller('roles')
export class RoleController {
  constructor(protected readonly roleService: RoleService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async list(@Query() req: SearchByNameReq): Promise<any> {
    try {
      const roleRes = await this.roleService.findAll(req);
      return roleRes;
    } catch (error) {
      return null;
    }
  }

  @Post('/login')
  @Public()
  async login(@Body() body: { name: string }): Promise<any> {
    try {
      const roleRes = await this.roleService.login(body);
      return roleRes;
    } catch (error) {
      return null;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @Roles(Role.Admin)
  async profile(@Request() req: any): Promise<any> {
    return req.user;
  }

  @Post('/upload')
  @Public()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      return {
        message: 'File uploaded successfully!',
        filename: file.filename,
      };
    } catch (error) {
      return {
        message: ServerMessage.ERROR,
        filename: null,
      };
    }
  }

  @Post('/image/delete')
  @Public()
  async deleteFile(@Body() body: { filename: string}): Promise<any> {
    try {
      const filePath = join(__dirname, '..', 'public', body.filename);
      await fsPromises.unlink(filePath);

      return {
        message: 'File delete successfully!',
        filename: body.filename,
      };
    } catch (error) {
      return {
        message: ServerMessage.ERROR,
        filename: null,
      };
    }
  }
}
