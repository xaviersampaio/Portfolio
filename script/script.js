// Copyright (C) 2026 Sampaio Xavier
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License.

//import du systeme
import { PERMISSION } from './filesystem.js';
import { NODE_TYPE } from './filesystem.js';
import { Filesystem } from './filesystem.js';

//circulaire du systeme
Filesystem.children['var'].children['www'].children['portfolio'] = Filesystem;
//le /bin et /usr/bin identique
Filesystem.children['usr'].children['bin'] = Filesystem.children['bin'];


//  Commande Systeme 
const commands = {
    help: help,                                     //fait
    pwd: pwd,                                       //fait
    cat: cat,                                       //fait
    ls: (args) => ls(args),                         //fait
    cd: (args) => cd(args),                         //fait
    timedatctl: timedatctl,                         //fait
    adduser: (args) => adduser(args,''),            //fait
    clear: clear,                                   //fait
    exit: exit,                                     //fait
    sl: sl,                                         //fait
    echo: (args) => echo(args),                     //fait
    vim: (args) => vim(args),                       //fait
    mkdir: (args) => mkdir(args),                   //fait
    alsamixer: alsamixer,                           //fait
    whoami: whoami,                                 //fait
    login: (args) => sulogin(args, 'login'),        //fait
    su: (args) => sulogin(args, 'su'),              //fait
    uname: (args) => uname(args),                   //fait
    man: (args) => man(args),                       //fait 
    ollama: ollama,                                 // a externaliser
    neofetch: neofetch,                             //fait
    rm: rm,                                         //a faire
    ping: ping,                                     //a faire
    ifconfig: ifconfig,                             //a faire
    ip: (args) => ip(args),                         //a faire
    netstat: netstat,                               //a faire
    ssh: ssh,                                       //a faire
    //                                         faire autocompletion
};       
// Constantes UI 
const input = document.getElementById('inputid');
const submit = document.getElementById('submitBtn');
const openBtn = document.getElementById('openPortfolioBtn');

// État du focus 
const focusCurser = {
    onTerm: 0,
    onUserConnect: 1,
    onUserCreate: 2,
    onPager: 3,
    onManSampaio: 4,
    onAlsa: 5,
    onVimCommande: 6,
    onVimInsert: 7
};
let focusActuel = focusCurser.onTerm;

// État du système 
let located = '/home';
let part;
let typeActuel;
let echoval = 0;

// Session / Auth
let session = { currentUser: 'user' };
let connectusrid = '';

// Historique / Pagination
let historique = [];
let historiqueIndex = -1;
const PAGER_LIMIT = 20; 

// Utilisateurs
let userlist = {
    1: {
        nom: 'user',
        Permission: PERMISSION.USER_ACCESS,
        passwd: ''
    },
    2: {
        nom: 'root',
        Permission: PERMISSION.NONE
    }
};
let cptuserlist = Object.keys(userlist).length + 1;
let tabsInitialized = false;

//pager
const nbLignes = 25;


// neofetch
const ram = navigator.deviceMemory || '?';
const cpu = navigator.hardwareConcurrency || '?';
const loadTime = performance.getEntriesByType('navigation')[0]?.duration;


//////////////
// DOCUMENT //
//////////////

// Gestion Document & initialisation de la page 
document.getElementById('prefix').textContent = session.currentUser +'@' + located + "$"


// passage par btn-close
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('openPortfolioBtn').addEventListener('click', function() {
        interfacesampaio();
    });
});

input.focus(); // premier focus 
// refocus avec la souris
document.addEventListener('click', function() {
    if (focusActuel === focusCurser.onTerm) {
        input.focus();
    }
});

// Validation Enter
document.addEventListener('keydown', function(enter) {
    switch (focusActuel) {

        case focusCurser.onTerm: {// 0
            if (enter.key === 'Enter') {
                enter.preventDefault();
                const command = input.innerText;
                readline(command);
                document.getElementById('inputid').textContent = '';
                window.scrollTo(0, document.body.scrollHeight);
                historique.push(command);
                historiqueIndex = -1;
                input.focus(); // ← remet le focus après avoir vidé

            } else if (enter.key === 'ArrowUp') {
                enter.preventDefault();
                if (historiqueIndex < historique.length - 1) historiqueIndex++;
                document.getElementById('inputid').textContent = historique[historique.length - 1 - historiqueIndex];
                setCursorToEnd(input);

            } else if (enter.key === 'ArrowDown') {
                enter.preventDefault();
                if (historiqueIndex > -1) historiqueIndex--;
                document.getElementById('inputid').textContent = historiqueIndex === -1
                    ? ''
                    : historique[historique.length - 1 - historiqueIndex];
                setCursorToEnd(input);
            }
            break;
        }
        case focusCurser.onUserCreate: {// 2
            if (enter.key === 'Enter') {
                const passwd1 = document.getElementById('passwd1').value;
                const passwd2 = document.getElementById('passwd2').value;
                if (passwd1 !== passwd2) {
                    outputoutput('Les mots de passe sont différents');
                    return;
                }
                userlist[cptuserlist] = {
                    nom: session.pendingUsername,
                    Permission: PERMISSION.USER_ACCESS,
                    passwd: passwd1
                };
                cptuserlist++;
                session.pendingUsername = null;
                outputoutput('Utilisateur créé avec succès');
                focus(focusCurser.onTerm);

            } else if (enter.key === 'Escape') {
                session.pendingUsername = null;
                focus(focusCurser.onTerm);
            }
            break;
        }
        case focusCurser.onUserConnect: { // 1
            if (enter.key === 'Enter') {
                const passwdconnect = document.getElementById('passwd');
                const userFound = Object.values(userlist).find(
                    u => u.nom === connectusrid && u.passwd === passwdconnect.value
                );
                if (userFound) {
                    session.currentUser = connectusrid;
                    outputoutput('Connecté en tant que ' + connectusrid);
                } else {
                    outputoutput('Mot de passe incorrect');
                }
                connectusrid = '';
                focus(focusCurser.onTerm);

            } else if (enter.key === 'Escape') {
                connectusrid = '';
                focus(focusCurser.onTerm);
            }
            break;
        }
        case focusCurser.onPager: {// 3
            if (enter.key === 'Enter' || enter.key === ' ') {
                document.querySelector('.page')?.remove();
                if (session.pager.raw) {
                    pagerRaw(session.pager.lignes, session.pager.index);
                } else {
                    pager(session.pager.lignes, session.pager.index);
                }
                window.scrollTo(0, document.body.scrollHeight);
            }
            break;
        }
        case focusCurser.onManSampaio: { // 4
            if (enter.key === 'Enter') {
                const response = document.getElementById('manSampaioInput')?.value.toLowerCase().trim();
                if (response === 'oui' || response === 'o' || response === 'yes' || response === 'y') {
                    outputoutput("Ouverture de l'interface...");
                    interfacesampaio();
                } else if (response === 'non' || response === 'n' || response === 'no') {
                    outputoutput('Annulation.');
                    focus(focusCurser.onTerm);
                } else {
                    outputoutput('Réponse non reconnue. Veuillez répondre par oui ou non.');
                }
            } else if (enter.key === 'Escape') {
                outputoutput('Annulation.');
                focus(focusCurser.onTerm);
            }
            break;
        }
        case focusCurser.onVimCommande: { //6
            const vimContent = document.getElementById('vim-content'); // id=vim-content    Le contenu
            const vimstatus = document.getElementById('vim-statusbar'); // id=vim-statusbar Affiche l'etat
            const vimCmd = document.getElementById('vim-cmd'); // id=vim-cmd                Les commandes   

            if (enter.key === 'Escape') {
            vimCmd.focus();
            }
            if (enter.key === 'Enter' && vimCmd === document.activeElement) {
                const cmd = vimCmd.value.trim();
                vimCmd.value = '';
                
                for (let i = 0; i < cmd.length; i++) {
                    switch (cmd[i]) {
                    case 'i':
                        if (cmd == 'i') {
                            enter.preventDefault(); // empêche le i d'écrire
                            session.vimMode = 'insert';
                            document.getElementById('vim-content').removeAttribute('readonly');
                            document.getElementById('vim-content').focus();
                            document.getElementById('vim-statusbar').textContent = '-- INSERT --';
                            focus(focusCurser.onVimInsert);
                            break;
                        }
                    case 'g':
                        if (cmd === 'gg') {
                            vimContent.scrollTop = 0; vimContent.selectionStart = 0
                        }
                        break;
                    case 'G':
                        if (cmd === 'G') {
                            vimContent.selectionStart = vimContent.value.length
                        }
                    case ':': // premier caractère obligatoire pour les commandes la suite necessite ce caratere en base
                        if (i !== 0) {
                        document.getElementById('vim-statusbar').textContent = 'Commande inconnue';i = cmd.length;  }
                        break;
                    case 'w':
                        if (cmd[0] !== ':') { document.getElementById('vim-statusbar').textContent = 'Commande inconnue'; i = cmd.length; break; } //verif si 1er caractere est :
                        session.vimNode.content = vimContent.value
                        break;
                    case 'q':
                        if (cmd[0] !== ':') { document.getElementById('vim-statusbar').textContent = 'Commande inconnue'; i = cmd.length; break; } //verif si 1er caractere est :
                        document.getElementById('vim-ui').remove();
                        document.getElementById('outputid').innerHTML = session.savedOutput;
                        session.vimNode = null;
                        session.vimMode = null;
                        session.vimNomFichier = null;
                        focus(focusCurser.onTerm);
                        break;
                    case '!':
                        break; // force, ignoré
                    
                    default:
                        document.getElementById('vim-statusbar').textContent = 'Commande inconnue : ' + cmd;
                        i = cmd.length;
                    }
                }
            }
            break;
        }
        case focusCurser.onVimInsert: { //7
            if (enter.key === 'Escape') { //repasser en vimcommande
                session.vimMode = 'normal';
                document.getElementById('vim-content').setAttribute('readonly', true);
                document.getElementById('vim-statusbar').textContent = '-- NORMAL --';
                document.getElementById('vim-cmd').focus();
                focus(focusCurser.onVimCommande);
            }
            break;
        }
        case focusCurser.onAlsa: {//5
            enter.preventDefault();
            if (enter.key === 'ArrowRight') session.alsa.vol = Math.min(100, session.alsa.vol + 5);
            if (enter.key === 'ArrowLeft')  session.alsa.vol = Math.max(0,   session.alsa.vol - 5);
            if (enter.key === 'q' || enter.key === 'Escape') {
                focus(focusCurser.onTerm);
            } else {
                renderAlsa();
            }
            break;
        }
}});
/////////////////////
// Version  mobile //
/////////////////////
if (window.innerWidth <= 768) {
    // disclamer
    document.getElementById('gridsys').innerHTML = `
        <pre style="color: #fa4343ff;">Site optimisé pour desktop. At your own risk</pre>
    `;
    
}




/////////////////////
//fonction Commande//
/////////////////////
function help(args) { 
    getdatafromfile('/bin/help', 'raw')
        .then(lignes => {
            if (lignes) afficherLignesRaw(lignes);
        });
};
function pwd(inputCommandpart) {
    outputoutput(located);
};
function cat(inputCommandpart) {
    if (!inputCommandpart || inputCommandpart.length === 0) {
        outputoutput('cat: aucun chemin fourni');
        return;
    }
    const path = chemin(inputCommandpart);
    const node = getNode(path);

    if (errchemin(node, path, 'cat',
        ': Aucun fichier ou dossier de ce type',
        ": C'est un dossier")) return;

    if (path === '/dev/cdrom') {
        playCd();
        return;
    }

    getdatafromfile(path).then(lines => {
        if (lines) outputoutput(lines.join('\n'));
    });
};
function ls(inputCommandpart) {
    const path = chemin(inputCommandpart);
    const node = getNode(path);
    if (errchemin(node, path, 'ls',
        ': Aucun fichier ou dossier de ce type',
        ": C'est un fichier pas un dossier")) return;
    
    if (node.type === NODE_TYPE.DIR) {
        const entries = Object.keys(node.children);
        if (entries.length === 0) {
            outputoutput('(dossier vide)');
        } else {
            outputoutput(entries.join('  '));
        }
    }
};
function cd(inputCommandpart) {
    const path = chemin(inputCommandpart);
    const node = getNode(path);
    if (errchemin(node, path, 'cd',
        ': Aucun fichier ou dossier de ce type',
        ": C'est un fichier pas un dossier")) return;

    located = path;
};
function clear() { 
    document.getElementById("outputid").innerHTML = "";
}; 
function exit(){
    alert("Connexion fermée. Vous pouvez fermer cet onglet.");
    location.reload();  
};
function sl() { 
    getdatafromfile('/bin/sl', 'raw')
        .then(lignes => {
            if (lignes) afficherLignesRaw(lignes);
        });
};
function timedatctl(inputCommandpart) {
    const now = new Date();
    
    // Extraction des infos
    const localTime = now.toString().split(' (')[0]; // Format standard
    const universalTime = now.toUTCString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Simulation du statut NTP (Network Time Protocol) 
    // On considère que si le navigateur est en ligne, le temps est synchronisé
    const ntpSynced = navigator.onLine ? "yes" : "no";
    outputoutputraw(`Local time: ${localTime}
           Universal time: ${universalTime}
                 RTC time: ${now.toISOString().replace('T', ' ').split('.')[0]}
                Time zone: ${timeZone}
System clock synchronized: ${ntpSynced}
              NTP service: active
          RTC in local TZ: no
    `)
};
function adduser(inputCommandpart, paramuservalid) {
    if (inputCommandpart.length !== 1) {
        outputoutput("veillez mettre un nom d'utilisateur");
        return;
    }
    const username = inputCommandpart[0];
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        outputoutput("caracteres alphanumeriques uniquement");
        return;
    }

    // On stocke le username en attente et on affiche le form
    session.pendingUsername = username;
    getdatafromfile("/bin/adduser").then(content => {
        if (content) {
            // 1. On transforme le tableau en texte (puisque getdatafromfile fait un .split('\n'))
            const texteFormulaire = content.join('\n');
            outputoutputraw(texteFormulaire);
            focus(focusCurser.onTerm); // faire descendre le terminal avant de laisser la main
            focus(focusCurser.onUserCreate);
        }
    }
)};
function echo (inputCommandpart) {
    if (inputCommandpart.length === 0) {
        outputoutput("Veillez spécifier 1 ou 2 champs");
    } else if (inputCommandpart.indexOf('>>') !== -1 ){ // dans le cas ou il y a "echo bleu >> /home/file" 
        echoval = 1;       
    } else if (inputCommandpart.indexOf('>') !== -1 ) { // dans le cas ou il y a "echo bleu > /home/file"
        echoval = 2; 
    } else { // dans le cas ou c'est "echo bleu"
        inputCommandpart = inputCommandpart.join(' ') //reassemble
        outputoutput(inputCommandpart);
    };
    if (echoval != 0){ //si c'est un echo avec plusieur argument
        //etape chemin valide 
        let valeurEcho = inputCommandpart.at(-1)
        console.log(inputCommandpart.length)
        if (!Filesystem[valeurEcho] && inputCommandpart.length != 1 ) { //length pour eviter de trigger la condition au echo de "echo /home"
            outputoutput("Chemin invalide");
        } else if (Filesystem[valeurEcho].type !== NODE_TYPE.FILE) {
            outputoutput("Ce n'est pas un fichier");
        } else if (Filesystem[valeurEcho].autorised !== PERMISSION.READ_WRITE) {
            outputoutput("Permission refusée");
        } else {
            if (!valeurEcho.startsWith("/Portefolio/data")) { //si le champs destination est un chemin
                if (echoval === 1) {
                    Filesystem[valeurEcho].content += '\n' + valeurEcho; 
                } else if (echoval === 2) {
                    Filesystem[valeurEcho].content = valeurEcho;
}}}}};

// tester 
// gerer si .content est distant

function vim (inputCommandpart) {

    const nomFichier = inputCommandpart[0]; // recup le nom de fichier 
    session.savedOutput = document.getElementById('outputid').innerHTML; //sauvegarde le contenu

    // verif si bien fichier 
    if (inputCommandpart.length < 1) {
        outputoutput('vim: manque un nom de fichier');
        return;
    };
    if (inputCommandpart[1] === '-y') {
        const nodeParent = getNode(located);
        nodeParent.children[nomFichier] = { // cree le noeud
            type: NODE_TYPE.FILE,
            content: '',
            Permission: PERMISSION.READ_WRITE
        };
        // on remet nodeActuel pour la suite
        session.vimNode = nodeParent.children[nomFichier];
        session.vimNomFichier = nomFichier;
    };
    const nodeActuel = getNode(located + '/' + nomFichier); // prepare la resolution 
    if (!nodeActuel) {
        outputoutput('fichier inexistant, veuillez spécifier -y pour le créer');
        return;
    };
    if (nodeActuel.type !== NODE_TYPE.FILE) {
        outputoutput('vim: ' + nomFichier + ' est un répertoire');
        return;
    };
    session.savedOutput = document.getElementById('outputid').innerHTML;
    session.vimNode = nodeActuel;
    session.vimMode = 'normal';
    focus(focusCurser.onVimCommande);
    clear();
    outputoutputraw(`
    <div id="vim-ui" style="position:fixed; inset:0; background:#111827; display:flex; flex-direction:column; z-index:9998; font-family:'Courier New',Courier,monospace;">
    <textarea id="vim-content" readonly style="flex:1; background:#111827; color:#ffffff; border:none; outline:none; padding:0.5rem; resize:none; font-family:'Courier New',Courier,monospace; font-size:14px;"></textarea>
    <div id="vim-statusbar" style="background:#374151; color:#ffffff; padding:2px 8px; font-size:12px;">-- NORMAL --</div>
    <input id="vim-cmd" type="text" style="background:#111827; color:#ffffff; border:none; border-top:1px solid #374151; outline:none; padding:4px 8px; font-family:'Courier New',Courier,monospace; font-size:14px; width:100%;" />
    </div>
    `);
    setTimeout(() => {
        if (session.vimNode.content) {
            getdatafromfile(located + '/' + nomFichier).then(lines => {
            document.getElementById('vim-content').value = lines ? lines.join('\n') : '';
            });
        }
        document.getElementById('vim-cmd').focus();
    }, 0);
}

function mkdir(inputCommandpart) {
    console.log(inputCommandpart);
    if (inputCommandpart.length < 1) {
        outputoutput('mkdir: manque un opérande');
        return;
    }

    const nomDossier = inputCommandpart[0];
    
    const nodeActuel = getNode(located);
    if (!nodeActuel || nodeActuel.type !== NODE_TYPE.DIR) {
        outputoutput('mkdir: répertoire courant invalide');
        return;
    }

    if (nodeActuel.children[nomDossier]) {
        outputoutput(`mkdir: impossible de créer le répertoire '${nomDossier}': Le fichier existe`);
        return;
    }

    nodeActuel.children[nomDossier] = {
        type: NODE_TYPE.DIR,
        Permission: PERMISSION.READ_WRITE,
        children: {}
    };
};
function alsamixer(inputCommandpart) {
  session.alsa = { vol: 40 };
  outputoutputraw('<div id="alsamixer-ui"></div>');
  renderAlsa();
  focus(focusCurser.onAlsa);
};
function whoami() {
    outputoutput(session.currentUser)
};
function sulogin(inputCommandpart, type) {
    typeActuel = type;
    if (!inputCommandpart[0]) {
        outputoutput('pour utiliser cette commande faire'+ typeActuel +' [nom d\'utilisateur]');
    } else if (inputCommandpart[0] === 'user') {
        session.currentUser = 'user';
        outputoutput('Connecté en tant que user');
        focus(focusCurser.onTerm);
    } else {
        connectusrid = inputCommandpart[0]
        outputoutputraw("Inserer le mot de passe : <input type='password' id='passwd' name='Mot de passe' placeholder='••••••••' style='background:transparent; border:none; border-bottom: 1px solid white; color:white; outline:none;' required />")
        focus(focusCurser.onUserConnect);
    }
};
function uname(inputCommandpart) {
    if (inputCommandpart.length === 0) {
        outputoutput('X-oS');
        return;
    }
    if (inputCommandpart.includes('-a')) {
        outputoutput('X-oS 6.19.10-generic xsa.webserver x86_64');
        return;
    }

    let rep = '';
    for (let i = 0; i < inputCommandpart.length; i++) {
        const opt = inputCommandpart[i];
        if (opt === '-s'){
            rep += 'X-oS ';
        }
        else if (opt === '-r') {
            rep += '6.19.10-generic ';
        } 
        else if (opt === '-m'){
            rep += 'x86_64 ';
        }  
        else if (opt === '-n'){
            rep += 'xsa.webserver ';
        }  
        else {
            outputoutput('Option : ' + opt + ' n\'est pas connue du système');
            return;
        }
    }
    outputoutput(rep.trim());
}
function man(inputCommandpart) {
    if (!inputCommandpart || inputCommandpart.length === 0) {
        outputoutput('Quelle page du manuel voulez-vous ? (ex: man sampaio)');
        return;
    }
    const commandName = inputCommandpart[0];

    if (commandName === 'sampaio') {
        outputoutputraw("Voulez-vous accéder au portfolio de Sampaio Xavier ? (oui/non) <input type='text' id='manSampaioInput' style='background:transparent; border:none; border-bottom: 1px solid white; color:white; outline:none;' />");
        focus(focusCurser.onManSampaio);
        return;
    }
    const manEntry = getNode('/bin/man.d/' + commandName);
    if (manEntry) {
        fetch(manEntry.content)
            .then(r => r.text())
            .then(data => pager(data.split('\n')))
    } else {
        outputoutput(`pas d'entrée pour la commande ${commandName}`);
        console.log(commandName)
    }
};
function ollama(ollama) {

};
function neofetch() {    
    outputoutputraw(`<pre> 
    ██╗  ██╗       ██████╗ ███████╗ 
    ╚██╗██╔╝      ██╔═══██╗██╔════╝ 
     ╚███╔╝ █████╗██║   ██║███████╗ 
     ██╔██╗ ╚════╝██║   ██║╚════██║ 
    ██╔╝ ██╗      ╚██████╔╝███████║ 
    ╚═╝  ╚═╝       ╚═════╝ ╚══════╝ </pre>
<pre>
OS: Sampaio-OS 2.1
Navigateur: ${navigator.userAgent.split(' ').pop()}
RAM: ${ram}Go
CPU cores: ${cpu}
Chargement: ${loadTime}ms
</pre>`)
};
function rm() {} // ajouter -r //ajouter rm -rf
function ping () {}  // 1.1.1.1 8.8.8.8 127.0.0.1
function ifconfig() {}  
function ip() {}   //a //si change address de eth0 alors tuer inputbtn
function netstat() {}
function ssh() {} // fonction knownhost  // bloquer ips exterieur a localhost


////////////////////
//fonction systeme//
////////////////////


function getNode(path) { //construit le chemin renvoie { type: '', content: '', Permission: }
    const parts = path.split('/').filter(Boolean);
    let node = Filesystem;
    for (const part of parts) {
        if (!node.children || !node.children[part]) return null;
        node = node.children[part];
    }
    return node;
};
function outputinput(inputCommand) { //sortie de l'utilisateur et de sa commande
    const output = document.getElementById('outputid');
    const newLine = document.createElement('div');
    const prefixecomm = session.currentUser + '@' + located + '$';
    document.getElementById('prefix').textContent = prefixecomm;
    document.getElementById('chemin-hero').innerHTML = 'Terminal Sampaio-OS : ' + prefixecomm;
    newLine.className = 'text-green-300';
    newLine.textContent = prefixecomm + inputCommand;
    output.appendChild(newLine);
};
function readline(inputCommand) { // recupere la commande + la split si &&
    outputinput(inputCommand);
    const commandSplit = (inputCommand.match(/(".*?"|[^\s]+)/g) || []).map(arg => arg.replace(/^"|"$/g, ''));
    const split = '&&';
    const lenCommandSplit = commandSplit.filter(p => p === split).length;

    if (lenCommandSplit === 0) {
        doLine(commandSplit);
    } else if (lenCommandSplit === 1) {
        const idx = commandSplit.indexOf(split);
        doLine(commandSplit.slice(0, idx));
        doLine(commandSplit.slice(idx + 1));
    } else {
        console.log('plusieurs séparations détectées');
    }
};
function doLine(inputCommandpart) { // forme le contenu en output pour outputoutput
    const cmdName = inputCommandpart[0];
    if (!cmdName) return;

    if (commands[cmdName]) {
        commands[cmdName](inputCommandpart.slice(1));
    } else {
        console.log('Commande inconnue :', cmdName);
        const output = document.getElementById('outputid');
        const newLine = document.createElement('div');
        newLine.textContent = 'Command unknown';
        output.appendChild(newLine);
    }
};
function outputoutputraw(inputoutput) { //sort le contenu mais avec execution
    const output = document.getElementById('outputid');
    const newLine = document.createElement('pre');
    newLine.innerHTML = inputoutput.replace(/\n/g, '<br>');
    newLine.style.whiteSpace = 'pre-wrap';
    output.appendChild(newLine);
};
function outputoutput(inputoutput) { //sort le contenu sans execution
    const output = document.getElementById('outputid');
    const newLine = document.createElement('div');
    newLine.textContent = inputoutput;
    newLine.style.whiteSpace = 'pre-wrap';
    output.appendChild(newLine);
};
function chemin(inputCommandpart) { //resouds le chemin
    if (!inputCommandpart || inputCommandpart.length === 0) return located;

    const target = inputCommandpart[0];

    if (target.startsWith('/')) {                   // absolu
        return target.replace(/\/+/g, '/');
    }
    if (target === '.' || target === './') {        // courant
        return located;
    }
    // construction de la base sous forme de tableau
    let parts = located.split('/').filter(Boolean);
    if (target === '..') {                          // parent
        parts.pop();
        return '/' + parts.join('/');
    }
    // relatif (avec ou sans ./)
    const rel = target.startsWith('./') ? target.slice(2) : target;
    const segments = rel.split('/').filter(Boolean);

    for (const seg of segments) {
        if (seg === '..') {
            parts.pop();
        } else if (seg !== '.') {
            parts.push(seg);
        }
    }

    return '/' + parts.join('/');
};
async function getdatafromfile(path) { // recupere le contenu des fichier
    const node = getNode(path);

    if (!node) {
        outputoutput('Fichier introuvable : ' + path);
        return Promise.resolve(null);
    } else if (node.type !== NODE_TYPE.FILE) {
        outputoutput(path + ' : est un répertoire');
        return Promise.resolve(null);
    }

    if (node.Permission === PERMISSION.NONE) {
        outputoutput('Accès non autorisé');
        return Promise.resolve(null);
    }

    if (!node.content) {
        outputoutput(path + ' : aucun contenu');
        return Promise.resolve(null);
    }

    if (!node.content.startsWith('data/')) {
        return Promise.resolve(node.content.split('\n'));
    }

    return fetch(node.content)
        .then(r => r.text())
        .then(data => data.split('\n'));
};
function afficherLignesRaw(lignes) { // dirige le contenue vers pager si trop long sinon envois
    if (lignes.length <= PAGER_LIMIT) {
        outputoutputraw(lignes.join('\n'));
    } else {
        pagerRaw(lignes);
    }
};
function playCd() { 
    const audio = new Audio();
    audio.src = getdatafromfile("/dev/CD.m4a");
    CDAudio.volume = session.alsa.vol / 100;
    audio.play();
};
function focus(inputCommandpart) { // changement de mode
    focusActuel = inputCommandpart;
    if (inputCommandpart === focusCurser.onTerm) {
        input.focus();
    } else if (inputCommandpart === focusCurser.onUserConnect) {
        document.getElementById('passwd')?.focus();
    } else if (inputCommandpart === focusCurser.onManSampaio) {
        document.getElementById('manSampaioInput')?.focus();
    }
}
function pager(lignes, index = 0) { // pagination ss execusion
    const slice = lignes.slice(index, index + nbLignes);
    slice.forEach(ligne => outputoutput(ligne));

    if (index + nbLignes < lignes.length) {
         focus(focusCurser.onTerm);
        // il reste des lignes
        outputoutputraw("<div class=page>-- Plus -- (Entrée/Espace: continuer</div>");
        session.pager = {
            lignes: lignes,
            index: index + nbLignes,
            nbLignes: nbLignes
        };
        focus(focusCurser.onPager);
        window.scrollTo(0, document.body.scrollHeight);
    } else {
        // plus rien à afficher → on nettoie et on rend le focus
        outputoutput("-- Fin --");
        input.value = '';
        session.pager = null;
        focus(focusCurser.onTerm);
    }
};
function pagerRaw(lignes, index =0) { //pagination avec execusion
    const slice = lignes.slice(index, index + nbLignes);
    outputoutputraw(slice.join('\n'));

    if (index + nbLignes < lignes.length) {
        outputoutputraw("<div class=page>-- Plus -- (Entrée/Espace: continuer )</div>");
        session.pager = {
            lignes: lignes,
            index: index + nbLignes,
            nbLignes: nbLignes,
            raw: true  
        };
        focus(focusCurser.onPager);
    } else {
        outputoutput("-- Fin --");
        session.pager = null;
        focus(focusCurser.onTerm);
    }
}
function interfacesampaio() { // parti portfolio initialise les onglet et leur modaux
    const modal = document.getElementById('modalManSampaio');
    const btn = document.getElementById('openPortfolioBtn');
    modal.classList.add('show');
    btn.textContent = ''; // passe en "Fermer" à l'ouverture


    initTabs();     // Les onglets primordiaux
    initVoirPlus(); // Les modaux des modaux
    initDocTabs();  // Les documentations
    initTagFilterdoc() // Filtres des documentations 
    initLightbox(); // L'ouverture des images en grand


    // Fermeture
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            btn.textContent = 'Passer à l\'interface'; 
            focus(focusCurser.onTerm);
        }
    };
};
function initLightbox() { // image en grand
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  document.querySelectorAll('.imgflex img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });
};
function initTabs() { // initialise les onglets
  if (tabsInitialized) return;
  tabsInitialized = true;

  const tabButtons = document.querySelectorAll('.tabPrimBtn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const tabPanesPerso = document.querySelectorAll('.tab-pane-perso');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.style.display = 'none');
      tabPanesPerso.forEach(pane => pane.style.display = 'none');

      this.classList.add('active');
      const targetPane = document.getElementById('tab-' + tabName);
      if (targetPane) targetPane.style.display = 'block';
    });
  });

  tabPanes.forEach(pane => pane.style.display = 'none');
  const first = document.querySelector('.tabPrimBtn.active');
  if (first) {
    const targetPane = document.getElementById('tab-' + first.dataset.tab);
    if (targetPane) targetPane.style.display = 'block';
  }
};
function initVoirPlus() { // initialise le modal du modal
    // Boutons Voir plus
    document.querySelectorAll('.voir-plus-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            const parent = this.parentElement;
            const modal = parent.querySelector('.details-modal');

            console.log('parent:', parent);
            console.log('modal:', modal);

            if (modal) {
                modal.classList.add('show');
            }
        });
});

    // Croix de fermeture
    document.querySelectorAll('.close-details').forEach(close => {
        close.onclick = function(e) {
            e.stopPropagation();
            // Trouve le modal parent et enlève la classe
            this.closest('.details-modal').classList.remove('show');
        };
    });
}
function initDocTabs() { // initalise les documentations
    const docButtons = document.querySelectorAll('.tabSecbtn');
    const docContents = document.querySelectorAll('.doc-content');

    docButtons.forEach(button => {
        button.addEventListener('click', function() {
            const docName = this.getAttribute('data-doc');
            
            // Retire l'état actif de tous les boutons
            docButtons.forEach(btn => btn.classList.remove('active'));
            
            // Cache tous les contenus
            docContents.forEach(content => content.style.display = 'none');
            
            // Active le bouton cliqué
            this.classList.add('active');
            
            // Affiche le contenu correspondant
            const targetDoc = document.getElementById('doc-' + docName);
            if (targetDoc) {
                targetDoc.style.display = 'block';
            }
        });
    });

    // Affiche le premier document par défaut
    docContents.forEach(content => content.style.display = 'none');
    const firstBtn = document.querySelector('.tabSecbtn.active');
    if (firstBtn) {
        const targetDoc = document.getElementById('doc-' + firstBtn.dataset.doc);
        if (targetDoc) targetDoc.style.display = 'block';
    }
};
function initTagFilterdoc() { //permet le filtrage des documentation
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.stopPropagation(); // évite de déclencher le doc-btn en dessous

      const tagName = tag.textContent;
      const isActive = tag.classList.contains('active');

      // désactive tous les tags actifs
      document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));

      if (!isActive) {
        // active le tag cliqué et filtre
        document.querySelectorAll('.tag').forEach(t => {
          if (t.textContent === tagName) t.classList.add('active');
        });
        document.querySelectorAll('.doc-btn').forEach(btn => {
          const tags = Array.from(btn.querySelectorAll('.tag')).map(t => t.textContent);
          btn.classList.toggle('hidden', !tags.includes(tagName));
        });
      } else {
        // désactive le filtre → tout afficher
        document.querySelectorAll('.doc-btn').forEach(btn => btn.classList.remove('hidden'));
      }
    });
  });
}
function setCursorToEnd(element) { // gerer le curseur a la fin quand fleches haut et bas
    element.focus();
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false); // false = à la fin
    selection.removeAllRanges();
    selection.addRange(range);
};
function errchemin(nodeerr, patherr, commerr, typeerr, rais1err, rais2err) { // gestion des erreur pour les pages de base (ls,cd,cat)
    if (!patherr) {
        return true;
    } else if (!nodeerr) {
        outputoutput(commerr+ ': ' + patherr + rais1err);
        return true;
    } else if (nodeerr.type === typeerr) {
        outputoutput(commerr + ': ' + patherr + rais2err);
        return true;
    }
    return false;
};
function barreVolume(vol) { // gestion du vomume pour playCD
  const total = 20; // largeur de la barre
  const rempli = Math.round(vol / 100 * total);
  return '[' + '#'.repeat(rempli) + ' '.repeat(total - rempli) + '] ' + vol + '%';
};
function renderAlsa() { //rendu du alsa
  const el = document.getElementById('alsamixer-ui');
  el.innerHTML = `
    <pre>
  ┌────────────────────────────────────┐
  │             alsamixer              │
  ├────────────────────────────────────┤
  │ Master  ${barreVolume(session.alsa.vol)} │
  │                                    │
  │  ←/→ volume   q: quitter           │
  └────────────────────────────────────┘
    </pre>`;
};
