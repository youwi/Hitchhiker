import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, OneToOne, OneToMany } from 'typeorm';


@Entity()
export class SwaggerCache {

    @PrimaryColumn()
    id: string;

    @Column()
    projectId: string;

    @Column({ nullable: true })
    key: string;

    @Column({ nullable: true })
    url: string;

    @Column('mediumtext', { nullable: true })
    content: string;

    @Column({ nullable: true })
    version: number; // TODO: need increase for each changing

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;
}