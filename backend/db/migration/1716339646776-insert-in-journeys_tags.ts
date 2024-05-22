import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInJourneysTags1716339646776 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO journeys_tags ("journeysId", "tagsId")
            VALUES
                ((SELECT id FROM journeys WHERE title = 'Participe do Webinar da Zenklub sobre Saúde Mental'), (SELECT id FROM tags WHERE name = 'Cuidar')),
                ((SELECT id FROM journeys WHERE title = 'Participe do Webinar da Zenklub sobre Saúde Mental'), (SELECT id FROM tags WHERE name = 'Desenvolvimento pessoal')),
                ((SELECT id FROM journeys WHERE title = 'Participe do Webinar da Zenklub sobre Saúde Mental'), (SELECT id FROM tags WHERE name = 'Comportamento')),
                ((SELECT id FROM journeys WHERE title = 'Faça uma ação voluntária.'), (SELECT id FROM tags WHERE name = 'Transformar')),
                ((SELECT id FROM journeys WHERE title = 'Faça uma ação voluntária.'), (SELECT id FROM tags WHERE name = 'Cuidar')),
                ((SELECT id FROM journeys WHERE title = 'Ajude o RS'), (SELECT id FROM tags WHERE name = 'Cuidar')),
                ((SELECT id FROM journeys WHERE title = 'Ajude o RS'), (SELECT id FROM tags WHERE name = 'Compartilhar')),
                ((SELECT id FROM journeys WHERE title = 'Ajude o RS'), (SELECT id FROM tags WHERE name = 'Transformar')),
                ((SELECT id FROM journeys WHERE title = 'Ajude o RS'), (SELECT id FROM tags WHERE name = 'Comportamento')),
                ((SELECT id FROM journeys WHERE title = 'Feedback mensal: Nos ajude a melhorar compartilhando sua opinião!'), (SELECT id FROM tags WHERE name = 'Evolução')),
                ((SELECT id FROM journeys WHERE title = 'Feedback mensal: Nos ajude a melhorar compartilhando sua opinião!'), (SELECT id FROM tags WHERE name = 'Transparência')),
                ((SELECT id FROM journeys WHERE title = 'Feedback mensal: Nos ajude a melhorar compartilhando sua opinião!'), (SELECT id FROM tags WHERE name = 'Manutenção')),
                ((SELECT id FROM journeys WHERE title = 'Feedback mensal: Nos ajude a melhorar compartilhando sua opinião!'), (SELECT id FROM tags WHERE name = 'Comportamento')),
                ((SELECT id FROM journeys WHERE title = 'Happy hour global: Vamos todos nos reunir, participe!'), (SELECT id FROM tags WHERE name = 'Diversificar')),
                ((SELECT id FROM journeys WHERE title = 'Happy hour global: Vamos todos nos reunir, participe!'), (SELECT id FROM tags WHERE name = 'Diálogo')),
                ((SELECT id FROM journeys WHERE title = 'Happy hour global: Vamos todos nos reunir, participe!'), (SELECT id FROM tags WHERE name = 'Compartilhar')),
                ((SELECT id FROM journeys WHERE title = 'Promova um momento de mentoria reversa'), (SELECT id FROM tags WHERE name = 'Aprendizado contínuo')),
                ((SELECT id FROM journeys WHERE title = 'Promova um momento de mentoria reversa'), (SELECT id FROM tags WHERE name = 'Diálogo')),
                ((SELECT id FROM journeys WHERE title = 'Promova um momento de mentoria reversa'), (SELECT id FROM tags WHERE name = 'Compartilhar'));

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM journeys_tags WHERE "journeysId" IN (
                (SELECT id FROM journeys WHERE title = 'Participe do Webinar da Zenklub sobre Saúde Mental'),
                (SELECT id FROM journeys WHERE title = 'Faça uma ação voluntária.'),
                (SELECT id FROM journeys WHERE title = 'Ajude o RS'),
                (SELECT id FROM journeys WHERE title = 'Feedback mensal: Nos ajude a melhorar compartilhando sua opinião!'),
                (SELECT id FROM journeys WHERE title = 'Happy hour global: Vamos todos nos reunir, participe!'),
                (SELECT id FROM journeys WHERE title = 'Promova um momento de mentoria reversa')
            );
        `);
    }

}
