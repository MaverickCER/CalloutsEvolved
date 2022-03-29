package gnu.kawa.functions;

import gnu.mapping.Namespace;
import gnu.mapping.Symbol;
import java.text.BreakIterator;

public class UnicodeUtils {

    /* renamed from: Cc */
    static final Symbol f29Cc;

    /* renamed from: Cf */
    static final Symbol f30Cf;

    /* renamed from: Cn */
    static final Symbol f31Cn;

    /* renamed from: Co */
    static final Symbol f32Co;

    /* renamed from: Cs */
    static final Symbol f33Cs;

    /* renamed from: Ll */
    static final Symbol f34Ll;

    /* renamed from: Lm */
    static final Symbol f35Lm;

    /* renamed from: Lo */
    static final Symbol f36Lo;

    /* renamed from: Lt */
    static final Symbol f37Lt;

    /* renamed from: Lu */
    static final Symbol f38Lu;

    /* renamed from: Mc */
    static final Symbol f39Mc;

    /* renamed from: Me */
    static final Symbol f40Me;

    /* renamed from: Mn */
    static final Symbol f41Mn;

    /* renamed from: Nd */
    static final Symbol f42Nd;

    /* renamed from: Nl */
    static final Symbol f43Nl;

    /* renamed from: No */
    static final Symbol f44No;

    /* renamed from: Pc */
    static final Symbol f45Pc;

    /* renamed from: Pd */
    static final Symbol f46Pd;

    /* renamed from: Pe */
    static final Symbol f47Pe;

    /* renamed from: Pf */
    static final Symbol f48Pf;

    /* renamed from: Pi */
    static final Symbol f49Pi;

    /* renamed from: Po */
    static final Symbol f50Po;

    /* renamed from: Ps */
    static final Symbol f51Ps;

    /* renamed from: Sc */
    static final Symbol f52Sc;

    /* renamed from: Sk */
    static final Symbol f53Sk;

    /* renamed from: Sm */
    static final Symbol f54Sm;

    /* renamed from: So */
    static final Symbol f55So;

    /* renamed from: Zl */
    static final Symbol f56Zl;

    /* renamed from: Zp */
    static final Symbol f57Zp;

    /* renamed from: Zs */
    static final Symbol f58Zs;

    public static boolean isWhitespace(int ch) {
        if (ch == 32 || (ch >= 9 && ch <= 13)) {
            return true;
        }
        if (ch < 133) {
            return false;
        }
        if (ch == 133 || ch == 160 || ch == 5760 || ch == 6158) {
            return true;
        }
        if (ch < 8192 || ch > 12288) {
            return false;
        }
        if (ch <= 8202 || ch == 8232 || ch == 8233 || ch == 8239 || ch == 8287 || ch == 12288) {
            return true;
        }
        return false;
    }

    public static String capitalize(String str) {
        StringBuilder sbuf = new StringBuilder();
        BreakIterator wb = BreakIterator.getWordInstance();
        wb.setText(str);
        int start = wb.first();
        for (int end = wb.next(); end != -1; end = wb.next()) {
            boolean isWord = false;
            int p = start;
            while (true) {
                if (p >= end) {
                    break;
                } else if (Character.isLetter(str.codePointAt(p))) {
                    isWord = true;
                    break;
                } else {
                    p++;
                }
            }
            if (!isWord) {
                sbuf.append(str, start, end);
            } else {
                sbuf.append(Character.toTitleCase(str.charAt(start)));
                sbuf.append(str.substring(start + 1, end).toLowerCase());
            }
            start = end;
        }
        return sbuf.toString();
    }

    public static String foldCase(CharSequence str) {
        int len = str.length();
        if (len == 0) {
            return "";
        }
        StringBuilder sbuf = null;
        int start = 0;
        int i = 0;
        while (true) {
            int ch = i == len ? -1 : str.charAt(i);
            boolean sigma = ch == 931 || ch == 963 || ch == 962;
            if (ch < 0 || ch == 304 || ch == 305 || sigma) {
                if (sbuf == null && ch >= 0) {
                    sbuf = new StringBuilder();
                }
                if (i > start) {
                    String converted = str.subSequence(start, i).toString().toUpperCase().toLowerCase();
                    if (sbuf == null) {
                        return converted;
                    }
                    sbuf.append(converted);
                }
                if (ch < 0) {
                    return sbuf.toString();
                }
                if (sigma) {
                    ch = 963;
                }
                sbuf.append((char) ch);
                start = i + 1;
            }
            i++;
        }
    }

    public static Symbol generalCategory(int ch) {
        switch (Character.getType(ch)) {
            case 1:
                return f38Lu;
            case 2:
                return f34Ll;
            case 3:
                return f37Lt;
            case 4:
                return f35Lm;
            case 5:
                return f36Lo;
            case 6:
                return f41Mn;
            case 7:
                return f40Me;
            case 8:
                return f39Mc;
            case 9:
                return f42Nd;
            case 10:
                return f43Nl;
            case 11:
                return f44No;
            case 12:
                return f58Zs;
            case 13:
                return f56Zl;
            case 14:
                return f57Zp;
            case 15:
                return f29Cc;
            case 16:
                return f30Cf;
            case 18:
                return f32Co;
            case 19:
                return f33Cs;
            case 20:
                return f46Pd;
            case 21:
                return f51Ps;
            case 22:
                return f47Pe;
            case 23:
                return f45Pc;
            case 24:
                return f50Po;
            case 25:
                return f54Sm;
            case 26:
                return f52Sc;
            case 27:
                return f53Sk;
            case 28:
                return f55So;
            case 29:
                return f49Pi;
            case 30:
                return f48Pf;
            default:
                return f31Cn;
        }
    }

    static {
        Namespace empty = Namespace.EmptyNamespace;
        f39Mc = empty.getSymbol("Mc");
        f45Pc = empty.getSymbol("Pc");
        f29Cc = empty.getSymbol("Cc");
        f52Sc = empty.getSymbol("Sc");
        f46Pd = empty.getSymbol("Pd");
        f42Nd = empty.getSymbol("Nd");
        f40Me = empty.getSymbol("Me");
        f47Pe = empty.getSymbol("Pe");
        f48Pf = empty.getSymbol("Pf");
        f30Cf = empty.getSymbol("Cf");
        f49Pi = empty.getSymbol("Pi");
        f43Nl = empty.getSymbol("Nl");
        f56Zl = empty.getSymbol("Zl");
        f34Ll = empty.getSymbol("Ll");
        f54Sm = empty.getSymbol("Sm");
        f35Lm = empty.getSymbol("Lm");
        f53Sk = empty.getSymbol("Sk");
        f41Mn = empty.getSymbol("Mn");
        f36Lo = empty.getSymbol("Lo");
        f44No = empty.getSymbol("No");
        f50Po = empty.getSymbol("Po");
        f55So = empty.getSymbol("So");
        f57Zp = empty.getSymbol("Zp");
        f32Co = empty.getSymbol("Co");
        f58Zs = empty.getSymbol("Zs");
        f51Ps = empty.getSymbol("Ps");
        f33Cs = empty.getSymbol("Cs");
        f37Lt = empty.getSymbol("Lt");
        f31Cn = empty.getSymbol("Cn");
        f38Lu = empty.getSymbol("Lu");
    }
}
