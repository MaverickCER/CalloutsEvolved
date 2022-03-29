package gnu.math;

import java.util.Date;
import java.util.GregorianCalendar;
import java.util.TimeZone;

public class DateTime extends Quantity implements Cloneable {
    public static final int DATE_MASK = 14;
    static final int DAY_COMPONENT = 3;
    public static final int DAY_MASK = 8;
    public static TimeZone GMT = TimeZone.getTimeZone("GMT");
    static final int HOURS_COMPONENT = 4;
    public static final int HOURS_MASK = 16;
    static final int MINUTES_COMPONENT = 5;
    public static final int MINUTES_MASK = 32;
    static final int MONTH_COMPONENT = 2;
    public static final int MONTH_MASK = 4;
    static final int SECONDS_COMPONENT = 6;
    public static final int SECONDS_MASK = 64;
    static final int TIMEZONE_COMPONENT = 7;
    public static final int TIMEZONE_MASK = 128;
    public static final int TIME_MASK = 112;
    static final int YEAR_COMPONENT = 1;
    public static final int YEAR_MASK = 2;
    private static final Date minDate = new Date(Long.MIN_VALUE);
    GregorianCalendar calendar;
    int mask;
    int nanoSeconds;
    Unit unit;

    public int components() {
        return this.mask & -129;
    }

    /* Debug info: failed to restart local var, previous not found, register: 5 */
    public DateTime cast(int newComponents) {
        int oldComponents = this.mask & -129;
        if (newComponents == oldComponents) {
            return this;
        }
        DateTime copy = new DateTime(newComponents, (GregorianCalendar) this.calendar.clone());
        if (((oldComponents ^ -1) & newComponents) == 0 || (oldComponents == 14 && newComponents == 126)) {
            if (isZoneUnspecified()) {
                copy.mask &= -129;
            } else {
                copy.mask |= TIMEZONE_MASK;
            }
            int extraComponents = oldComponents & (newComponents ^ -1);
            if ((extraComponents & TIME_MASK) != 0) {
                copy.calendar.clear(11);
                copy.calendar.clear(12);
                copy.calendar.clear(13);
            } else {
                copy.nanoSeconds = this.nanoSeconds;
            }
            if ((extraComponents & 2) != 0) {
                copy.calendar.clear(1);
                copy.calendar.clear(0);
            }
            if ((extraComponents & 4) != 0) {
                copy.calendar.clear(2);
            }
            if ((extraComponents & 8) != 0) {
                copy.calendar.clear(5);
            }
            return copy;
        }
        throw new ClassCastException("cannot cast DateTime - missing conponents");
    }

    public DateTime(int mask2) {
        this.unit = Unit.date;
        this.calendar = new GregorianCalendar();
        this.calendar.setGregorianChange(minDate);
        this.calendar.clear();
        this.mask = mask2;
    }

    public DateTime(int mask2, GregorianCalendar calendar2) {
        this.unit = Unit.date;
        this.calendar = calendar2;
        this.mask = mask2;
    }

    public static DateTime parse(String value, int mask2) {
        boolean wantDate;
        boolean wantTime = true;
        DateTime result = new DateTime(mask2);
        String value2 = value.trim();
        int len = value2.length();
        int pos = 0;
        if ((mask2 & 14) != 0) {
            wantDate = true;
        } else {
            wantDate = false;
        }
        if ((mask2 & TIME_MASK) == 0) {
            wantTime = false;
        }
        if (wantDate) {
            pos = result.parseDate(value2, 0, mask2);
            if (wantTime) {
                if (pos < 0 || pos >= len || value2.charAt(pos) != 'T') {
                    pos = -1;
                } else {
                    pos++;
                }
            }
        }
        if (wantTime) {
            pos = result.parseTime(value2, pos);
        }
        if (result.parseZone(value2, pos) == len) {
            return result;
        }
        throw new NumberFormatException("Unrecognized date/time '" + value2 + '\'');
    }

    /* access modifiers changed from: package-private */
    public int parseDate(String str, int start, int mask2) {
        int year;
        int month;
        int maxDay;
        if (start < 0) {
            return start;
        }
        int len = str.length();
        boolean negYear = false;
        if (start < len && str.charAt(start) == '-') {
            start++;
            negYear = true;
        }
        int pos = start;
        if ((mask2 & 2) != 0) {
            int part = parseDigits(str, pos);
            year = part >> 16;
            pos = part & 65535;
            if (pos != start + 4 && (pos <= start + 4 || str.charAt(start) == '0')) {
                return -1;
            }
            if (negYear || year == 0) {
                this.calendar.set(0, 0);
                this.calendar.set(1, year + 1);
            } else {
                this.calendar.set(1, year);
            }
        } else if (!negYear) {
            return -1;
        } else {
            year = -1;
        }
        if ((mask2 & 12) == 0) {
            return pos;
        }
        if (pos >= len || str.charAt(pos) != '-') {
            return -1;
        }
        int pos2 = pos + 1;
        int start2 = pos2;
        if ((mask2 & 4) != 0) {
            int part2 = parseDigits(str, start2);
            month = part2 >> 16;
            pos2 = part2 & 65535;
            if (month <= 0 || month > 12 || pos2 != start2 + 2) {
                return -1;
            }
            this.calendar.set(2, month - 1);
            if ((mask2 & 8) == 0) {
                return pos2;
            }
        } else {
            month = -1;
        }
        if (pos2 >= len || str.charAt(pos2) != '-') {
            return -1;
        }
        int start3 = pos2 + 1;
        int part3 = parseDigits(str, start3);
        int day = part3 >> 16;
        int pos3 = part3 & 65535;
        if (day > 0 && pos3 == start3 + 2) {
            if ((mask2 & 4) == 0) {
                maxDay = 31;
            } else {
                int i = month - 1;
                if ((mask2 & 2) == 0) {
                    year = 2000;
                }
                maxDay = daysInMonth(i, year);
            }
            if (day <= maxDay) {
                this.calendar.set(5, day);
                return pos3;
            }
        }
        return -1;
    }

    public static boolean isLeapYear(int year) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    public static int daysInMonth(int month, int year) {
        switch (month) {
            case 1:
                return isLeapYear(year) ? 29 : 28;
            case 3:
            case 5:
            case 8:
            case 10:
                return 30;
            default:
                return 31;
        }
    }

    /* access modifiers changed from: package-private */
    public int parseZone(String str, int start) {
        TimeZone zone;
        if (start < 0) {
            return start;
        }
        int part = parseZoneMinutes(str, start);
        if (part == 0) {
            return -1;
        }
        if (part == start) {
            return start;
        }
        int pos = part & 65535;
        if ((part >> 16) == 0) {
            zone = GMT;
        } else {
            zone = TimeZone.getTimeZone("GMT" + str.substring(start, pos));
        }
        this.calendar.setTimeZone(zone);
        this.mask |= TIMEZONE_MASK;
        return pos;
    }

    /* access modifiers changed from: package-private */
    public int parseZoneMinutes(String str, int start) {
        int len = str.length();
        if (start == len || start < 0) {
            return start;
        }
        char ch = str.charAt(start);
        if (ch == 'Z') {
            return start + 1;
        }
        if (ch != '+' && ch != '-') {
            return start;
        }
        int start2 = start + 1;
        int part = parseDigits(str, start2);
        int hour = part >> 16;
        if (hour > 14) {
            return 0;
        }
        int minute = hour * 60;
        int pos = part & 65535;
        if (pos != start2 + 2 || pos >= len) {
            return 0;
        }
        if (str.charAt(pos) == ':') {
            int start3 = pos + 1;
            int part2 = parseDigits(str, start3);
            pos = part2 & 65535;
            int part3 = part2 >> 16;
            if (part3 > 0 && (part3 >= 60 || hour == 14)) {
                return 0;
            }
            minute += part3;
            if (pos != start3 + 2) {
                return 0;
            }
        }
        if (minute > 840) {
            return 0;
        }
        if (ch == '-') {
            minute = -minute;
        }
        return (minute << 16) | pos;
    }

    /* access modifiers changed from: package-private */
    public int parseTime(String str, int start) {
        if (start < 0) {
            return start;
        }
        int len = str.length();
        int i = start;
        int part = parseDigits(str, start);
        int hour = part >> 16;
        int pos = part & 65535;
        if (hour <= 24 && pos == start + 2 && pos != len && str.charAt(pos) == ':') {
            int start2 = pos + 1;
            int part2 = parseDigits(str, start2);
            int minute = part2 >> 16;
            int pos2 = part2 & 65535;
            if (minute < 60 && pos2 == start2 + 2 && pos2 != len && str.charAt(pos2) == ':') {
                int start3 = pos2 + 1;
                int part3 = parseDigits(str, start3);
                int second = part3 >> 16;
                int pos3 = part3 & 65535;
                if (second < 60 && pos3 == start3 + 2) {
                    if (pos3 + 1 < len && str.charAt(pos3) == '.' && Character.digit(str.charAt(pos3 + 1), 10) >= 0) {
                        pos3++;
                        int nanos = 0;
                        int nfrac = 0;
                        while (pos3 < len) {
                            int dig = Character.digit(str.charAt(pos3), 10);
                            if (dig < 0) {
                                break;
                            }
                            if (nfrac < 9) {
                                nanos = (nanos * 10) + dig;
                            } else if (nfrac == 9 && dig >= 5) {
                                nanos++;
                            }
                            nfrac++;
                            pos3++;
                        }
                        while (true) {
                            int nfrac2 = nfrac;
                            nfrac = nfrac2 + 1;
                            if (nfrac2 >= 9) {
                                break;
                            }
                            nanos *= 10;
                        }
                        this.nanoSeconds = nanos;
                    }
                    if (hour == 24 && (minute != 0 || second != 0 || this.nanoSeconds != 0)) {
                        return -1;
                    }
                    this.calendar.set(11, hour);
                    this.calendar.set(12, minute);
                    this.calendar.set(13, second);
                    return pos3;
                }
            }
        }
        return -1;
    }

    private static int parseDigits(String str, int start) {
        int i = start;
        int val = -1;
        int len = str.length();
        while (i < len) {
            int dig = Character.digit(str.charAt(i), 10);
            if (dig < 0) {
                break;
            } else if (val > 20000) {
                return 0;
            } else {
                val = val < 0 ? dig : (val * 10) + dig;
                i++;
            }
        }
        return val < 0 ? i : i | (val << 16);
    }

    public int getYear() {
        int year = this.calendar.get(1);
        if (this.calendar.get(0) == 0) {
            return 1 - year;
        }
        return year;
    }

    public int getMonth() {
        return this.calendar.get(2) + 1;
    }

    public int getDay() {
        return this.calendar.get(5);
    }

    public int getHours() {
        return this.calendar.get(11);
    }

    public int getMinutes() {
        return this.calendar.get(12);
    }

    public int getSecondsOnly() {
        return this.calendar.get(13);
    }

    public int getWholeSeconds() {
        return this.calendar.get(13);
    }

    public int getNanoSecondsOnly() {
        return this.nanoSeconds;
    }

    public static int compare(DateTime date1, DateTime date2) {
        long millis1 = date1.calendar.getTimeInMillis();
        long millis2 = date2.calendar.getTimeInMillis();
        if (((date1.mask | date2.mask) & 14) == 0) {
            if (millis1 < 0) {
                millis1 += 86400000;
            }
            if (millis2 < 0) {
                millis2 += 86400000;
            }
        }
        int nanos1 = date1.nanoSeconds;
        int nanos2 = date2.nanoSeconds;
        long millis12 = millis1 + ((long) (nanos1 / 1000000));
        long millis22 = millis2 + ((long) (nanos2 / 1000000));
        int nanos12 = nanos1 % 1000000;
        int nanos22 = nanos2 % 1000000;
        if (millis12 < millis22) {
            return -1;
        }
        if (millis12 > millis22) {
            return 1;
        }
        if (nanos12 < nanos22) {
            return -1;
        }
        return nanos12 > nanos22 ? 1 : 0;
    }

    public int compare(Object obj) {
        if (obj instanceof DateTime) {
            return compare(this, (DateTime) obj);
        }
        return ((Numeric) obj).compareReversed(this);
    }

    public static Duration sub(DateTime date1, DateTime date2) {
        long millis1 = date1.calendar.getTimeInMillis();
        long millis2 = date2.calendar.getTimeInMillis();
        int nanos1 = date1.nanoSeconds;
        int nanos2 = date2.nanoSeconds;
        int nanos12 = nanos1 % 1000000;
        int nanos22 = nanos2 % 1000000;
        long millis = (millis1 + ((long) (nanos1 / 1000000))) - (millis2 + ((long) (nanos2 / 1000000)));
        int nanos = (int) ((((millis % 1000) * 1000000) + ((long) nanos22)) - ((long) nanos22));
        return Duration.make(0, (millis / 1000) + ((long) (nanos / 1000000000)), nanos % 1000000000, Unit.second);
    }

    /* Debug info: failed to restart local var, previous not found, register: 3 */
    public DateTime withZoneUnspecified() {
        if (isZoneUnspecified()) {
            return this;
        }
        DateTime r = new DateTime(this.mask, (GregorianCalendar) this.calendar.clone());
        r.calendar.setTimeZone(TimeZone.getDefault());
        r.mask &= -129;
        return r;
    }

    public DateTime adjustTimezone(int newOffset) {
        TimeZone zone;
        DateTime r = new DateTime(this.mask, (GregorianCalendar) this.calendar.clone());
        if (newOffset == 0) {
            zone = GMT;
        } else {
            StringBuffer sbuf = new StringBuffer("GMT");
            toStringZone(newOffset, sbuf);
            zone = TimeZone.getTimeZone(sbuf.toString());
        }
        r.calendar.setTimeZone(zone);
        if ((r.mask & TIMEZONE_MASK) != 0) {
            r.calendar.setTimeInMillis(this.calendar.getTimeInMillis());
            if ((this.mask & TIME_MASK) == 0) {
                r.calendar.set(11, 0);
                r.calendar.set(12, 0);
                r.calendar.set(13, 0);
                r.nanoSeconds = 0;
            }
        } else {
            r.mask |= TIMEZONE_MASK;
        }
        return r;
    }

    public static DateTime add(DateTime x, Duration y, int k) {
        int year;
        int month;
        int daysInMonth;
        if (y.unit == Unit.duration || (y.unit == Unit.month && (x.mask & 14) != 14)) {
            throw new IllegalArgumentException("invalid date/time +/- duration combinatuion");
        }
        DateTime r = new DateTime(x.mask, (GregorianCalendar) x.calendar.clone());
        if (y.months != 0) {
            int month2 = (r.getYear() * 12) + r.calendar.get(2) + (y.months * k);
            int day = r.calendar.get(5);
            if (month2 >= 12) {
                year = month2 / 12;
                month = month2 % 12;
                r.calendar.set(0, 1);
                daysInMonth = daysInMonth(month, year);
            } else {
                int month3 = 11 - month2;
                r.calendar.set(0, 0);
                year = (month3 / 12) + 1;
                month = 11 - (month3 % 12);
                daysInMonth = daysInMonth(month, 1);
            }
            if (day > daysInMonth) {
                day = daysInMonth;
            }
            r.calendar.set(year, month, day);
        }
        long nanos = ((long) x.nanoSeconds) + (((long) k) * ((y.seconds * 1000000000) + ((long) y.nanos)));
        if (nanos != 0) {
            if ((x.mask & TIME_MASK) == 0) {
                long mod = nanos % 86400000000000L;
                if (mod < 0) {
                    mod += 86400000000000L;
                }
                nanos -= mod;
            }
            r.calendar.setTimeInMillis(r.calendar.getTimeInMillis() + ((nanos / 1000000000) * 1000));
            r.nanoSeconds = (int) (nanos % 1000000000);
        }
        return r;
    }

    public static DateTime addMinutes(DateTime x, int y) {
        return addSeconds(x, y * 60);
    }

    public static DateTime addSeconds(DateTime x, int y) {
        DateTime r = new DateTime(x.mask, (GregorianCalendar) x.calendar.clone());
        long nanos = ((long) y) * 1000000000;
        if (nanos != 0) {
            long nanos2 = nanos + ((long) x.nanoSeconds);
            r.calendar.setTimeInMillis(x.calendar.getTimeInMillis() + (nanos2 / 1000000));
            r.nanoSeconds = (int) (nanos2 % 1000000);
        }
        return r;
    }

    public Numeric add(Object y, int k) {
        if (y instanceof Duration) {
            return add(this, (Duration) y, k);
        }
        if ((y instanceof DateTime) && k == -1) {
            return sub(this, (DateTime) y);
        }
        throw new IllegalArgumentException();
    }

    public Numeric addReversed(Numeric x, int k) {
        if ((x instanceof Duration) && k == 1) {
            return add(this, (Duration) x, k);
        }
        throw new IllegalArgumentException();
    }

    private static void append(int value, StringBuffer sbuf, int minWidth) {
        int start = sbuf.length();
        sbuf.append(value);
        int padding = (start + minWidth) - sbuf.length();
        while (true) {
            padding--;
            if (padding >= 0) {
                sbuf.insert(start, '0');
            } else {
                return;
            }
        }
    }

    public void toStringDate(StringBuffer sbuf) {
        int mask2 = components();
        if ((mask2 & 2) != 0) {
            int year = this.calendar.get(1);
            if (this.calendar.get(0) == 0 && year - 1 != 0) {
                sbuf.append('-');
            }
            append(year, sbuf, 4);
        } else {
            sbuf.append('-');
        }
        if ((mask2 & 12) != 0) {
            sbuf.append('-');
            if ((mask2 & 4) != 0) {
                append(getMonth(), sbuf, 2);
            }
            if ((mask2 & 8) != 0) {
                sbuf.append('-');
                append(getDay(), sbuf, 2);
            }
        }
    }

    public void toStringTime(StringBuffer sbuf) {
        append(getHours(), sbuf, 2);
        sbuf.append(':');
        append(getMinutes(), sbuf, 2);
        sbuf.append(':');
        append(getWholeSeconds(), sbuf, 2);
        Duration.appendNanoSeconds(this.nanoSeconds, sbuf);
    }

    public boolean isZoneUnspecified() {
        return (this.mask & TIMEZONE_MASK) == 0;
    }

    public int getZoneMinutes() {
        return this.calendar.getTimeZone().getRawOffset() / 60000;
    }

    public static TimeZone minutesToTimeZone(int minutes) {
        if (minutes == 0) {
            return GMT;
        }
        StringBuffer sbuf = new StringBuffer("GMT");
        toStringZone(minutes, sbuf);
        return TimeZone.getTimeZone(sbuf.toString());
    }

    public void setTimeZone(TimeZone timeZone) {
        this.calendar.setTimeZone(timeZone);
    }

    public void toStringZone(StringBuffer sbuf) {
        if (!isZoneUnspecified()) {
            toStringZone(getZoneMinutes(), sbuf);
        }
    }

    public static void toStringZone(int minutes, StringBuffer sbuf) {
        if (minutes == 0) {
            sbuf.append('Z');
            return;
        }
        if (minutes < 0) {
            sbuf.append('-');
            minutes = -minutes;
        } else {
            sbuf.append('+');
        }
        append(minutes / 60, sbuf, 2);
        sbuf.append(':');
        append(minutes % 60, sbuf, 2);
    }

    public void toString(StringBuffer sbuf) {
        boolean hasDate;
        boolean hasTime = true;
        int mask2 = components();
        if ((mask2 & 14) != 0) {
            hasDate = true;
        } else {
            hasDate = false;
        }
        if ((mask2 & TIME_MASK) == 0) {
            hasTime = false;
        }
        if (hasDate) {
            toStringDate(sbuf);
            if (hasTime) {
                sbuf.append('T');
            }
        }
        if (hasTime) {
            toStringTime(sbuf);
        }
        toStringZone(sbuf);
    }

    public String toString() {
        StringBuffer sbuf = new StringBuffer();
        toString(sbuf);
        return sbuf.toString();
    }

    public boolean isExact() {
        return (this.mask & TIME_MASK) == 0;
    }

    public boolean isZero() {
        throw new Error("DateTime.isZero not meaningful!");
    }

    public Unit unit() {
        return this.unit;
    }

    public Complex number() {
        throw new Error("number needs to be implemented!");
    }
}
