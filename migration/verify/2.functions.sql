-- Verify projet-02-tournoi-e-sport-back:2.functions on pg

BEGIN;

SELECT id FROM create_user('{
    "firstname": "Bob",
    "lastname": "Marley",
    "nickname": "BobbyM",
    "mail": "bob@test.com",
    "password": "azerty"
}');

SELECT update_user('{
    "nickname": "BobbyM",
    "password": "azerty123",
    "id": 1
}');

SELECT delete_user('{
    "firstname": "Bob",
    "lastname": "Marley",
    "nickname": "BobbyM",
    "mail": "bob@test.com",
    "password": "azerty123"
}');

SELECT create_tournament('{
    "label": "tournoi de ouf",
    "type": "privé",
    "date": "30/09/2022",
    "game": "lol",
    "format": "premier elimination",
    "moderator": "BobbyM",
    "user_id": "1"
}');
SELECT update_tournament('{
    "label": "tournoi de ouf mais on change",
    "type": "privé",
    "date": "30/09/2022",
    "game": "lol",
    "format": "premier elimination",
    "moderator": "BobbyM",
    "user_id": "1"
}');

SELECT delete_tournament('{
    "label": "tournoi de ouf mais on change",
    "type": "privé",
    "date": "30/09/2022",
    "game": "lol",
    "format": "premier elimination",
    "moderator": "BobbyM",
    "user_id": "1"
}');
ROLLBACK;
