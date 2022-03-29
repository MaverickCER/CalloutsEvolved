package com.google.appinventor.components.runtime;

import android.app.Activity;
import com.google.appinventor.components.annotations.DesignerComponent;
import com.google.appinventor.components.annotations.SimpleEvent;
import com.google.appinventor.components.annotations.SimpleFunction;
import com.google.appinventor.components.annotations.SimpleObject;
import com.google.appinventor.components.annotations.UsesPermissions;
import com.google.appinventor.components.common.ComponentCategory;
import com.google.appinventor.components.common.PropertyTypeConstants;
import com.google.appinventor.components.runtime.util.AsynchUtil;
import com.google.appinventor.components.runtime.util.ErrorMessages;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import org.json.JSONException;
import org.json.JSONObject;

@SimpleObject
@DesignerComponent(category = ComponentCategory.MEDIA, description = "Use this component to translate words and sentences between different languages. This component needs Internet access, as it will request translations to the Yandex.Translate service. Specify the source and target language in the form source-target using two letter language codes. So\"en-es\" will translate from English to Spanish while \"es-ru\" will translate from Spanish to Russian. If you leave out the source language, the service will attempt to detect the source language. So providing just \"es\" will attempt to detect the source language and translate it to Spanish.<p /> This component is powered by the Yandex translation service.  See http://api.yandex.com/translate/ for more information, including the list of available languages and the meanings of the language codes and status codes. <p />Note: Translation happens asynchronously in the background. When the translation is complete, the \"GotTranslation\" event is triggered.", iconName = "images/yandex.png", nonVisible = true, version = 1)
@UsesPermissions(permissionNames = "android.permission.INTERNET")
public final class YandexTranslate extends AndroidNonvisibleComponent {
    public static final String YANDEX_TRANSLATE_SERVICE_URL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=";
    private final Activity activity;
    private final String yandexKey = "";

    public YandexTranslate(ComponentContainer container) {
        super(container.$form());
        this.form.setYandexTranslateTagline();
        this.activity = container.$context();
    }

    @SimpleFunction(description = "By providing a target language to translate to (for instance, 'es' for Spanish, 'en' for English, or 'ru' for Russian), and a word or sentence to translate, this method will request a translation to the Yandex.Translate service.\nOnce the text is translated by the external service, the event GotTranslation will be executed.\nNote: Yandex.Translate will attempt to detect the source language. You can also specify prepending it to the language translation. I.e., es-ru will specify Spanish to Russian translation.")
    public void RequestTranslation(final String languageToTranslateTo, final String textToTranslate) {
        if (this.yandexKey.equals("")) {
            this.form.dispatchErrorOccurredEvent(this, "RequestTranslation", ErrorMessages.ERROR_TRANSLATE_NO_KEY_FOUND, new Object[0]);
        } else {
            AsynchUtil.runAsynchronously(new Runnable() {
                public void run() {
                    try {
                        YandexTranslate.this.performRequest(languageToTranslateTo, textToTranslate);
                    } catch (IOException e) {
                        YandexTranslate.this.form.dispatchErrorOccurredEvent(YandexTranslate.this, "RequestTranslation", ErrorMessages.ERROR_TRANSLATE_SERVICE_NOT_AVAILABLE, new Object[0]);
                    } catch (JSONException e2) {
                        YandexTranslate.this.form.dispatchErrorOccurredEvent(YandexTranslate.this, "RequestTranslation", ErrorMessages.ERROR_TRANSLATE_JSON_RESPONSE, new Object[0]);
                    }
                }
            });
        }
    }

    /* access modifiers changed from: private */
    public void performRequest(String languageToTranslateTo, String textToTranslate) throws IOException, JSONException {
        HttpURLConnection connection = (HttpURLConnection) new URL(YANDEX_TRANSLATE_SERVICE_URL + this.yandexKey + "&lang=" + languageToTranslateTo + "&text=" + URLEncoder.encode(textToTranslate, "UTF-8")).openConnection();
        if (connection != null) {
            try {
                JSONObject jsonResponse = new JSONObject(getResponseContent(connection));
                final String responseCode = jsonResponse.getString("code");
                final String translation = (String) jsonResponse.getJSONArray(PropertyTypeConstants.PROPERTY_TYPE_TEXT).get(0);
                this.activity.runOnUiThread(new Runnable() {
                    public void run() {
                        YandexTranslate.this.GotTranslation(responseCode, translation);
                    }
                });
            } finally {
                connection.disconnect();
            }
        }
    }

    private static String getResponseContent(HttpURLConnection connection) throws IOException {
        String encoding = connection.getContentEncoding();
        if (encoding == null) {
            encoding = "UTF-8";
        }
        InputStreamReader reader = new InputStreamReader(connection.getInputStream(), encoding);
        try {
            int contentLength = connection.getContentLength();
            StringBuilder sb = contentLength != -1 ? new StringBuilder(contentLength) : new StringBuilder();
            char[] buf = new char[1024];
            while (true) {
                int read = reader.read(buf);
                if (read == -1) {
                    return sb.toString();
                }
                sb.append(buf, 0, read);
            }
        } finally {
            reader.close();
        }
    }

    @SimpleEvent(description = "Event triggered when the Yandex.Translate service returns the translated text. This event also provides a response code for error handling. If the responseCode is not 200, then something went wrong with the call, and the translation will not be available.")
    public void GotTranslation(String responseCode, String translation) {
        EventDispatcher.dispatchEvent(this, "GotTranslation", responseCode, translation);
    }
}
