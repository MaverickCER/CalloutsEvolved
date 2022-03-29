package com.google.appinventor.components.runtime.util;

import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import com.google.appinventor.components.common.YaVersion;
import com.google.appinventor.components.runtime.ReplForm;
import com.google.appinventor.components.runtime.util.NanoHTTPD;
import gnu.expr.Language;
import gnu.expr.ModuleExp;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Formatter;
import java.util.List;
import java.util.Properties;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import kawa.standard.Scheme;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class AppInvHTTPD extends NanoHTTPD {
    private static final String LOG_TAG = "AppInvHTTPD";
    private static final String MIME_JSON = "application/json";
    private static final int YAV_SKEW_BACKWARD = 4;
    private static final int YAV_SKEW_FORWARD = 1;
    private static byte[] hmacKey;
    private static int seq;
    private final Handler androidUIHandler = new Handler();
    /* access modifiers changed from: private */
    public ReplForm form;
    private File rootDir;
    private Language scheme;
    private boolean secure;

    public AppInvHTTPD(int port, File wwwroot, boolean secure2, ReplForm form2) throws IOException {
        super(port, wwwroot);
        this.rootDir = wwwroot;
        this.scheme = Scheme.getInstance("scheme");
        this.form = form2;
        this.secure = secure2;
        ModuleExp.mustNeverCompile();
    }

    public NanoHTTPD.Response serve(String uri, String method, Properties header, Properties parms, Properties files, Socket mySocket) {
        NanoHTTPD.Response res;
        String installer;
        NanoHTTPD.Response res2;
        Log.d(LOG_TAG, method + " '" + uri + "' ");
        if (this.secure) {
            String hostAddress = mySocket.getInetAddress().getHostAddress();
            if (!hostAddress.equals("127.0.0.1")) {
                Log.d(LOG_TAG, "Debug: hostAddress = " + hostAddress + " while in secure mode, closing connection.");
                NanoHTTPD.Response response = new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, MIME_JSON, "{\"status\" : \"BAD\", \"message\" : \"Security Error: Invalid Source Location " + hostAddress + "\"}");
                response.addHeader("Access-Control-Allow-Origin", "*");
                response.addHeader("Access-Control-Allow-Headers", "origin, content-type");
                response.addHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,HEAD,PUT");
                response.addHeader("Allow", "POST,OPTIONS,GET,HEAD,PUT");
                return response;
            }
        }
        if (method.equals("OPTIONS")) {
            Enumeration e = header.propertyNames();
            while (e.hasMoreElements()) {
                String value = (String) e.nextElement();
                Log.d(LOG_TAG, "  HDR: '" + value + "' = '" + header.getProperty(value) + "'");
            }
            NanoHTTPD.Response response2 = new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, NanoHTTPD.MIME_PLAINTEXT, "OK");
            response2.addHeader("Access-Control-Allow-Origin", "*");
            response2.addHeader("Access-Control-Allow-Headers", "origin, content-type");
            response2.addHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,HEAD,PUT");
            response2.addHeader("Allow", "POST,OPTIONS,GET,HEAD,PUT");
            return response2;
        } else if (uri.equals("/_newblocks")) {
            adoptMainThreadClassLoader();
            String inSeq = parms.getProperty("seq", "0");
            int iseq = Integer.parseInt(inSeq);
            String blockid = parms.getProperty("blockid");
            String code = parms.getProperty("code");
            String inMac = parms.getProperty("mac", "no key provided");
            String input_code = code;
            if (hmacKey != null) {
                try {
                    Mac hmacSha1 = Mac.getInstance("HmacSHA1");
                    hmacSha1.init(new SecretKeySpec(hmacKey, "RAW"));
                    byte[] tmpMac = hmacSha1.doFinal((code + inSeq + blockid).getBytes());
                    StringBuffer stringBuffer = new StringBuffer(tmpMac.length * 2);
                    Formatter formatter = new Formatter(stringBuffer);
                    byte[] arr$ = tmpMac;
                    int len$ = arr$.length;
                    for (int i$ = 0; i$ < len$; i$++) {
                        formatter.format("%02x", new Object[]{Byte.valueOf(arr$[i$])});
                    }
                    String compMac = stringBuffer.toString();
                    Log.d(LOG_TAG, "Incoming Mac = " + inMac);
                    Log.d(LOG_TAG, "Computed Mac = " + compMac);
                    Log.d(LOG_TAG, "Incoming seq = " + inSeq);
                    Log.d(LOG_TAG, "Computed seq = " + seq);
                    Log.d(LOG_TAG, "blockid = " + blockid);
                    if (!inMac.equals(compMac)) {
                        Log.e(LOG_TAG, "Hmac does not match");
                        this.form.dispatchErrorOccurredEvent(this.form, LOG_TAG, ErrorMessages.ERROR_REPL_SECURITY_ERROR, "Invalid HMAC");
                        return new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, MIME_JSON, "{\"status\" : \"BAD\", \"message\" : \"Security Error: Invalid MAC\"}");
                    } else if (seq == iseq || seq == iseq + 1) {
                        if (seq == iseq + 1) {
                            Log.e(LOG_TAG, "Seq Fixup Invoked");
                        }
                        seq = iseq + 1;
                        String code2 = "(begin (require <com.google.youngandroid.runtime>) (process-repl-input " + blockid + " (begin " + code + " )))";
                        Log.d(LOG_TAG, "To Eval: " + code2);
                        try {
                            if (input_code.equals("#f")) {
                                Log.e(LOG_TAG, "Skipping evaluation of #f");
                            } else {
                                this.scheme.eval(code2);
                            }
                            res2 = new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, MIME_JSON, RetValManager.fetch(false));
                        } catch (Throwable ex) {
                            Log.e(LOG_TAG, "newblocks: Scheme Failure", ex);
                            RetValManager.appendReturnValue(blockid, "BAD", ex.toString());
                            res2 = new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, MIME_JSON, RetValManager.fetch(false));
                        }
                        res2.addHeader("Access-Control-Allow-Origin", "*");
                        res2.addHeader("Access-Control-Allow-Headers", "origin, content-type");
                        res2.addHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,HEAD,PUT");
                        res2.addHeader("Allow", "POST,OPTIONS,GET,HEAD,PUT");
                        return res2;
                    } else {
                        Log.e(LOG_TAG, "Seq does not match");
                        this.form.dispatchErrorOccurredEvent(this.form, LOG_TAG, ErrorMessages.ERROR_REPL_SECURITY_ERROR, "Invalid Seq");
                        return new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, MIME_JSON, "{\"status\" : \"BAD\", \"message\" : \"Security Error: Invalid Seq\"}");
                    }
                } catch (Exception e2) {
                    Log.e(LOG_TAG, "Error working with hmac", e2);
                    this.form.dispatchErrorOccurredEvent(this.form, LOG_TAG, ErrorMessages.ERROR_REPL_SECURITY_ERROR, "Exception working on HMAC");
                    return new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, NanoHTTPD.MIME_PLAINTEXT, "NOT");
                }
            } else {
                Log.e(LOG_TAG, "No HMAC Key");
                this.form.dispatchErrorOccurredEvent(this.form, LOG_TAG, ErrorMessages.ERROR_REPL_SECURITY_ERROR, "No HMAC Key");
                return new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, MIME_JSON, "{\"status\" : \"BAD\", \"message\" : \"Security Error: No HMAC Key\"}");
            }
        } else if (uri.equals("/_values")) {
            NanoHTTPD.Response response3 = new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, MIME_JSON, RetValManager.fetch(true));
            response3.addHeader("Access-Control-Allow-Origin", "*");
            response3.addHeader("Access-Control-Allow-Headers", "origin, content-type");
            response3.addHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,HEAD,PUT");
            response3.addHeader("Allow", "POST,OPTIONS,GET,HEAD,PUT");
            return response3;
        } else if (uri.equals("/_getversion")) {
            try {
                String packageName = this.form.getPackageName();
                PackageInfo pInfo = this.form.getPackageManager().getPackageInfo(packageName, 0);
                if (SdkLevel.getLevel() >= 5) {
                    installer = EclairUtil.getInstallerPackageName(YaVersion.ACCEPTABLE_COMPANION_PACKAGE, this.form);
                } else {
                    installer = "Not Known";
                }
                String versionName = pInfo.versionName;
                if (installer == null) {
                    installer = "Not Known";
                }
                res = new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, MIME_JSON, "{\"version\" : \"" + versionName + "\", \"fingerprint\" : \"" + Build.FINGERPRINT + "\"," + " \"installer\" : \"" + installer + "\", \"package\" : \"" + packageName + "\", \"fqcn\" : true }");
            } catch (PackageManager.NameNotFoundException n) {
                n.printStackTrace();
                res = new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, MIME_JSON, "{\"verison\" : \"Unknown\"");
            }
            res.addHeader("Access-Control-Allow-Origin", "*");
            res.addHeader("Access-Control-Allow-Headers", "origin, content-type");
            res.addHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,HEAD,PUT");
            res.addHeader("Allow", "POST,OPTIONS,GET,HEAD,PUT");
            if (!this.secure) {
                return res;
            }
            seq = 1;
            this.androidUIHandler.post(new Runnable() {
                public void run() {
                    AppInvHTTPD.this.form.clear();
                }
            });
            return res;
        } else if (uri.equals("/_update") || uri.equals("/_install")) {
            String url = parms.getProperty("url", "");
            String inMac2 = parms.getProperty("mac", "");
            if (url.equals("") || hmacKey == null || inMac2.equals("")) {
                NanoHTTPD.Response response4 = new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, MIME_JSON, "{\"status\" : \"BAD\", \"message\" : \"Missing Parameters\"}");
                response4.addHeader("Access-Control-Allow-Origin", "*");
                response4.addHeader("Access-Control-Allow-Headers", "origin, content-type");
                response4.addHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,HEAD,PUT");
                response4.addHeader("Allow", "POST,OPTIONS,GET,HEAD,PUT");
                return response4;
            }
            try {
                SecretKeySpec secretKeySpec = new SecretKeySpec(hmacKey, "RAW");
                Mac hmacSha12 = Mac.getInstance("HmacSHA1");
                hmacSha12.init(secretKeySpec);
                byte[] tmpMac2 = hmacSha12.doFinal(url.getBytes());
                StringBuffer stringBuffer2 = new StringBuffer(tmpMac2.length * 2);
                Formatter formatter2 = new Formatter(stringBuffer2);
                byte[] arr$2 = tmpMac2;
                int len$2 = arr$2.length;
                for (int i$2 = 0; i$2 < len$2; i$2++) {
                    formatter2.format("%02x", new Object[]{Byte.valueOf(arr$2[i$2])});
                }
                String compMac2 = stringBuffer2.toString();
                Log.d(LOG_TAG, "Incoming Mac (update) = " + inMac2);
                Log.d(LOG_TAG, "Computed Mac (update) = " + compMac2);
                if (!inMac2.equals(compMac2)) {
                    Log.e(LOG_TAG, "Hmac does not match");
                    this.form.dispatchErrorOccurredEvent(this.form, LOG_TAG, ErrorMessages.ERROR_REPL_SECURITY_ERROR, "Invalid HMAC (update)");
                    NanoHTTPD.Response response5 = new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, MIME_JSON, "{\"status\" : \"BAD\", \"message\" : \"Security Error: Invalid MAC\"}");
                    response5.addHeader("Access-Control-Allow-Origin", "*");
                    response5.addHeader("Access-Control-Allow-Headers", "origin, content-type");
                    response5.addHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,HEAD,PUT");
                    response5.addHeader("Allow", "POST,OPTIONS,GET,HEAD,PUT");
                    return response5;
                }
                doPackageUpdate(url);
                NanoHTTPD.Response response6 = new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, MIME_JSON, "{\"status\" : \"OK\", \"message\" : \"Update Should Happen\"}");
                response6.addHeader("Access-Control-Allow-Origin", "*");
                response6.addHeader("Access-Control-Allow-Headers", "origin, content-type");
                response6.addHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,HEAD,PUT");
                response6.addHeader("Allow", "POST,OPTIONS,GET,HEAD,PUT");
                return response6;
            } catch (Exception e3) {
                Log.e(LOG_TAG, "Error verifying update", e3);
                this.form.dispatchErrorOccurredEvent(this.form, LOG_TAG, ErrorMessages.ERROR_REPL_SECURITY_ERROR, "Exception working on HMAC for update");
                NanoHTTPD.Response response7 = new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, MIME_JSON, "{\"status\" : \"BAD\", \"message\" : \"Security Error: Exception processing MAC\"}");
                response7.addHeader("Access-Control-Allow-Origin", "*");
                response7.addHeader("Access-Control-Allow-Headers", "origin, content-type");
                response7.addHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,HEAD,PUT");
                response7.addHeader("Allow", "POST,OPTIONS,GET,HEAD,PUT");
                return response7;
            }
        } else if (uri.equals("/_package")) {
            String packageapk = parms.getProperty("package", (String) null);
            if (packageapk == null) {
                return new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, NanoHTTPD.MIME_PLAINTEXT, "NOT OK");
            }
            Log.d(LOG_TAG, this.rootDir + "/" + packageapk);
            Intent intent = new Intent("android.intent.action.VIEW");
            intent.setDataAndType(Uri.fromFile(new File(this.rootDir + "/" + packageapk)), "application/vnd.android.package-archive");
            this.form.startActivity(intent);
            NanoHTTPD.Response response8 = new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, NanoHTTPD.MIME_PLAINTEXT, "OK");
            response8.addHeader("Access-Control-Allow-Origin", "*");
            response8.addHeader("Access-Control-Allow-Headers", "origin, content-type");
            response8.addHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,HEAD,PUT");
            response8.addHeader("Allow", "POST,OPTIONS,GET,HEAD,PUT");
            return response8;
        } else if (uri.equals("/_extensions")) {
            return processLoadExtensionsRequest(parms);
        } else {
            if (method.equals("PUT")) {
                Boolean error = false;
                String tmpFileName = files.getProperty("content", (String) null);
                if (tmpFileName != null) {
                    File fileFrom = new File(tmpFileName);
                    String filename = parms.getProperty("filename", (String) null);
                    if (filename != null && (filename.startsWith("..") || filename.endsWith("..") || filename.indexOf("../") >= 0)) {
                        Log.d(LOG_TAG, " Ignoring invalid filename: " + filename);
                        filename = null;
                    }
                    if (filename != null) {
                        File fileTo = new File(this.rootDir + "/" + filename);
                        File parentFileTo = fileTo.getParentFile();
                        if (!parentFileTo.exists()) {
                            parentFileTo.mkdirs();
                        }
                        if (!fileFrom.renameTo(fileTo)) {
                            copyFile(fileFrom, fileTo);
                            fileFrom.delete();
                        }
                    } else {
                        fileFrom.delete();
                        Log.e(LOG_TAG, "Received content without a file name!");
                        error = true;
                    }
                } else {
                    Log.e(LOG_TAG, "Received PUT without content.");
                    error = true;
                }
                if (error.booleanValue()) {
                    NanoHTTPD.Response response9 = new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, NanoHTTPD.MIME_PLAINTEXT, "NOTOK");
                    response9.addHeader("Access-Control-Allow-Origin", "*");
                    response9.addHeader("Access-Control-Allow-Headers", "origin, content-type");
                    response9.addHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,HEAD,PUT");
                    response9.addHeader("Allow", "POST,OPTIONS,GET,HEAD,PUT");
                    return response9;
                }
                NanoHTTPD.Response response10 = new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, NanoHTTPD.MIME_PLAINTEXT, "OK");
                response10.addHeader("Access-Control-Allow-Origin", "*");
                response10.addHeader("Access-Control-Allow-Headers", "origin, content-type");
                response10.addHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,HEAD,PUT");
                response10.addHeader("Allow", "POST,OPTIONS,GET,HEAD,PUT");
                return response10;
            }
            Enumeration e4 = header.propertyNames();
            while (e4.hasMoreElements()) {
                String value2 = (String) e4.nextElement();
                Log.d(LOG_TAG, "  HDR: '" + value2 + "' = '" + header.getProperty(value2) + "'");
            }
            Enumeration e5 = parms.propertyNames();
            while (e5.hasMoreElements()) {
                String value3 = (String) e5.nextElement();
                Log.d(LOG_TAG, "  PRM: '" + value3 + "' = '" + parms.getProperty(value3) + "'");
            }
            Enumeration e6 = files.propertyNames();
            if (e6.hasMoreElements()) {
                String fieldname = (String) e6.nextElement();
                String tempLocation = files.getProperty(fieldname);
                String filename2 = parms.getProperty(fieldname);
                if (filename2.startsWith("..") || filename2.endsWith("..") || filename2.indexOf("../") >= 0) {
                    Log.d(LOG_TAG, " Ignoring invalid filename: " + filename2);
                    filename2 = null;
                }
                File fileFrom2 = new File(tempLocation);
                if (filename2 == null) {
                    fileFrom2.delete();
                } else {
                    File fileTo2 = new File(this.rootDir + "/" + filename2);
                    if (!fileFrom2.renameTo(fileTo2)) {
                        copyFile(fileFrom2, fileTo2);
                        fileFrom2.delete();
                    }
                }
                Log.d(LOG_TAG, " UPLOADED: '" + filename2 + "' was at '" + tempLocation + "'");
                NanoHTTPD.Response response11 = new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, NanoHTTPD.MIME_PLAINTEXT, "OK");
                response11.addHeader("Access-Control-Allow-Origin", "*");
                response11.addHeader("Access-Control-Allow-Headers", "origin, content-type");
                response11.addHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,HEAD,PUT");
                response11.addHeader("Allow", "POST,OPTIONS,GET,HEAD,PUT");
                return response11;
            }
            return serveFile(uri, header, this.rootDir, true);
        }
    }

    private void copyFile(File infile, File outfile) {
        try {
            FileInputStream in = new FileInputStream(infile);
            FileOutputStream out = new FileOutputStream(outfile);
            byte[] buffer = new byte[32768];
            while (true) {
                int len = in.read(buffer);
                if (len > 0) {
                    out.write(buffer, 0, len);
                } else {
                    in.close();
                    out.close();
                    return;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private NanoHTTPD.Response processLoadExtensionsRequest(Properties parms) {
        try {
            JSONArray array = new JSONArray(parms.getProperty("extensions", "[]"));
            List<String> extensionsToLoad = new ArrayList<>();
            for (int i = 0; i < array.length(); i++) {
                String extensionName = array.optString(i);
                if (extensionName == null) {
                    return error("Invalid JSON content at index " + i);
                }
                extensionsToLoad.add(extensionName);
            }
            try {
                this.form.loadComponents(extensionsToLoad);
                return message("OK");
            } catch (Exception e) {
                return error((Throwable) e);
            }
        } catch (JSONException e2) {
            return error((Throwable) e2);
        }
    }

    private void adoptMainThreadClassLoader() {
        ClassLoader mainClassLoader = Looper.getMainLooper().getThread().getContextClassLoader();
        Thread myThread = Thread.currentThread();
        if (myThread.getContextClassLoader() != mainClassLoader) {
            myThread.setContextClassLoader(mainClassLoader);
        }
    }

    private NanoHTTPD.Response message(String txt) {
        return addHeaders(new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, NanoHTTPD.MIME_PLAINTEXT, txt));
    }

    private NanoHTTPD.Response json(String json) {
        return addHeaders(new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, MIME_JSON, json));
    }

    private NanoHTTPD.Response error(String msg) {
        JSONObject result = new JSONObject();
        try {
            result.put("status", "BAD");
            result.put("message", msg);
        } catch (JSONException e) {
            Log.wtf(LOG_TAG, "Unable to write basic JSON content", e);
        }
        return addHeaders(new NanoHTTPD.Response(NanoHTTPD.HTTP_OK, MIME_JSON, result.toString()));
    }

    private NanoHTTPD.Response error(Throwable t) {
        return error(t.toString());
    }

    private NanoHTTPD.Response addHeaders(NanoHTTPD.Response res) {
        res.addHeader("Access-Control-Allow-Origin", "*");
        res.addHeader("Access-Control-Allow-Headers", "origin, content-type");
        res.addHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,HEAD,PUT");
        res.addHeader("Allow", "POST,OPTIONS,GET,HEAD,PUT");
        return res;
    }

    public static void setHmacKey(String inputKey) {
        hmacKey = inputKey.getBytes();
        seq = 1;
    }

    private void doPackageUpdate(String inurl) {
        PackageInstaller.doPackageInstall(this.form, inurl);
    }

    public void resetSeq() {
        seq = 1;
    }
}
