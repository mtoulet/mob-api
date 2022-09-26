-- Revert projet-02-tournoi-e-sport-back:2.functions from pg

BEGIN;

DROP FUNCTION create_user(json);
DROP FUNCTION update_user(json);
DROP FUNCTION delete_user(json);

COMMIT;
