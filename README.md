# The ultimate tmux config file!!

Supports clipboard, vim, nesting managing, and common navigation stuff


TLDR; copy tmux.conf to ~/.tmux.conf or execute ./cpconf (yeah im that loose). 

For direct system clipboard support, install xclip (apt install xclip in ubuntu), and for nice vim support, copy into your .vimrc:

```
if &term =~ '^screen'
    " tmux will send xterm-style keys when its xterm-keys option is on
    execute "set <xUp>=\e[1;*A"
    execute "set <xDown>=\e[1;*B"
    execute "set <xRight>=\e[1;*C"
    execute "set <xLeft>=\e[1;*D"
endif
```

If you want to change it, i recomend to edit tmux.genconf, then execute generate.js, your new tmux.conf is ready ^^.

tmux.genfile adds a simple #$tag syntax to detect-manage the conf sections or variables.
On generate.js (node), the file and its main sections are joined.

The main reason to this was the need to unbind or bind sets of keys (f.e. nesting) confortably and fast for experimenting.

## Key mapping

just read the end file for now :)
