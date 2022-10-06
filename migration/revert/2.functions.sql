-- Revert projet-02-tournoi-e-sport-back:2.functions from pg

BEGIN;


DROP FUNCTION create_user(json);
DROP FUNCTION update_user(json);
DROP FUNCTION update_pwd(json);
DROP FUNCTION delete_user(json);
DROP FUNCTION create_tournament(json);
DROP FUNCTION update_tournament(json);
DROP FUNCTION delete_tournament(json);
DROP FUNCTION add_user_to_tournament(json);
DROP FUNCTION add_user_to_encounter(json);
DROP FUNCTION update_encounter(json);
DROP FUNCTION create_encounter (json);
COMMIT;