import { MigrationInterface, QueryRunner } from "typeorm";

export class PokemonTable1724785132299 implements MigrationInterface {
    name = 'PokemonTable1724785132299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar NOT NULL, "imageUrl" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "battle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "winner" varchar NOT NULL, "pokemon1RemainingHp" integer NOT NULL, "pokemon2RemainingHp" integer NOT NULL, "pokemon1Id" varchar, "pokemon2Id" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_battle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "winner" varchar NOT NULL, "pokemon1RemainingHp" integer NOT NULL, "pokemon2RemainingHp" integer NOT NULL, "pokemon1Id" varchar, "pokemon2Id" varchar, CONSTRAINT "FK_d6de3ef4c04a515afb256111fd0" FOREIGN KEY ("pokemon1Id") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7df2fdef5c10626b94d7c7be3f0" FOREIGN KEY ("pokemon2Id") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_battle"("id", "winner", "pokemon1RemainingHp", "pokemon2RemainingHp", "pokemon1Id", "pokemon2Id") SELECT "id", "winner", "pokemon1RemainingHp", "pokemon2RemainingHp", "pokemon1Id", "pokemon2Id" FROM "battle"`);
        await queryRunner.query(`DROP TABLE "battle"`);
        await queryRunner.query(`ALTER TABLE "temporary_battle" RENAME TO "battle"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "battle" RENAME TO "temporary_battle"`);
        await queryRunner.query(`CREATE TABLE "battle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "winner" varchar NOT NULL, "pokemon1RemainingHp" integer NOT NULL, "pokemon2RemainingHp" integer NOT NULL, "pokemon1Id" varchar, "pokemon2Id" varchar)`);
        await queryRunner.query(`INSERT INTO "battle"("id", "winner", "pokemon1RemainingHp", "pokemon2RemainingHp", "pokemon1Id", "pokemon2Id") SELECT "id", "winner", "pokemon1RemainingHp", "pokemon2RemainingHp", "pokemon1Id", "pokemon2Id" FROM "temporary_battle"`);
        await queryRunner.query(`DROP TABLE "temporary_battle"`);
        await queryRunner.query(`DROP TABLE "battle"`);
        await queryRunner.query(`DROP TABLE "pokemon"`);
    }

}
