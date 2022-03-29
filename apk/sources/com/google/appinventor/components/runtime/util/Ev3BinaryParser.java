package com.google.appinventor.components.runtime.util;

import com.google.appinventor.components.runtime.util.Ev3Constants;
import gnu.text.PrettyWriter;
import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.Iterator;

public class Ev3BinaryParser {
    private static byte PRIMPAR_1_BYTE = 1;
    private static byte PRIMPAR_2_BYTES = 2;
    private static byte PRIMPAR_4_BYTES = 3;
    private static byte PRIMPAR_ADDR = 8;
    private static byte PRIMPAR_BYTES = 7;
    private static byte PRIMPAR_CONST = 0;
    private static byte PRIMPAR_CONST_SIGN = 32;
    private static byte PRIMPAR_GLOBAL = 32;
    private static byte PRIMPAR_HANDLE = 16;
    private static byte PRIMPAR_INDEX = 31;
    private static byte PRIMPAR_LOCAL = 0;
    private static byte PRIMPAR_LONG = Byte.MIN_VALUE;
    private static byte PRIMPAR_SHORT = 0;
    private static byte PRIMPAR_STRING = 4;
    private static byte PRIMPAR_STRING_OLD = 0;
    private static byte PRIMPAR_VALUE = Ev3Constants.Opcode.MOVEF_F;
    private static byte PRIMPAR_VARIABEL = Ev3Constants.Opcode.f14JR;

    private static class FormatLiteral {
        public int size;
        public char symbol;

        public FormatLiteral(char symbol2, int size2) {
            this.symbol = symbol2;
            this.size = size2;
        }
    }

    public static byte[] pack(String format, Object... values) throws IllegalArgumentException {
        String[] formatTokens = format.split("(?<=\\D)");
        FormatLiteral[] literals = new FormatLiteral[formatTokens.length];
        int index = 0;
        int bufferCapacity = 0;
        for (int i = 0; i < formatTokens.length; i++) {
            String token = formatTokens[i];
            char symbol = token.charAt(token.length() - 1);
            int size = 1;
            boolean sizeSpecified = false;
            if (token.length() != 1) {
                size = Integer.parseInt(token.substring(0, token.length() - 1));
                sizeSpecified = true;
                if (size < 1) {
                    throw new IllegalArgumentException("Illegal format string");
                }
            }
            switch (symbol) {
                case 'B':
                    bufferCapacity += size;
                    index++;
                    break;
                case PrettyWriter.NEWLINE_FILL /*70*/:
                    bufferCapacity += size * 4;
                    index++;
                    break;
                case 'H':
                    bufferCapacity += size * 2;
                    index++;
                    break;
                case 'I':
                    bufferCapacity += size * 4;
                    index++;
                    break;
                case PrettyWriter.NEWLINE_LITERAL /*76*/:
                    bufferCapacity += size * 8;
                    index++;
                    break;
                case PrettyWriter.NEWLINE_SPACE /*83*/:
                    if (!sizeSpecified) {
                        bufferCapacity += values[index].length() + 1;
                        index++;
                        break;
                    } else {
                        throw new IllegalArgumentException("Illegal format string");
                    }
                case 'b':
                    bufferCapacity += size;
                    index += size;
                    break;
                case ErrorMessages.ERROR_LOCATION_SENSOR_LONGITUDE_NOT_FOUND:
                    bufferCapacity += size * 4;
                    index += size;
                    break;
                case 'h':
                    bufferCapacity += size * 2;
                    index += size;
                    break;
                case 'i':
                    bufferCapacity += size * 4;
                    index += size;
                    break;
                case 'l':
                    bufferCapacity += size * 8;
                    index += size;
                    break;
                case 's':
                    if (size == values[index].length()) {
                        bufferCapacity += size;
                        index++;
                        break;
                    } else {
                        throw new IllegalArgumentException("Illegal format string");
                    }
                case 'x':
                    bufferCapacity += size;
                    break;
                default:
                    throw new IllegalArgumentException("Illegal format string");
            }
            literals[i] = new FormatLiteral(symbol, size);
        }
        if (index != values.length) {
            throw new IllegalArgumentException("Illegal format string");
        }
        int index2 = 0;
        ByteBuffer buffer = ByteBuffer.allocate(bufferCapacity);
        buffer.order(ByteOrder.LITTLE_ENDIAN);
        for (FormatLiteral literal : literals) {
            switch (literal.symbol) {
                case 'B':
                    buffer.put(values[index2]);
                    index2++;
                    break;
                case PrettyWriter.NEWLINE_FILL /*70*/:
                    for (int i2 = 0; i2 < literal.size; i2++) {
                        buffer.putFloat(values[index2][i2]);
                    }
                    index2++;
                    break;
                case 'H':
                    for (int i3 = 0; i3 < literal.size; i3++) {
                        buffer.putShort(values[index2][i3]);
                    }
                    index2++;
                    break;
                case 'I':
                    for (int i4 = 0; i4 < literal.size; i4++) {
                        buffer.putInt(values[index2][i4]);
                    }
                    index2++;
                    break;
                case PrettyWriter.NEWLINE_LITERAL /*76*/:
                    for (int i5 = 0; i5 < literal.size; i5++) {
                        buffer.putLong(values[index2][i5]);
                    }
                    index2++;
                    break;
                case PrettyWriter.NEWLINE_SPACE /*83*/:
                    try {
                        buffer.put(values[index2].getBytes("US-ASCII"));
                        buffer.put((byte) 0);
                        index2++;
                        break;
                    } catch (UnsupportedEncodingException e) {
                        throw new IllegalArgumentException();
                    }
                case 'b':
                    for (int i6 = 0; i6 < literal.size; i6++) {
                        buffer.put(values[index2].byteValue());
                        index2++;
                    }
                    break;
                case ErrorMessages.ERROR_LOCATION_SENSOR_LONGITUDE_NOT_FOUND:
                    for (int i7 = 0; i7 < literal.size; i7++) {
                        buffer.putFloat(values[index2].floatValue());
                        index2++;
                    }
                    break;
                case 'h':
                    for (int i8 = 0; i8 < literal.size; i8++) {
                        buffer.putShort(values[index2].shortValue());
                        index2++;
                    }
                    break;
                case 'i':
                    for (int i9 = 0; i9 < literal.size; i9++) {
                        buffer.putInt(values[index2].intValue());
                        index2++;
                    }
                    break;
                case 'l':
                    for (int i10 = 0; i10 < literal.size; i10++) {
                        buffer.putLong(values[index2].longValue());
                        index2++;
                    }
                    break;
                case 's':
                    try {
                        buffer.put(values[index2].getBytes("US-ASCII"));
                        index2++;
                        break;
                    } catch (UnsupportedEncodingException e2) {
                        throw new IllegalArgumentException();
                    }
                case 'x':
                    for (int i11 = 0; i11 < literal.size; i11++) {
                        buffer.put((byte) 0);
                    }
                    break;
            }
        }
        return buffer.array();
    }

    /* JADX WARNING: Code restructure failed: missing block: B:20:0x0098, code lost:
        r12 = r12 + 1;
     */
    /* Code decompiled incorrectly, please refer to instructions dump. */
    public static java.lang.Object[] unpack(java.lang.String r24, byte[] r25) throws java.lang.IllegalArgumentException {
        /*
            java.lang.String r22 = "(?<=\\D)"
            r0 = r24
            r1 = r22
            java.lang.String[] r10 = r0.split(r1)
            java.util.ArrayList r7 = new java.util.ArrayList
            r7.<init>()
            java.nio.ByteBuffer r4 = java.nio.ByteBuffer.wrap(r25)
            java.nio.ByteOrder r22 = java.nio.ByteOrder.LITTLE_ENDIAN
            r0 = r22
            r4.order(r0)
            r2 = r10
            int r14 = r2.length
            r12 = 0
        L_0x001d:
            if (r12 >= r14) goto L_0x01b9
            r21 = r2[r12]
            r18 = 0
            r17 = 1
            int r22 = r21.length()
            int r22 = r22 + -1
            char r20 = r21.charAt(r22)
            int r22 = r21.length()
            r23 = 1
            r0 = r22
            r1 = r23
            if (r0 <= r1) goto L_0x005d
            r18 = 1
            r22 = 0
            int r23 = r21.length()
            int r23 = r23 + -1
            java.lang.String r22 = r21.substring(r22, r23)
            int r17 = java.lang.Integer.parseInt(r22)
            r22 = 1
            r0 = r17
            r1 = r22
            if (r0 >= r1) goto L_0x005d
            java.lang.IllegalArgumentException r22 = new java.lang.IllegalArgumentException
            java.lang.String r23 = "Illegal format string"
            r22.<init>(r23)
            throw r22
        L_0x005d:
            switch(r20) {
                case 36: goto L_0x01a1;
                case 66: goto L_0x0088;
                case 70: goto L_0x0139;
                case 72: goto L_0x00b0;
                case 73: goto L_0x00e2;
                case 76: goto L_0x010d;
                case 83: goto L_0x0176;
                case 98: goto L_0x0073;
                case 102: goto L_0x0124;
                case 104: goto L_0x009b;
                case 105: goto L_0x00cd;
                case 108: goto L_0x00f8;
                case 115: goto L_0x0150;
                case 120: goto L_0x0068;
                default: goto L_0x0060;
            }
        L_0x0060:
            java.lang.IllegalArgumentException r22 = new java.lang.IllegalArgumentException
            java.lang.String r23 = "Illegal format string"
            r22.<init>(r23)
            throw r22
        L_0x0068:
            r11 = 0
        L_0x0069:
            r0 = r17
            if (r11 >= r0) goto L_0x0098
            r4.get()
            int r11 = r11 + 1
            goto L_0x0069
        L_0x0073:
            r11 = 0
        L_0x0074:
            r0 = r17
            if (r11 >= r0) goto L_0x0098
            byte r22 = r4.get()
            java.lang.Byte r22 = java.lang.Byte.valueOf(r22)
            r0 = r22
            r7.add(r0)
            int r11 = r11 + 1
            goto L_0x0074
        L_0x0088:
            r0 = r17
            byte[] r5 = new byte[r0]
            r22 = 0
            r0 = r22
            r1 = r17
            r4.get(r5, r0, r1)
            r7.add(r5)
        L_0x0098:
            int r12 = r12 + 1
            goto L_0x001d
        L_0x009b:
            r11 = 0
        L_0x009c:
            r0 = r17
            if (r11 >= r0) goto L_0x0098
            short r22 = r4.getShort()
            java.lang.Short r22 = java.lang.Short.valueOf(r22)
            r0 = r22
            r7.add(r0)
            int r11 = r11 + 1
            goto L_0x009c
        L_0x00b0:
            r0 = r17
            short[] r0 = new short[r0]
            r16 = r0
            r11 = 0
        L_0x00b7:
            r0 = r17
            if (r11 >= r0) goto L_0x00c7
            short r22 = r4.getShort()
            r16[r11] = r22
            int r22 = r11 + 1
            r0 = r22
            short r11 = (short) r0
            goto L_0x00b7
        L_0x00c7:
            r0 = r16
            r7.add(r0)
            goto L_0x0098
        L_0x00cd:
            r11 = 0
        L_0x00ce:
            r0 = r17
            if (r11 >= r0) goto L_0x0098
            int r22 = r4.getInt()
            java.lang.Integer r22 = java.lang.Integer.valueOf(r22)
            r0 = r22
            r7.add(r0)
            int r11 = r11 + 1
            goto L_0x00ce
        L_0x00e2:
            r0 = r17
            int[] r13 = new int[r0]
            r11 = 0
        L_0x00e7:
            r0 = r17
            if (r11 >= r0) goto L_0x00f4
            int r22 = r4.getInt()
            r13[r11] = r22
            int r11 = r11 + 1
            goto L_0x00e7
        L_0x00f4:
            r7.add(r13)
            goto L_0x0098
        L_0x00f8:
            r11 = 0
        L_0x00f9:
            r0 = r17
            if (r11 >= r0) goto L_0x0098
            long r22 = r4.getLong()
            java.lang.Long r22 = java.lang.Long.valueOf(r22)
            r0 = r22
            r7.add(r0)
            int r11 = r11 + 1
            goto L_0x00f9
        L_0x010d:
            r0 = r17
            long[] r15 = new long[r0]
            r11 = 0
        L_0x0112:
            r0 = r17
            if (r11 >= r0) goto L_0x011f
            long r22 = r4.getLong()
            r15[r11] = r22
            int r11 = r11 + 1
            goto L_0x0112
        L_0x011f:
            r7.add(r15)
            goto L_0x0098
        L_0x0124:
            r11 = 0
        L_0x0125:
            r0 = r17
            if (r11 >= r0) goto L_0x0098
            float r22 = r4.getFloat()
            java.lang.Float r22 = java.lang.Float.valueOf(r22)
            r0 = r22
            r7.add(r0)
            int r11 = r11 + 1
            goto L_0x0125
        L_0x0139:
            r0 = r17
            float[] r9 = new float[r0]
            r11 = 0
        L_0x013e:
            r0 = r17
            if (r11 >= r0) goto L_0x014b
            float r22 = r4.getFloat()
            r9[r11] = r22
            int r11 = r11 + 1
            goto L_0x013e
        L_0x014b:
            r7.add(r9)
            goto L_0x0098
        L_0x0150:
            r0 = r17
            byte[] r6 = new byte[r0]
            r22 = 0
            r0 = r22
            r1 = r17
            r4.get(r6, r0, r1)
            java.lang.String r22 = new java.lang.String     // Catch:{ UnsupportedEncodingException -> 0x016f }
            java.lang.String r23 = "US-ASCII"
            r0 = r22
            r1 = r23
            r0.<init>(r6, r1)     // Catch:{ UnsupportedEncodingException -> 0x016f }
            r0 = r22
            r7.add(r0)     // Catch:{ UnsupportedEncodingException -> 0x016f }
            goto L_0x0098
        L_0x016f:
            r8 = move-exception
            java.lang.IllegalArgumentException r22 = new java.lang.IllegalArgumentException
            r22.<init>()
            throw r22
        L_0x0176:
            if (r18 == 0) goto L_0x0180
            java.lang.IllegalArgumentException r22 = new java.lang.IllegalArgumentException
            java.lang.String r23 = "Illegal format string"
            r22.<init>(r23)
            throw r22
        L_0x0180:
            java.lang.StringBuffer r19 = new java.lang.StringBuffer
            r19.<init>()
        L_0x0185:
            byte r3 = r4.get()
            if (r3 == 0) goto L_0x0196
            char r0 = (char) r3
            r22 = r0
            r0 = r19
            r1 = r22
            r0.append(r1)
            goto L_0x0185
        L_0x0196:
            java.lang.String r22 = r19.toString()
            r0 = r22
            r7.add(r0)
            goto L_0x0098
        L_0x01a1:
            if (r18 == 0) goto L_0x01ab
            java.lang.IllegalArgumentException r22 = new java.lang.IllegalArgumentException
            java.lang.String r23 = "Illegal format string"
            r22.<init>(r23)
            throw r22
        L_0x01ab:
            boolean r22 = r4.hasRemaining()
            if (r22 == 0) goto L_0x0060
            java.lang.IllegalArgumentException r22 = new java.lang.IllegalArgumentException
            java.lang.String r23 = "Illegal format string"
            r22.<init>(r23)
            throw r22
        L_0x01b9:
            java.lang.Object[] r22 = r7.toArray()
            return r22
        */
        throw new UnsupportedOperationException("Method not decompiled: com.google.appinventor.components.runtime.util.Ev3BinaryParser.unpack(java.lang.String, byte[]):java.lang.Object[]");
    }

    public static byte[] encodeLC0(byte v) {
        if (v < -31 || v > 31) {
            throw new IllegalArgumentException("Encoded value must be in range [0, 127]");
        }
        return new byte[]{(byte) (PRIMPAR_VALUE & v)};
    }

    public static byte[] encodeLC1(byte v) {
        return new byte[]{(byte) (((byte) (PRIMPAR_LONG | PRIMPAR_CONST)) | PRIMPAR_1_BYTE), (byte) (v & Ev3Constants.Opcode.TST)};
    }

    public static byte[] encodeLC2(short v) {
        return new byte[]{(byte) (((byte) (PRIMPAR_LONG | PRIMPAR_CONST)) | PRIMPAR_2_BYTES), (byte) (v & 255), (byte) ((v >>> 8) & 255)};
    }

    public static byte[] encodeLC4(int v) {
        return new byte[]{(byte) (((byte) (PRIMPAR_LONG | PRIMPAR_CONST)) | PRIMPAR_4_BYTES), (byte) (v & 255), (byte) ((v >>> 8) & 255), (byte) ((v >>> 16) & 255), (byte) ((v >>> 24) & 255)};
    }

    public static byte[] encodeLV0(int i) {
        return new byte[]{(byte) ((PRIMPAR_INDEX & i) | PRIMPAR_SHORT | PRIMPAR_VARIABEL | PRIMPAR_LOCAL)};
    }

    public static byte[] encodeLV1(int i) {
        return new byte[]{(byte) (PRIMPAR_LONG | PRIMPAR_VARIABEL | PRIMPAR_LOCAL | PRIMPAR_1_BYTE), (byte) (i & 255)};
    }

    public static byte[] encodeLV2(int i) {
        return new byte[]{(byte) (PRIMPAR_LONG | PRIMPAR_VARIABEL | PRIMPAR_LOCAL | PRIMPAR_2_BYTES), (byte) (i & 255), (byte) ((i >>> 8) & 255)};
    }

    public static byte[] encodeLV4(int i) {
        return new byte[]{(byte) (PRIMPAR_LONG | PRIMPAR_VARIABEL | PRIMPAR_LOCAL | PRIMPAR_4_BYTES), (byte) (i & 255), (byte) ((i >>> 8) & 255), (byte) ((i >>> 16) & 255), (byte) ((i >>> 24) & 255)};
    }

    public static byte[] encodeGV0(int i) {
        return new byte[]{(byte) ((PRIMPAR_INDEX & i) | PRIMPAR_SHORT | PRIMPAR_VARIABEL | PRIMPAR_GLOBAL)};
    }

    public static byte[] encodeGV1(int i) {
        return new byte[]{(byte) (PRIMPAR_LONG | PRIMPAR_VARIABEL | PRIMPAR_GLOBAL | PRIMPAR_1_BYTE), (byte) (i & 255)};
    }

    public static byte[] encodeGV2(int i) {
        return new byte[]{(byte) (PRIMPAR_LONG | PRIMPAR_VARIABEL | PRIMPAR_GLOBAL | PRIMPAR_2_BYTES), (byte) (i & 255), (byte) ((i >>> 8) & 255)};
    }

    public static byte[] encodeGV4(int i) {
        return new byte[]{(byte) (PRIMPAR_LONG | PRIMPAR_VARIABEL | PRIMPAR_GLOBAL | PRIMPAR_4_BYTES), (byte) (i & 255), (byte) ((i >>> 8) & 255), (byte) ((i >>> 16) & 255), (byte) ((i >>> 24) & 255)};
    }

    public static byte[] encodeSystemCommand(byte command, boolean needReply, Object... parameters) {
        int bufferCapacity = 2;
        for (Object obj : parameters) {
            if (obj instanceof Byte) {
                bufferCapacity++;
            } else if (obj instanceof Short) {
                bufferCapacity += 2;
            } else if (obj instanceof Integer) {
                bufferCapacity += 4;
            } else if (obj instanceof String) {
                bufferCapacity += ((String) obj).length() + 1;
            } else {
                throw new IllegalArgumentException("Parameters should be one of the class types: Byte, Short, Integer, String");
            }
        }
        ByteBuffer buffer = ByteBuffer.allocate(bufferCapacity);
        buffer.order(ByteOrder.LITTLE_ENDIAN);
        buffer.put(needReply ? (byte) 1 : -127);
        buffer.put(command);
        for (Object obj2 : parameters) {
            if (obj2 instanceof Byte) {
                buffer.put(((Byte) obj2).byteValue());
            } else if (obj2 instanceof Short) {
                buffer.putShort(((Short) obj2).shortValue());
            } else if (obj2 instanceof Integer) {
                buffer.putInt(((Integer) obj2).intValue());
            } else if (obj2 instanceof String) {
                try {
                    buffer.put(((String) obj2).getBytes("US-ASCII"));
                    buffer.put((byte) 0);
                } catch (UnsupportedEncodingException e) {
                    throw new IllegalArgumentException("Non-ASCII string encoding is not supported");
                }
            } else {
                throw new IllegalArgumentException("Parameters should be one of the class types: Byte, Short, Integer, String");
            }
        }
        return buffer.array();
    }

    public static byte[] encodeDirectCommand(byte opcode, boolean needReply, int globalAllocation, int localAllocation, String paramFormat, Object... parameters) {
        if (globalAllocation < 0 || globalAllocation > 1023 || localAllocation < 0 || localAllocation > 63 || paramFormat.length() != parameters.length) {
            throw new IllegalArgumentException();
        }
        ArrayList<byte[]> payloads = new ArrayList<>();
        for (int i = 0; i < paramFormat.length(); i++) {
            char letter = paramFormat.charAt(i);
            Byte b = parameters[i];
            switch (letter) {
                case 'c':
                    if (b instanceof Byte) {
                        if (b.byteValue() <= 31 && b.byteValue() >= -31) {
                            payloads.add(encodeLC0(b.byteValue()));
                            break;
                        } else {
                            payloads.add(encodeLC1(b.byteValue()));
                            break;
                        }
                    } else if (b instanceof Short) {
                        payloads.add(encodeLC2(((Short) b).shortValue()));
                        break;
                    } else if (b instanceof Integer) {
                        payloads.add(encodeLC4(((Integer) b).intValue()));
                        break;
                    } else {
                        throw new IllegalArgumentException();
                    }
                case 'g':
                    if (b instanceof Byte) {
                        if (b.byteValue() <= 31 && b.byteValue() >= -31) {
                            payloads.add(encodeGV0(b.byteValue()));
                            break;
                        } else {
                            payloads.add(encodeGV1(b.byteValue()));
                            break;
                        }
                    } else if (b instanceof Short) {
                        payloads.add(encodeGV2(((Short) b).shortValue()));
                        break;
                    } else if (b instanceof Integer) {
                        payloads.add(encodeGV4(((Integer) b).intValue()));
                        break;
                    } else {
                        throw new IllegalArgumentException();
                    }
                case 'l':
                    if (b instanceof Byte) {
                        if (b.byteValue() <= 31 && b.byteValue() >= -31) {
                            payloads.add(encodeLV0(b.byteValue()));
                            break;
                        } else {
                            payloads.add(encodeLV1(b.byteValue()));
                            break;
                        }
                    } else if (b instanceof Short) {
                        payloads.add(encodeLV2(((Short) b).shortValue()));
                        break;
                    } else if (b instanceof Integer) {
                        payloads.add(encodeLV4(((Integer) b).intValue()));
                        break;
                    } else {
                        throw new IllegalArgumentException();
                    }
                case 's':
                    if (!(b instanceof String)) {
                        throw new IllegalArgumentException();
                    }
                    try {
                        payloads.add((((String) b) + 0).getBytes("US-ASCII"));
                        break;
                    } catch (UnsupportedEncodingException e) {
                        throw new IllegalArgumentException();
                    }
                default:
                    throw new IllegalArgumentException("Illegal format string");
            }
        }
        int bufferCapacity = 4;
        Iterator i$ = payloads.iterator();
        while (i$.hasNext()) {
            bufferCapacity += i$.next().length;
        }
        ByteBuffer buffer = ByteBuffer.allocate(bufferCapacity);
        buffer.order(ByteOrder.LITTLE_ENDIAN);
        buffer.put(needReply ? 0 : Byte.MIN_VALUE);
        buffer.put(new byte[]{(byte) (globalAllocation & 255), (byte) (((globalAllocation >>> 8) & 3) | (localAllocation << 2))});
        buffer.put(opcode);
        Iterator i$2 = payloads.iterator();
        while (i$2.hasNext()) {
            buffer.put(i$2.next());
        }
        return buffer.array();
    }
}
