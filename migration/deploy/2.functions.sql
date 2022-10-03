-- Deploy projet-02-tournoi-e-sport-back:2.functions to pg

BEGIN;

CREATE OR REPLACE FUNCTION create_user (json) RETURNS "user" AS $$
INSERT INTO public.user (firstname, lastname, nickname, mail, password)
VALUES (
    $1->>'firstname',
    $1->>'lastname',
    $1->>'nickname',
    $1->>'mail',
    $1->>'password'
) RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE OR REPLACE FUNCTION update_user(json) RETURNS "user" AS $$
    UPDATE "user" SET
    firstname=$1->>'firstname',
    lastname=$1->>'lastname',
    nickname=$1->>'nickname'  
    WHERE id=($1->>'id')::int
    RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE OR REPLACE FUNCTION update_pwd(json) RETURNS "user" AS $$
    UPDATE "user" SET
    password=$1->>'password'
    WHERE id=($1->>'id')::int
    RETURNING *;
$$ LANGUAGE SQL STRICT;


CREATE OR REPLACE FUNCTION delete_user(json) RETURNS "user" AS $$
    DELETE FROM public."user"
    WHERE id=($1->>'id')::int
    RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE OR REPLACE FUNCTION create_tournament(json) RETURNS "tournament" AS $$
INSERT INTO public.tournament (label, type, date, game, format, moderator, user_id)
VALUES (
    $1->>'label',
    $1->>'type',
    ($1->>'date')::timestamptz,
    $1->>'game',
    $1->>'format',
    $1->>'moderator',
    ($1->>'user_id')::integer
) RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE OR REPLACE FUNCTION update_tournament(json) RETURNS "tournament" AS $$
    UPDATE "tournament" SET
    label=$1->>'label',  
    type=$1->>'type',
    date=($1->>'date')::timestamptz,
    game=$1->>'game',
    format=$1->>'format'
    WHERE id=($1->>'id')::int
    RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE OR REPLACE FUNCTION delete_tournament (json) RETURNS "tournament" AS $$
    DELETE FROM public."tournament"
    WHERE id=($1->>'id')::int
    RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE OR REPLACE FUNCTION add_user_to_tournament (json) RETURNS "tournament_has_user" AS $$
INSERT INTO tournament_has_user ( "tournament_id", "user_id")
VALUES (
    ($1->>'tournament_id')::int,   
    ($1->>'user_id')::int
)
RETURNING *;
$$ LANGUAGE SQL STRICT;

COMMIT;
