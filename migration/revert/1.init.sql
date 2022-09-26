-- Revert projet-02-tournoi-e-sport-back:1.init from pg

BEGIN;

DROP TABLE IF EXISTS public."user", "tournament", "tournament_has_user", "encounter", "round", "user_has_encounter";

COMMIT;
