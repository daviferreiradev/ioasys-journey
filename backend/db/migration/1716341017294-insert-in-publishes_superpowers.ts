import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInPublishesSuperpowers1716341017294 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO publishes_superpowers ("publishesId", "superpowersId")
            VALUES
                ((SELECT id FROM publishes WHERE title = 'Iniciativa de Reestruturação'), (SELECT id FROM superpowers WHERE name = 'As maravilhosas asas para inovar')),
                ((SELECT id FROM publishes WHERE title = 'Recomendo Livro de Design'), (SELECT id FROM superpowers WHERE name = 'A fabulosa flecha da agilidade')),
                ((SELECT id FROM publishes WHERE title = 'Iniciativa Inspiradora'), (SELECT id FROM superpowers WHERE name = 'O incrível cristal do extraordinário'));
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM publishes_superpowers WHERE "publishesId" IN (
                (SELECT id FROM publishes WHERE title = 'Iniciativa de Reestruturação'),
                (SELECT id FROM publishes WHERE title = 'Recomendo Livro de Design'),
                (SELECT id FROM publishes WHERE title = 'Iniciativa Inspiradora')
            );
        `);
    }

}
