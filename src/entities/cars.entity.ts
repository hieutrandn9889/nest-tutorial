import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CategoriesEntity } from './categories.entity';

@Entity('cars')
export class CarsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column()
    price: string;

    @Column()
    category_id: number;

    @ManyToOne(() => CategoriesEntity)
    @JoinColumn()
    category: CategoriesEntity;
}