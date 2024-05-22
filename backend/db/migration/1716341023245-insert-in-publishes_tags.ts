import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInPublishesTags1716341023245 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO publishes_tags ("publishesId", "tagsId")
            VALUES
                ((SELECT id FROM publishes WHERE title = 'Iniciativa de Reestruturação'), (SELECT id FROM tags WHERE name = 'Desenvolvimento pessoal')),
                ((SELECT id FROM publishes WHERE title = 'Iniciativa de Reestruturação'), (SELECT id FROM tags WHERE name = 'Inovação')),
                ((SELECT id FROM publishes WHERE title = 'Iniciativa de Reestruturação'), (SELECT id FROM tags WHERE name = 'Surpreender')),
                ((SELECT id FROM publishes WHERE title = 'Recomendo Livro de Design'), (SELECT id FROM tags WHERE name = 'Produzir bem')),
                ((SELECT id FROM publishes WHERE title = 'Recomendo Livro de Design'), (SELECT id FROM tags WHERE name = 'Mercado')),
                ((SELECT id FROM publishes WHERE title = 'Recomendo Livro de Design'), (SELECT id FROM tags WHERE name = 'Novidade')),
                ((SELECT id FROM publishes WHERE title = 'Recomendo Livro de Design'), (SELECT id FROM tags WHERE name = 'Manutenção')),
                ((SELECT id FROM publishes WHERE title = 'Iniciativa Inspiradora'), (SELECT id FROM tags WHERE name = 'Diversificar')),
                ((SELECT id FROM publishes WHERE title = 'Iniciativa Inspiradora'), (SELECT id FROM tags WHERE name = 'Respeitar')),
                ((SELECT id FROM publishes WHERE title = 'Iniciativa Inspiradora'), (SELECT id FROM tags WHERE name = 'Agilidade')),
                ((SELECT id FROM publishes WHERE title = 'Iniciativa Inspiradora'), (SELECT id FROM tags WHERE name = 'Expansão'));
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM publishes_tags WHERE "publishesId" IN (
                (SELECT id FROM publishes WHERE title = 'Iniciativa de Reestruturação'),
                (SELECT id FROM publishes WHERE title = 'Recomendo Livro de Design'),
                (SELECT id FROM publishes WHERE title = 'Iniciativa Inspiradora')
            );
        `);
    }

}
