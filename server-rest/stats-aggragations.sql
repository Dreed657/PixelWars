-- Totals
SELECT COUNT(id) FROM pixelwars."Canvas";
SELECT COUNT(id) FROM pixelwars."Play";
SELECT COUNT(id) FROM pixelwars."Snapshot";
SELECT "canvasId", "clientId", COUNT(*) FROM pixelwars."Play" group by "clientId", "canvasId";

-- Plays per hour
select date_trunc('hour', "createdAt") as "timestamp", COUNT(id) as "total" FROM pixelwars."Play" group by "timestamp"

-- Plays per canvas
select "canvasId", COUNT(id) FROM pixelwars."Play" group by "canvasId";

-- Plays per client
select "clientId", COUNT(id) FROM pixelwars."Play" group by "clientId";

-- Snapshots per hour
select date_trunc('hour', "createdAt") as "timestamp", COUNT(id) FROM pixelwars."Snapshot" group by "timestamp";