import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  branchName!: string;

  @Column()
  location!: string;

  @OneToMany(() => Employee, (emp) => emp.branch)
  employees!: Employee[];
}