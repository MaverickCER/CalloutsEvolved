package com.google.appinventor.common.version;

public final class GitBuildId {
    public static final String ACRA_URI = "${acra.uri}";
    public static final String ANT_BUILD_DATE = "June 14 2017";
    public static final String GIT_BUILD_FINGERPRINT = "bdfc0a5f34b0da0f092b2d9712fdd4d466e3e050";
    public static final String GIT_BUILD_VERSION = "nls-1048-gbdfc0a5f";

    private GitBuildId() {
    }

    public static String getVersion() {
        if (GIT_BUILD_VERSION == "" || GIT_BUILD_VERSION.contains(" ")) {
            return "none";
        }
        return GIT_BUILD_VERSION;
    }

    public static String getFingerprint() {
        return GIT_BUILD_FINGERPRINT;
    }

    public static String getDate() {
        return ANT_BUILD_DATE;
    }

    public static String getAcraUri() {
        if (ACRA_URI.equals(ACRA_URI)) {
            return "";
        }
        return ACRA_URI.trim();
    }
}
