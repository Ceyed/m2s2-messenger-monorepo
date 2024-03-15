import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserEntity1710515166587 implements MigrationInterface {
  name = 'AddUserEntity1710515166587';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE SCHEMA IF NOT EXISTS "user"');
    await queryRunner.query(
      `CREATE TABLE "user"."user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
        "deletedAt" TIMESTAMP,
        "mobile" character varying NOT NULL,
        "password" character varying NOT NULL,
        "salt" character varying NOT NULL,
        "firstName" character varying,
        "lastName" character varying,
        "username" character varying,
        CONSTRAINT "UQ_29fd51e9cf9241d022c5a4e02e6" UNIQUE ("mobile"),
        CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
        )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"."user"`);
  }
}
