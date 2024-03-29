import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Aluno from './Aluno';

@Entity('creditcard')
class CreditCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  student_id: string;

  @ManyToOne(type => Aluno, creditcard => CreditCard)
  @JoinColumn({ name: 'student_id' })
  aluno: Aluno;

  @Column()
  cardnumber: string;

  @Column()
  datevencimento: string;

  @Column()
  bandeira: string;

  @Column()
  nametitular: string;

  @Column()
  cvv: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CreditCard;
