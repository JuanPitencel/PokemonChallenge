import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pokemon } from '../pokemon/pokemon.entity'

@Entity()
export class Battle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pokemon)
  pokemon1: Pokemon;

  @ManyToOne(() => Pokemon)
  pokemon2: Pokemon;

  @Column()
  winner: string;

  @Column()
  pokemon1RemainingHp: number;

  @Column()
  pokemon2RemainingHp: number;
}