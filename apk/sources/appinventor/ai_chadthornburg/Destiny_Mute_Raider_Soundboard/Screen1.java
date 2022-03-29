package appinventor.ai_chadthornburg.Destiny_Mute_Raider_Soundboard;

import com.google.appinventor.components.common.PropertyTypeConstants;
import com.google.appinventor.components.runtime.Button;
import com.google.appinventor.components.runtime.Component;
import com.google.appinventor.components.runtime.EventDispatcher;
import com.google.appinventor.components.runtime.Form;
import com.google.appinventor.components.runtime.HandlesEventDispatching;
import com.google.appinventor.components.runtime.HorizontalArrangement;
import com.google.appinventor.components.runtime.Player;
import com.google.appinventor.components.runtime.TableArrangement;
import com.google.appinventor.components.runtime.errors.YailRuntimeError;
import com.google.appinventor.components.runtime.util.RetValManager;
import com.google.appinventor.components.runtime.util.RuntimeErrorAlert;
import com.google.youngandroid.C0202runtime;
import gnu.expr.Language;
import gnu.expr.ModuleBody;
import gnu.expr.ModuleInfo;
import gnu.expr.ModuleMethod;
import gnu.kawa.functions.Apply;
import gnu.kawa.functions.Format;
import gnu.kawa.functions.GetNamedPart;
import gnu.kawa.reflect.Invoke;
import gnu.kawa.reflect.SlotGet;
import gnu.kawa.reflect.SlotSet;
import gnu.kawa.xml.XDataType;
import gnu.lists.Consumer;
import gnu.lists.FString;
import gnu.lists.LList;
import gnu.lists.Pair;
import gnu.lists.PairWithPosition;
import gnu.lists.VoidConsumer;
import gnu.mapping.CallContext;
import gnu.mapping.Environment;
import gnu.mapping.SimpleSymbol;
import gnu.mapping.Symbol;
import gnu.mapping.Values;
import gnu.mapping.WrongType;
import gnu.math.IntNum;
import kawa.lang.Promise;
import kawa.lib.C0214lists;
import kawa.lib.misc;
import kawa.lib.strings;
import kawa.standard.Scheme;
import kawa.standard.require;

/* compiled from: Screen1.yail */
public class Screen1 extends Form implements Runnable {
    static final SimpleSymbol Lit0 = ((SimpleSymbol) new SimpleSymbol("Screen1").readResolve());
    static final SimpleSymbol Lit1 = ((SimpleSymbol) new SimpleSymbol("getMessage").readResolve());
    static final SimpleSymbol Lit10 = ((SimpleSymbol) new SimpleSymbol("AlignHorizontal").readResolve());
    static final SimpleSymbol Lit100 = ((SimpleSymbol) new SimpleSymbol("add-to-global-var-environment").readResolve());
    static final SimpleSymbol Lit101 = ((SimpleSymbol) new SimpleSymbol("add-to-events").readResolve());
    static final SimpleSymbol Lit102 = ((SimpleSymbol) new SimpleSymbol("add-to-components").readResolve());
    static final SimpleSymbol Lit103 = ((SimpleSymbol) new SimpleSymbol("add-to-global-vars").readResolve());
    static final SimpleSymbol Lit104 = ((SimpleSymbol) new SimpleSymbol("add-to-form-do-after-creation").readResolve());
    static final SimpleSymbol Lit105 = ((SimpleSymbol) new SimpleSymbol("send-error").readResolve());
    static final SimpleSymbol Lit106 = ((SimpleSymbol) new SimpleSymbol("dispatchEvent").readResolve());
    static final SimpleSymbol Lit107 = ((SimpleSymbol) new SimpleSymbol("lookup-handler").readResolve());
    static final IntNum Lit11 = IntNum.make(3);
    static final SimpleSymbol Lit12 = ((SimpleSymbol) new SimpleSymbol("number").readResolve());
    static final SimpleSymbol Lit13 = ((SimpleSymbol) new SimpleSymbol("AlignVertical").readResolve());
    static final IntNum Lit14 = IntNum.make(2);
    static final SimpleSymbol Lit15 = ((SimpleSymbol) new SimpleSymbol("Width").readResolve());
    static final IntNum Lit16 = IntNum.make(-2);
    static final FString Lit17 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final FString Lit18 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit19 = ((SimpleSymbol) new SimpleSymbol("VoG").readResolve());
    static final SimpleSymbol Lit2 = ((SimpleSymbol) new SimpleSymbol("*the-null-value*").readResolve());
    static final SimpleSymbol Lit20 = ((SimpleSymbol) new SimpleSymbol("BackgroundColor").readResolve());
    static final IntNum Lit21;
    static final SimpleSymbol Lit22 = ((SimpleSymbol) new SimpleSymbol("FontBold").readResolve());
    static final IntNum Lit23 = IntNum.make(-1020);
    static final SimpleSymbol Lit24 = ((SimpleSymbol) new SimpleSymbol("Text").readResolve());
    static final FString Lit25 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit26 = PairWithPosition.make(Lit4, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\Screen1.yail", 163914);
    static final SimpleSymbol Lit27 = ((SimpleSymbol) new SimpleSymbol("VoG$Click").readResolve());
    static final SimpleSymbol Lit28 = ((SimpleSymbol) new SimpleSymbol("Click").readResolve());
    static final FString Lit29 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit3 = ((SimpleSymbol) new SimpleSymbol("AppName").readResolve());
    static final SimpleSymbol Lit30 = ((SimpleSymbol) new SimpleSymbol("CE").readResolve());
    static final IntNum Lit31;
    static final IntNum Lit32 = IntNum.make(-1020);
    static final FString Lit33 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit34 = PairWithPosition.make(Lit4, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\Screen1.yail", 225353);
    static final SimpleSymbol Lit35 = ((SimpleSymbol) new SimpleSymbol("CE$Click").readResolve());
    static final FString Lit36 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit37 = ((SimpleSymbol) new SimpleSymbol("KF").readResolve());
    static final IntNum Lit38;
    static final IntNum Lit39 = IntNum.make(-1020);
    static final SimpleSymbol Lit4;
    static final FString Lit40 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit41 = PairWithPosition.make(Lit4, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\Screen1.yail", 286793);
    static final SimpleSymbol Lit42 = ((SimpleSymbol) new SimpleSymbol("KF$Click").readResolve());
    static final FString Lit43 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit44 = ((SimpleSymbol) new SimpleSymbol("WoTM").readResolve());
    static final IntNum Lit45;
    static final IntNum Lit46 = IntNum.make(-1020);
    static final FString Lit47 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit48;
    static final SimpleSymbol Lit49 = ((SimpleSymbol) new SimpleSymbol("WoTM$Click").readResolve());
    static final SimpleSymbol Lit5 = ((SimpleSymbol) new SimpleSymbol("Scrollable").readResolve());
    static final FString Lit50 = new FString("com.google.appinventor.components.runtime.TableArrangement");
    static final SimpleSymbol Lit51 = ((SimpleSymbol) new SimpleSymbol("Soundboard").readResolve());
    static final SimpleSymbol Lit52 = ((SimpleSymbol) new SimpleSymbol("Rows").readResolve());
    static final IntNum Lit53 = IntNum.make(4);
    static final FString Lit54 = new FString("com.google.appinventor.components.runtime.TableArrangement");
    static final FString Lit55 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit56 = ((SimpleSymbol) new SimpleSymbol("Introduction").readResolve());
    static final SimpleSymbol Lit57 = ((SimpleSymbol) new SimpleSymbol("Column").readResolve());
    static final IntNum Lit58 = IntNum.make(0);
    static final IntNum Lit59 = IntNum.make(-1048);
    static final SimpleSymbol Lit6 = ((SimpleSymbol) new SimpleSymbol(PropertyTypeConstants.PROPERTY_TYPE_BOOLEAN).readResolve());
    static final SimpleSymbol Lit60 = ((SimpleSymbol) new SimpleSymbol("Row").readResolve());
    static final FString Lit61 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit62 = ((SimpleSymbol) new SimpleSymbol("Player1").readResolve());
    static final SimpleSymbol Lit63 = ((SimpleSymbol) new SimpleSymbol("Source").readResolve());
    static final SimpleSymbol Lit64 = ((SimpleSymbol) new SimpleSymbol("Start").readResolve());
    static final SimpleSymbol Lit65 = ((SimpleSymbol) new SimpleSymbol("Introduction$Click").readResolve());
    static final FString Lit66 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit67 = ((SimpleSymbol) new SimpleSymbol("BRB").readResolve());
    static final IntNum Lit68 = IntNum.make(1);
    static final IntNum Lit69 = IntNum.make(-1048);
    static final SimpleSymbol Lit7 = ((SimpleSymbol) new SimpleSymbol("Title").readResolve());
    static final FString Lit70 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit71 = ((SimpleSymbol) new SimpleSymbol("BRB$Click").readResolve());
    static final FString Lit72 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit73 = ((SimpleSymbol) new SimpleSymbol("I_Am_Ready").readResolve());
    static final FString Lit74 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit75 = ((SimpleSymbol) new SimpleSymbol("I_Am_Ready$Click").readResolve());
    static final FString Lit76 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit77 = ((SimpleSymbol) new SimpleSymbol("MyMistake").readResolve());
    static final FString Lit78 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit79 = ((SimpleSymbol) new SimpleSymbol("MyMistake$Click").readResolve());
    static final FString Lit8 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final FString Lit80 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit81 = ((SimpleSymbol) new SimpleSymbol("FriendJoining").readResolve());
    static final FString Lit82 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit83 = ((SimpleSymbol) new SimpleSymbol("FriendJoining$Click").readResolve());
    static final FString Lit84 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit85 = ((SimpleSymbol) new SimpleSymbol("LeaveGroup").readResolve());
    static final FString Lit86 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit87 = ((SimpleSymbol) new SimpleSymbol("LeaveGroup$Click").readResolve());
    static final FString Lit88 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit89 = ((SimpleSymbol) new SimpleSymbol("GG").readResolve());
    static final SimpleSymbol Lit9 = ((SimpleSymbol) new SimpleSymbol("Navigation").readResolve());
    static final FString Lit90 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit91 = ((SimpleSymbol) new SimpleSymbol("GG$Click").readResolve());
    static final FString Lit92 = new FString("com.google.appinventor.components.runtime.Player");
    static final SimpleSymbol Lit93 = ((SimpleSymbol) new SimpleSymbol("Volume").readResolve());
    static final IntNum Lit94 = IntNum.make(100);
    static final FString Lit95 = new FString("com.google.appinventor.components.runtime.Player");
    static final SimpleSymbol Lit96 = ((SimpleSymbol) new SimpleSymbol("android-log-form").readResolve());
    static final SimpleSymbol Lit97 = ((SimpleSymbol) new SimpleSymbol("add-to-form-environment").readResolve());
    static final SimpleSymbol Lit98 = ((SimpleSymbol) new SimpleSymbol("lookup-in-form-environment").readResolve());
    static final SimpleSymbol Lit99 = ((SimpleSymbol) new SimpleSymbol("is-bound-in-form-environment").readResolve());
    public static Screen1 Screen1;
    static final ModuleMethod lambda$Fn1 = null;
    static final ModuleMethod lambda$Fn10 = null;
    static final ModuleMethod lambda$Fn11 = null;
    static final ModuleMethod lambda$Fn12 = null;
    static final ModuleMethod lambda$Fn13 = null;
    static final ModuleMethod lambda$Fn14 = null;
    static final ModuleMethod lambda$Fn15 = null;
    static final ModuleMethod lambda$Fn16 = null;
    static final ModuleMethod lambda$Fn17 = null;
    static final ModuleMethod lambda$Fn18 = null;
    static final ModuleMethod lambda$Fn19 = null;
    static final ModuleMethod lambda$Fn2 = null;
    static final ModuleMethod lambda$Fn20 = null;
    static final ModuleMethod lambda$Fn21 = null;
    static final ModuleMethod lambda$Fn22 = null;
    static final ModuleMethod lambda$Fn23 = null;
    static final ModuleMethod lambda$Fn24 = null;
    static final ModuleMethod lambda$Fn25 = null;
    static final ModuleMethod lambda$Fn26 = null;
    static final ModuleMethod lambda$Fn27 = null;
    static final ModuleMethod lambda$Fn28 = null;
    static final ModuleMethod lambda$Fn29 = null;
    static final ModuleMethod lambda$Fn3 = null;
    static final ModuleMethod lambda$Fn30 = null;
    static final ModuleMethod lambda$Fn4 = null;
    static final ModuleMethod lambda$Fn5 = null;
    static final ModuleMethod lambda$Fn6 = null;
    static final ModuleMethod lambda$Fn7 = null;
    static final ModuleMethod lambda$Fn8 = null;
    static final ModuleMethod lambda$Fn9 = null;
    public Boolean $Stdebug$Mnform$St;
    public final ModuleMethod $define;
    public Button BRB;
    public final ModuleMethod BRB$Click;

    /* renamed from: CE */
    public Button f4CE;
    public final ModuleMethod CE$Click;
    public Button FriendJoining;
    public final ModuleMethod FriendJoining$Click;

    /* renamed from: GG */
    public Button f5GG;
    public final ModuleMethod GG$Click;
    public Button I_Am_Ready;
    public final ModuleMethod I_Am_Ready$Click;
    public Button Introduction;
    public final ModuleMethod Introduction$Click;

    /* renamed from: KF */
    public Button f6KF;
    public final ModuleMethod KF$Click;
    public Button LeaveGroup;
    public final ModuleMethod LeaveGroup$Click;
    public Button MyMistake;
    public final ModuleMethod MyMistake$Click;
    public HorizontalArrangement Navigation;
    public Player Player1;
    public TableArrangement Soundboard;
    public Button VoG;
    public final ModuleMethod VoG$Click;
    public Button WoTM;
    public final ModuleMethod WoTM$Click;
    public final ModuleMethod add$Mnto$Mncomponents;
    public final ModuleMethod add$Mnto$Mnevents;
    public final ModuleMethod add$Mnto$Mnform$Mndo$Mnafter$Mncreation;
    public final ModuleMethod add$Mnto$Mnform$Mnenvironment;
    public final ModuleMethod add$Mnto$Mnglobal$Mnvar$Mnenvironment;
    public final ModuleMethod add$Mnto$Mnglobal$Mnvars;
    public final ModuleMethod android$Mnlog$Mnform;
    public LList components$Mnto$Mncreate;
    public final ModuleMethod dispatchEvent;
    public LList events$Mnto$Mnregister;
    public LList form$Mndo$Mnafter$Mncreation;
    public Environment form$Mnenvironment;
    public Symbol form$Mnname$Mnsymbol;
    public Environment global$Mnvar$Mnenvironment;
    public LList global$Mnvars$Mnto$Mncreate;
    public final ModuleMethod is$Mnbound$Mnin$Mnform$Mnenvironment;
    public final ModuleMethod lookup$Mnhandler;
    public final ModuleMethod lookup$Mnin$Mnform$Mnenvironment;
    public final ModuleMethod process$Mnexception;
    public final ModuleMethod send$Mnerror;

    static {
        SimpleSymbol simpleSymbol = (SimpleSymbol) new SimpleSymbol(PropertyTypeConstants.PROPERTY_TYPE_TEXT).readResolve();
        Lit4 = simpleSymbol;
        Lit48 = PairWithPosition.make(simpleSymbol, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\Screen1.yail", 348235);
        int[] iArr = new int[2];
        iArr[0] = -65536;
        Lit45 = IntNum.make(iArr);
        int[] iArr2 = new int[2];
        iArr2[0] = -3355444;
        Lit38 = IntNum.make(iArr2);
        int[] iArr3 = new int[2];
        iArr3[0] = -16711936;
        Lit31 = IntNum.make(iArr3);
        int[] iArr4 = new int[2];
        iArr4[0] = -14336;
        Lit21 = IntNum.make(iArr4);
    }

    public Screen1() {
        ModuleInfo.register(this);
        frame frame2 = new frame();
        frame2.$main = this;
        this.android$Mnlog$Mnform = new ModuleMethod(frame2, 1, Lit96, 4097);
        this.add$Mnto$Mnform$Mnenvironment = new ModuleMethod(frame2, 2, Lit97, 8194);
        this.lookup$Mnin$Mnform$Mnenvironment = new ModuleMethod(frame2, 3, Lit98, 8193);
        this.is$Mnbound$Mnin$Mnform$Mnenvironment = new ModuleMethod(frame2, 5, Lit99, 4097);
        this.add$Mnto$Mnglobal$Mnvar$Mnenvironment = new ModuleMethod(frame2, 6, Lit100, 8194);
        this.add$Mnto$Mnevents = new ModuleMethod(frame2, 7, Lit101, 8194);
        this.add$Mnto$Mncomponents = new ModuleMethod(frame2, 8, Lit102, 16388);
        this.add$Mnto$Mnglobal$Mnvars = new ModuleMethod(frame2, 9, Lit103, 8194);
        this.add$Mnto$Mnform$Mndo$Mnafter$Mncreation = new ModuleMethod(frame2, 10, Lit104, 4097);
        this.send$Mnerror = new ModuleMethod(frame2, 11, Lit105, 4097);
        this.process$Mnexception = new ModuleMethod(frame2, 12, "process-exception", 4097);
        this.dispatchEvent = new ModuleMethod(frame2, 13, Lit106, 16388);
        this.lookup$Mnhandler = new ModuleMethod(frame2, 14, Lit107, 8194);
        ModuleMethod moduleMethod = new ModuleMethod(frame2, 15, (Object) null, 0);
        moduleMethod.setProperty("source-location", "C:\\Users\\Owner\\AppData\\Local\\Temp\\runtime1744045922481620487.scm:552");
        lambda$Fn1 = moduleMethod;
        this.$define = new ModuleMethod(frame2, 16, "$define", 0);
        lambda$Fn2 = new ModuleMethod(frame2, 17, (Object) null, 0);
        lambda$Fn3 = new ModuleMethod(frame2, 18, (Object) null, 0);
        lambda$Fn4 = new ModuleMethod(frame2, 19, (Object) null, 0);
        lambda$Fn5 = new ModuleMethod(frame2, 20, (Object) null, 0);
        lambda$Fn6 = new ModuleMethod(frame2, 21, (Object) null, 0);
        this.VoG$Click = new ModuleMethod(frame2, 22, Lit27, 0);
        lambda$Fn7 = new ModuleMethod(frame2, 23, (Object) null, 0);
        lambda$Fn8 = new ModuleMethod(frame2, 24, (Object) null, 0);
        this.CE$Click = new ModuleMethod(frame2, 25, Lit35, 0);
        lambda$Fn9 = new ModuleMethod(frame2, 26, (Object) null, 0);
        lambda$Fn10 = new ModuleMethod(frame2, 27, (Object) null, 0);
        this.KF$Click = new ModuleMethod(frame2, 28, Lit42, 0);
        lambda$Fn11 = new ModuleMethod(frame2, 29, (Object) null, 0);
        lambda$Fn12 = new ModuleMethod(frame2, 30, (Object) null, 0);
        this.WoTM$Click = new ModuleMethod(frame2, 31, Lit49, 0);
        lambda$Fn13 = new ModuleMethod(frame2, 32, (Object) null, 0);
        lambda$Fn14 = new ModuleMethod(frame2, 33, (Object) null, 0);
        lambda$Fn15 = new ModuleMethod(frame2, 34, (Object) null, 0);
        lambda$Fn16 = new ModuleMethod(frame2, 35, (Object) null, 0);
        this.Introduction$Click = new ModuleMethod(frame2, 36, Lit65, 0);
        lambda$Fn17 = new ModuleMethod(frame2, 37, (Object) null, 0);
        lambda$Fn18 = new ModuleMethod(frame2, 38, (Object) null, 0);
        this.BRB$Click = new ModuleMethod(frame2, 39, Lit71, 0);
        lambda$Fn19 = new ModuleMethod(frame2, 40, (Object) null, 0);
        lambda$Fn20 = new ModuleMethod(frame2, 41, (Object) null, 0);
        this.I_Am_Ready$Click = new ModuleMethod(frame2, 42, Lit75, 0);
        lambda$Fn21 = new ModuleMethod(frame2, 43, (Object) null, 0);
        lambda$Fn22 = new ModuleMethod(frame2, 44, (Object) null, 0);
        this.MyMistake$Click = new ModuleMethod(frame2, 45, Lit79, 0);
        lambda$Fn23 = new ModuleMethod(frame2, 46, (Object) null, 0);
        lambda$Fn24 = new ModuleMethod(frame2, 47, (Object) null, 0);
        this.FriendJoining$Click = new ModuleMethod(frame2, 48, Lit83, 0);
        lambda$Fn25 = new ModuleMethod(frame2, 49, (Object) null, 0);
        lambda$Fn26 = new ModuleMethod(frame2, 50, (Object) null, 0);
        this.LeaveGroup$Click = new ModuleMethod(frame2, 51, Lit87, 0);
        lambda$Fn27 = new ModuleMethod(frame2, 52, (Object) null, 0);
        lambda$Fn28 = new ModuleMethod(frame2, 53, (Object) null, 0);
        this.GG$Click = new ModuleMethod(frame2, 54, Lit91, 0);
        lambda$Fn29 = new ModuleMethod(frame2, 55, (Object) null, 0);
        lambda$Fn30 = new ModuleMethod(frame2, 56, (Object) null, 0);
    }

    public Object lookupInFormEnvironment(Symbol symbol) {
        return lookupInFormEnvironment(symbol, Boolean.FALSE);
    }

    public void run() {
        CallContext instance = CallContext.getInstance();
        Consumer consumer = instance.consumer;
        instance.consumer = VoidConsumer.instance;
        try {
            run(instance);
            th = null;
        } catch (Throwable th) {
            th = th;
        }
        ModuleBody.runCleanup(instance, th, consumer);
    }

    public final void run(CallContext $ctx) {
        String obj;
        Consumer $result = $ctx.consumer;
        Object find = require.find("com.google.youngandroid.runtime");
        try {
            ((Runnable) find).run();
            this.$Stdebug$Mnform$St = Boolean.FALSE;
            this.form$Mnenvironment = Environment.make(misc.symbol$To$String(Lit0));
            FString stringAppend = strings.stringAppend(misc.symbol$To$String(Lit0), "-global-vars");
            if (stringAppend == null) {
                obj = null;
            } else {
                obj = stringAppend.toString();
            }
            this.global$Mnvar$Mnenvironment = Environment.make(obj);
            Screen1 = null;
            this.form$Mnname$Mnsymbol = Lit0;
            this.events$Mnto$Mnregister = LList.Empty;
            this.components$Mnto$Mncreate = LList.Empty;
            this.global$Mnvars$Mnto$Mncreate = LList.Empty;
            this.form$Mndo$Mnafter$Mncreation = LList.Empty;
            Object find2 = require.find("com.google.youngandroid.runtime");
            try {
                ((Runnable) find2).run();
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit3, "MutePlayerSoundboard", Lit4);
                    C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit5, Boolean.TRUE, Lit6);
                    Values.writeValues(C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit7, "General", Lit4), $result);
                } else {
                    addToFormDoAfterCreation(new Promise(lambda$Fn2));
                }
                this.Navigation = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit8, Lit9, lambda$Fn3), $result);
                } else {
                    addToComponents(Lit0, Lit17, Lit9, lambda$Fn4);
                }
                this.VoG = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit9, Lit18, Lit19, lambda$Fn5), $result);
                } else {
                    addToComponents(Lit9, Lit25, Lit19, lambda$Fn6);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit27, this.VoG$Click);
                } else {
                    addToFormEnvironment(Lit27, this.VoG$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "VoG", "Click");
                } else {
                    addToEvents(Lit19, Lit28);
                }
                this.f4CE = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit9, Lit29, Lit30, lambda$Fn7), $result);
                } else {
                    addToComponents(Lit9, Lit33, Lit30, lambda$Fn8);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit35, this.CE$Click);
                } else {
                    addToFormEnvironment(Lit35, this.CE$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "CE", "Click");
                } else {
                    addToEvents(Lit30, Lit28);
                }
                this.f6KF = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit9, Lit36, Lit37, lambda$Fn9), $result);
                } else {
                    addToComponents(Lit9, Lit40, Lit37, lambda$Fn10);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit42, this.KF$Click);
                } else {
                    addToFormEnvironment(Lit42, this.KF$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "KF", "Click");
                } else {
                    addToEvents(Lit37, Lit28);
                }
                this.WoTM = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit9, Lit43, Lit44, lambda$Fn11), $result);
                } else {
                    addToComponents(Lit9, Lit47, Lit44, lambda$Fn12);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit49, this.WoTM$Click);
                } else {
                    addToFormEnvironment(Lit49, this.WoTM$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "WoTM", "Click");
                } else {
                    addToEvents(Lit44, Lit28);
                }
                this.Soundboard = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit50, Lit51, lambda$Fn13), $result);
                } else {
                    addToComponents(Lit0, Lit54, Lit51, lambda$Fn14);
                }
                this.Introduction = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit51, Lit55, Lit56, lambda$Fn15), $result);
                } else {
                    addToComponents(Lit51, Lit61, Lit56, lambda$Fn16);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit65, this.Introduction$Click);
                } else {
                    addToFormEnvironment(Lit65, this.Introduction$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Introduction", "Click");
                } else {
                    addToEvents(Lit56, Lit28);
                }
                this.BRB = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit51, Lit66, Lit67, lambda$Fn17), $result);
                } else {
                    addToComponents(Lit51, Lit70, Lit67, lambda$Fn18);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit71, this.BRB$Click);
                } else {
                    addToFormEnvironment(Lit71, this.BRB$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "BRB", "Click");
                } else {
                    addToEvents(Lit67, Lit28);
                }
                this.I_Am_Ready = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit51, Lit72, Lit73, lambda$Fn19), $result);
                } else {
                    addToComponents(Lit51, Lit74, Lit73, lambda$Fn20);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit75, this.I_Am_Ready$Click);
                } else {
                    addToFormEnvironment(Lit75, this.I_Am_Ready$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "I_Am_Ready", "Click");
                } else {
                    addToEvents(Lit73, Lit28);
                }
                this.MyMistake = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit51, Lit76, Lit77, lambda$Fn21), $result);
                } else {
                    addToComponents(Lit51, Lit78, Lit77, lambda$Fn22);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit79, this.MyMistake$Click);
                } else {
                    addToFormEnvironment(Lit79, this.MyMistake$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "MyMistake", "Click");
                } else {
                    addToEvents(Lit77, Lit28);
                }
                this.FriendJoining = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit51, Lit80, Lit81, lambda$Fn23), $result);
                } else {
                    addToComponents(Lit51, Lit82, Lit81, lambda$Fn24);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit83, this.FriendJoining$Click);
                } else {
                    addToFormEnvironment(Lit83, this.FriendJoining$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "FriendJoining", "Click");
                } else {
                    addToEvents(Lit81, Lit28);
                }
                this.LeaveGroup = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit51, Lit84, Lit85, lambda$Fn25), $result);
                } else {
                    addToComponents(Lit51, Lit86, Lit85, lambda$Fn26);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit87, this.LeaveGroup$Click);
                } else {
                    addToFormEnvironment(Lit87, this.LeaveGroup$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "LeaveGroup", "Click");
                } else {
                    addToEvents(Lit85, Lit28);
                }
                this.f5GG = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit51, Lit88, Lit89, lambda$Fn27), $result);
                } else {
                    addToComponents(Lit51, Lit90, Lit89, lambda$Fn28);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit91, this.GG$Click);
                } else {
                    addToFormEnvironment(Lit91, this.GG$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "GG", "Click");
                } else {
                    addToEvents(Lit89, Lit28);
                }
                this.Player1 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit92, Lit62, lambda$Fn29), $result);
                } else {
                    addToComponents(Lit0, Lit95, Lit62, lambda$Fn30);
                }
                C0202runtime.initRuntime();
            } catch (ClassCastException e) {
                throw new WrongType(e, "java.lang.Runnable.run()", 1, find2);
            }
        } catch (ClassCastException e2) {
            throw new WrongType(e2, "java.lang.Runnable.run()", 1, find);
        }
    }

    static Object lambda3() {
        C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit3, "MutePlayerSoundboard", Lit4);
        C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit5, Boolean.TRUE, Lit6);
        return C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit7, "General", Lit4);
    }

    static Object lambda4() {
        C0202runtime.setAndCoerceProperty$Ex(Lit9, Lit10, Lit11, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit9, Lit13, Lit14, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit9, Lit15, Lit16, Lit12);
    }

    static Object lambda5() {
        C0202runtime.setAndCoerceProperty$Ex(Lit9, Lit10, Lit11, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit9, Lit13, Lit14, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit9, Lit15, Lit16, Lit12);
    }

    static Object lambda6() {
        C0202runtime.setAndCoerceProperty$Ex(Lit19, Lit20, Lit21, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit19, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit19, Lit15, Lit23, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit19, Lit24, "VoG", Lit4);
    }

    static Object lambda7() {
        C0202runtime.setAndCoerceProperty$Ex(Lit19, Lit20, Lit21, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit19, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit19, Lit15, Lit23, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit19, Lit24, "VoG", Lit4);
    }

    public Object VoG$Click() {
        C0202runtime.setThisForm();
        return C0202runtime.callYailPrimitive(C0202runtime.open$Mnanother$Mnscreen, LList.list1("VoG"), Lit26, "open another screen");
    }

    static Object lambda8() {
        C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit20, Lit31, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit15, Lit32, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit24, "CE", Lit4);
    }

    static Object lambda9() {
        C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit20, Lit31, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit15, Lit32, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit24, "CE", Lit4);
    }

    public Object CE$Click() {
        C0202runtime.setThisForm();
        return C0202runtime.callYailPrimitive(C0202runtime.open$Mnanother$Mnscreen, LList.list1("CE"), Lit34, "open another screen");
    }

    static Object lambda10() {
        C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit20, Lit38, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit15, Lit39, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit24, "KF", Lit4);
    }

    static Object lambda11() {
        C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit20, Lit38, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit15, Lit39, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit24, "KF", Lit4);
    }

    public Object KF$Click() {
        C0202runtime.setThisForm();
        return C0202runtime.callYailPrimitive(C0202runtime.open$Mnanother$Mnscreen, LList.list1("KF"), Lit41, "open another screen");
    }

    static Object lambda12() {
        C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit20, Lit45, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit15, Lit46, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit24, "WoTM", Lit4);
    }

    static Object lambda13() {
        C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit20, Lit45, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit15, Lit46, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit24, "WoTM", Lit4);
    }

    public Object WoTM$Click() {
        C0202runtime.setThisForm();
        return C0202runtime.callYailPrimitive(C0202runtime.open$Mnanother$Mnscreen, LList.list1("WoTM"), Lit48, "open another screen");
    }

    static Object lambda14() {
        C0202runtime.setAndCoerceProperty$Ex(Lit51, Lit15, Lit16, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit51, Lit52, Lit53, Lit12);
    }

    static Object lambda15() {
        C0202runtime.setAndCoerceProperty$Ex(Lit51, Lit15, Lit16, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit51, Lit52, Lit53, Lit12);
    }

    static Object lambda16() {
        C0202runtime.setAndCoerceProperty$Ex(Lit56, Lit57, Lit58, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit56, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit56, Lit15, Lit59, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit56, Lit60, Lit58, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit56, Lit24, "Introduction", Lit4);
    }

    static Object lambda17() {
        C0202runtime.setAndCoerceProperty$Ex(Lit56, Lit57, Lit58, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit56, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit56, Lit15, Lit59, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit56, Lit60, Lit58, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit56, Lit24, "Introduction", Lit4);
    }

    public Object Introduction$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit62, Lit63, "Introduction.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit62, Lit64, LList.Empty, LList.Empty);
    }

    static Object lambda18() {
        C0202runtime.setAndCoerceProperty$Ex(Lit67, Lit57, Lit68, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit67, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit67, Lit15, Lit69, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit67, Lit60, Lit58, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit67, Lit24, "BRB", Lit4);
    }

    static Object lambda19() {
        C0202runtime.setAndCoerceProperty$Ex(Lit67, Lit57, Lit68, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit67, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit67, Lit15, Lit69, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit67, Lit60, Lit58, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit67, Lit24, "BRB", Lit4);
    }

    public Object BRB$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit62, Lit63, "BRB.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit62, Lit64, LList.Empty, LList.Empty);
    }

    static Object lambda20() {
        C0202runtime.setAndCoerceProperty$Ex(Lit73, Lit57, Lit58, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit73, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit73, Lit60, Lit68, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit73, Lit24, "I'm Ready", Lit4);
    }

    static Object lambda21() {
        C0202runtime.setAndCoerceProperty$Ex(Lit73, Lit57, Lit58, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit73, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit73, Lit60, Lit68, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit73, Lit24, "I'm Ready", Lit4);
    }

    public Object I_Am_Ready$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit62, Lit63, "ImReady.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit62, Lit64, LList.Empty, LList.Empty);
    }

    static Object lambda22() {
        C0202runtime.setAndCoerceProperty$Ex(Lit77, Lit57, Lit68, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit77, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit77, Lit60, Lit68, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit77, Lit24, "Sorry, My Mistake", Lit4);
    }

    static Object lambda23() {
        C0202runtime.setAndCoerceProperty$Ex(Lit77, Lit57, Lit68, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit77, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit77, Lit60, Lit68, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit77, Lit24, "Sorry, My Mistake", Lit4);
    }

    public Object MyMistake$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit62, Lit63, "SorryMyMistake.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit62, Lit64, LList.Empty, LList.Empty);
    }

    static Object lambda24() {
        C0202runtime.setAndCoerceProperty$Ex(Lit81, Lit57, Lit58, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit81, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit81, Lit60, Lit14, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit81, Lit24, "Friend Joining", Lit4);
    }

    static Object lambda25() {
        C0202runtime.setAndCoerceProperty$Ex(Lit81, Lit57, Lit58, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit81, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit81, Lit60, Lit14, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit81, Lit24, "Friend Joining", Lit4);
    }

    public Object FriendJoining$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit62, Lit63, "I_Have_a_Friend_That_Will_Join_Us.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit62, Lit64, LList.Empty, LList.Empty);
    }

    static Object lambda26() {
        C0202runtime.setAndCoerceProperty$Ex(Lit85, Lit57, Lit68, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit85, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit85, Lit60, Lit14, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit85, Lit24, "Leave Group", Lit4);
    }

    static Object lambda27() {
        C0202runtime.setAndCoerceProperty$Ex(Lit85, Lit57, Lit68, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit85, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit85, Lit60, Lit14, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit85, Lit24, "Leave Group", Lit4);
    }

    public Object LeaveGroup$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit62, Lit63, "LeaveGroup.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit62, Lit64, LList.Empty, LList.Empty);
    }

    static Object lambda28() {
        C0202runtime.setAndCoerceProperty$Ex(Lit89, Lit57, Lit58, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit89, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit89, Lit60, Lit11, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit89, Lit24, "GG", Lit4);
    }

    static Object lambda29() {
        C0202runtime.setAndCoerceProperty$Ex(Lit89, Lit57, Lit58, Lit12);
        C0202runtime.setAndCoerceProperty$Ex(Lit89, Lit22, Boolean.TRUE, Lit6);
        C0202runtime.setAndCoerceProperty$Ex(Lit89, Lit60, Lit11, Lit12);
        return C0202runtime.setAndCoerceProperty$Ex(Lit89, Lit24, "GG", Lit4);
    }

    public Object GG$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit62, Lit63, "GG.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit62, Lit64, LList.Empty, LList.Empty);
    }

    static Object lambda30() {
        C0202runtime.setAndCoerceProperty$Ex(Lit62, Lit63, "Introduction.wav", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit62, Lit93, Lit94, Lit12);
    }

    static Object lambda31() {
        C0202runtime.setAndCoerceProperty$Ex(Lit62, Lit63, "Introduction.wav", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit62, Lit93, Lit94, Lit12);
    }

    /* compiled from: Screen1.yail */
    public class frame extends ModuleBody {
        Screen1 $main;

        public int match1(ModuleMethod moduleMethod, Object obj, CallContext callContext) {
            switch (moduleMethod.selector) {
                case 1:
                    callContext.value1 = obj;
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 1;
                    return 0;
                case 3:
                    if (!(obj instanceof Symbol)) {
                        return -786431;
                    }
                    callContext.value1 = obj;
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 1;
                    return 0;
                case 5:
                    if (!(obj instanceof Symbol)) {
                        return -786431;
                    }
                    callContext.value1 = obj;
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 1;
                    return 0;
                case 10:
                    callContext.value1 = obj;
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 1;
                    return 0;
                case 11:
                    callContext.value1 = obj;
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 1;
                    return 0;
                case 12:
                    if (!(obj instanceof Screen1)) {
                        return -786431;
                    }
                    callContext.value1 = obj;
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 1;
                    return 0;
                default:
                    return super.match1(moduleMethod, obj, callContext);
            }
        }

        public int match2(ModuleMethod moduleMethod, Object obj, Object obj2, CallContext callContext) {
            switch (moduleMethod.selector) {
                case 2:
                    if (!(obj instanceof Symbol)) {
                        return -786431;
                    }
                    callContext.value1 = obj;
                    callContext.value2 = obj2;
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 2;
                    return 0;
                case 3:
                    if (!(obj instanceof Symbol)) {
                        return -786431;
                    }
                    callContext.value1 = obj;
                    callContext.value2 = obj2;
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 2;
                    return 0;
                case 6:
                    if (!(obj instanceof Symbol)) {
                        return -786431;
                    }
                    callContext.value1 = obj;
                    callContext.value2 = obj2;
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 2;
                    return 0;
                case 7:
                    callContext.value1 = obj;
                    callContext.value2 = obj2;
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 2;
                    return 0;
                case 9:
                    callContext.value1 = obj;
                    callContext.value2 = obj2;
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 2;
                    return 0;
                case 14:
                    callContext.value1 = obj;
                    callContext.value2 = obj2;
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 2;
                    return 0;
                default:
                    return super.match2(moduleMethod, obj, obj2, callContext);
            }
        }

        public int match4(ModuleMethod moduleMethod, Object obj, Object obj2, Object obj3, Object obj4, CallContext callContext) {
            switch (moduleMethod.selector) {
                case 8:
                    callContext.value1 = obj;
                    callContext.value2 = obj2;
                    callContext.value3 = obj3;
                    callContext.value4 = obj4;
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 4;
                    return 0;
                case 13:
                    if (!(obj instanceof Screen1)) {
                        return -786431;
                    }
                    callContext.value1 = obj;
                    if (!(obj2 instanceof Component)) {
                        return -786430;
                    }
                    callContext.value2 = obj2;
                    if (!(obj3 instanceof String)) {
                        return -786429;
                    }
                    callContext.value3 = obj3;
                    if (!(obj4 instanceof String)) {
                        return -786428;
                    }
                    callContext.value4 = obj4;
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 4;
                    return 0;
                default:
                    return super.match4(moduleMethod, obj, obj2, obj3, obj4, callContext);
            }
        }

        public Object apply1(ModuleMethod moduleMethod, Object obj) {
            switch (moduleMethod.selector) {
                case 1:
                    this.$main.androidLogForm(obj);
                    return Values.empty;
                case 3:
                    try {
                        return this.$main.lookupInFormEnvironment((Symbol) obj);
                    } catch (ClassCastException e) {
                        throw new WrongType(e, "lookup-in-form-environment", 1, obj);
                    }
                case 5:
                    try {
                        return this.$main.isBoundInFormEnvironment((Symbol) obj) ? Boolean.TRUE : Boolean.FALSE;
                    } catch (ClassCastException e2) {
                        throw new WrongType(e2, "is-bound-in-form-environment", 1, obj);
                    }
                case 10:
                    this.$main.addToFormDoAfterCreation(obj);
                    return Values.empty;
                case 11:
                    this.$main.sendError(obj);
                    return Values.empty;
                case 12:
                    this.$main.processException(obj);
                    return Values.empty;
                default:
                    return super.apply1(moduleMethod, obj);
            }
        }

        public Object apply4(ModuleMethod moduleMethod, Object obj, Object obj2, Object obj3, Object obj4) {
            switch (moduleMethod.selector) {
                case 8:
                    this.$main.addToComponents(obj, obj2, obj3, obj4);
                    return Values.empty;
                case 13:
                    try {
                        try {
                            try {
                                try {
                                    return this.$main.dispatchEvent((Component) obj, (String) obj2, (String) obj3, (Object[]) obj4) ? Boolean.TRUE : Boolean.FALSE;
                                } catch (ClassCastException e) {
                                    throw new WrongType(e, "dispatchEvent", 4, obj4);
                                }
                            } catch (ClassCastException e2) {
                                throw new WrongType(e2, "dispatchEvent", 3, obj3);
                            }
                        } catch (ClassCastException e3) {
                            throw new WrongType(e3, "dispatchEvent", 2, obj2);
                        }
                    } catch (ClassCastException e4) {
                        throw new WrongType(e4, "dispatchEvent", 1, obj);
                    }
                default:
                    return super.apply4(moduleMethod, obj, obj2, obj3, obj4);
            }
        }

        public Object apply2(ModuleMethod moduleMethod, Object obj, Object obj2) {
            switch (moduleMethod.selector) {
                case 2:
                    try {
                        this.$main.addToFormEnvironment((Symbol) obj, obj2);
                        return Values.empty;
                    } catch (ClassCastException e) {
                        throw new WrongType(e, "add-to-form-environment", 1, obj);
                    }
                case 3:
                    try {
                        return this.$main.lookupInFormEnvironment((Symbol) obj, obj2);
                    } catch (ClassCastException e2) {
                        throw new WrongType(e2, "lookup-in-form-environment", 1, obj);
                    }
                case 6:
                    try {
                        this.$main.addToGlobalVarEnvironment((Symbol) obj, obj2);
                        return Values.empty;
                    } catch (ClassCastException e3) {
                        throw new WrongType(e3, "add-to-global-var-environment", 1, obj);
                    }
                case 7:
                    this.$main.addToEvents(obj, obj2);
                    return Values.empty;
                case 9:
                    this.$main.addToGlobalVars(obj, obj2);
                    return Values.empty;
                case 14:
                    return this.$main.lookupHandler(obj, obj2);
                default:
                    return super.apply2(moduleMethod, obj, obj2);
            }
        }

        public Object apply0(ModuleMethod moduleMethod) {
            switch (moduleMethod.selector) {
                case 15:
                    return Screen1.lambda2();
                case 16:
                    this.$main.$define();
                    return Values.empty;
                case 17:
                    return Screen1.lambda3();
                case 18:
                    return Screen1.lambda4();
                case 19:
                    return Screen1.lambda5();
                case 20:
                    return Screen1.lambda6();
                case 21:
                    return Screen1.lambda7();
                case 22:
                    return this.$main.VoG$Click();
                case 23:
                    return Screen1.lambda8();
                case 24:
                    return Screen1.lambda9();
                case 25:
                    return this.$main.CE$Click();
                case 26:
                    return Screen1.lambda10();
                case 27:
                    return Screen1.lambda11();
                case 28:
                    return this.$main.KF$Click();
                case 29:
                    return Screen1.lambda12();
                case 30:
                    return Screen1.lambda13();
                case 31:
                    return this.$main.WoTM$Click();
                case 32:
                    return Screen1.lambda14();
                case 33:
                    return Screen1.lambda15();
                case 34:
                    return Screen1.lambda16();
                case 35:
                    return Screen1.lambda17();
                case 36:
                    return this.$main.Introduction$Click();
                case 37:
                    return Screen1.lambda18();
                case 38:
                    return Screen1.lambda19();
                case 39:
                    return this.$main.BRB$Click();
                case 40:
                    return Screen1.lambda20();
                case 41:
                    return Screen1.lambda21();
                case XDataType.NMTOKEN_TYPE_CODE /*42*/:
                    return this.$main.I_Am_Ready$Click();
                case XDataType.NAME_TYPE_CODE /*43*/:
                    return Screen1.lambda22();
                case XDataType.NCNAME_TYPE_CODE /*44*/:
                    return Screen1.lambda23();
                case XDataType.ID_TYPE_CODE /*45*/:
                    return this.$main.MyMistake$Click();
                case XDataType.IDREF_TYPE_CODE /*46*/:
                    return Screen1.lambda24();
                case XDataType.ENTITY_TYPE_CODE /*47*/:
                    return Screen1.lambda25();
                case 48:
                    return this.$main.FriendJoining$Click();
                case 49:
                    return Screen1.lambda26();
                case 50:
                    return Screen1.lambda27();
                case 51:
                    return this.$main.LeaveGroup$Click();
                case 52:
                    return Screen1.lambda28();
                case 53:
                    return Screen1.lambda29();
                case 54:
                    return this.$main.GG$Click();
                case 55:
                    return Screen1.lambda30();
                case 56:
                    return Screen1.lambda31();
                default:
                    return super.apply0(moduleMethod);
            }
        }

        public int match0(ModuleMethod moduleMethod, CallContext callContext) {
            switch (moduleMethod.selector) {
                case 15:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 16:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 17:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 18:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 19:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 20:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 21:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 22:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 23:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 24:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 25:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 26:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 27:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 28:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 29:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 30:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 31:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 32:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 33:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 34:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 35:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 36:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 37:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 38:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 39:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 40:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 41:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case XDataType.NMTOKEN_TYPE_CODE /*42*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case XDataType.NAME_TYPE_CODE /*43*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case XDataType.NCNAME_TYPE_CODE /*44*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case XDataType.ID_TYPE_CODE /*45*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case XDataType.IDREF_TYPE_CODE /*46*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case XDataType.ENTITY_TYPE_CODE /*47*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 48:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 49:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 50:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 51:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 52:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 53:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 54:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 55:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 56:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                default:
                    return super.match0(moduleMethod, callContext);
            }
        }
    }

    public void androidLogForm(Object message) {
    }

    public void addToFormEnvironment(Symbol name, Object object) {
        androidLogForm(Format.formatToString(0, "Adding ~A to env ~A with value ~A", name, this.form$Mnenvironment, object));
        this.form$Mnenvironment.put(name, object);
    }

    public Object lookupInFormEnvironment(Symbol name, Object default$Mnvalue) {
        boolean x = ((this.form$Mnenvironment == null ? 1 : 0) + 1) & true;
        if (x) {
            if (!this.form$Mnenvironment.isBound(name)) {
                return default$Mnvalue;
            }
        } else if (!x) {
            return default$Mnvalue;
        }
        return this.form$Mnenvironment.get(name);
    }

    public boolean isBoundInFormEnvironment(Symbol name) {
        return this.form$Mnenvironment.isBound(name);
    }

    public void addToGlobalVarEnvironment(Symbol name, Object object) {
        androidLogForm(Format.formatToString(0, "Adding ~A to env ~A with value ~A", name, this.global$Mnvar$Mnenvironment, object));
        this.global$Mnvar$Mnenvironment.put(name, object);
    }

    public void addToEvents(Object component$Mnname, Object event$Mnname) {
        this.events$Mnto$Mnregister = C0214lists.cons(C0214lists.cons(component$Mnname, event$Mnname), this.events$Mnto$Mnregister);
    }

    public void addToComponents(Object container$Mnname, Object component$Mntype, Object component$Mnname, Object init$Mnthunk) {
        this.components$Mnto$Mncreate = C0214lists.cons(LList.list4(container$Mnname, component$Mntype, component$Mnname, init$Mnthunk), this.components$Mnto$Mncreate);
    }

    public void addToGlobalVars(Object var, Object val$Mnthunk) {
        this.global$Mnvars$Mnto$Mncreate = C0214lists.cons(LList.list2(var, val$Mnthunk), this.global$Mnvars$Mnto$Mncreate);
    }

    public void addToFormDoAfterCreation(Object thunk) {
        this.form$Mndo$Mnafter$Mncreation = C0214lists.cons(thunk, this.form$Mndo$Mnafter$Mncreation);
    }

    public void sendError(Object error) {
        RetValManager.sendError(error == null ? null : error.toString());
    }

    public void processException(Object ex) {
        Object apply1 = Scheme.applyToArgs.apply1(GetNamedPart.getNamedPart.apply2(ex, Lit1));
        RuntimeErrorAlert.alert(this, apply1 == null ? null : apply1.toString(), ex instanceof YailRuntimeError ? ((YailRuntimeError) ex).getErrorType() : "Runtime Error", "End Application");
    }

    public boolean dispatchEvent(Component componentObject, String registeredComponentName, String eventName, Object[] args) {
        SimpleSymbol registeredObject = misc.string$To$Symbol(registeredComponentName);
        if (!isBoundInFormEnvironment(registeredObject)) {
            EventDispatcher.unregisterEventForDelegation(this, registeredComponentName, eventName);
            return false;
        } else if (lookupInFormEnvironment(registeredObject) != componentObject) {
            return false;
        } else {
            try {
                Scheme.apply.apply2(lookupHandler(registeredComponentName, eventName), LList.makeList(args, 0));
                return true;
            } catch (Throwable exception) {
                androidLogForm(exception.getMessage());
                exception.printStackTrace();
                processException(exception);
                return false;
            }
        }
    }

    public Object lookupHandler(Object componentName, Object eventName) {
        String str = null;
        String obj = componentName == null ? null : componentName.toString();
        if (eventName != null) {
            str = eventName.toString();
        }
        return lookupInFormEnvironment(misc.string$To$Symbol(EventDispatcher.makeFullEventName(obj, str)));
    }

    public void $define() {
        Object reverse;
        Object reverse2;
        Object obj;
        Object obj2;
        Object obj3;
        Object component$Mnname;
        Object obj4;
        Object var;
        Language.setDefaults(Scheme.getInstance());
        try {
            run();
        } catch (Exception exception) {
            androidLogForm(exception.getMessage());
            processException(exception);
        }
        Screen1 = this;
        addToFormEnvironment(Lit0, this);
        Object obj5 = this.events$Mnto$Mnregister;
        while (obj5 != LList.Empty) {
            try {
                Pair arg0 = (Pair) obj5;
                Object event$Mninfo = arg0.getCar();
                Object apply1 = C0214lists.car.apply1(event$Mninfo);
                String obj6 = apply1 == null ? null : apply1.toString();
                Object apply12 = C0214lists.cdr.apply1(event$Mninfo);
                EventDispatcher.registerEventForDelegation(this, obj6, apply12 == null ? null : apply12.toString());
                obj5 = arg0.getCdr();
            } catch (ClassCastException e) {
                throw new WrongType(e, "arg0", -2, obj5);
            }
        }
        try {
            addToGlobalVars(Lit2, lambda$Fn1);
            reverse = C0214lists.reverse(this.global$Mnvars$Mnto$Mncreate);
            while (reverse != LList.Empty) {
                Pair arg02 = (Pair) reverse;
                Object var$Mnval = arg02.getCar();
                var = C0214lists.car.apply1(var$Mnval);
                addToGlobalVarEnvironment((Symbol) var, Scheme.applyToArgs.apply1(C0214lists.cadr.apply1(var$Mnval)));
                reverse = arg02.getCdr();
            }
            reverse2 = C0214lists.reverse(this.form$Mndo$Mnafter$Mncreation);
            while (reverse2 != LList.Empty) {
                Pair arg03 = (Pair) reverse2;
                misc.force(arg03.getCar());
                reverse2 = arg03.getCdr();
            }
            LList component$Mndescriptors = C0214lists.reverse(this.components$Mnto$Mncreate);
            obj = component$Mndescriptors;
            while (obj != LList.Empty) {
                Pair arg04 = (Pair) obj;
                Object component$Mninfo = arg04.getCar();
                component$Mnname = C0214lists.caddr.apply1(component$Mninfo);
                C0214lists.cadddr.apply1(component$Mninfo);
                Object component$Mnobject = Invoke.make.apply2(C0214lists.cadr.apply1(component$Mninfo), lookupInFormEnvironment((Symbol) C0214lists.car.apply1(component$Mninfo)));
                SlotSet.set$Mnfield$Ex.apply3(this, component$Mnname, component$Mnobject);
                addToFormEnvironment((Symbol) component$Mnname, component$Mnobject);
                obj = arg04.getCdr();
            }
            obj2 = component$Mndescriptors;
            while (obj2 != LList.Empty) {
                Pair arg05 = (Pair) obj2;
                Object component$Mninfo2 = arg05.getCar();
                C0214lists.caddr.apply1(component$Mninfo2);
                Object init$Mnthunk = C0214lists.cadddr.apply1(component$Mninfo2);
                if (init$Mnthunk != Boolean.FALSE) {
                    Scheme.applyToArgs.apply1(init$Mnthunk);
                }
                obj2 = arg05.getCdr();
            }
            obj3 = component$Mndescriptors;
            while (obj3 != LList.Empty) {
                Pair arg06 = (Pair) obj3;
                Object component$Mninfo3 = arg06.getCar();
                Object component$Mnname2 = C0214lists.caddr.apply1(component$Mninfo3);
                C0214lists.cadddr.apply1(component$Mninfo3);
                callInitialize(SlotGet.field.apply2(this, component$Mnname2));
                obj3 = arg06.getCdr();
            }
        } catch (ClassCastException e2) {
            throw new WrongType(e2, "arg0", -2, obj3);
        } catch (ClassCastException e3) {
            throw new WrongType(e3, "arg0", -2, obj2);
        } catch (ClassCastException e4) {
            throw new WrongType(e4, "add-to-form-environment", 0, component$Mnname);
        } catch (ClassCastException e5) {
            throw new WrongType(e5, "lookup-in-form-environment", 0, obj4);
        } catch (ClassCastException e6) {
            throw new WrongType(e6, "arg0", -2, obj);
        } catch (ClassCastException e7) {
            throw new WrongType(e7, "arg0", -2, reverse2);
        } catch (ClassCastException e8) {
            throw new WrongType(e8, "add-to-global-var-environment", 0, var);
        } catch (ClassCastException e9) {
            throw new WrongType(e9, "arg0", -2, reverse);
        } catch (YailRuntimeError exception2) {
            processException(exception2);
        }
    }

    public static SimpleSymbol lambda1symbolAppend$V(Object[] argsArray) {
        LList symbols = LList.makeList(argsArray, 0);
        Apply apply = Scheme.apply;
        ModuleMethod moduleMethod = strings.string$Mnappend;
        Object obj = LList.Empty;
        LList lList = symbols;
        while (lList != LList.Empty) {
            try {
                Pair arg0 = (Pair) lList;
                Object arg02 = arg0.getCdr();
                Object car = arg0.getCar();
                try {
                    obj = Pair.make(misc.symbol$To$String((Symbol) car), obj);
                    lList = arg02;
                } catch (ClassCastException e) {
                    throw new WrongType(e, "symbol->string", 1, car);
                }
            } catch (ClassCastException e2) {
                throw new WrongType(e2, "arg0", -2, lList);
            }
        }
        Object apply2 = apply.apply2(moduleMethod, LList.reverseInPlace(obj));
        try {
            return misc.string$To$Symbol((CharSequence) apply2);
        } catch (ClassCastException e3) {
            throw new WrongType(e3, "string->symbol", 1, apply2);
        }
    }

    static Object lambda2() {
        return null;
    }
}
