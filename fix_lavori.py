import re

with open('/Users/alfi/Documents/fox/Fox-Industrial 2/lavori.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the end of </main> and the start of <footer
main_end_idx = content.find('</main>')
footer_start_idx = content.find('<footer')

if main_end_idx != -1 and footer_start_idx != -1:
    new_content = content[:main_end_idx + 7] + '\n  ' + content[footer_start_idx:]
    with open('/Users/alfi/Documents/fox/Fox-Industrial 2/lavori.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed!")
else:
    print("Tags not found.")
