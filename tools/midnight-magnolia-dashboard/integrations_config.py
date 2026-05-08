#!/usr/bin/env python3
"""
🌙 Midnight Magnolia - Integrations Configuration
Secure storage for all API credentials and configuration

⚠️ SECURITY NOTE: This file contains sensitive credentials.
Add to .gitignore and never commit to version control!
"""

from pathlib import Path
import os

# ==================== PATHS ====================

HOME = Path.home()
SYSTEM_ROOT = HOME / "Desktop" / "MidnightMagnoliaSystem"
# This file now lives inside the MidnightMagnolia repo.
DASHBOARD_ROOT = Path(__file__).resolve().parent
REPO_ROOT = DASHBOARD_ROOT.parent.parent
WEBSITE_ROOT = REPO_ROOT
ARTWORK_CATALOG = WEBSITE_ROOT / "Artwork" / "organized_artwork"
if not ARTWORK_CATALOG.exists():
    ARTWORK_CATALOG = WEBSITE_ROOT / "assets" / "Artwork" / "organized_artwork"

# ==================== NOTION ====================

NOTION_CONFIG = {
    "token": os.getenv("NOTION_TOKEN", ""),
    "version": "2022-06-28",
    "main_database_id": "2e0449ba-6ea3-809b-a213-c3051983d8f5",
    # Hub page (from your Sanctuary link)
    "hub_page_id": "ff3ad1d2-869d-4ebc-ac7a-0906c5bcb237",
    # Add more database IDs as you create them
    "databases": {
        "main": "2e0449ba-6ea3-809b-a213-c3051983d8f5",
        "wellness": "2ee449ba-6ea3-8124-aa7f-dd1d74e80e03",
        "goals": "2ee449ba-6ea3-81e0-a72d-f622d37df6b9",
        "assets": "2ee449ba-6ea3-8160-942b-eb92adc33f3b",
        "content": "2ee449ba-6ea3-8166-bc30-d017a78d7620",
    }
}

# ==================== PATREON ====================

PATREON_CONFIG = {
    "app_name": "Midnight Magnolia Digital Grimoire",
    "client_id": os.getenv("PATREON_CLIENT_ID", ""),
    "access_token": os.getenv("PATREON_ACCESS_TOKEN", ""),
    "refresh_token": os.getenv("PATREON_REFRESH_TOKEN", ""),
    "api_base": "https://www.patreon.com/api/oauth2/v2"
}

# ==================== AIRTABLE ====================
# NOTE: The token below appears encrypted. Get a Personal Access Token from:
# https://airtable.com/create/tokens
# Token should start with "pat" like: patXXXX.XXXXX

AIRTABLE_CONFIG = {
    "token": os.getenv("AIRTABLE_PAT", ""),
    "api_base": "https://api.airtable.com/v0",
    "bases": {
        "web_design": {
            "id": "app0XfTZyLDpx2ASA",
            "tables": {
                "main": "tblbI8gKrGAaifRyi",
                "assets": "tblSgGwAhwN2LZp0b"
            }
        },
        "editorial": {
            "id": "appVcDjcTs78yDs2K",
            "tables": {
                "main": "tbl9Cpr1We3RxY4aO"
            }
        },
        "blog": {
            "id": "appAjiKKKCj7XqyWl",
            "tables": {
                "posts": "tbl72PY8HUJGhW5La"
            }
        }
    }
}

# ==================== ARTWORK CATALOG ====================

ARTWORK_CONFIG = {
    "catalog_json": ARTWORK_CATALOG / "midnight_magnolia_catalog.json",
    "catalog_csv": ARTWORK_CATALOG / "midnight_magnolia_catalog.csv",
    "gallery_html": ARTWORK_CATALOG / "midnight_magnolia_gallery.html",
    "categories": [
        "riverwalk_lantern_path",
        "magnolia_priestess",
        "ancestral_trees_porchlight",
        "moonlit_house"
    ]
}

# ==================== WELLNESS & REPORTS ====================

WELLNESS_PATH = HOME / "MidnightMagnolia_Wellness"
REPORTS_PATH = HOME / "MidnightMagnolia_Reports"
ARCHIVE_PATH = HOME / "MidnightMagnolia_Archive"

# Ensure directories exist
for path in [WELLNESS_PATH, REPORTS_PATH, ARCHIVE_PATH]:
    path.mkdir(exist_ok=True)


def get_notion_headers():
    """Get headers for Notion API requests"""
    return {
        "Authorization": f"Bearer {NOTION_CONFIG['token']}",
        "Content-Type": "application/json",
        "Notion-Version": NOTION_CONFIG['version']
    }


def get_airtable_headers():
    """Get headers for Airtable API requests"""
    return {
        "Authorization": f"Bearer {AIRTABLE_CONFIG['token']}",
        "Content-Type": "application/json"
    }


def get_patreon_headers():
    """Get headers for Patreon API requests"""
    return {
        "Authorization": f"Bearer {PATREON_CONFIG['access_token']}",
        "Content-Type": "application/json"
    }
