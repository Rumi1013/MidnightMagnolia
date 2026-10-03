CREATE TABLE individual (person_id TEXT PRIMARY KEY, names TEXT NOT NULL, birth_date TEXT, death_date TEXT, privacy_status TEXT NOT NULL, verification_status TEXT NOT NULL);
CREATE TABLE relationship (relationship_id TEXT PRIMARY KEY, person_1 TEXT REFERENCES individual(person_id), person_2 TEXT REFERENCES individual(person_id), relationship_type TEXT, evidence_status TEXT);
CREATE TABLE place (place_id TEXT PRIMARY KEY, historical_name TEXT, current_name TEXT, county TEXT, state TEXT, country TEXT, coordinates TEXT);
CREATE TABLE source (source_id TEXT PRIMARY KEY, source_type TEXT, title TEXT, repository TEXT, citation TEXT, url_reference TEXT, access_date DATE);
CREATE TABLE assertion (fact_id TEXT PRIMARY KEY, person_id TEXT REFERENCES individual(person_id), fact_type TEXT, fact_value TEXT, date_place TEXT, confidence TEXT, source_id TEXT REFERENCES source(source_id));
CREATE TABLE research_log (log_id TEXT PRIMARY KEY, research_question TEXT, person_family TEXT, source_searched TEXT, finding TEXT, next_step TEXT, logged_on DATE);
CREATE TABLE contribution (submission_id TEXT PRIMARY KEY, submitter_contact TEXT, submitter_relationship TEXT, claim TEXT, attachment_reference TEXT, permission_level TEXT, review_status TEXT);
CREATE TABLE research_request (request_id TEXT PRIMARY KEY, client_contact TEXT, service_type TEXT, scope TEXT, deadline DATE, status TEXT, deliverables TEXT);
