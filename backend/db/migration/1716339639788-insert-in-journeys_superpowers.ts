import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInJourneysSuperpowers1716339639788 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO journeys_superpowers ("journeysId", "superpowersId") VALUES
                ((SELECT id FROM journeys WHERE title = 'Participe do Webinar da Zenklub sobre Saúde Mental'), (SELECT id FROM superpowers WHERE name = 'O impenetrável escudo do cuidado')),
                ((SELECT id FROM journeys WHERE title = 'Faça uma ação voluntária.'), (SELECT id FROM superpowers WHERE name = 'O impenetrável escudo do cuidado')),
                ((SELECT id FROM journeys WHERE title = 'Ajude o RS'), (SELECT id FROM superpowers WHERE name = 'O impenetrável escudo do cuidado')),
                ((SELECT id FROM journeys WHERE title = 'Feedback mensal: Nos ajude a melhorar compartilhando sua opinião!'), (SELECT id FROM superpowers WHERE name = 'O indestrutível laço da evolução')),
                ((SELECT id FROM journeys WHERE title = 'Happy hour global: Vamos todos nos reunir, participe!'), (SELECT id FROM superpowers WHERE name = 'O incrível cristal do extraordinário')),
                ((SELECT id FROM journeys WHERE title = 'Promova um momento de mentoria reversa'), (SELECT id FROM superpowers WHERE name = 'A fabulosa flecha da agilidade'));
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM journeys_superpowers WHERE journeysId IN (
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
