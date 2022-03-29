package com.google.appinventor.components.runtime.util;

import android.content.Intent;
import android.provider.Telephony;
import android.telephony.SmsMessage;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class KitkatUtil {
    private KitkatUtil() {
    }

    public static List<SmsMessage> getMessagesFromIntent(Intent intent) {
        List<SmsMessage> result = new ArrayList<>();
        SmsMessage[] messages = Telephony.Sms.Intents.getMessagesFromIntent(intent);
        if (messages != null && messages.length >= 0) {
            Collections.addAll(result, messages);
        }
        return result;
    }
}
