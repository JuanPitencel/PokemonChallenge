import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryColumn()
  id: string;  

  @Column()
  name: string;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  hp: number;

  @Column()
  speed: number;

  @Column()
  type: string;

  @Column()
  imageUrl: string;
}