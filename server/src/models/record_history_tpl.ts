import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RecordTpl } from './record_tpl';
import { User } from './user';

@Entity()
export class RecordHistoryTpl {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => RecordTpl, record => record.history)
    target: RecordTpl;

    @Column('json')
    record: RecordTpl;

    user: User;

    @Column({ nullable: true })
    userId: string;

    @CreateDateColumn()
    createDate: Date;
}