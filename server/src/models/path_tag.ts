import { OneToOne, JoinColumn, OneToMany, Entity, PrimaryColumn, Column, ManyToMany, CreateDateColumn, JoinTable } from 'typeorm';

@Entity()
export class PathTag {

    @PrimaryColumn()
    id: string;

    @Column()
    projectId?: string;

    @Column()
    targetId?: number;
    @Column({ nullable: true })
    tags?: string;

    @Column()
    methodPath: string;

    @CreateDateColumn()
    createDate: Date;

    @Column({ nullable: true })
    createBy:string;

}