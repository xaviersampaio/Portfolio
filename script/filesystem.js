// Copyright (C) 2026 Sampaio Xavier
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License.

export const PERMISSION = {
    NONE: 0,
    READ_ONLY: 1,
    READ_WRITE: 2,
};

export const NODE_TYPE = {
    DIR: 'dir',
    FILE: 'file',
};

export const Filesystem = {
    name: '/',
    type: NODE_TYPE.DIR,
    Permission: PERMISSION.READ_WRITE,
    children: {
        'bin': {
            type: NODE_TYPE.DIR,
            Permission: PERMISSION.READ_WRITE,
            children: {
                'man.d': {
                    type: NODE_TYPE.DIR,
                    Permission: PERMISSION.READ_WRITE,
                    children: {
                        'adduser':    { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/adduser',    Permission: PERMISSION.READ_WRITE },
                        'alsamixer':  { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/alsamixer',  Permission: PERMISSION.READ_WRITE },
                        'cat':        { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/cat',        Permission: PERMISSION.READ_WRITE },
                        'cd':         { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/cd',         Permission: PERMISSION.READ_WRITE },
                        'clear':      { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/clear',      Permission: PERMISSION.READ_WRITE },
                        'echo':       { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/echo',       Permission: PERMISSION.READ_WRITE },
                        'exit':       { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/exit',       Permission: PERMISSION.READ_WRITE },
                        'help':       { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/help',       Permission: PERMISSION.READ_WRITE },
                        'ls':         { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/ls',         Permission: PERMISSION.READ_WRITE },
                        'man':        { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/man',        Permission: PERMISSION.READ_WRITE },
                        'mkdir':      { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/mkdir',      Permission: PERMISSION.READ_WRITE },
                        'neofetch':   { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/neofetch',   Permission: PERMISSION.READ_WRITE },
                        'ollama':     { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/ollama',     Permission: PERMISSION.READ_WRITE },
                        'pwd':        { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/pwd',        Permission: PERMISSION.READ_WRITE },
                        'sampaio':    { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/sampaio',    Permission: PERMISSION.READ_WRITE },
                        'sl':         { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/sl',         Permission: PERMISSION.READ_WRITE },
                        'su':         { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/su',         Permission: PERMISSION.READ_WRITE },
                        'timedatctl': { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/timedatctl', Permission: PERMISSION.READ_WRITE },
                        'uname':      { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/uname',      Permission: PERMISSION.READ_WRITE },
                        'vim':        { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/vim',        Permission: PERMISSION.READ_WRITE },
                        'whoami':     { type: NODE_TYPE.FILE, content: 'data/racine/bin/man.d/whoami',     Permission: PERMISSION.READ_WRITE },
                    },
                },
                'adduser':    { type: NODE_TYPE.FILE, content: 'data/racine/bin/adduser',    Permission: PERMISSION.READ_WRITE },
                'alsamixer':  { type: NODE_TYPE.FILE, content: 'data/racine/bin/alsamixer',  Permission: PERMISSION.READ_WRITE },
                'cat':        { type: NODE_TYPE.FILE, content: 'data/racine/bin/cat',        Permission: PERMISSION.READ_WRITE },
                'cd':         { type: NODE_TYPE.FILE, content: 'data/racine/bin/cd',         Permission: PERMISSION.READ_WRITE },
                'clear':      { type: NODE_TYPE.FILE, content: 'data/racine/bin/clear',      Permission: PERMISSION.READ_WRITE },
                'echo':       { type: NODE_TYPE.FILE, content: 'data/racine/bin/echo',       Permission: PERMISSION.READ_WRITE },
                'exit':       { type: NODE_TYPE.FILE, content: 'data/racine/bin/exit',       Permission: PERMISSION.READ_WRITE },
                'help':       { type: NODE_TYPE.FILE, content: 'data/racine/bin/help',       Permission: PERMISSION.READ_WRITE },
                'ls':         { type: NODE_TYPE.FILE, content: 'data/racine/bin/ls',         Permission: PERMISSION.READ_WRITE },
                'man':        { type: NODE_TYPE.FILE, content: 'data/racine/bin/man',        Permission: PERMISSION.READ_WRITE },
                'mkdir':      { type: NODE_TYPE.FILE, content: 'data/racine/bin/mkdir',      Permission: PERMISSION.READ_WRITE },
                'neofetch':   { type: NODE_TYPE.FILE, content: 'data/racine/bin/neofetch',   Permission: PERMISSION.READ_WRITE },
                'ollama':     { type: NODE_TYPE.FILE, content: 'data/racine/bin/ollama',     Permission: PERMISSION.READ_WRITE },
                'pwd':        { type: NODE_TYPE.FILE, content: 'data/racine/bin/pwd',        Permission: PERMISSION.READ_WRITE },
                'sampaio':    { type: NODE_TYPE.FILE, content: 'data/racine/bin/sampaio',    Permission: PERMISSION.READ_WRITE },
                'sl':         { type: NODE_TYPE.FILE, content: 'data/racine/bin/sl',         Permission: PERMISSION.READ_WRITE },
                'su':         { type: NODE_TYPE.FILE, content: 'data/racine/bin/su',         Permission: PERMISSION.READ_WRITE },
                'timedatctl': { type: NODE_TYPE.FILE, content: 'data/racine/bin/timedatctl', Permission: PERMISSION.READ_WRITE },
                'uname':      { type: NODE_TYPE.FILE, content: 'data/racine/bin/uname',      Permission: PERMISSION.READ_WRITE },
                'vim':        { type: NODE_TYPE.FILE, content: 'data/racine/bin/vim',        Permission: PERMISSION.READ_WRITE },
                'whoami':     { type: NODE_TYPE.FILE, content: 'data/racine/bin/whoami',     Permission: PERMISSION.READ_WRITE },
            },
        },
        'dev': {
            type: NODE_TYPE.DIR,
            Permission: PERMISSION.READ_WRITE,
            children: {
                'disk': {
                    type: NODE_TYPE.DIR,
                    Permission: PERMISSION.READ_WRITE,
                    children: {
                        'by-diskeq':  { type: NODE_TYPE.FILE, content: 'data/racine/dev/disk/by-diskeq',  Permission: PERMISSION.READ_ONLY },
                        'by-id':      { type: NODE_TYPE.FILE, content: 'data/racine/dev/disk/by-id',      Permission: PERMISSION.READ_ONLY },
                        'by-label':   { type: NODE_TYPE.FILE, content: 'data/racine/dev/disk/by-label',   Permission: PERMISSION.READ_ONLY },
                        'by-partuuid':{ type: NODE_TYPE.FILE, content: 'data/racine/dev/disk/by-partuuid',Permission: PERMISSION.READ_ONLY },
                        'by-path':    { type: NODE_TYPE.FILE, content: 'data/racine/dev/disk/by-path',    Permission: PERMISSION.READ_ONLY },
                        'by-uuid':    { type: NODE_TYPE.FILE, content: 'data/racine/dev/disk/by-uuid',    Permission: PERMISSION.READ_ONLY },
                    },
                },
                'cdrom': { type: NODE_TYPE.FILE, content: 'null', Permission: PERMISSION.NONE },
                'null':  { type: NODE_TYPE.FILE, content: ' ',    Permission: PERMISSION.NONE },
            },
        },
        'etc': {
            type: NODE_TYPE.DIR,
            Permission: PERMISSION.READ_WRITE,
            children: {
                'network': {
                    type: NODE_TYPE.DIR,
                    Permission: PERMISSION.READ_WRITE,
                    children: {
                        'if-down.d':      { type: NODE_TYPE.FILE, content: 'data/racine/etc/network/if-down.d',      Permission: PERMISSION.READ_ONLY }, 
                        'if-post-down.d': { type: NODE_TYPE.FILE, content: 'data/racine/etc/network/if-post-down.d', Permission: PERMISSION.READ_ONLY },
                        'interfaces':     { type: NODE_TYPE.FILE, content: 'data/racine/etc/network/interfaces',     Permission: PERMISSION.READ_ONLY },
                    },
                },
                'ssh': {
                    type: NODE_TYPE.DIR,
                    Permission: PERMISSION.READ_WRITE,
                    children: {
                        'ssh_config': { type: NODE_TYPE.FILE, content: 'data/racine/etc/ssh/ssh_config', Permission: PERMISSION.READ_ONLY },
                    },
                },
                'ssl': {
                    type: NODE_TYPE.DIR,
                    Permission: PERMISSION.READ_WRITE,
                    children: {
                        'openssl.conf': { type: NODE_TYPE.FILE, content: 'data/racine/etc/ssl/openssl.conf', Permission: PERMISSION.READ_ONLY },
                    },
                },
                'systemd': {
                    type: NODE_TYPE.DIR,
                    Permission: PERMISSION.READ_WRITE,
                    children: {
                        'journald.conf':  { type: NODE_TYPE.FILE, content: 'data/racine/etc/systemd/journald.conf',  Permission: PERMISSION.READ_WRITE },
                        'logind.conf':    { type: NODE_TYPE.FILE, content: 'data/racine/etc/systemd/logind.conf',    Permission: PERMISSION.READ_WRITE },
                        'networkd.conf':  { type: NODE_TYPE.FILE, content: 'data/racine/etc/systemd/networkd.conf',  Permission: PERMISSION.READ_WRITE },
                        'pstore.conf':    { type: NODE_TYPE.FILE, content: 'data/racine/etc/systemd/pstore.conf',    Permission: PERMISSION.READ_WRITE },
                        'sleep.conf':     { type: NODE_TYPE.FILE, content: 'data/racine/etc/systemd/sleep.conf',     Permission: PERMISSION.READ_WRITE },
                        'system.conf':    { type: NODE_TYPE.FILE, content: 'data/racine/etc/systemd/system.conf',    Permission: PERMISSION.READ_WRITE },
                        'timesyncd.conf': { type: NODE_TYPE.FILE, content: 'data/racine/etc/systemd/timesyncd.conf', Permission: PERMISSION.READ_WRITE },
                    },
                },
                'vim':        { type: NODE_TYPE.DIR,  Permission: PERMISSION.READ_WRITE },
                'crontab':    { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_WRITE },
                'fstab':      { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_WRITE },
                'hostname':   { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_WRITE },
                'local.conf': { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_WRITE },
                'nanorc':     { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_WRITE },
                'os_release': { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_WRITE },
                'timezone':   { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_WRITE },

                'passwd':     { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_WRITE },
                'shadow':     { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_WRITE },
                'group':      { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_WRITE },
                'host':       { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_WRITE },
                'resolv.conf':{ type: NODE_TYPE.FILE, Permission: PERMISSION.READ_WRITE },
                'bash.bashrc':{ type: NODE_TYPE.FILE, Permission: PERMISSION.READ_WRITE },

            },
        },
        'home': {
            type: NODE_TYPE.DIR,
            Permission: PERMISSION.READ_WRITE,
            children: {
                'user': {
                    type: NODE_TYPE.DIR,
                    Permission: PERMISSION.READ_WRITE,
                    children: { /* /home/user/ */ 
                        'bleu': { type: NODE_TYPE.FILE, content: 'data/racine/home/bleu', Permission: PERMISSION.READ_WRITE},
                        // continuer le chemin
                        '.bashrc': { type: NODE_TYPE.FILE, content: 'data/racine/home/bleu', Permission: PERMISSION.READ_WRITE},
                        '.bash_history': { type: NODE_TYPE.FILE, content: 'data/racine/home/bleu', Permission: PERMISSION.READ_WRITE}, // faire cat historique a l'interrieur
                        '.profile': { type: NODE_TYPE.FILE, content: 'data/racine/home/bleu', Permission: PERMISSION.READ_WRITE},
                        '.ssh': { 
                            type: NODE_TYPE.DIR, 
                            Permission: PERMISSION.READ_WRITE,
                                children: {
                                    /* mettre dossier authorized_keys et known_hosts */
                                    'authorized_key': {
                                        type: NODE_TYPE.DIR,
                                        Permission: PERMISSION.READ_ONLY,
                                        children: {
                                            //mettre clef 
                                        }
                                    },
                                    'known_hosts': {
                                        type: NODE_TYPE.bleu //completer 
                                    }

                                }
                            }, 
                    },
                },
            },
        },
        
        'tmp': {
            type: NODE_TYPE.DIR,
            Permission: PERMISSION.READ_WRITE,
            children: {
                'session_xQ7k.tmp': { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_WRITE, content: '...' },
                '.ICE-unix':       { type: NODE_TYPE.DIR, Permission: PERMISSION.NONE, children: {} },
                'todo.txt':           { type: NODE_TYPE.FILE,  Permission: PERMISSION.READ_WRITE, content: 'data/racine/tmp/todo.txt' },
                'mot_de_passe.txt':   { type: NODE_TYPE.FILE,  Permission: PERMISSION.READ_WRITE, content: 'data/racine/tmp/mot_de_passe' },
                'README':             { type: NODE_TYPE.FILE,  Permission: PERMISSION.READ_WRITE, content: 'data/racine/tmp/README' },
                'delete_me':          { type: NODE_TYPE.FILE,  Permission: PERMISSION.READ_WRITE, content: 'data/racine/tmp/delete_me' },
            }
        },
        'var': { 
            type: NODE_TYPE.DIR,
            Permission: PERMISSION.READ_WRITE,
            children: {
                'log': {
                    type: NODE_TYPE.DIR,
                    Permission: PERMISSION.READ_ONLY,
                    children: {} 
                },
                'www': {
                    type: NODE_TYPE.DIR,
                    Permission: PERMISSION.READ_ONLY,
                    children: {
                        portfolio: {
                            type: NODE_TYPE.DIR,
                             Permission: PERMISSION.READ_WRITE,
                             children:{} //boucle de /var/www/portfolio
                        }
                    }
                }
            }
        },
        'proc': {
            type: NODE_TYPE.DIR,
            Permission: PERMISSION.READ_ONLY,
            children: {
                'cpuinfo':   { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_ONLY, content: 'data/racine/proc/cpuinfo' }, 
                'meminfo':   { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_ONLY, content: 'data/racine/proc/meminfo' },
                'version':   { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_ONLY, content: 'data/racine/proc/version' },
                'uptime':    { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_ONLY, content: 'Uptime non disponible' },
                'self': {
                    type: NODE_TYPE.DIR,
                    Permission: PERMISSION.READ_ONLY,
                    children: {
                        'status':  { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_ONLY, content: 'data/racine/proc/self/status' },
                        'cmdline': { type: NODE_TYPE.FILE, Permission: PERMISSION.READ_ONLY, content: 'data/racine/proc/self/status' },
                    }
                }
            }
        },
        'root': {type: NODE_TYPE.DIR, Permission: PERMISSION.NONE},
        'usr': {
            type: NODE_TYPE.DIR,
            Permission: PERMISSION.READ_ONLY,
            children: {
                'bin':   { type: NODE_TYPE.DIR, Permission: PERMISSION.READ_ONLY, children: {} },
                'lib':   { type: NODE_TYPE.DIR, Permission: PERMISSION.READ_ONLY, children: {} },
                'share': { type: NODE_TYPE.DIR, Permission: PERMISSION.READ_ONLY, children: {} },
                'local': { type: NODE_TYPE.DIR, Permission: PERMISSION.READ_ONLY, children: {} },
            }
        }
    },
};