#!/usr/bin/env python3
"""
Midnight Magnolia Dashboard
Web-based control center for file organization, deduplication, monetization,
and Zora essentialist coaching with wellness tracking.

Built for Midnight Magnolia by SAIMON
"""

from flask import Flask, render_template, jsonify, request
from pathlib import Path
import json
import os
from datetime import datetime, timedelta
import shutil
import subprocess

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

# Paths
HOME = Path.home()
REPORTS_DIR = HOME / "MidnightMagnolia_Reports"
# Keep dashboard resources rooted to this repo location.
DASHBOARD_DIR = Path(__file__).resolve().parent
SCANNER_SCRIPT = HOME / "Desktop" / "midnight_magnolia_scanner.py"
COACHING_FRAMEWORKS = DASHBOARD_DIR / "coaching_frameworks.json"
WELLNESS_DATA_DIR = HOME / "MidnightMagnolia_Wellness"

# Ensure directories exist
DASHBOARD_DIR.mkdir(exist_ok=True)
WELLNESS_DATA_DIR.mkdir(exist_ok=True)

class DashboardManager:
    """Manages all dashboard operations"""

    def __init__(self):
        self.reports_dir = REPORTS_DIR
        self.latest_report = None
        self.load_latest_report()

    def load_latest_report(self):
        """Load the most recent scan report"""
        if not self.reports_dir.exists():
            return False

        # Find latest scan_summary file
        summary_files = list(self.reports_dir.glob("scan_summary_*.json"))
        if not summary_files:
            return False

        latest = max(summary_files, key=lambda p: p.stat().st_mtime)

        try:
            with open(latest, 'r') as f:
                self.latest_report = json.load(f)

            # Load associated files
            timestamp = latest.stem.split('_', 2)[2]
            self.file_map_path = self.reports_dir / f"file_map_{timestamp}.json"
            self.duplicates_path = self.reports_dir / f"duplicates_{timestamp}.json"

            return True
        except Exception as e:
            print(f"Error loading report: {e}")
            return False

    def get_overview(self):
        """Get dashboard overview stats"""
        if not self.latest_report:
            return {
                'status': 'no_scan',
                'message': 'No scan data available. Run scanner first.',
                'total_files': 0,
                'total_size_gb': 0,
                'duplicates': 0,
                'potential_savings_gb': 0,
                'sellable_ready': 0
            }

        return {
            'status': 'ready',
            'scan_date': self.latest_report.get('scan_date'),
            'total_files': self.latest_report.get('total_files', 0),
            'total_size_gb': self.latest_report.get('total_size_gb', 0),
            'duplicates': self.latest_report.get('duplicate_files', 0),
            'potential_savings_gb': self.latest_report.get('duplicate_size_gb', 0),
            'categories': self.latest_report.get('categories', {})
        }

    def get_duplicates(self):
        """Get all duplicate sets"""
        if not self.duplicates_path.exists():
            return []

        try:
            with open(self.duplicates_path, 'r') as f:
                duplicates = json.load(f)

            return duplicates
        except Exception as e:
            print(f"Error loading duplicates: {e}")
            return []

    def get_monetization_summary(self):
        """Get monetization classification summary"""
        if not self.file_map_path.exists():
            return {}

        try:
            with open(self.file_map_path, 'r') as f:
                file_map = json.load(f)

            monetization = {
                'ready': [],
                'needs_work': [],
                'archive': [],
                'personal': []
            }

            for file_info in file_map:
                category = file_info.get('category', 'other')
                size_mb = file_info.get('size_mb', 0)
                file_type = file_info.get('type', category)
                extension = file_info.get('extension', '')
                
                # Build file entry with all needed fields
                file_entry = {
                    'path': file_info['path'],
                    'name': file_info['name'],
                    'size_mb': size_mb,
                    'type': file_type,
                    'category': category,
                    'extension': extension
                }
                
                # Classify based on type and size
                if category in ['images', 'design']:
                    if size_mb > 5:
                        monetization['ready'].append(file_entry)
                    else:
                        monetization['needs_work'].append(file_entry)
                elif category in ['documents', 'presentations', 'spreadsheets']:
                    if size_mb > 0.5:
                        monetization['ready'].append(file_entry)
                    else:
                        monetization['needs_work'].append(file_entry)
                elif category in ['audio', 'videos']:
                    if size_mb > 10:
                        monetization['ready'].append(file_entry)
                    else:
                        monetization['needs_work'].append(file_entry)
                elif category == 'coding':
                    monetization['needs_work'].append(file_entry)
                else:
                    monetization['archive'].append(file_entry)

            return monetization
        except Exception as e:
            print(f"Error in monetization summary: {e}")
            return {}

    def delete_duplicate(self, file_path):
        """Safely delete a duplicate file and update reports"""
        try:
            file_path_obj = Path(file_path)
            file_existed = file_path_obj.exists()
            
            # Try to move actual file to trash if it exists
            if file_existed:
                trash_path = HOME / ".Trash"
                if trash_path.exists():
                    dest = trash_path / file_path_obj.name
                    # Handle name conflicts in trash
                    counter = 1
                    while dest.exists():
                        dest = trash_path / f"{file_path_obj.stem}_{counter}{file_path_obj.suffix}"
                        counter += 1
                    shutil.move(str(file_path_obj), str(dest))
            
            # Always update the duplicates report to remove this file
            self._remove_from_duplicates_report(file_path)
            
            if file_existed:
                return {'success': True, 'message': f'Moved to trash: {file_path_obj.name}'}
            else:
                return {'success': True, 'message': f'Removed from report: {file_path_obj.name}'}
                
        except Exception as e:
            return {'success': False, 'message': str(e)}
    
    def _remove_from_duplicates_report(self, file_path):
        """Remove a file from the duplicates report"""
        if not self.duplicates_path.exists():
            return
            
        try:
            with open(self.duplicates_path, 'r') as f:
                duplicates = json.load(f)
            
            # Filter out the deleted file from each duplicate set
            updated_duplicates = []
            for dup_set in duplicates:
                updated_files = [f for f in dup_set.get('files', []) if f.get('path') != file_path]
                if len(updated_files) > 1:  # Only keep sets with 2+ files
                    dup_set['files'] = updated_files
                    dup_set['count'] = len(updated_files)
                    # Recalculate wasted space
                    if updated_files:
                        dup_set['wasted_space_mb'] = round(updated_files[0].get('size_mb', 0) * (len(updated_files) - 1), 2)
                    updated_duplicates.append(dup_set)
            
            # Save updated report
            with open(self.duplicates_path, 'w') as f:
                json.dump(updated_duplicates, f, indent=2)
                
        except Exception as e:
            print(f"Error updating duplicates report: {e}")

    def organize_file(self, source_path, destination_dir):
        """Move file to organized location"""
        try:
            source = Path(source_path)
            dest_dir = Path(destination_dir)
            dest_dir.mkdir(parents=True, exist_ok=True)

            destination = dest_dir / source.name

            # Handle name conflicts
            counter = 1
            while destination.exists():
                name_parts = source.stem, f"_{counter}", source.suffix
                destination = dest_dir / ''.join(name_parts)
                counter += 1

            shutil.move(str(source), str(destination))
            return {'success': True, 'message': f'Moved to {destination}'}
        except Exception as e:
            return {'success': False, 'message': str(e)}

    def run_scan(self):
        """Trigger a new scan"""
        try:
            result = subprocess.run(
                ['python3', str(SCANNER_SCRIPT)],
                capture_output=True,
                text=True,
                timeout=3600
            )

            if result.returncode == 0:
                self.load_latest_report()
                return {'success': True, 'message': 'Scan completed successfully'}
            else:
                return {'success': False, 'message': f'Scan failed: {result.stderr}'}
        except subprocess.TimeoutExpired:
            return {'success': False, 'message': 'Scan timeout (>1 hour)'}
        except Exception as e:
            return {'success': False, 'message': str(e)}

# Initialize manager
manager = DashboardManager()

# Routes
@app.route('/')
def index():
    """Main dashboard page"""
    return render_template('dashboard.html')

@app.route('/api/config')
def api_config():
    """Get configuration values for the frontend"""
    home = str(Path.home())
    return jsonify({
        'home_path': home,
        'archive_base_path': f'{home}/MidnightMagnolia_Archive',
        'reports_path': f'{home}/MidnightMagnolia_Reports',
        'wellness_path': f'{home}/MidnightMagnolia_Wellness'
    })

@app.route('/api/overview')
def api_overview():
    """Get overview stats"""
    return jsonify(manager.get_overview())

@app.route('/api/duplicates')
def api_duplicates():
    """Get duplicate sets"""
    duplicates = manager.get_duplicates()
    return jsonify({
        'total_sets': len(duplicates),
        'duplicates': duplicates
    })

@app.route('/api/monetization')
def api_monetization():
    """Get monetization summary"""
    return jsonify(manager.get_monetization_summary())

@app.route('/api/delete-duplicate', methods=['POST'])
def delete_duplicate():
    """Delete a duplicate file"""
    data = request.json
    file_path = data.get('file_path')
    result = manager.delete_duplicate(file_path)
    return jsonify(result)

@app.route('/api/open-file', methods=['POST'])
def open_file():
    """Open/reveal a file in Finder"""
    import subprocess
    data = request.json
    file_path = data.get('file_path')
    
    try:
        path = Path(file_path)
        if path.exists():
            # Reveal in Finder (highlights the file)
            subprocess.run(['open', '-R', str(path)], check=True)
            return jsonify({'success': True, 'message': f'Revealed in Finder: {path.name}'})
        else:
            return jsonify({'success': False, 'message': 'File not found on disk'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/api/organize-file', methods=['POST'])
def organize_file():
    """Move file to organized location"""
    data = request.json
    source = data.get('source_path')
    dest = data.get('destination_dir')
    result = manager.organize_file(source, dest)
    return jsonify(result)

@app.route('/api/run-scan', methods=['POST'])
def run_scan():
    """Trigger a new scan"""
    result = manager.run_scan()
    return jsonify(result)


# ==================== COACHING & WELLNESS ROUTES ====================

@app.route('/api/coaching-frameworks')
def get_coaching_frameworks():
    """Get all coaching frameworks data"""
    try:
        if COACHING_FRAMEWORKS.exists():
            with open(COACHING_FRAMEWORKS, 'r') as f:
                return jsonify(json.load(f))
        else:
            return jsonify({'error': 'Frameworks file not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/wellness/log', methods=['POST'])
def log_wellness():
    """Log daily wellness check-in"""
    try:
        data = request.json
        today = datetime.now().strftime('%Y-%m-%d')
        
        wellness_entry = {
            'date': today,
            'timestamp': datetime.now().isoformat(),
            'energy': data.get('energy'),
            'focus': data.get('focus'),
            'recovery_activities': data.get('recovery_activities', []),
            'notes': data.get('notes', '')
        }
        
        # Load existing data or create new
        wellness_file = WELLNESS_DATA_DIR / f"wellness_{datetime.now().strftime('%Y_%m')}.json"
        
        if wellness_file.exists():
            with open(wellness_file, 'r') as f:
                wellness_data = json.load(f)
        else:
            wellness_data = {'entries': [], 'month': datetime.now().strftime('%Y-%m')}
        
        # Update or add entry for today
        existing_idx = next((i for i, e in enumerate(wellness_data['entries']) if e['date'] == today), None)
        if existing_idx is not None:
            wellness_data['entries'][existing_idx] = wellness_entry
        else:
            wellness_data['entries'].append(wellness_entry)
        
        with open(wellness_file, 'w') as f:
            json.dump(wellness_data, f, indent=2)
        
        return jsonify({'success': True, 'message': 'Wellness logged'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@app.route('/api/wellness/history')
def get_wellness_history():
    """Get wellness history for the current month"""
    try:
        wellness_file = WELLNESS_DATA_DIR / f"wellness_{datetime.now().strftime('%Y_%m')}.json"
        
        if wellness_file.exists():
            with open(wellness_file, 'r') as f:
                data = json.load(f)
            
            # Calculate averages
            entries = data.get('entries', [])
            if entries:
                avg_energy = sum(e.get('energy', 0) or 0 for e in entries) / len(entries)
                avg_focus = sum(e.get('focus', 0) or 0 for e in entries) / len(entries)
                
                # Count recovery activities
                recovery_counts = {}
                for entry in entries:
                    for activity in entry.get('recovery_activities', []):
                        recovery_counts[activity] = recovery_counts.get(activity, 0) + 1
                
                data['summary'] = {
                    'average_energy': round(avg_energy, 1),
                    'average_focus': round(avg_focus, 1),
                    'total_entries': len(entries),
                    'top_recovery_activities': sorted(recovery_counts.items(), key=lambda x: x[1], reverse=True)[:5]
                }
            
            return jsonify(data)
        else:
            return jsonify({'entries': [], 'summary': None})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/wellness/today')
def get_wellness_today():
    """Get today's wellness entry if it exists"""
    try:
        today = datetime.now().strftime('%Y-%m-%d')
        wellness_file = WELLNESS_DATA_DIR / f"wellness_{datetime.now().strftime('%Y_%m')}.json"
        
        if wellness_file.exists():
            with open(wellness_file, 'r') as f:
                data = json.load(f)
            
            for entry in data.get('entries', []):
                if entry['date'] == today:
                    return jsonify(entry)
        
        return jsonify({'date': today, 'energy': None, 'focus': None, 'recovery_activities': []})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    # Use port 8888 to avoid conflicts with macOS services
    PORT = 8888
    
    print("\n" + "="*60)
    print("🌙 MIDNIGHT MAGNOLIA DASHBOARD")
    print("="*60)
    print(f"\n📊 Dashboard running at: http://127.0.0.1:{PORT}")
    print(f"   Alternative URL:      http://localhost:{PORT}")
    print("\n🔓 Press Ctrl+C to stop the dashboard\n")

    # Open browser automatically using IP address (more reliable)
    import time
    import webbrowser

    def open_browser():
        time.sleep(1.5)
        webbrowser.open(f'http://127.0.0.1:{PORT}')

    import threading
    threading.Thread(target=open_browser, daemon=True).start()

    # Bind to all interfaces for maximum compatibility
    app.run(debug=False, port=PORT, host='0.0.0.0')
