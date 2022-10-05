-- Deploy projet-02-tournoi-e-sport-back:1.init to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "user" (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lastname text NOT NULL,
    firstname text NOT NULL,
    nickname text NOT NULL,
    mail text NOT NULL UNIQUE,
    "password" text NOT NULL,
    trophies integer,
    honor_point integer DEFAULT 0,
    team text,
    "role" text,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "tournament" (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text NOT NULL,
    "type" text NOT NULL,
    "date" date NOT NULL,
    "game" text NOT NULL,
    "format" text NOT NULL,
    "max_player_count" integer NOT NULL,
    "description" text NOT NULL,
    "image" text,
    "user_id" integer NOT NULL REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS tournament_has_user (
    tournament_id integer NOT NULL REFERENCES "tournament"(id) ON DELETE CASCADE,
    "user_id" integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS encounter (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    winner text DEFAULT NULL,
    loser text DEFAULT NULL,
    "date" date NOT NULL,
    winner_score integer DEFAULT 0,
    loser_score integer DEFAULT 0,
    tournament_id integer NOT NULL REFERENCES "tournament"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "round" (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    winner text,
    loser text,
    encounter_id integer NOT NULL REFERENCES "encounter"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_has_encounter (
    "user_id" integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    "encounter_id" integer NOT NULL REFERENCES "encounter"(id) ON DELETE CASCADE
);

COMMIT;
