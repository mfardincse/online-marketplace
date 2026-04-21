import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Manager } from '../../manager/entities/manager.entity';
import { Branch } from '../../branch/entities/branch.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  position!: string;

  @ManyToOne(() => Manager, (manager) => manager.employees, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  manager: Manager | null = new Manager;


  @ManyToOne(() => Branch, (branch) => branch.employees, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  branch: Branch | null = new Branch;
}