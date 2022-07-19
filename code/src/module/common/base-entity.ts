import {
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export default class Base {
  @PrimaryGeneratedColumn()
  id: number;

  // 软删除 (soft delete) 一定要有这列。  https://orkhan.gitbook.io/typeorm/docs/decorator-reference#deletedatecolumn
  @DeleteDateColumn()
  deletedDate: Date;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
