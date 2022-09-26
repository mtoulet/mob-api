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
    nickname=$1->>'nickname',  
    password=$1->>'password'
    WHERE id=($1->>'id')::int
    RETURNING *;
$$ LANGUAGE SQL STRICT;


CREATE OR REPLACE FUNCTION delete_user (json) RETURNS "user" AS $$
    DELETE FROM public."user"
    WHERE id=($1->>'id')::int
    RETURNING *;
$$ LANGUAGE SQL STRICT;

COMMIT;
