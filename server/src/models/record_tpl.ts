import { OneToMany, Entity, PrimaryColumn, JoinColumn, Column, ManyToOne, UpdateDateColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { Collection } from './collection';
import { Header } from './header';
import { RecordCategory } from '../common/record_category';
import { DataMode } from '../common/data_mode';
import { BodyType } from '../common/string_type';
import { ParameterType } from '../common/parameter_type';
import { RecordHistoryTpl } from './record_history_tpl';

@Entity()
export class RecordTpl {

    @PrimaryColumn()
    id: string;

    @OneToMany(type => RecordHistoryTpl, history => history.target)
    history: RecordHistoryTpl[];

    @Column({ nullable: true, default: '' })
    pid: string;

    @Column('int', { default: 20 })
    category: RecordCategory;

    @Column()
    name: string;

    @Column({ length: 2000, nullable: true })
    url: string;

    @Column({ nullable: true, default: 'GET' })
    method: string;

    @Column('json')
    headers: Header[] = [];

    @Column('mediumtext', { nullable: true })
    body: string;

    @Column('varchar', { nullable: true, length: 50 })
    bodyType: BodyType;

    @Column('text', { nullable: true })
    parameters: string;

    @Column('int', { default: 0 })
    parameterType: ParameterType;

    @Column({ default: 1, type: 'int' })
    dataMode: DataMode;

    @Column('text', { nullable: true })
    prescript: string;

    @Column('text', { nullable: true })
    test: string;

    @Column('int', { nullable: true })
    sort: number;

    @Column({ nullable: true })
    version: number; // TODO: need increase for each changing

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    children: RecordTpl[] = [];
}