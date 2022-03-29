package com.google.appinventor.components.runtime.util;

import android.util.Log;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class RetValManager {
    private static final String LOG_TAG = "RetValManager";
    private static final long TENSECONDS = 10000;
    private static ArrayList<JSONObject> currentArray = new ArrayList<>(10);
    private static final Object semaphore = new Object();

    private RetValManager() {
    }

    /* JADX WARNING: No exception handlers in catch block: Catch:{  } */
    /* Code decompiled incorrectly, please refer to instructions dump. */
    public static void appendReturnValue(java.lang.String r6, java.lang.String r7, java.lang.String r8) {
        /*
            java.lang.Object r4 = semaphore
            monitor-enter(r4)
            org.json.JSONObject r1 = new org.json.JSONObject     // Catch:{ all -> 0x003c }
            r1.<init>()     // Catch:{ all -> 0x003c }
            java.lang.String r3 = "status"
            r1.put(r3, r7)     // Catch:{ JSONException -> 0x0032 }
            java.lang.String r3 = "type"
            java.lang.String r5 = "return"
            r1.put(r3, r5)     // Catch:{ JSONException -> 0x0032 }
            java.lang.String r3 = "value"
            r1.put(r3, r8)     // Catch:{ JSONException -> 0x0032 }
            java.lang.String r3 = "blockid"
            r1.put(r3, r6)     // Catch:{ JSONException -> 0x0032 }
            java.util.ArrayList<org.json.JSONObject> r3 = currentArray     // Catch:{ all -> 0x003c }
            boolean r2 = r3.isEmpty()     // Catch:{ all -> 0x003c }
            java.util.ArrayList<org.json.JSONObject> r3 = currentArray     // Catch:{ all -> 0x003c }
            r3.add(r1)     // Catch:{ all -> 0x003c }
            if (r2 == 0) goto L_0x0030
            java.lang.Object r3 = semaphore     // Catch:{ all -> 0x003c }
            r3.notifyAll()     // Catch:{ all -> 0x003c }
        L_0x0030:
            monitor-exit(r4)     // Catch:{ all -> 0x003c }
        L_0x0031:
            return
        L_0x0032:
            r0 = move-exception
            java.lang.String r3 = "RetValManager"
            java.lang.String r5 = "Error building retval"
            android.util.Log.e(r3, r5, r0)     // Catch:{ all -> 0x003c }
            monitor-exit(r4)     // Catch:{ all -> 0x003c }
            goto L_0x0031
        L_0x003c:
            r3 = move-exception
            monitor-exit(r4)     // Catch:{ all -> 0x003c }
            throw r3
        */
        throw new UnsupportedOperationException("Method not decompiled: com.google.appinventor.components.runtime.util.RetValManager.appendReturnValue(java.lang.String, java.lang.String, java.lang.String):void");
    }

    /* JADX WARNING: No exception handlers in catch block: Catch:{  } */
    /* Code decompiled incorrectly, please refer to instructions dump. */
    public static void sendError(java.lang.String r6) {
        /*
            java.lang.Object r4 = semaphore
            monitor-enter(r4)
            org.json.JSONObject r1 = new org.json.JSONObject     // Catch:{ all -> 0x0039 }
            r1.<init>()     // Catch:{ all -> 0x0039 }
            java.lang.String r3 = "status"
            java.lang.String r5 = "OK"
            r1.put(r3, r5)     // Catch:{ JSONException -> 0x002f }
            java.lang.String r3 = "type"
            java.lang.String r5 = "error"
            r1.put(r3, r5)     // Catch:{ JSONException -> 0x002f }
            java.lang.String r3 = "value"
            r1.put(r3, r6)     // Catch:{ JSONException -> 0x002f }
            java.util.ArrayList<org.json.JSONObject> r3 = currentArray     // Catch:{ all -> 0x0039 }
            boolean r2 = r3.isEmpty()     // Catch:{ all -> 0x0039 }
            java.util.ArrayList<org.json.JSONObject> r3 = currentArray     // Catch:{ all -> 0x0039 }
            r3.add(r1)     // Catch:{ all -> 0x0039 }
            if (r2 == 0) goto L_0x002d
            java.lang.Object r3 = semaphore     // Catch:{ all -> 0x0039 }
            r3.notifyAll()     // Catch:{ all -> 0x0039 }
        L_0x002d:
            monitor-exit(r4)     // Catch:{ all -> 0x0039 }
        L_0x002e:
            return
        L_0x002f:
            r0 = move-exception
            java.lang.String r3 = "RetValManager"
            java.lang.String r5 = "Error building retval"
            android.util.Log.e(r3, r5, r0)     // Catch:{ all -> 0x0039 }
            monitor-exit(r4)     // Catch:{ all -> 0x0039 }
            goto L_0x002e
        L_0x0039:
            r3 = move-exception
            monitor-exit(r4)     // Catch:{ all -> 0x0039 }
            throw r3
        */
        throw new UnsupportedOperationException("Method not decompiled: com.google.appinventor.components.runtime.util.RetValManager.sendError(java.lang.String):void");
    }

    /* JADX WARNING: No exception handlers in catch block: Catch:{  } */
    /* Code decompiled incorrectly, please refer to instructions dump. */
    public static void pushScreen(java.lang.String r6, java.lang.Object r7) {
        /*
            java.lang.Object r4 = semaphore
            monitor-enter(r4)
            org.json.JSONObject r1 = new org.json.JSONObject     // Catch:{ all -> 0x0044 }
            r1.<init>()     // Catch:{ all -> 0x0044 }
            java.lang.String r3 = "status"
            java.lang.String r5 = "OK"
            r1.put(r3, r5)     // Catch:{ JSONException -> 0x003a }
            java.lang.String r3 = "type"
            java.lang.String r5 = "pushScreen"
            r1.put(r3, r5)     // Catch:{ JSONException -> 0x003a }
            java.lang.String r3 = "screen"
            r1.put(r3, r6)     // Catch:{ JSONException -> 0x003a }
            if (r7 == 0) goto L_0x0026
            java.lang.String r3 = "value"
            java.lang.String r5 = r7.toString()     // Catch:{ JSONException -> 0x003a }
            r1.put(r3, r5)     // Catch:{ JSONException -> 0x003a }
        L_0x0026:
            java.util.ArrayList<org.json.JSONObject> r3 = currentArray     // Catch:{ all -> 0x0044 }
            boolean r2 = r3.isEmpty()     // Catch:{ all -> 0x0044 }
            java.util.ArrayList<org.json.JSONObject> r3 = currentArray     // Catch:{ all -> 0x0044 }
            r3.add(r1)     // Catch:{ all -> 0x0044 }
            if (r2 == 0) goto L_0x0038
            java.lang.Object r3 = semaphore     // Catch:{ all -> 0x0044 }
            r3.notifyAll()     // Catch:{ all -> 0x0044 }
        L_0x0038:
            monitor-exit(r4)     // Catch:{ all -> 0x0044 }
        L_0x0039:
            return
        L_0x003a:
            r0 = move-exception
            java.lang.String r3 = "RetValManager"
            java.lang.String r5 = "Error building retval"
            android.util.Log.e(r3, r5, r0)     // Catch:{ all -> 0x0044 }
            monitor-exit(r4)     // Catch:{ all -> 0x0044 }
            goto L_0x0039
        L_0x0044:
            r3 = move-exception
            monitor-exit(r4)     // Catch:{ all -> 0x0044 }
            throw r3
        */
        throw new UnsupportedOperationException("Method not decompiled: com.google.appinventor.components.runtime.util.RetValManager.pushScreen(java.lang.String, java.lang.Object):void");
    }

    /* JADX WARNING: No exception handlers in catch block: Catch:{  } */
    /* Code decompiled incorrectly, please refer to instructions dump. */
    public static void popScreen(java.lang.String r6) {
        /*
            java.lang.Object r4 = semaphore
            monitor-enter(r4)
            org.json.JSONObject r1 = new org.json.JSONObject     // Catch:{ all -> 0x003f }
            r1.<init>()     // Catch:{ all -> 0x003f }
            java.lang.String r3 = "status"
            java.lang.String r5 = "OK"
            r1.put(r3, r5)     // Catch:{ JSONException -> 0x0035 }
            java.lang.String r3 = "type"
            java.lang.String r5 = "popScreen"
            r1.put(r3, r5)     // Catch:{ JSONException -> 0x0035 }
            if (r6 == 0) goto L_0x0021
            java.lang.String r3 = "value"
            java.lang.String r5 = r6.toString()     // Catch:{ JSONException -> 0x0035 }
            r1.put(r3, r5)     // Catch:{ JSONException -> 0x0035 }
        L_0x0021:
            java.util.ArrayList<org.json.JSONObject> r3 = currentArray     // Catch:{ all -> 0x003f }
            boolean r2 = r3.isEmpty()     // Catch:{ all -> 0x003f }
            java.util.ArrayList<org.json.JSONObject> r3 = currentArray     // Catch:{ all -> 0x003f }
            r3.add(r1)     // Catch:{ all -> 0x003f }
            if (r2 == 0) goto L_0x0033
            java.lang.Object r3 = semaphore     // Catch:{ all -> 0x003f }
            r3.notifyAll()     // Catch:{ all -> 0x003f }
        L_0x0033:
            monitor-exit(r4)     // Catch:{ all -> 0x003f }
        L_0x0034:
            return
        L_0x0035:
            r0 = move-exception
            java.lang.String r3 = "RetValManager"
            java.lang.String r5 = "Error building retval"
            android.util.Log.e(r3, r5, r0)     // Catch:{ all -> 0x003f }
            monitor-exit(r4)     // Catch:{ all -> 0x003f }
            goto L_0x0034
        L_0x003f:
            r3 = move-exception
            monitor-exit(r4)     // Catch:{ all -> 0x003f }
            throw r3
        */
        throw new UnsupportedOperationException("Method not decompiled: com.google.appinventor.components.runtime.util.RetValManager.popScreen(java.lang.String):void");
    }

    public static String fetch(boolean block) {
        String str;
        long startTime = System.currentTimeMillis();
        synchronized (semaphore) {
            while (currentArray.isEmpty() && block && System.currentTimeMillis() - startTime <= 9900) {
                try {
                    semaphore.wait(TENSECONDS);
                } catch (InterruptedException e) {
                }
            }
            JSONArray arrayoutput = new JSONArray(currentArray);
            JSONObject output = new JSONObject();
            try {
                output.put("status", "OK");
                output.put("values", arrayoutput);
                currentArray.clear();
                str = output.toString();
            } catch (JSONException e2) {
                Log.e(LOG_TAG, "Error fetching retvals", e2);
                str = "{\"status\" : \"BAD\", \"message\" : \"Failure in RetValManager\"}";
            }
        }
        return str;
    }
}
