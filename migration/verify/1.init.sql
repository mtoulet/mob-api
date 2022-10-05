-- Verify projet-02-tournoi-e-sport-back:1.init on pg

BEGIN;

SELECT (id, lastname, firstname, nickname, mail, "password", trophies, honor_point, team, "role", avatar, created_at, updated_at) FROM public."user";
SELECT (id, label, "type", "date", game, "format", max_player_count, "description", "image", "user_id") FROM tournament;
SELECT (tournament_id, "user_id") FROM tournament_has_user;
SELECT (id, winner, loser, "date", winner_score, loser_score, tournament_id) FROM encounter;
SELECT (id, winner, loser, encounter_id) FROM "round";
SELECT ("user_id", encounter_id) FROM user_has_encounter;

ROLLBACK;
