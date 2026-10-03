CREATE TABLE resource (
  resource_id TEXT PRIMARY KEY,
  organization TEXT NOT NULL,
  program TEXT,
  description TEXT NOT NULL,
  website TEXT,
  phone TEXT,
  email TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending_review','verified','review_due','archived')),
  classification TEXT NOT NULL DEFAULT 'public',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE category (category_id TEXT PRIMARY KEY, category_name TEXT UNIQUE NOT NULL, description TEXT);
CREATE TABLE resource_category (resource_id TEXT REFERENCES resource(resource_id), category_id TEXT REFERENCES category(category_id), PRIMARY KEY(resource_id,category_id));
CREATE TABLE location (location_id TEXT PRIMARY KEY, resource_id TEXT REFERENCES resource(resource_id), city TEXT, county TEXT, state TEXT, virtual_available BOOLEAN DEFAULT FALSE);
CREATE TABLE eligibility (eligibility_id TEXT PRIMARY KEY, resource_id TEXT REFERENCES resource(resource_id), population TEXT, age_range TEXT, requirements TEXT, cost TEXT, insurance_sliding_scale TEXT);
CREATE TABLE accessibility (accessibility_id TEXT PRIMARY KEY, resource_id TEXT REFERENCES resource(resource_id), mobility TEXT, language TEXT, virtual TEXT, transportation TEXT, accommodations TEXT);
CREATE TABLE verification (verification_id TEXT PRIMARY KEY, resource_id TEXT REFERENCES resource(resource_id), verified_on DATE, method TEXT, reviewer_role TEXT, result TEXT, next_review DATE);
CREATE TABLE resource_change_log (change_id TEXT PRIMARY KEY, resource_id TEXT REFERENCES resource(resource_id), field_changed TEXT, old_value TEXT, new_value TEXT, changed_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, reviewer_role TEXT);
CREATE TABLE resource_submission (submission_id TEXT PRIMARY KEY, submitted_resource JSON, submitter_contact TEXT, consent BOOLEAN NOT NULL DEFAULT FALSE, review_status TEXT NOT NULL DEFAULT 'pending_review');
