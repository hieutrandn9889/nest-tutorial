import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsEntity } from 'src/entities/cars.entity';
import { Car } from 'src/models/car.model';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarsEntity)
    private carRepository: Repository<CarsEntity>,
  ) {}

  async findAll(): Promise<Car[]> {
    return await this.carRepository.find();
  }

  async findById(id: number): Promise<Car> {
    return await this.carRepository.findOne({ where: { id }});
  }

  async create(category: Car): Promise<Car> {
    return await this.carRepository.save(category);
  }

  async update(id: number, category: Car): Promise<Car> {
    await this.carRepository.update(id, category);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const isFlag: DeleteResult = await this.carRepository.delete(id);
    return isFlag.affected === 1;
  }
}
