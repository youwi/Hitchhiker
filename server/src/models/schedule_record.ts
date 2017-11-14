import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Schedule } from './schedule';
import { RunResult } from '../interfaces/dto_run_result';
import * as _ from 'lodash';

@Entity()
export class ScheduleRecord {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Schedule, schedule => schedule.scheduleRecords)
    schedule: Schedule;

    @Column()
    duration: number;

    @Column('json')
    result: { origin: Array<RunResult | _.Dictionary<RunResult>>, compare: Array<RunResult | _.Dictionary<RunResult>> };

    @Column()
    success: boolean;

    @Column()
    isScheduleRun: boolean;

    @CreateDateColumn()
    createDate: Date;
}