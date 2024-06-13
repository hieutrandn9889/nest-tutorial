import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CarsEntity } from './entities/cars.entity';
import { CategoriesEntity } from './entities/categories.entity';
import { AccountsEntity } from './entities/accounts.entity';
import { CategoryModule } from './modules/categories/category.module';
import { CarModule } from './modules/cars/car.module';
import { AuthModule } from './modules/auth/auth.module';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constant/constant';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { RolesGuard } from './modules/auth/roles.guard';
import { dataSourceOptions } from 'db/data-source';
import RoleEntity from './entities/role.entity';
import UserEntity from './entities/user.entity';
import { RoleModule } from './modules/roles/role.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      entities: [
        AccountsEntity,
        CarsEntity,
        CategoriesEntity,
        RoleEntity,
        UserEntity,
      ],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 900000 },
    }),
    ProductModule,
    CategoryModule,
    CarModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // jwt for global
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // roles permission
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
