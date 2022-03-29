package com.google.appinventor.components.runtime;

import android.util.Log;
import com.google.appinventor.components.annotations.DesignerComponent;
import com.google.appinventor.components.annotations.SimpleFunction;
import com.google.appinventor.components.annotations.SimpleObject;
import com.google.appinventor.components.annotations.UsesPermissions;
import com.google.appinventor.components.common.ComponentCategory;
import com.google.appinventor.components.runtime.util.ErrorMessages;
import com.google.appinventor.components.runtime.util.Ev3Constants;
import com.google.appinventor.components.runtime.util.MediaUtil;
import com.google.appinventor.components.runtime.util.YailList;
import gnu.kawa.servlet.HttpRequestContext;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@SimpleObject
@DesignerComponent(category = ComponentCategory.LEGOMINDSTORMS, description = "A component that provides a low-level interface to a LEGO MINDSTORMS NXT robot, with functions to send NXT Direct Commands.", iconName = "images/legoMindstormsNxt.png", nonVisible = true, version = 1)
@UsesPermissions(permissionNames = "android.permission.INTERNET,android.permission.WRITE_EXTERNAL_STORAGE,android.permission.READ_EXTERNAL_STORAGE")
public class NxtDirectCommands extends LegoMindstormsNxtBase {
    public NxtDirectCommands(ComponentContainer container) {
        super(container, "NxtDirectCommands");
    }

    @SimpleFunction(description = "Start execution of a previously downloaded program on the robot.")
    public void StartProgram(String programName) {
        if (checkBluetooth("StartProgram")) {
            if (programName.length() == 0) {
                this.form.dispatchErrorOccurredEvent(this, "StartProgram", ErrorMessages.ERROR_NXT_INVALID_PROGRAM_NAME, new Object[0]);
                return;
            }
            if (programName.indexOf(".") == -1) {
                programName = programName + ".rxe";
            }
            byte[] command = new byte[22];
            command[0] = Byte.MIN_VALUE;
            command[1] = 0;
            copyStringValueToBytes(programName, command, 2, 19);
            sendCommand("StartProgram", command);
        }
    }

    @SimpleFunction(description = "Stop execution of the currently running program on the robot.")
    public void StopProgram() {
        if (checkBluetooth("StopProgram")) {
            sendCommand("StopProgram", new byte[]{Byte.MIN_VALUE, 1});
        }
    }

    @SimpleFunction(description = "Play a sound file on the robot.")
    public void PlaySoundFile(String fileName) {
        if (checkBluetooth("PlaySoundFile")) {
            if (fileName.length() == 0) {
                this.form.dispatchErrorOccurredEvent(this, "PlaySoundFile", ErrorMessages.ERROR_NXT_INVALID_FILE_NAME, new Object[0]);
                return;
            }
            if (fileName.indexOf(".") == -1) {
                fileName = fileName + ".rso";
            }
            byte[] command = new byte[23];
            command[0] = Byte.MIN_VALUE;
            command[1] = 2;
            copyBooleanValueToBytes(false, command, 2);
            copyStringValueToBytes(fileName, command, 3, 19);
            sendCommand("PlaySoundFile", command);
        }
    }

    @SimpleFunction(description = "Make the robot play a tone.")
    public void PlayTone(int frequencyHz, int durationMs) {
        if (checkBluetooth("PlayTone")) {
            if (frequencyHz < 200) {
                Log.w(this.logTag, "frequencyHz " + frequencyHz + " is invalid, using 200.");
                frequencyHz = HttpRequestContext.HTTP_OK;
            }
            if (frequencyHz > 14000) {
                Log.w(this.logTag, "frequencyHz " + frequencyHz + " is invalid, using 14000.");
                frequencyHz = 14000;
            }
            byte[] command = new byte[6];
            command[0] = Byte.MIN_VALUE;
            command[1] = 3;
            copyUWORDValueToBytes(frequencyHz, command, 2);
            copyUWORDValueToBytes(durationMs, command, 4);
            sendCommand("PlayTone", command);
        }
    }

    @SimpleFunction(description = "Sets the output state of a motor on the robot.")
    public void SetOutputState(String motorPortLetter, int power, int mode, int regulationMode, int turnRatio, int runState, long tachoLimit) {
        if (checkBluetooth("SetOutputState")) {
            try {
                setOutputState("SetOutputState", convertMotorPortLetterToNumber(motorPortLetter), power, mode, regulationMode, sanitizeTurnRatio(turnRatio), runState, tachoLimit);
            } catch (IllegalArgumentException e) {
                this.form.dispatchErrorOccurredEvent(this, "SetOutputState", ErrorMessages.ERROR_NXT_INVALID_MOTOR_PORT, motorPortLetter);
            }
        }
    }

    @SimpleFunction(description = "Configure an input sensor on the robot.")
    public void SetInputMode(String sensorPortLetter, int sensorType, int sensorMode) {
        if (checkBluetooth("SetInputMode")) {
            try {
                setInputMode("SetInputMode", convertSensorPortLetterToNumber(sensorPortLetter), sensorType, sensorMode);
            } catch (IllegalArgumentException e) {
                this.form.dispatchErrorOccurredEvent(this, "SetInputMode", ErrorMessages.ERROR_NXT_INVALID_SENSOR_PORT, sensorPortLetter);
            }
        }
    }

    @SimpleFunction(description = "Reads the output state of a motor on the robot.")
    public List<Number> GetOutputState(String motorPortLetter) {
        if (!checkBluetooth("GetOutputState")) {
            return new ArrayList();
        }
        try {
            byte[] returnPackage = getOutputState("GetOutputState", convertMotorPortLetterToNumber(motorPortLetter));
            if (returnPackage == null) {
                return new ArrayList();
            }
            List<Number> outputState = new ArrayList<>();
            outputState.add(Integer.valueOf(getSBYTEValueFromBytes(returnPackage, 4)));
            outputState.add(Integer.valueOf(getUBYTEValueFromBytes(returnPackage, 5)));
            outputState.add(Integer.valueOf(getUBYTEValueFromBytes(returnPackage, 6)));
            outputState.add(Integer.valueOf(getSBYTEValueFromBytes(returnPackage, 7)));
            outputState.add(Integer.valueOf(getUBYTEValueFromBytes(returnPackage, 8)));
            outputState.add(Long.valueOf(getULONGValueFromBytes(returnPackage, 9)));
            outputState.add(Integer.valueOf(getSLONGValueFromBytes(returnPackage, 13)));
            outputState.add(Integer.valueOf(getSLONGValueFromBytes(returnPackage, 17)));
            outputState.add(Integer.valueOf(getSLONGValueFromBytes(returnPackage, 21)));
            return outputState;
        } catch (IllegalArgumentException e) {
            this.form.dispatchErrorOccurredEvent(this, "GetOutputState", ErrorMessages.ERROR_NXT_INVALID_MOTOR_PORT, motorPortLetter);
            return new ArrayList();
        }
    }

    private byte[] getOutputState(String functionName, int port) {
        byte[] command = new byte[3];
        command[0] = 0;
        command[1] = 6;
        copyUBYTEValueToBytes(port, command, 2);
        byte[] returnPackage = sendCommandAndReceiveReturnPackage(functionName, command);
        if (evaluateStatus(functionName, returnPackage, command[1])) {
            if (returnPackage.length == 25) {
                return returnPackage;
            }
            Log.w(this.logTag, functionName + ": unexpected return package length " + returnPackage.length + " (expected 25)");
        }
        return null;
    }

    @SimpleFunction(description = "Reads the values of an input sensor on the robot. Assumes sensor type has been configured via SetInputMode.")
    public List<Object> GetInputValues(String sensorPortLetter) {
        if (!checkBluetooth("GetInputValues")) {
            return new ArrayList();
        }
        try {
            byte[] returnPackage = getInputValues("GetInputValues", convertSensorPortLetterToNumber(sensorPortLetter));
            if (returnPackage == null) {
                return new ArrayList();
            }
            List<Object> inputValues = new ArrayList<>();
            inputValues.add(Boolean.valueOf(getBooleanValueFromBytes(returnPackage, 4)));
            inputValues.add(Boolean.valueOf(getBooleanValueFromBytes(returnPackage, 5)));
            inputValues.add(Integer.valueOf(getUBYTEValueFromBytes(returnPackage, 6)));
            inputValues.add(Integer.valueOf(getUBYTEValueFromBytes(returnPackage, 7)));
            inputValues.add(Integer.valueOf(getUWORDValueFromBytes(returnPackage, 8)));
            inputValues.add(Integer.valueOf(getUWORDValueFromBytes(returnPackage, 10)));
            inputValues.add(Integer.valueOf(getSWORDValueFromBytes(returnPackage, 12)));
            inputValues.add(Integer.valueOf(getSWORDValueFromBytes(returnPackage, 14)));
            return inputValues;
        } catch (IllegalArgumentException e) {
            this.form.dispatchErrorOccurredEvent(this, "GetInputValues", ErrorMessages.ERROR_NXT_INVALID_SENSOR_PORT, sensorPortLetter);
            return new ArrayList();
        }
    }

    @SimpleFunction(description = "Reset the scaled value of an input sensor on the robot.")
    public void ResetInputScaledValue(String sensorPortLetter) {
        if (checkBluetooth("ResetInputScaledValue")) {
            try {
                int port = convertSensorPortLetterToNumber(sensorPortLetter);
                resetInputScaledValue("ResetInputScaledValue", port);
                byte[] command = new byte[3];
                command[0] = Byte.MIN_VALUE;
                command[1] = 8;
                copyUBYTEValueToBytes(port, command, 2);
                sendCommand("ResetInputScaledValue", command);
            } catch (IllegalArgumentException e) {
                this.form.dispatchErrorOccurredEvent(this, "ResetInputScaledValue", ErrorMessages.ERROR_NXT_INVALID_SENSOR_PORT, sensorPortLetter);
            }
        }
    }

    @SimpleFunction(description = "Write a message to a mailbox (1-10) on the robot.")
    public void MessageWrite(int mailbox, String message) {
        if (checkBluetooth("MessageWrite")) {
            if (mailbox < 1 || mailbox > 10) {
                this.form.dispatchErrorOccurredEvent(this, "MessageWrite", ErrorMessages.ERROR_NXT_INVALID_MAILBOX, Integer.valueOf(mailbox));
                return;
            }
            int messageLength = message.length();
            if (messageLength > 58) {
                this.form.dispatchErrorOccurredEvent(this, "MessageWrite", ErrorMessages.ERROR_NXT_MESSAGE_TOO_LONG, new Object[0]);
                return;
            }
            byte[] command = new byte[(messageLength + 4 + 1)];
            command[0] = Byte.MIN_VALUE;
            command[1] = 9;
            copyUBYTEValueToBytes(mailbox - 1, command, 2);
            copyUBYTEValueToBytes(messageLength + 1, command, 3);
            copyStringValueToBytes(message, command, 4, messageLength);
            sendCommand("MessageWrite", command);
        }
    }

    @SimpleFunction(description = "Reset motor position.")
    public void ResetMotorPosition(String motorPortLetter, boolean relative) {
        if (checkBluetooth("ResetMotorPosition")) {
            try {
                int port = convertMotorPortLetterToNumber(motorPortLetter);
                byte[] command = new byte[4];
                command[0] = Byte.MIN_VALUE;
                command[1] = 10;
                copyUBYTEValueToBytes(port, command, 2);
                copyBooleanValueToBytes(relative, command, 3);
                sendCommand("ResetMotorPosition", command);
            } catch (IllegalArgumentException e) {
                this.form.dispatchErrorOccurredEvent(this, "ResetMotorPosition", ErrorMessages.ERROR_NXT_INVALID_MOTOR_PORT, motorPortLetter);
            }
        }
    }

    @SimpleFunction(description = "Get the battery level for the robot. Returns the voltage in millivolts.")
    public int GetBatteryLevel() {
        if (!checkBluetooth("GetBatteryLevel")) {
            return 0;
        }
        byte[] command = {0, 11};
        byte[] returnPackage = sendCommandAndReceiveReturnPackage("GetBatteryLevel", command);
        if (!evaluateStatus("GetBatteryLevel", returnPackage, command[1])) {
            return 0;
        }
        if (returnPackage.length == 5) {
            return getUWORDValueFromBytes(returnPackage, 3);
        }
        Log.w(this.logTag, "GetBatteryLevel: unexpected return package length " + returnPackage.length + " (expected 5)");
        return 0;
    }

    @SimpleFunction(description = "Stop sound playback.")
    public void StopSoundPlayback() {
        if (checkBluetooth("StopSoundPlayback")) {
            sendCommand("StopSoundPlayback", new byte[]{Byte.MIN_VALUE, 12});
        }
    }

    @SimpleFunction(description = "Keep Alive. Returns the current sleep time limit in milliseconds.")
    public long KeepAlive() {
        if (!checkBluetooth("KeepAlive")) {
            return 0;
        }
        byte[] command = {0, 13};
        byte[] returnPackage = sendCommandAndReceiveReturnPackage("KeepAlive", command);
        if (!evaluateStatus("KeepAlive", returnPackage, command[1])) {
            return 0;
        }
        if (returnPackage.length == 7) {
            return getULONGValueFromBytes(returnPackage, 3);
        }
        Log.w(this.logTag, "KeepAlive: unexpected return package length " + returnPackage.length + " (expected 7)");
        return 0;
    }

    @SimpleFunction(description = "Returns the count of available bytes to read.")
    public int LsGetStatus(String sensorPortLetter) {
        if (!checkBluetooth("LsGetStatus")) {
            return 0;
        }
        try {
            return lsGetStatus("LsGetStatus", convertSensorPortLetterToNumber(sensorPortLetter));
        } catch (IllegalArgumentException e) {
            this.form.dispatchErrorOccurredEvent(this, "LsGetStatus", ErrorMessages.ERROR_NXT_INVALID_SENSOR_PORT, sensorPortLetter);
            return 0;
        }
    }

    @SimpleFunction(description = "Writes low speed data to an input sensor on the robot. Assumes sensor type has been configured via SetInputMode.")
    public void LsWrite(String sensorPortLetter, YailList list, int rxDataLength) {
        if (checkBluetooth("LsWrite")) {
            try {
                int port = convertSensorPortLetterToNumber(sensorPortLetter);
                if (list.size() > 16) {
                    this.form.dispatchErrorOccurredEvent(this, "LsWrite", ErrorMessages.ERROR_NXT_DATA_TOO_LARGE, new Object[0]);
                    return;
                }
                Object[] array = list.toArray();
                byte[] bytes = new byte[array.length];
                int i = 0;
                while (i < array.length) {
                    try {
                        int n = Integer.decode(array[i].toString()).intValue();
                        bytes[i] = (byte) (n & 255);
                        int n2 = n >> 8;
                        if (n2 == 0 || n2 == -1) {
                            i++;
                        } else {
                            this.form.dispatchErrorOccurredEvent(this, "LsWrite", ErrorMessages.ERROR_NXT_COULD_NOT_FIT_ELEMENT_IN_BYTE, Integer.valueOf(i + 1));
                            return;
                        }
                    } catch (NumberFormatException e) {
                        this.form.dispatchErrorOccurredEvent(this, "LsWrite", ErrorMessages.ERROR_NXT_COULD_NOT_DECODE_ELEMENT, Integer.valueOf(i + 1));
                        return;
                    }
                }
                lsWrite("LsWrite", port, bytes, rxDataLength);
            } catch (IllegalArgumentException e2) {
                this.form.dispatchErrorOccurredEvent(this, "LsWrite", ErrorMessages.ERROR_NXT_INVALID_SENSOR_PORT, sensorPortLetter);
            }
        }
    }

    @SimpleFunction(description = "Reads unsigned low speed data from an input sensor on the robot. Assumes sensor type has been configured via SetInputMode.")
    public List<Integer> LsRead(String sensorPortLetter) {
        if (!checkBluetooth("LsRead")) {
            return new ArrayList();
        }
        try {
            byte[] returnPackage = lsRead("LsRead", convertSensorPortLetterToNumber(sensorPortLetter));
            if (returnPackage == null) {
                return new ArrayList();
            }
            List<Integer> list = new ArrayList<>();
            int count = getUBYTEValueFromBytes(returnPackage, 3);
            for (int i = 0; i < count; i++) {
                list.add(Integer.valueOf(returnPackage[i + 4] & 255));
            }
            return list;
        } catch (IllegalArgumentException e) {
            this.form.dispatchErrorOccurredEvent(this, "LsRead", ErrorMessages.ERROR_NXT_INVALID_SENSOR_PORT, sensorPortLetter);
            return new ArrayList();
        }
    }

    @SimpleFunction(description = "Get the name of currently running program on the robot.")
    public String GetCurrentProgramName() {
        if (!checkBluetooth("GetCurrentProgramName")) {
            return "";
        }
        byte[] command = {0, 17};
        byte[] returnPackage = sendCommandAndReceiveReturnPackage("GetCurrentProgramName", command);
        int status = getStatus("GetCurrentProgramName", returnPackage, command[1]);
        if (status == 0) {
            return getStringValueFromBytes(returnPackage, 3);
        }
        if (status == 236) {
            return "";
        }
        evaluateStatus("GetCurrentProgramName", returnPackage, command[1]);
        return "";
    }

    @SimpleFunction(description = "Read a message from a mailbox (1-10) on the robot.")
    public String MessageRead(int mailbox) {
        if (!checkBluetooth("MessageRead")) {
            return "";
        }
        if (mailbox < 1 || mailbox > 10) {
            this.form.dispatchErrorOccurredEvent(this, "MessageRead", ErrorMessages.ERROR_NXT_INVALID_MAILBOX, Integer.valueOf(mailbox));
            return "";
        }
        int mailbox2 = mailbox - 1;
        byte[] command = new byte[5];
        command[0] = 0;
        command[1] = 19;
        copyUBYTEValueToBytes(0, command, 2);
        copyUBYTEValueToBytes(mailbox2, command, 3);
        copyBooleanValueToBytes(true, command, 4);
        byte[] returnPackage = sendCommandAndReceiveReturnPackage("MessageRead", command);
        if (evaluateStatus("MessageRead", returnPackage, command[1])) {
            if (returnPackage.length == 64) {
                int mailboxEcho = getUBYTEValueFromBytes(returnPackage, 3);
                if (mailboxEcho != mailbox2) {
                    Log.w(this.logTag, "MessageRead: unexpected return mailbox: " + mailboxEcho + " (expected " + mailbox2 + ")");
                }
                return getStringValueFromBytes(returnPackage, 5, getUBYTEValueFromBytes(returnPackage, 4) - 1);
            }
            Log.w(this.logTag, "MessageRead: unexpected return package length " + returnPackage.length + " (expected 64)");
        }
        return "";
    }

    @SimpleFunction(description = "Download a file to the robot.")
    public void DownloadFile(String source, String destination) {
        Integer handle;
        if (checkBluetooth("DownloadFile")) {
            if (source.length() == 0) {
                this.form.dispatchErrorOccurredEvent(this, "DownloadFile", ErrorMessages.ERROR_NXT_INVALID_SOURCE_ARGUMENT, new Object[0]);
            } else if (destination.length() == 0) {
                this.form.dispatchErrorOccurredEvent(this, "DownloadFile", ErrorMessages.ERROR_NXT_INVALID_DESTINATION_ARGUMENT, new Object[0]);
            } else {
                try {
                    File tempFile = MediaUtil.copyMediaToTempFile(this.form, source);
                    try {
                        InputStream in = new BufferedInputStream(new FileInputStream(tempFile), 1024);
                        try {
                            long fileSize = tempFile.length();
                            handle = (destination.endsWith(".rxe") || destination.endsWith(".ric")) ? openWriteLinear("DownloadFile", destination, fileSize) : openWrite("DownloadFile", destination, fileSize);
                            if (handle == null) {
                                in.close();
                                return;
                            }
                            byte[] buffer = new byte[32];
                            long sentLength = 0;
                            while (sentLength < fileSize) {
                                int chunkLength = (int) Math.min(32, fileSize - sentLength);
                                in.read(buffer, 0, chunkLength);
                                sentLength += (long) writeChunk("DownloadFile", handle.intValue(), buffer, chunkLength);
                            }
                            closeHandle("DownloadFile", handle.intValue());
                            in.close();
                            tempFile.delete();
                        } catch (Throwable th) {
                            in.close();
                            throw th;
                        }
                    } finally {
                        tempFile.delete();
                    }
                } catch (IOException e) {
                    this.form.dispatchErrorOccurredEvent(this, "DownloadFile", ErrorMessages.ERROR_NXT_UNABLE_TO_DOWNLOAD_FILE, e.getMessage());
                }
            }
        }
    }

    private Integer openWrite(String functionName, String fileName, long fileSize) {
        byte[] command = new byte[26];
        command[0] = 1;
        command[1] = -127;
        copyStringValueToBytes(fileName, command, 2, 19);
        copyULONGValueToBytes(fileSize, command, 22);
        byte[] returnPackage = sendCommandAndReceiveReturnPackage(functionName, command);
        if (evaluateStatus(functionName, returnPackage, command[1])) {
            if (returnPackage.length == 4) {
                return Integer.valueOf(getUBYTEValueFromBytes(returnPackage, 3));
            }
            Log.w(this.logTag, functionName + ": unexpected return package length " + returnPackage.length + " (expected 4)");
        }
        return null;
    }

    private int writeChunk(String functionName, int handle, byte[] buffer, int length) throws IOException {
        int writtenLength = 0;
        if (length > 32) {
            throw new IllegalArgumentException("length must be <= 32");
        }
        byte[] command = new byte[(length + 3)];
        command[0] = 1;
        command[1] = Ev3Constants.Opcode.UI_BUTTON;
        copyUBYTEValueToBytes(handle, command, 2);
        System.arraycopy(buffer, 0, command, 3, length);
        byte[] returnPackage = sendCommandAndReceiveReturnPackage(functionName, command);
        if (evaluateStatus(functionName, returnPackage, command[1])) {
            if (returnPackage.length == 6) {
                writtenLength = getUWORDValueFromBytes(returnPackage, 4);
                if (writtenLength != length) {
                    Log.e(this.logTag, functionName + ": only " + writtenLength + " bytes were written " + "(expected " + length + ")");
                    throw new IOException("Unable to write file on robot");
                }
            } else {
                Log.w(this.logTag, functionName + ": unexpected return package length " + returnPackage.length + " (expected 6)");
            }
        }
        return writtenLength;
    }

    private void closeHandle(String functionName, int handle) {
        byte[] command = new byte[3];
        command[0] = 1;
        command[1] = Ev3Constants.Opcode.UI_DRAW;
        copyUBYTEValueToBytes(handle, command, 2);
        evaluateStatus(functionName, sendCommandAndReceiveReturnPackage(functionName, command), command[1]);
    }

    @SimpleFunction(description = "Delete a file on the robot.")
    public void DeleteFile(String fileName) {
        if (checkBluetooth("DeleteFile")) {
            if (fileName.length() == 0) {
                this.form.dispatchErrorOccurredEvent(this, "DeleteFile", ErrorMessages.ERROR_NXT_INVALID_FILE_NAME, new Object[0]);
                return;
            }
            byte[] command = new byte[22];
            command[0] = 1;
            command[1] = Ev3Constants.Opcode.TIMER_WAIT;
            copyStringValueToBytes(fileName, command, 2, 19);
            evaluateStatus("DeleteFile", sendCommandAndReceiveReturnPackage("DeleteFile", command), command[1]);
        }
    }

    @SimpleFunction(description = "Returns a list containing the names of matching files found on the robot.")
    public List<String> ListFiles(String wildcard) {
        if (!checkBluetooth("ListFiles")) {
            return new ArrayList();
        }
        List<String> fileNames = new ArrayList<>();
        if (wildcard.length() == 0) {
            wildcard = "*.*";
        }
        byte[] command = new byte[22];
        command[0] = 1;
        command[1] = Ev3Constants.Opcode.TIMER_READY;
        copyStringValueToBytes(wildcard, command, 2, 19);
        byte[] returnPackage = sendCommandAndReceiveReturnPackage("ListFiles", command);
        int status = getStatus("ListFiles", returnPackage, command[1]);
        while (status == 0) {
            int handle = getUBYTEValueFromBytes(returnPackage, 3);
            fileNames.add(getStringValueFromBytes(returnPackage, 4));
            byte[] command2 = new byte[3];
            command2[0] = 1;
            command2[1] = Ev3Constants.Opcode.TIMER_READ;
            copyUBYTEValueToBytes(handle, command2, 2);
            returnPackage = sendCommandAndReceiveReturnPackage("ListFiles", command2);
            status = getStatus("ListFiles", returnPackage, command2[1]);
        }
        return fileNames;
    }

    @SimpleFunction(description = "Get the firmware and protocol version numbers for the robot as a list where the first element is the firmware version number and the second element is the protocol version number.")
    public List<String> GetFirmwareVersion() {
        if (!checkBluetooth("GetFirmwareVersion")) {
            return new ArrayList();
        }
        byte[] command = {1, Ev3Constants.Opcode.BP0};
        byte[] returnPackage = sendCommandAndReceiveReturnPackage("GetFirmwareVersion", command);
        if (!evaluateStatus("GetFirmwareVersion", returnPackage, command[1])) {
            return new ArrayList();
        }
        List<String> versions = new ArrayList<>();
        versions.add(returnPackage[6] + "." + returnPackage[5]);
        versions.add(returnPackage[4] + "." + returnPackage[3]);
        return versions;
    }

    private Integer openWriteLinear(String functionName, String fileName, long fileSize) {
        byte[] command = new byte[26];
        command[0] = 1;
        command[1] = Ev3Constants.Opcode.BP1;
        copyStringValueToBytes(fileName, command, 2, 19);
        copyULONGValueToBytes(fileSize, command, 22);
        byte[] returnPackage = sendCommandAndReceiveReturnPackage(functionName, command);
        if (evaluateStatus(functionName, returnPackage, command[1])) {
            if (returnPackage.length == 4) {
                return Integer.valueOf(getUBYTEValueFromBytes(returnPackage, 3));
            }
            Log.w(this.logTag, functionName + ": unexpected return package length " + returnPackage.length + " (expected 4)");
        }
        return null;
    }

    @SimpleFunction(description = "Set the brick name of the robot.")
    public void SetBrickName(String name) {
        if (checkBluetooth("SetBrickName")) {
            byte[] command = new byte[18];
            command[0] = 1;
            command[1] = -104;
            copyStringValueToBytes(name, command, 2, 15);
            evaluateStatus("SetBrickName", sendCommandAndReceiveReturnPackage("SetBrickName", command), command[1]);
        }
    }

    @SimpleFunction(description = "Get the brick name of the robot.")
    public String GetBrickName() {
        if (!checkBluetooth("GetBrickName")) {
            return "";
        }
        byte[] command = {1, -101};
        byte[] returnPackage = sendCommandAndReceiveReturnPackage("GetBrickName", command);
        if (evaluateStatus("GetBrickName", returnPackage, command[1])) {
            return getStringValueFromBytes(returnPackage, 3);
        }
        return "";
    }
}
