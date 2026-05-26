#!/usr/bin/env python3
"""
usb_transfer.py

Copy files or folders to a USB removable drive.

Usage:
    python usb_transfer.py source_path [source_path ...]

The script will try to detect removable USB drives on Windows and offer them as targets.
If no removable drive is detected, you can enter a destination path manually.
"""

import os
import shutil
import sys
from pathlib import Path


def get_removable_drives():
    drives = []
    if os.name == 'nt':
        try:
            import ctypes
            bitmask = ctypes.windll.kernel32.GetLogicalDrives()
            for i in range(26):
                if bitmask & (1 << i):
                    drive = f'{chr(65 + i)}:\\'
                    drive_type = ctypes.windll.kernel32.GetDriveTypeW(drive)
                    # DRIVE_REMOVABLE == 2
                    if drive_type == 2:
                        drives.append(drive)
        except Exception:
            pass
    else:
        for base in ['/media', '/mnt', '/run/media']:
            if os.path.isdir(base):
                for name in os.listdir(base):
                    path = os.path.join(base, name)
                    if os.path.isdir(path):
                        drives.append(path)
    return drives


def copy_source_to_destination(source: Path, destination: Path):
    if source.is_dir():
        target_dir = destination / source.name
        print(f'Copying folder: {source} -> {target_dir}')
        if target_dir.exists():
            print(f'Warning: destination already exists: {target_dir}')
        shutil.copytree(source, target_dir, dirs_exist_ok=True)
    else:
        destination.mkdir(parents=True, exist_ok=True)
        target_file = destination / source.name
        print(f'Copying file: {source} -> {target_file}')
        shutil.copy2(source, target_file)


def choose_destination():
    removable = get_removable_drives()
    if removable:
        print('Detected removable drives:')
        for idx, drive in enumerate(removable, 1):
            print(f'  {idx}. {drive}')
        choice = input('Select target drive number or press Enter to type a path: ').strip()
        if choice.isdigit() and 1 <= int(choice) <= len(removable):
            return Path(removable[int(choice) - 1])

    print('No removable drive selected. Enter a destination folder path:')
    manual_path = input('Destination path: ').strip()
    return Path(manual_path)


def main():
    if len(sys.argv) < 2:
        print('Usage: python usb_transfer.py source_path [source_path ...]')
        sys.exit(1)

    sources = [Path(p).expanduser().resolve() for p in sys.argv[1:]]
    for source in sources:
        if not source.exists():
            print(f'Error: source does not exist: {source}')
            sys.exit(1)

    destination = choose_destination()
    if not destination:
        print('No destination selected. Aborting.')
        sys.exit(1)

    if not destination.exists():
        try:
            destination.mkdir(parents=True, exist_ok=True)
        except Exception as e:
            print(f'Cannot create destination: {e}')
            sys.exit(1)

    for source in sources:
        try:
            copy_source_to_destination(source, destination)
        except Exception as e:
            print(f'Failed to copy {source}: {e}')
            sys.exit(1)

    print('Transfer complete.')


if __name__ == '__main__':
    main()
