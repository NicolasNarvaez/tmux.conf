# The ultimate tmux config file!!

Supports clipboard, vim, nesting managing, and common navigation stuff

TLDR; copy tmux.conf to ~/.tmux.conf or execute ./cpconf (yeah im that loose)

If you want to change it, i recomend to edit tmux.genconf, then execute generate.js, your new tmux.conf is ready ^^
It adds a simple #$tag syntax to detect-manage the conf sections or variables
On generate.js (node), the file and its main sections are joined.

The main reason to this was the need to unbind or bind sets of keys (f.e. nesting).
