#!/usr/bin/env python3
"""
Local dev server for Fox Industrial that mimics Netlify's clean URL routing.
Maps /about -> about.html, /services -> services.html, etc.
"""
import http.server
import os

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Strip query string
        path = self.path.split('?')[0]

        # If path has no extension and isn't a directory, try .html
        if path != '/' and '.' not in os.path.basename(path):
            html_path = path.rstrip('/') + '.html'
            full_path = os.path.join(os.getcwd(), html_path.lstrip('/'))
            if os.path.isfile(full_path):
                self.path = html_path
        
        return super().do_GET()

if __name__ == '__main__':
    PORT = 8080
    print(f'🚀 Dev server running at http://localhost:{PORT}')
    print(f'   Clean URLs enabled: /about → about.html, etc.')
    print(f'   Press Ctrl+C to stop.\n')
    server = http.server.HTTPServer(('', PORT), CleanURLHandler)
    server.serve_forever()
