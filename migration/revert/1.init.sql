-- Revert projet-02-tournoi-e-sport-back:1.init from pg

BEGIN;

DROP TABLE IF EXISTS "user_has_encounter", "tournament_has_user",  public."user", "tournament",  "encounter", "round";

COMMIT;
