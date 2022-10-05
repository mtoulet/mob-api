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
    "lastname": "Marley",
    "firstname": "bib",
    "id": 3
}');



SELECT create_tournament('{
    "label": "tournoi de ouf",
    "type": "privé",
    "date": "30/09/2022",
    "game": "lol",
    "format": "premier elimination",
    "max_player_count": 12,
    "description": "best tournois ever c''est certain",
    "image": "image.com",
    "user_id": "6"
}');
SELECT update_tournament('{
    "label": "tournoi de ouf mais on change",
    "type": "privé",
    "date": "30/09/2022",
    "game": "lol",
    "format": "premier elimination",
    "max_player_count": 14,
    "description": "best tournois ever c''est certain",
    "image": "image.com",
    "user_id": "1"
}');


SELECT add_user_to_tournament('{
    "tournament_id": 5,   
    "user_id": 6
    
}');

SELECT delete_tournament('{
    "label": "tournoi de ouf mais on change",
    "type": "privé",
    "date": "30/09/2022",
    "game": "lol",
    "format": "premier elimination",
    "max_player_count": 14,
    "description": "best tournois ever c''est certain",
    "image": "image.com",
    "user_id": "1"
}');
SELECT delete_user('{
    "firstname": "Bob",
    "lastname": "Marley",
    "nickname": "BobbyM",
    "mail": "bob@test.com",
    "password": "azerty123"
}');
ROLLBACK;
