/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@Entity()
export class Manager {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @OneToMany(() => Employee, (emp) => emp.manager)
  employees!: Employee[];
}