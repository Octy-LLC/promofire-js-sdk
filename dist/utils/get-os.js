"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOS = void 0;
function getOS() {
    const ua = window.navigator.userAgent;
    if (/Android/.test(ua))
        return 'Android';
    if (/iPhone|iPad|iPod/.test(ua))
        return 'iOS';
    if (/Windows NT/.test(ua))
        return 'Windows';
    if (/Mac OS X/.test(ua))
        return 'macOS';
    if (/Linux/.test(ua))
        return 'Linux';
    if (/CrOS/.test(ua))
        return 'Chrome OS';
    if (/FreeBSD/.test(ua))
        return 'FreeBSD';
    if (/OpenBSD/.test(ua))
        return 'OpenBSD';
    if (/NetBSD/.test(ua))
        return 'NetBSD';
    if (/SunOS/.test(ua))
        return 'SunOS';
    if (/AIX/.test(ua))
        return 'AIX';
    if (/HP-UX/.test(ua))
        return 'HP-UX';
    if (/IRIX/.test(ua))
        return 'IRIX';
    if (/BeOS/.test(ua))
        return 'BeOS';
    if (/AmigaOS/.test(ua))
        return 'AmigaOS';
    if (/MorphOS/.test(ua))
        return 'MorphOS';
    if (/RISC OS/.test(ua))
        return 'RISC OS';
    if (/Syllable/.test(ua))
        return 'Syllable';
    if (/Plan 9/.test(ua))
        return 'Plan 9';
    if (/Haiku/.test(ua))
        return 'Haiku';
    if (/WebOS/.test(ua))
        return 'WebOS';
    if (/Tizen/.test(ua))
        return 'Tizen';
    if (/KaiOS/.test(ua))
        return 'KaiOS';
    if (/QNX/.test(ua))
        return 'QNX';
    if (/Symbian/.test(ua))
        return 'Symbian';
    if (/BlackBerry/.test(ua))
        return 'BlackBerry';
    if (/Bada/.test(ua))
        return 'Bada';
    if (/tvOS/.test(ua))
        return 'tvOS';
    if (/watchOS/.test(ua))
        return 'watchOS';
    if (/Nintendo Switch/.test(ua))
        return 'Nintendo Switch';
    if (/PlayStation/.test(ua))
        return 'PlayStation';
    if (/Xbox/.test(ua))
        return 'Xbox';
    if (/SteamOS/.test(ua))
        return 'SteamOS';
    if (/Fuchsia/.test(ua))
        return 'Fuchsia';
    if (/VxWorks/.test(ua))
        return 'VxWorks';
    if (/SCO OpenServer/.test(ua))
        return 'SCO OpenServer';
    if (/Solaris/.test(ua))
        return 'Solaris';
    if (/DOS/.test(ua))
        return 'DOS';
    if (/ReactOS/.test(ua))
        return 'ReactOS';
    if (/Emacs/.test(ua))
        return 'Emacs';
    if (/Plan 9/.test(ua))
        return 'Plan 9';
    if (/Inferno/.test(ua))
        return 'Inferno';
    if (/Redox/.test(ua))
        return 'Redox';
    if (/NixOS/.test(ua))
        return 'NixOS';
    if (/OpenVMS/.test(ua))
        return 'OpenVMS';
    if (/AROS/.test(ua))
        return 'AROS';
    if (/SkyOS/.test(ua))
        return 'SkyOS';
    if (/Syllable/.test(ua))
        return 'Syllable';
    if (/OpenBSD/.test(ua))
        return 'OpenBSD';
    if (/NetBSD/.test(ua))
        return 'NetBSD';
    if (/DragonFly BSD/.test(ua))
        return 'DragonFly BSD';
    if (/Haiku/.test(ua))
        return 'Haiku';
    if (/OpenIndiana/.test(ua))
        return 'OpenIndiana';
    if (/Illumos/.test(ua))
        return 'Illumos';
    if (/AIX/.test(ua))
        return 'AIX';
    return 'unknown';
}
exports.getOS = getOS;
//# sourceMappingURL=get-os.js.map