#!/usr/bin/env python3
"""
Midnight Magnolia Complete System Check
Verifies all components are in place and ready
"""

from pathlib import Path
import json
import sys

HOME = Path.home()
DASHBOARD_ROOT = Path(__file__).resolve().parent

def check_component(name, path, required=True):
    """Check if a component exists"""
    exists = path.exists()
    status = "✅" if exists else "❌"
    requirement = "REQUIRED" if required else "OPTIONAL"

    print(f"{status} {name:<40} [{requirement}]")
    if not exists:
        print(f"   📍 Expected at: {path}")
    return exists

def check_file(name, path):
    """Check specific file"""
    if path.exists():
        size = path.stat().st_size
        if size > 1024*1024:
            size_str = f"{size/(1024*1024):.1f} MB"
        elif size > 1024:
            size_str = f"{size/1024:.1f} KB"
        else:
            size_str = f"{size} B"
        print(f"✅ {name:<40} ({size_str})")
        return True
    else:
        print(f"❌ {name:<40} (MISSING)")
        return False

def main():
    print("\n" + "="*70)
    print("🌙 MIDNIGHT MAGNOLIA - SYSTEM CHECK")
    print("="*70 + "\n")

    # Phase 1: Scanner
    print("📊 PHASE 1: SCANNER")
    print("-" * 70)
    p1_scanner = check_component(
        "Scanner Script",
        HOME / "Desktop" / "midnight_magnolia_scanner.py"
    )
    p1_launcher = check_component(
        "Scanner Launcher",
        HOME / "Desktop" / "Run_Midnight_Magnolia_Scanner.command"
    )
    p1_readme = check_component(
        "Scanner README",
        HOME / "Desktop" / "README.md"
    )
    p1_complete = p1_scanner and p1_launcher and p1_readme
    print()

    # Phase 4: Dashboard
    print("📈 PHASE 4: DASHBOARD")
    print("-" * 70)
    p4_app = check_component(
        "Dashboard App",
        DASHBOARD_ROOT / "dashboard_app.py"
    )
    p4_ui = check_component(
        "Dashboard HTML",
        DASHBOARD_ROOT / "templates" / "dashboard.html"
    )
    p4_launcher = check_component(
        "Dashboard Launcher",
        DASHBOARD_ROOT / "Launch_Dashboard.command"
    )
    p4_guide = check_component(
        "Dashboard Guide",
        DASHBOARD_ROOT / "DASHBOARD_GUIDE.md"
    )
    p4_complete = p4_app and p4_ui and p4_launcher and p4_guide
    print()

    # Evaluation
    print("🧪 EVALUATION FRAMEWORK")
    print("-" * 70)
    eval_framework = check_component(
        "Evaluation Framework",
        HOME / "MidnightMagnolia_Evaluation" / "evaluation_framework.py"
    )
    eval_queries = check_component(
        "Test Queries",
        HOME / "MidnightMagnolia_Evaluation" / "test_queries.json"
    )
    eval_responses = check_component(
        "Test Responses",
        HOME / "MidnightMagnolia_Evaluation" / "test_responses.json"
    )
    eval_complete = eval_framework and eval_queries and eval_responses
    print()

    # Reports
    print("📋 SCAN REPORTS (Generated after first scan)")
    print("-" * 70)
    reports_dir = HOME / "MidnightMagnolia_Reports"
    if reports_dir.exists():
        reports = list(reports_dir.glob("*.json"))
        if reports:
            print(f"✅ Found {len(reports)} report files")
            for report in sorted(reports)[-3:]:
                check_file(report.stem, report)
        else:
            print("⏳ Reports directory exists (empty - run scanner first)")
    else:
        print("⏳ Reports directory not yet created (will be created on first scan)")
    print()

    # Summary
    print("="*70)
    print("📊 SYSTEM STATUS")
    print("="*70)

    checks = {
        "Phase 1: Scanner": p1_complete,
        "Phase 4: Dashboard": p4_complete,
        "Evaluation Framework": eval_complete,
    }

    all_complete = all(checks.values())

    for component, status in checks.items():
        symbol = "✅" if status else "⚠️"
        print(f"{symbol} {component}")

    print()

    if all_complete:
        print("🎉 SYSTEM READY!")
        print("\n📋 NEXT STEPS:")
        print("1. Run Scanner: Double-click ~/Desktop/Run_Midnight_Magnolia_Scanner.command")
        print("2. Wait for scan to complete (5-15 minutes)")
        print(f"3. Open Dashboard: Double-click {DASHBOARD_ROOT / 'Launch_Dashboard.command'}")
        print("4. Review monetization hub for content ready to sell")
        print("5. Delete duplicates to free up space")
        print("\n✨ Your Patreon launch content awaits!")
    else:
        print("⚠️ Some components are missing. Check above for details.")

    print("\n" + "="*70 + "\n")

if __name__ == "__main__":
    main()
