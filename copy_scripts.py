import os, glob
import shutil

src_dir = r"C:\Users\Gaura\.gemini\antigravity\brain\8297d9a6-5dd5-4d91-9757-d61e3727f385"
files = glob.glob(os.path.join(src_dir, 'media__*.png'))
files.sort(key=os.path.getmtime, reverse=True)

latest = files[:5]

dest_dir = r"C:\Users\Gaura\Downloads\posterzz-launchpad-main\posterzz-launchpad-main\src\assets\posts"
os.makedirs(dest_dir, exist_ok=True)

for i, f in enumerate(latest):
    dest = os.path.join(dest_dir, f'{i+1}.png')
    shutil.copy(f, dest)
    print(f'copied {f} to {dest}')
