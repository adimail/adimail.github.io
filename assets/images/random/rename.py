import os

directory_path = os.getcwd()

jpeg_files = [f for f in os.listdir(directory_path) if f.endswith(".jpeg")]

numbered_files = []
non_numbered_files = []

for file in jpeg_files:
    name, _ = os.path.splitext(file)
    if name.isdigit():
        numbered_files.append(int(name))
    else:
        non_numbered_files.append(file)

numbered_files.sort()

max_number = numbered_files[-1] if numbered_files else 0
all_numbers = set(range(1, max_number + 1))
missing_numbers = sorted(all_numbers - set(numbered_files))

for file in non_numbered_files:
    if missing_numbers:
        new_number = missing_numbers.pop(0)
        new_name = f"{new_number}.jpeg"
    else:
        max_number += 1
        new_name = f"{max_number}.jpeg"

    old_path = os.path.join(directory_path, file)
    new_path = os.path.join(directory_path, new_name)
    os.rename(old_path, new_path)

jpeg_files = [f for f in os.listdir(directory_path) if f.endswith(".jpeg")]
numbered_files = []
for file in jpeg_files:
    name, _ = os.path.splitext(file)
    if name.isdigit():
        numbered_files.append(int(name))

numbered_files.sort()

max_number = numbered_files[-1] if numbered_files else 0
all_numbers = set(range(1, max_number + 1))
missing_numbers = sorted(all_numbers - set(numbered_files))

remaining_files = [f for f in jpeg_files if not os.path.splitext(f)[0].isdigit()]
remaining_files.sort()

for file in reversed(sorted(jpeg_files)):
    if missing_numbers:
        old_path = os.path.join(directory_path, file)
        new_number = missing_numbers.pop(0)
        new_name = f"{new_number}.jpeg"
        new_path = os.path.join(directory_path, new_name)
        os.rename(old_path, new_path)

print("All .jpeg files have been renamed and gaps filled.")
