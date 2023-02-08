"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675870843588 = void 0;
class table1675870843588 {
    name = 'table1675870843588';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "comment" ("comment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "comment" character varying NOT NULL, "commentProProId" uuid, "commentUserUserId" uuid, CONSTRAINT "PK_6a9f9bf1cf9a09107d3224a0e9a" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "user_name" character varying(50) NOT NULL, "user_img" character varying NOT NULL, "user_phone" character varying NOT NULL, "user_email" character varying NOT NULL, "user_pol" boolean NOT NULL DEFAULT true, "user_password" character varying NOT NULL, CONSTRAINT "UQ_e5ba3eae441160d91a30fe89096" UNIQUE ("user_phone"), CONSTRAINT "UQ_643a0bfb9391001cf11e581bdd6" UNIQUE ("user_email"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "karzinka" ("karzinka_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "karzinkaProProId" uuid, "karzinkaUserUserId" uuid, CONSTRAINT "PK_7ad6974157fef5fa26536e1352b" PRIMARY KEY ("karzinka_id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("pro_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "pro_name" character varying(50) NOT NULL, "pro_price" integer NOT NULL, "pro_img1" character varying NOT NULL, "pro_img2" character varying NOT NULL, "pro_razmer" character varying, "pro_pol" boolean NOT NULL DEFAULT false, "pro_after" character varying, "pro_in" character varying, "pro_langu" character varying, "proSubSubId" uuid, CONSTRAINT "PK_c66fe6f513906a9622b575e753b" PRIMARY KEY ("pro_id"))`);
        await queryRunner.query(`CREATE TABLE "sub_category" ("sub_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "sub_title" character varying(100) NOT NULL, "subCatCatId" uuid, CONSTRAINT "PK_9093d2b6ef348c9e323b3673cb1" PRIMARY KEY ("sub_id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("cat_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "cat_title" character varying(100) NOT NULL, CONSTRAINT "PK_d6317b6c2abd9293df82afc80f6" PRIMARY KEY ("cat_id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_820918990d46e88745b4ec15edc" FOREIGN KEY ("commentProProId") REFERENCES "product"("pro_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_b49e6b02fd01ba7e93dc303b975" FOREIGN KEY ("commentUserUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD CONSTRAINT "FK_0db5c27c7a4408b3fffe9588147" FOREIGN KEY ("karzinkaProProId") REFERENCES "product"("pro_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD CONSTRAINT "FK_21e6b9bead2d43a1cc883578be1" FOREIGN KEY ("karzinkaUserUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9dc36ce5e1c471e09d7f986b782" FOREIGN KEY ("proSubSubId") REFERENCES "sub_category"("sub_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_6c7c8a76391271a7c1da862802e" FOREIGN KEY ("subCatCatId") REFERENCES "category"("cat_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_6c7c8a76391271a7c1da862802e"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9dc36ce5e1c471e09d7f986b782"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP CONSTRAINT "FK_21e6b9bead2d43a1cc883578be1"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP CONSTRAINT "FK_0db5c27c7a4408b3fffe9588147"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_b49e6b02fd01ba7e93dc303b975"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_820918990d46e88745b4ec15edc"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "sub_category"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "karzinka"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }
}
exports.table1675870843588 = table1675870843588;
