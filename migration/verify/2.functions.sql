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
ROLLBACK;
