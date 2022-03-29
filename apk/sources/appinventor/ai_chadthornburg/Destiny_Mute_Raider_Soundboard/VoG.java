package appinventor.ai_chadthornburg.Destiny_Mute_Raider_Soundboard;

import com.google.appinventor.components.common.PropertyTypeConstants;
import com.google.appinventor.components.runtime.Button;
import com.google.appinventor.components.runtime.Component;
import com.google.appinventor.components.runtime.EventDispatcher;
import com.google.appinventor.components.runtime.Form;
import com.google.appinventor.components.runtime.HandlesEventDispatching;
import com.google.appinventor.components.runtime.HorizontalArrangement;
import com.google.appinventor.components.runtime.Label;
import com.google.appinventor.components.runtime.Player;
import com.google.appinventor.components.runtime.VerticalArrangement;
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
import gnu.text.PrettyWriter;
import kawa.lang.Promise;
import kawa.lib.C0214lists;
import kawa.lib.misc;
import kawa.lib.strings;
import kawa.standard.Scheme;
import kawa.standard.require;

/* compiled from: VoG.yail */
public class VoG extends Form implements Runnable {
    static final SimpleSymbol Lit0 = ((SimpleSymbol) new SimpleSymbol("VoG").readResolve());
    static final SimpleSymbol Lit1 = ((SimpleSymbol) new SimpleSymbol("getMessage").readResolve());
    static final SimpleSymbol Lit10 = ((SimpleSymbol) new SimpleSymbol("Title").readResolve());
    static final SimpleSymbol Lit100 = ((SimpleSymbol) new SimpleSymbol("SoloLeft$Click").readResolve());
    static final FString Lit101 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit102 = ((SimpleSymbol) new SimpleSymbol("SoloRight").readResolve());
    static final IntNum Lit103 = IntNum.make(-1045);
    static final FString Lit104 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit105 = ((SimpleSymbol) new SimpleSymbol("SoloRight$Click").readResolve());
    static final FString Lit106 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit107 = ((SimpleSymbol) new SimpleSymbol("AtheonChallengeLabel").readResolve());
    static final FString Lit108 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit109 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final FString Lit11 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit110 = ((SimpleSymbol) new SimpleSymbol("AssignmentArrangement").readResolve());
    static final FString Lit111 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final FString Lit112 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit113 = ((SimpleSymbol) new SimpleSymbol("Assignment").readResolve());
    static final IntNum Lit114 = IntNum.make(-1090);
    static final FString Lit115 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit116 = ((SimpleSymbol) new SimpleSymbol("Assignment$Click").readResolve());
    static final FString Lit117 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit118 = ((SimpleSymbol) new SimpleSymbol("KillOracleNumberLabel").readResolve());
    static final FString Lit119 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit12 = ((SimpleSymbol) new SimpleSymbol("Navigation").readResolve());
    static final FString Lit120 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final SimpleSymbol Lit121 = ((SimpleSymbol) new SimpleSymbol("OracleNumbersArrangement").readResolve());
    static final FString Lit122 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final FString Lit123 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit124 = ((SimpleSymbol) new SimpleSymbol("Oracle1").readResolve());
    static final IntNum Lit125 = IntNum.make(-1080);
    static final FString Lit126 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit127 = ((SimpleSymbol) new SimpleSymbol("Oracle1$Click").readResolve());
    static final FString Lit128 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit129 = ((SimpleSymbol) new SimpleSymbol("Oracle2").readResolve());
    static final SimpleSymbol Lit13 = ((SimpleSymbol) new SimpleSymbol("AlignHorizontal").readResolve());
    static final IntNum Lit130 = IntNum.make(-1080);
    static final FString Lit131 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit132 = ((SimpleSymbol) new SimpleSymbol("Oracle2$Click").readResolve());
    static final FString Lit133 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit134 = ((SimpleSymbol) new SimpleSymbol("Oracle3").readResolve());
    static final IntNum Lit135 = IntNum.make(-1080);
    static final FString Lit136 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit137 = ((SimpleSymbol) new SimpleSymbol("Oracle3$Click").readResolve());
    static final FString Lit138 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit139 = ((SimpleSymbol) new SimpleSymbol("Oracle4").readResolve());
    static final IntNum Lit14 = IntNum.make(3);
    static final IntNum Lit140 = IntNum.make(-1080);
    static final FString Lit141 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit142 = ((SimpleSymbol) new SimpleSymbol("Oracle4$Click").readResolve());
    static final FString Lit143 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit144 = ((SimpleSymbol) new SimpleSymbol("Oracle5").readResolve());
    static final IntNum Lit145 = IntNum.make(-1080);
    static final FString Lit146 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit147 = ((SimpleSymbol) new SimpleSymbol("Oracle5$Click").readResolve());
    static final FString Lit148 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit149 = ((SimpleSymbol) new SimpleSymbol("Oracle6").readResolve());
    static final SimpleSymbol Lit15 = ((SimpleSymbol) new SimpleSymbol("AlignVertical").readResolve());
    static final IntNum Lit150 = IntNum.make(-1080);
    static final FString Lit151 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit152 = ((SimpleSymbol) new SimpleSymbol("Oracle6$Click").readResolve());
    static final FString Lit153 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit154 = ((SimpleSymbol) new SimpleSymbol("NeedCleanse").readResolve());
    static final FString Lit155 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit156 = ((SimpleSymbol) new SimpleSymbol("NeedCleanse$Click").readResolve());
    static final FString Lit157 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit158 = ((SimpleSymbol) new SimpleSymbol("Countdown").readResolve());
    static final FString Lit159 = new FString("com.google.appinventor.components.runtime.Button");
    static final IntNum Lit16 = IntNum.make(2);
    static final SimpleSymbol Lit160 = ((SimpleSymbol) new SimpleSymbol("Countdown$Click").readResolve());
    static final FString Lit161 = new FString("com.google.appinventor.components.runtime.Player");
    static final FString Lit162 = new FString("com.google.appinventor.components.runtime.Player");
    static final SimpleSymbol Lit163 = ((SimpleSymbol) new SimpleSymbol("android-log-form").readResolve());
    static final SimpleSymbol Lit164 = ((SimpleSymbol) new SimpleSymbol("add-to-form-environment").readResolve());
    static final SimpleSymbol Lit165 = ((SimpleSymbol) new SimpleSymbol("lookup-in-form-environment").readResolve());
    static final SimpleSymbol Lit166 = ((SimpleSymbol) new SimpleSymbol("is-bound-in-form-environment").readResolve());
    static final SimpleSymbol Lit167 = ((SimpleSymbol) new SimpleSymbol("add-to-global-var-environment").readResolve());
    static final SimpleSymbol Lit168 = ((SimpleSymbol) new SimpleSymbol("add-to-events").readResolve());
    static final SimpleSymbol Lit169 = ((SimpleSymbol) new SimpleSymbol("add-to-components").readResolve());
    static final SimpleSymbol Lit17 = ((SimpleSymbol) new SimpleSymbol("Width").readResolve());
    static final SimpleSymbol Lit170 = ((SimpleSymbol) new SimpleSymbol("add-to-global-vars").readResolve());
    static final SimpleSymbol Lit171 = ((SimpleSymbol) new SimpleSymbol("add-to-form-do-after-creation").readResolve());
    static final SimpleSymbol Lit172 = ((SimpleSymbol) new SimpleSymbol("send-error").readResolve());
    static final SimpleSymbol Lit173 = ((SimpleSymbol) new SimpleSymbol("dispatchEvent").readResolve());
    static final SimpleSymbol Lit174 = ((SimpleSymbol) new SimpleSymbol("lookup-handler").readResolve());
    static final IntNum Lit18 = IntNum.make(-2);
    static final FString Lit19 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit2 = ((SimpleSymbol) new SimpleSymbol("*the-null-value*").readResolve());
    static final FString Lit20 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit21 = ((SimpleSymbol) new SimpleSymbol("General").readResolve());
    static final IntNum Lit22;
    static final SimpleSymbol Lit23 = ((SimpleSymbol) new SimpleSymbol("FontBold").readResolve());
    static final SimpleSymbol Lit24 = ((SimpleSymbol) new SimpleSymbol("Text").readResolve());
    static final FString Lit25 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit26 = PairWithPosition.make(Lit4, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\VoG.yail", 159822);
    static final SimpleSymbol Lit27 = ((SimpleSymbol) new SimpleSymbol("General$Click").readResolve());
    static final SimpleSymbol Lit28 = ((SimpleSymbol) new SimpleSymbol("Click").readResolve());
    static final FString Lit29 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit3 = ((SimpleSymbol) new SimpleSymbol("AppName").readResolve());
    static final SimpleSymbol Lit30 = ((SimpleSymbol) new SimpleSymbol("CE").readResolve());
    static final IntNum Lit31;
    static final IntNum Lit32 = IntNum.make(-1020);
    static final FString Lit33 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit34 = PairWithPosition.make(Lit4, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\VoG.yail", 221257);
    static final SimpleSymbol Lit35 = ((SimpleSymbol) new SimpleSymbol("CE$Click").readResolve());
    static final FString Lit36 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit37 = ((SimpleSymbol) new SimpleSymbol("KF").readResolve());
    static final IntNum Lit38;
    static final IntNum Lit39 = IntNum.make(-1020);
    static final SimpleSymbol Lit4;
    static final FString Lit40 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit41 = PairWithPosition.make(Lit4, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\VoG.yail", 282697);
    static final SimpleSymbol Lit42 = ((SimpleSymbol) new SimpleSymbol("KF$Click").readResolve());
    static final FString Lit43 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit44 = ((SimpleSymbol) new SimpleSymbol("WoTM").readResolve());
    static final IntNum Lit45;
    static final IntNum Lit46 = IntNum.make(-1020);
    static final FString Lit47 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit48;
    static final SimpleSymbol Lit49 = ((SimpleSymbol) new SimpleSymbol("WoTM$Click").readResolve());
    static final SimpleSymbol Lit5 = ((SimpleSymbol) new SimpleSymbol("BackgroundColor").readResolve());
    static final FString Lit50 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit51 = ((SimpleSymbol) new SimpleSymbol("PlatesLabel").readResolve());
    static final FString Lit52 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit53 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit54 = ((SimpleSymbol) new SimpleSymbol("PlatesArrangement").readResolve());
    static final FString Lit55 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final FString Lit56 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit57 = ((SimpleSymbol) new SimpleSymbol("Left").readResolve());
    static final IntNum Lit58 = IntNum.make(-1030);
    static final FString Lit59 = new FString("com.google.appinventor.components.runtime.Button");
    static final IntNum Lit6;
    static final SimpleSymbol Lit60 = ((SimpleSymbol) new SimpleSymbol("Player1").readResolve());
    static final SimpleSymbol Lit61 = ((SimpleSymbol) new SimpleSymbol("Source").readResolve());
    static final SimpleSymbol Lit62 = ((SimpleSymbol) new SimpleSymbol("Start").readResolve());
    static final SimpleSymbol Lit63 = ((SimpleSymbol) new SimpleSymbol("Left$Click").readResolve());
    static final FString Lit64 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit65 = ((SimpleSymbol) new SimpleSymbol("Middle").readResolve());
    static final IntNum Lit66 = IntNum.make(-1030);
    static final FString Lit67 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit68 = ((SimpleSymbol) new SimpleSymbol("Middle$Click").readResolve());
    static final FString Lit69 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit7 = ((SimpleSymbol) new SimpleSymbol("number").readResolve());
    static final SimpleSymbol Lit70 = ((SimpleSymbol) new SimpleSymbol("Right").readResolve());
    static final IntNum Lit71 = IntNum.make(-1030);
    static final FString Lit72 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit73 = ((SimpleSymbol) new SimpleSymbol("Right$Click").readResolve());
    static final FString Lit74 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit75 = ((SimpleSymbol) new SimpleSymbol("TemplarLabel").readResolve());
    static final FString Lit76 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit77 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit78 = ((SimpleSymbol) new SimpleSymbol("TemplarArrangement").readResolve());
    static final FString Lit79 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit8 = ((SimpleSymbol) new SimpleSymbol("Scrollable").readResolve());
    static final FString Lit80 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit81 = ((SimpleSymbol) new SimpleSymbol("Relic").readResolve());
    static final IntNum Lit82 = IntNum.make(-1045);
    static final FString Lit83 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit84 = ((SimpleSymbol) new SimpleSymbol("Relic$Click").readResolve());
    static final FString Lit85 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit86 = ((SimpleSymbol) new SimpleSymbol("ShootTheBoss").readResolve());
    static final IntNum Lit87 = IntNum.make(-1045);
    static final FString Lit88 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit89 = ((SimpleSymbol) new SimpleSymbol("ShootTheBoss$Click").readResolve());
    static final SimpleSymbol Lit9 = ((SimpleSymbol) new SimpleSymbol(PropertyTypeConstants.PROPERTY_TYPE_BOOLEAN).readResolve());
    static final FString Lit90 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit91 = ((SimpleSymbol) new SimpleSymbol("GatekeepersLabel").readResolve());
    static final FString Lit92 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit93 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit94 = ((SimpleSymbol) new SimpleSymbol("GatekeepersArrangement").readResolve());
    static final FString Lit95 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final FString Lit96 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit97 = ((SimpleSymbol) new SimpleSymbol("SoloLeft").readResolve());
    static final IntNum Lit98 = IntNum.make(-1045);
    static final FString Lit99 = new FString("com.google.appinventor.components.runtime.Button");
    public static VoG VoG;
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
    static final ModuleMethod lambda$Fn31 = null;
    static final ModuleMethod lambda$Fn32 = null;
    static final ModuleMethod lambda$Fn33 = null;
    static final ModuleMethod lambda$Fn34 = null;
    static final ModuleMethod lambda$Fn35 = null;
    static final ModuleMethod lambda$Fn36 = null;
    static final ModuleMethod lambda$Fn37 = null;
    static final ModuleMethod lambda$Fn38 = null;
    static final ModuleMethod lambda$Fn39 = null;
    static final ModuleMethod lambda$Fn4 = null;
    static final ModuleMethod lambda$Fn40 = null;
    static final ModuleMethod lambda$Fn41 = null;
    static final ModuleMethod lambda$Fn42 = null;
    static final ModuleMethod lambda$Fn43 = null;
    static final ModuleMethod lambda$Fn44 = null;
    static final ModuleMethod lambda$Fn45 = null;
    static final ModuleMethod lambda$Fn46 = null;
    static final ModuleMethod lambda$Fn47 = null;
    static final ModuleMethod lambda$Fn48 = null;
    static final ModuleMethod lambda$Fn49 = null;
    static final ModuleMethod lambda$Fn5 = null;
    static final ModuleMethod lambda$Fn50 = null;
    static final ModuleMethod lambda$Fn51 = null;
    static final ModuleMethod lambda$Fn52 = null;
    static final ModuleMethod lambda$Fn53 = null;
    static final ModuleMethod lambda$Fn54 = null;
    static final ModuleMethod lambda$Fn55 = null;
    static final ModuleMethod lambda$Fn56 = null;
    static final ModuleMethod lambda$Fn57 = null;
    static final ModuleMethod lambda$Fn58 = null;
    static final ModuleMethod lambda$Fn59 = null;
    static final ModuleMethod lambda$Fn6 = null;
    static final ModuleMethod lambda$Fn60 = null;
    static final ModuleMethod lambda$Fn61 = null;
    static final ModuleMethod lambda$Fn62 = null;
    static final ModuleMethod lambda$Fn63 = null;
    static final ModuleMethod lambda$Fn64 = null;
    static final ModuleMethod lambda$Fn7 = null;
    static final ModuleMethod lambda$Fn8 = null;
    static final ModuleMethod lambda$Fn9 = null;
    public Boolean $Stdebug$Mnform$St;
    public final ModuleMethod $define;
    public Button Assignment;
    public final ModuleMethod Assignment$Click;
    public HorizontalArrangement AssignmentArrangement;
    public Label AtheonChallengeLabel;

    /* renamed from: CE */
    public Button f7CE;
    public final ModuleMethod CE$Click;
    public Button Countdown;
    public final ModuleMethod Countdown$Click;
    public HorizontalArrangement GatekeepersArrangement;
    public Label GatekeepersLabel;
    public Button General;
    public final ModuleMethod General$Click;

    /* renamed from: KF */
    public Button f8KF;
    public final ModuleMethod KF$Click;
    public Label KillOracleNumberLabel;
    public Button Left;
    public final ModuleMethod Left$Click;
    public Button Middle;
    public final ModuleMethod Middle$Click;
    public HorizontalArrangement Navigation;
    public Button NeedCleanse;
    public final ModuleMethod NeedCleanse$Click;
    public Button Oracle1;
    public final ModuleMethod Oracle1$Click;
    public Button Oracle2;
    public final ModuleMethod Oracle2$Click;
    public Button Oracle3;
    public final ModuleMethod Oracle3$Click;
    public Button Oracle4;
    public final ModuleMethod Oracle4$Click;
    public Button Oracle5;
    public final ModuleMethod Oracle5$Click;
    public Button Oracle6;
    public final ModuleMethod Oracle6$Click;
    public VerticalArrangement OracleNumbersArrangement;
    public HorizontalArrangement PlatesArrangement;
    public Label PlatesLabel;
    public Player Player1;
    public Button Relic;
    public final ModuleMethod Relic$Click;
    public Button Right;
    public final ModuleMethod Right$Click;
    public Button ShootTheBoss;
    public final ModuleMethod ShootTheBoss$Click;
    public Button SoloLeft;
    public final ModuleMethod SoloLeft$Click;
    public Button SoloRight;
    public final ModuleMethod SoloRight$Click;
    public HorizontalArrangement TemplarArrangement;
    public Label TemplarLabel;
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
        Lit48 = PairWithPosition.make(simpleSymbol, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\VoG.yail", 344139);
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
        iArr4[0] = -1;
        Lit22 = IntNum.make(iArr4);
        int[] iArr5 = new int[2];
        iArr5[0] = -14336;
        Lit6 = IntNum.make(iArr5);
    }

    public VoG() {
        ModuleInfo.register(this);
        frame frame2 = new frame();
        frame2.$main = this;
        this.android$Mnlog$Mnform = new ModuleMethod(frame2, 1, Lit163, 4097);
        this.add$Mnto$Mnform$Mnenvironment = new ModuleMethod(frame2, 2, Lit164, 8194);
        this.lookup$Mnin$Mnform$Mnenvironment = new ModuleMethod(frame2, 3, Lit165, 8193);
        this.is$Mnbound$Mnin$Mnform$Mnenvironment = new ModuleMethod(frame2, 5, Lit166, 4097);
        this.add$Mnto$Mnglobal$Mnvar$Mnenvironment = new ModuleMethod(frame2, 6, Lit167, 8194);
        this.add$Mnto$Mnevents = new ModuleMethod(frame2, 7, Lit168, 8194);
        this.add$Mnto$Mncomponents = new ModuleMethod(frame2, 8, Lit169, 16388);
        this.add$Mnto$Mnglobal$Mnvars = new ModuleMethod(frame2, 9, Lit170, 8194);
        this.add$Mnto$Mnform$Mndo$Mnafter$Mncreation = new ModuleMethod(frame2, 10, Lit171, 4097);
        this.send$Mnerror = new ModuleMethod(frame2, 11, Lit172, 4097);
        this.process$Mnexception = new ModuleMethod(frame2, 12, "process-exception", 4097);
        this.dispatchEvent = new ModuleMethod(frame2, 13, Lit173, 16388);
        this.lookup$Mnhandler = new ModuleMethod(frame2, 14, Lit174, 8194);
        ModuleMethod moduleMethod = new ModuleMethod(frame2, 15, (Object) null, 0);
        moduleMethod.setProperty("source-location", "C:\\Users\\Owner\\AppData\\Local\\Temp\\runtime1744045922481620487.scm:552");
        lambda$Fn1 = moduleMethod;
        this.$define = new ModuleMethod(frame2, 16, "$define", 0);
        lambda$Fn2 = new ModuleMethod(frame2, 17, (Object) null, 0);
        lambda$Fn3 = new ModuleMethod(frame2, 18, (Object) null, 0);
        lambda$Fn4 = new ModuleMethod(frame2, 19, (Object) null, 0);
        lambda$Fn5 = new ModuleMethod(frame2, 20, (Object) null, 0);
        lambda$Fn6 = new ModuleMethod(frame2, 21, (Object) null, 0);
        this.General$Click = new ModuleMethod(frame2, 22, Lit27, 0);
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
        lambda$Fn17 = new ModuleMethod(frame2, 36, (Object) null, 0);
        lambda$Fn18 = new ModuleMethod(frame2, 37, (Object) null, 0);
        this.Left$Click = new ModuleMethod(frame2, 38, Lit63, 0);
        lambda$Fn19 = new ModuleMethod(frame2, 39, (Object) null, 0);
        lambda$Fn20 = new ModuleMethod(frame2, 40, (Object) null, 0);
        this.Middle$Click = new ModuleMethod(frame2, 41, Lit68, 0);
        lambda$Fn21 = new ModuleMethod(frame2, 42, (Object) null, 0);
        lambda$Fn22 = new ModuleMethod(frame2, 43, (Object) null, 0);
        this.Right$Click = new ModuleMethod(frame2, 44, Lit73, 0);
        lambda$Fn23 = new ModuleMethod(frame2, 45, (Object) null, 0);
        lambda$Fn24 = new ModuleMethod(frame2, 46, (Object) null, 0);
        lambda$Fn25 = new ModuleMethod(frame2, 47, (Object) null, 0);
        lambda$Fn26 = new ModuleMethod(frame2, 48, (Object) null, 0);
        lambda$Fn27 = new ModuleMethod(frame2, 49, (Object) null, 0);
        lambda$Fn28 = new ModuleMethod(frame2, 50, (Object) null, 0);
        this.Relic$Click = new ModuleMethod(frame2, 51, Lit84, 0);
        lambda$Fn29 = new ModuleMethod(frame2, 52, (Object) null, 0);
        lambda$Fn30 = new ModuleMethod(frame2, 53, (Object) null, 0);
        this.ShootTheBoss$Click = new ModuleMethod(frame2, 54, Lit89, 0);
        lambda$Fn31 = new ModuleMethod(frame2, 55, (Object) null, 0);
        lambda$Fn32 = new ModuleMethod(frame2, 56, (Object) null, 0);
        lambda$Fn33 = new ModuleMethod(frame2, 57, (Object) null, 0);
        lambda$Fn34 = new ModuleMethod(frame2, 58, (Object) null, 0);
        lambda$Fn35 = new ModuleMethod(frame2, 59, (Object) null, 0);
        lambda$Fn36 = new ModuleMethod(frame2, 60, (Object) null, 0);
        this.SoloLeft$Click = new ModuleMethod(frame2, 61, Lit100, 0);
        lambda$Fn37 = new ModuleMethod(frame2, 62, (Object) null, 0);
        lambda$Fn38 = new ModuleMethod(frame2, 63, (Object) null, 0);
        this.SoloRight$Click = new ModuleMethod(frame2, 64, Lit105, 0);
        lambda$Fn39 = new ModuleMethod(frame2, 65, (Object) null, 0);
        lambda$Fn40 = new ModuleMethod(frame2, 66, (Object) null, 0);
        lambda$Fn41 = new ModuleMethod(frame2, 67, (Object) null, 0);
        lambda$Fn42 = new ModuleMethod(frame2, 68, (Object) null, 0);
        lambda$Fn43 = new ModuleMethod(frame2, 69, (Object) null, 0);
        lambda$Fn44 = new ModuleMethod(frame2, 70, (Object) null, 0);
        this.Assignment$Click = new ModuleMethod(frame2, 71, Lit116, 0);
        lambda$Fn45 = new ModuleMethod(frame2, 72, (Object) null, 0);
        lambda$Fn46 = new ModuleMethod(frame2, 73, (Object) null, 0);
        lambda$Fn47 = new ModuleMethod(frame2, 74, (Object) null, 0);
        lambda$Fn48 = new ModuleMethod(frame2, 75, (Object) null, 0);
        lambda$Fn49 = new ModuleMethod(frame2, 76, (Object) null, 0);
        lambda$Fn50 = new ModuleMethod(frame2, 77, (Object) null, 0);
        this.Oracle1$Click = new ModuleMethod(frame2, 78, Lit127, 0);
        lambda$Fn51 = new ModuleMethod(frame2, 79, (Object) null, 0);
        lambda$Fn52 = new ModuleMethod(frame2, 80, (Object) null, 0);
        this.Oracle2$Click = new ModuleMethod(frame2, 81, Lit132, 0);
        lambda$Fn53 = new ModuleMethod(frame2, 82, (Object) null, 0);
        lambda$Fn54 = new ModuleMethod(frame2, 83, (Object) null, 0);
        this.Oracle3$Click = new ModuleMethod(frame2, 84, Lit137, 0);
        lambda$Fn55 = new ModuleMethod(frame2, 85, (Object) null, 0);
        lambda$Fn56 = new ModuleMethod(frame2, 86, (Object) null, 0);
        this.Oracle4$Click = new ModuleMethod(frame2, 87, Lit142, 0);
        lambda$Fn57 = new ModuleMethod(frame2, 88, (Object) null, 0);
        lambda$Fn58 = new ModuleMethod(frame2, 89, (Object) null, 0);
        this.Oracle5$Click = new ModuleMethod(frame2, 90, Lit147, 0);
        lambda$Fn59 = new ModuleMethod(frame2, 91, (Object) null, 0);
        lambda$Fn60 = new ModuleMethod(frame2, 92, (Object) null, 0);
        this.Oracle6$Click = new ModuleMethod(frame2, 93, Lit152, 0);
        lambda$Fn61 = new ModuleMethod(frame2, 94, (Object) null, 0);
        lambda$Fn62 = new ModuleMethod(frame2, 95, (Object) null, 0);
        this.NeedCleanse$Click = new ModuleMethod(frame2, 96, Lit156, 0);
        lambda$Fn63 = new ModuleMethod(frame2, 97, (Object) null, 0);
        lambda$Fn64 = new ModuleMethod(frame2, 98, (Object) null, 0);
        this.Countdown$Click = new ModuleMethod(frame2, 99, Lit160, 0);
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
            VoG = null;
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
                    C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit5, Lit6, Lit7);
                    C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit8, Boolean.TRUE, Lit9);
                    Values.writeValues(C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit10, "VoG", Lit4), $result);
                } else {
                    addToFormDoAfterCreation(new Promise(lambda$Fn2));
                }
                this.Navigation = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit11, Lit12, lambda$Fn3), $result);
                } else {
                    addToComponents(Lit0, Lit19, Lit12, lambda$Fn4);
                }
                this.General = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit12, Lit20, Lit21, lambda$Fn5), $result);
                } else {
                    addToComponents(Lit12, Lit25, Lit21, lambda$Fn6);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit27, this.General$Click);
                } else {
                    addToFormEnvironment(Lit27, this.General$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "General", "Click");
                } else {
                    addToEvents(Lit21, Lit28);
                }
                this.f7CE = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit12, Lit29, Lit30, lambda$Fn7), $result);
                } else {
                    addToComponents(Lit12, Lit33, Lit30, lambda$Fn8);
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
                this.f8KF = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit12, Lit36, Lit37, lambda$Fn9), $result);
                } else {
                    addToComponents(Lit12, Lit40, Lit37, lambda$Fn10);
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
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit12, Lit43, Lit44, lambda$Fn11), $result);
                } else {
                    addToComponents(Lit12, Lit47, Lit44, lambda$Fn12);
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
                this.PlatesLabel = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit50, Lit51, lambda$Fn13), $result);
                } else {
                    addToComponents(Lit0, Lit52, Lit51, lambda$Fn14);
                }
                this.PlatesArrangement = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit53, Lit54, lambda$Fn15), $result);
                } else {
                    addToComponents(Lit0, Lit55, Lit54, lambda$Fn16);
                }
                this.Left = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit54, Lit56, Lit57, lambda$Fn17), $result);
                } else {
                    addToComponents(Lit54, Lit59, Lit57, lambda$Fn18);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit63, this.Left$Click);
                } else {
                    addToFormEnvironment(Lit63, this.Left$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Left", "Click");
                } else {
                    addToEvents(Lit57, Lit28);
                }
                this.Middle = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit54, Lit64, Lit65, lambda$Fn19), $result);
                } else {
                    addToComponents(Lit54, Lit67, Lit65, lambda$Fn20);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit68, this.Middle$Click);
                } else {
                    addToFormEnvironment(Lit68, this.Middle$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Middle", "Click");
                } else {
                    addToEvents(Lit65, Lit28);
                }
                this.Right = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit54, Lit69, Lit70, lambda$Fn21), $result);
                } else {
                    addToComponents(Lit54, Lit72, Lit70, lambda$Fn22);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit73, this.Right$Click);
                } else {
                    addToFormEnvironment(Lit73, this.Right$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Right", "Click");
                } else {
                    addToEvents(Lit70, Lit28);
                }
                this.TemplarLabel = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit74, Lit75, lambda$Fn23), $result);
                } else {
                    addToComponents(Lit0, Lit76, Lit75, lambda$Fn24);
                }
                this.TemplarArrangement = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit77, Lit78, lambda$Fn25), $result);
                } else {
                    addToComponents(Lit0, Lit79, Lit78, lambda$Fn26);
                }
                this.Relic = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit78, Lit80, Lit81, lambda$Fn27), $result);
                } else {
                    addToComponents(Lit78, Lit83, Lit81, lambda$Fn28);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit84, this.Relic$Click);
                } else {
                    addToFormEnvironment(Lit84, this.Relic$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Relic", "Click");
                } else {
                    addToEvents(Lit81, Lit28);
                }
                this.ShootTheBoss = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit78, Lit85, Lit86, lambda$Fn29), $result);
                } else {
                    addToComponents(Lit78, Lit88, Lit86, lambda$Fn30);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit89, this.ShootTheBoss$Click);
                } else {
                    addToFormEnvironment(Lit89, this.ShootTheBoss$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "ShootTheBoss", "Click");
                } else {
                    addToEvents(Lit86, Lit28);
                }
                this.GatekeepersLabel = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit90, Lit91, lambda$Fn31), $result);
                } else {
                    addToComponents(Lit0, Lit92, Lit91, lambda$Fn32);
                }
                this.GatekeepersArrangement = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit93, Lit94, lambda$Fn33), $result);
                } else {
                    addToComponents(Lit0, Lit95, Lit94, lambda$Fn34);
                }
                this.SoloLeft = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit94, Lit96, Lit97, lambda$Fn35), $result);
                } else {
                    addToComponents(Lit94, Lit99, Lit97, lambda$Fn36);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit100, this.SoloLeft$Click);
                } else {
                    addToFormEnvironment(Lit100, this.SoloLeft$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "SoloLeft", "Click");
                } else {
                    addToEvents(Lit97, Lit28);
                }
                this.SoloRight = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit94, Lit101, Lit102, lambda$Fn37), $result);
                } else {
                    addToComponents(Lit94, Lit104, Lit102, lambda$Fn38);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit105, this.SoloRight$Click);
                } else {
                    addToFormEnvironment(Lit105, this.SoloRight$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "SoloRight", "Click");
                } else {
                    addToEvents(Lit102, Lit28);
                }
                this.AtheonChallengeLabel = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit106, Lit107, lambda$Fn39), $result);
                } else {
                    addToComponents(Lit0, Lit108, Lit107, lambda$Fn40);
                }
                this.AssignmentArrangement = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit109, Lit110, lambda$Fn41), $result);
                } else {
                    addToComponents(Lit0, Lit111, Lit110, lambda$Fn42);
                }
                this.Assignment = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit110, Lit112, Lit113, lambda$Fn43), $result);
                } else {
                    addToComponents(Lit110, Lit115, Lit113, lambda$Fn44);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit116, this.Assignment$Click);
                } else {
                    addToFormEnvironment(Lit116, this.Assignment$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Assignment", "Click");
                } else {
                    addToEvents(Lit113, Lit28);
                }
                this.KillOracleNumberLabel = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit117, Lit118, lambda$Fn45), $result);
                } else {
                    addToComponents(Lit0, Lit119, Lit118, lambda$Fn46);
                }
                this.OracleNumbersArrangement = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit120, Lit121, lambda$Fn47), $result);
                } else {
                    addToComponents(Lit0, Lit122, Lit121, lambda$Fn48);
                }
                this.Oracle1 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit121, Lit123, Lit124, lambda$Fn49), $result);
                } else {
                    addToComponents(Lit121, Lit126, Lit124, lambda$Fn50);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit127, this.Oracle1$Click);
                } else {
                    addToFormEnvironment(Lit127, this.Oracle1$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Oracle1", "Click");
                } else {
                    addToEvents(Lit124, Lit28);
                }
                this.Oracle2 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit121, Lit128, Lit129, lambda$Fn51), $result);
                } else {
                    addToComponents(Lit121, Lit131, Lit129, lambda$Fn52);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit132, this.Oracle2$Click);
                } else {
                    addToFormEnvironment(Lit132, this.Oracle2$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Oracle2", "Click");
                } else {
                    addToEvents(Lit129, Lit28);
                }
                this.Oracle3 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit121, Lit133, Lit134, lambda$Fn53), $result);
                } else {
                    addToComponents(Lit121, Lit136, Lit134, lambda$Fn54);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit137, this.Oracle3$Click);
                } else {
                    addToFormEnvironment(Lit137, this.Oracle3$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Oracle3", "Click");
                } else {
                    addToEvents(Lit134, Lit28);
                }
                this.Oracle4 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit121, Lit138, Lit139, lambda$Fn55), $result);
                } else {
                    addToComponents(Lit121, Lit141, Lit139, lambda$Fn56);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit142, this.Oracle4$Click);
                } else {
                    addToFormEnvironment(Lit142, this.Oracle4$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Oracle4", "Click");
                } else {
                    addToEvents(Lit139, Lit28);
                }
                this.Oracle5 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit121, Lit143, Lit144, lambda$Fn57), $result);
                } else {
                    addToComponents(Lit121, Lit146, Lit144, lambda$Fn58);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit147, this.Oracle5$Click);
                } else {
                    addToFormEnvironment(Lit147, this.Oracle5$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Oracle5", "Click");
                } else {
                    addToEvents(Lit144, Lit28);
                }
                this.Oracle6 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit121, Lit148, Lit149, lambda$Fn59), $result);
                } else {
                    addToComponents(Lit121, Lit151, Lit149, lambda$Fn60);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit152, this.Oracle6$Click);
                } else {
                    addToFormEnvironment(Lit152, this.Oracle6$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Oracle6", "Click");
                } else {
                    addToEvents(Lit149, Lit28);
                }
                this.NeedCleanse = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit153, Lit154, lambda$Fn61), $result);
                } else {
                    addToComponents(Lit0, Lit155, Lit154, lambda$Fn62);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit156, this.NeedCleanse$Click);
                } else {
                    addToFormEnvironment(Lit156, this.NeedCleanse$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "NeedCleanse", "Click");
                } else {
                    addToEvents(Lit154, Lit28);
                }
                this.Countdown = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit157, Lit158, lambda$Fn63), $result);
                } else {
                    addToComponents(Lit0, Lit159, Lit158, lambda$Fn64);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit160, this.Countdown$Click);
                } else {
                    addToFormEnvironment(Lit160, this.Countdown$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Countdown", "Click");
                } else {
                    addToEvents(Lit158, Lit28);
                }
                this.Player1 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit161, Lit60, Boolean.FALSE), $result);
                } else {
                    addToComponents(Lit0, Lit162, Lit60, Boolean.FALSE);
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
        C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit5, Lit6, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit8, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit10, "VoG", Lit4);
    }

    static Object lambda4() {
        C0202runtime.setAndCoerceProperty$Ex(Lit12, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit12, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit12, Lit17, Lit18, Lit7);
    }

    static Object lambda5() {
        C0202runtime.setAndCoerceProperty$Ex(Lit12, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit12, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit12, Lit17, Lit18, Lit7);
    }

    static Object lambda6() {
        C0202runtime.setAndCoerceProperty$Ex(Lit21, Lit5, Lit22, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit21, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit21, Lit24, "General", Lit4);
    }

    static Object lambda7() {
        C0202runtime.setAndCoerceProperty$Ex(Lit21, Lit5, Lit22, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit21, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit21, Lit24, "General", Lit4);
    }

    public Object General$Click() {
        C0202runtime.setThisForm();
        return C0202runtime.callYailPrimitive(C0202runtime.open$Mnanother$Mnscreen, LList.list1("Screen1"), Lit26, "open another screen");
    }

    static Object lambda8() {
        C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit5, Lit31, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit17, Lit32, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit24, "CE", Lit4);
    }

    static Object lambda9() {
        C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit5, Lit31, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit17, Lit32, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit24, "CE", Lit4);
    }

    public Object CE$Click() {
        C0202runtime.setThisForm();
        return C0202runtime.callYailPrimitive(C0202runtime.open$Mnanother$Mnscreen, LList.list1("CE"), Lit34, "open another screen");
    }

    static Object lambda10() {
        C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit5, Lit38, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit17, Lit39, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit24, "KF", Lit4);
    }

    static Object lambda11() {
        C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit5, Lit38, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit17, Lit39, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit24, "KF", Lit4);
    }

    public Object KF$Click() {
        C0202runtime.setThisForm();
        return C0202runtime.callYailPrimitive(C0202runtime.open$Mnanother$Mnscreen, LList.list1("KF"), Lit41, "open another screen");
    }

    static Object lambda12() {
        C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit5, Lit45, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit17, Lit46, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit24, "WoTM", Lit4);
    }

    static Object lambda13() {
        C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit5, Lit45, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit17, Lit46, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit24, "WoTM", Lit4);
    }

    public Object WoTM$Click() {
        C0202runtime.setThisForm();
        return C0202runtime.callYailPrimitive(C0202runtime.open$Mnanother$Mnscreen, LList.list1("WoTM"), Lit48, "open another screen");
    }

    static Object lambda14() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit51, Lit24, "Plates / Confluxes / Oracles", Lit4);
    }

    static Object lambda15() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit51, Lit24, "Plates / Confluxes / Oracles", Lit4);
    }

    static Object lambda16() {
        C0202runtime.setAndCoerceProperty$Ex(Lit54, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit54, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit54, Lit17, Lit18, Lit7);
    }

    static Object lambda17() {
        C0202runtime.setAndCoerceProperty$Ex(Lit54, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit54, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit54, Lit17, Lit18, Lit7);
    }

    static Object lambda18() {
        C0202runtime.setAndCoerceProperty$Ex(Lit57, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit57, Lit17, Lit58, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit57, Lit24, "Left", Lit4);
    }

    static Object lambda19() {
        C0202runtime.setAndCoerceProperty$Ex(Lit57, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit57, Lit17, Lit58, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit57, Lit24, "Left", Lit4);
    }

    public Object Left$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "CoverLeftSide.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda20() {
        C0202runtime.setAndCoerceProperty$Ex(Lit65, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit65, Lit17, Lit66, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit65, Lit24, "Middle", Lit4);
    }

    static Object lambda21() {
        C0202runtime.setAndCoerceProperty$Ex(Lit65, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit65, Lit17, Lit66, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit65, Lit24, "Middle", Lit4);
    }

    public Object Middle$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "CoverMiddle.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda22() {
        C0202runtime.setAndCoerceProperty$Ex(Lit70, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit70, Lit17, Lit71, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit70, Lit24, "Right", Lit4);
    }

    static Object lambda23() {
        C0202runtime.setAndCoerceProperty$Ex(Lit70, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit70, Lit17, Lit71, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit70, Lit24, "Right", Lit4);
    }

    public Object Right$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "CoverRightSide.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda24() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit24, "Templar", Lit4);
    }

    static Object lambda25() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit24, "Templar", Lit4);
    }

    static Object lambda26() {
        C0202runtime.setAndCoerceProperty$Ex(Lit78, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit78, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit78, Lit17, Lit18, Lit7);
    }

    static Object lambda27() {
        C0202runtime.setAndCoerceProperty$Ex(Lit78, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit78, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit78, Lit17, Lit18, Lit7);
    }

    static Object lambda28() {
        C0202runtime.setAndCoerceProperty$Ex(Lit81, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit81, Lit17, Lit82, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit81, Lit24, "I'll Take Relic", Lit4);
    }

    static Object lambda29() {
        C0202runtime.setAndCoerceProperty$Ex(Lit81, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit81, Lit17, Lit82, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit81, Lit24, "I'll Take Relic", Lit4);
    }

    public Object Relic$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "Relic.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda30() {
        C0202runtime.setAndCoerceProperty$Ex(Lit86, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit86, Lit17, Lit87, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit86, Lit24, "Shoot The Boss", Lit4);
    }

    static Object lambda31() {
        C0202runtime.setAndCoerceProperty$Ex(Lit86, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit86, Lit17, Lit87, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit86, Lit24, "Shoot The Boss", Lit4);
    }

    public Object ShootTheBoss$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "ShootTheBoss.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda32() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit91, Lit24, "Gatekeepers", Lit4);
    }

    static Object lambda33() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit91, Lit24, "Gatekeepers", Lit4);
    }

    static Object lambda34() {
        C0202runtime.setAndCoerceProperty$Ex(Lit94, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit94, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit94, Lit17, Lit18, Lit7);
    }

    static Object lambda35() {
        C0202runtime.setAndCoerceProperty$Ex(Lit94, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit94, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit94, Lit17, Lit18, Lit7);
    }

    static Object lambda36() {
        C0202runtime.setAndCoerceProperty$Ex(Lit97, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit97, Lit17, Lit98, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit97, Lit24, "I'll Solo Mars on Left", Lit4);
    }

    static Object lambda37() {
        C0202runtime.setAndCoerceProperty$Ex(Lit97, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit97, Lit17, Lit98, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit97, Lit24, "I'll Solo Mars on Left", Lit4);
    }

    public Object SoloLeft$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "SoloMarsOnLeft.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda38() {
        C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit17, Lit103, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit24, "I'll Solo Venus on Right", Lit4);
    }

    static Object lambda39() {
        C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit17, Lit103, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit24, "I'll Solo Venus on Right", Lit4);
    }

    public Object SoloRight$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "SoloVenusOnRight.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda40() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit107, Lit24, "Atheon Challenge", Lit4);
    }

    static Object lambda41() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit107, Lit24, "Atheon Challenge", Lit4);
    }

    static Object lambda42() {
        C0202runtime.setAndCoerceProperty$Ex(Lit110, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit110, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit110, Lit17, Lit18, Lit7);
    }

    static Object lambda43() {
        C0202runtime.setAndCoerceProperty$Ex(Lit110, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit110, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit110, Lit17, Lit18, Lit7);
    }

    static Object lambda44() {
        C0202runtime.setAndCoerceProperty$Ex(Lit113, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit113, Lit17, Lit114, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit113, Lit24, "1 if Teleported, 4 if not Teleported", Lit4);
    }

    static Object lambda45() {
        C0202runtime.setAndCoerceProperty$Ex(Lit113, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit113, Lit17, Lit114, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit113, Lit24, "1 if Teleported, 4 if not Teleported", Lit4);
    }

    public Object Assignment$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "1_if_Teleported_4_if_not_Teleported.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda46() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit118, Lit24, "I'll Kill Oracle #...", Lit4);
    }

    static Object lambda47() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit118, Lit24, "I'll Kill Oracle #...", Lit4);
    }

    static Object lambda48() {
        C0202runtime.setAndCoerceProperty$Ex(Lit121, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit121, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit121, Lit17, Lit18, Lit7);
    }

    static Object lambda49() {
        C0202runtime.setAndCoerceProperty$Ex(Lit121, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit121, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit121, Lit17, Lit18, Lit7);
    }

    static Object lambda50() {
        C0202runtime.setAndCoerceProperty$Ex(Lit124, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit124, Lit17, Lit125, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit124, Lit24, "1", Lit4);
    }

    static Object lambda51() {
        C0202runtime.setAndCoerceProperty$Ex(Lit124, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit124, Lit17, Lit125, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit124, Lit24, "1", Lit4);
    }

    public Object Oracle1$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "1.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda52() {
        C0202runtime.setAndCoerceProperty$Ex(Lit129, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit129, Lit17, Lit130, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit129, Lit24, "2", Lit4);
    }

    static Object lambda53() {
        C0202runtime.setAndCoerceProperty$Ex(Lit129, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit129, Lit17, Lit130, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit129, Lit24, "2", Lit4);
    }

    public Object Oracle2$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "2.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda54() {
        C0202runtime.setAndCoerceProperty$Ex(Lit134, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit134, Lit17, Lit135, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit134, Lit24, "3", Lit4);
    }

    static Object lambda55() {
        C0202runtime.setAndCoerceProperty$Ex(Lit134, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit134, Lit17, Lit135, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit134, Lit24, "3", Lit4);
    }

    /* compiled from: VoG.yail */
    public class frame extends ModuleBody {
        VoG $main;

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
                    if (!(obj instanceof VoG)) {
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
                    if (!(obj instanceof VoG)) {
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
                    return VoG.lambda2();
                case 16:
                    this.$main.$define();
                    return Values.empty;
                case 17:
                    return VoG.lambda3();
                case 18:
                    return VoG.lambda4();
                case 19:
                    return VoG.lambda5();
                case 20:
                    return VoG.lambda6();
                case 21:
                    return VoG.lambda7();
                case 22:
                    return this.$main.General$Click();
                case 23:
                    return VoG.lambda8();
                case 24:
                    return VoG.lambda9();
                case 25:
                    return this.$main.CE$Click();
                case 26:
                    return VoG.lambda10();
                case 27:
                    return VoG.lambda11();
                case 28:
                    return this.$main.KF$Click();
                case 29:
                    return VoG.lambda12();
                case 30:
                    return VoG.lambda13();
                case 31:
                    return this.$main.WoTM$Click();
                case 32:
                    return VoG.lambda14();
                case 33:
                    return VoG.lambda15();
                case 34:
                    return VoG.lambda16();
                case 35:
                    return VoG.lambda17();
                case 36:
                    return VoG.lambda18();
                case 37:
                    return VoG.lambda19();
                case 38:
                    return this.$main.Left$Click();
                case 39:
                    return VoG.lambda20();
                case 40:
                    return VoG.lambda21();
                case 41:
                    return this.$main.Middle$Click();
                case XDataType.NMTOKEN_TYPE_CODE /*42*/:
                    return VoG.lambda22();
                case XDataType.NAME_TYPE_CODE /*43*/:
                    return VoG.lambda23();
                case XDataType.NCNAME_TYPE_CODE /*44*/:
                    return this.$main.Right$Click();
                case XDataType.ID_TYPE_CODE /*45*/:
                    return VoG.lambda24();
                case XDataType.IDREF_TYPE_CODE /*46*/:
                    return VoG.lambda25();
                case XDataType.ENTITY_TYPE_CODE /*47*/:
                    return VoG.lambda26();
                case 48:
                    return VoG.lambda27();
                case 49:
                    return VoG.lambda28();
                case 50:
                    return VoG.lambda29();
                case 51:
                    return this.$main.Relic$Click();
                case 52:
                    return VoG.lambda30();
                case 53:
                    return VoG.lambda31();
                case 54:
                    return this.$main.ShootTheBoss$Click();
                case 55:
                    return VoG.lambda32();
                case 56:
                    return VoG.lambda33();
                case 57:
                    return VoG.lambda34();
                case 58:
                    return VoG.lambda35();
                case 59:
                    return VoG.lambda36();
                case 60:
                    return VoG.lambda37();
                case 61:
                    return this.$main.SoloLeft$Click();
                case 62:
                    return VoG.lambda38();
                case 63:
                    return VoG.lambda39();
                case 64:
                    return this.$main.SoloRight$Click();
                case 65:
                    return VoG.lambda40();
                case 66:
                    return VoG.lambda41();
                case 67:
                    return VoG.lambda42();
                case 68:
                    return VoG.lambda43();
                case 69:
                    return VoG.lambda44();
                case PrettyWriter.NEWLINE_FILL /*70*/:
                    return VoG.lambda45();
                case 71:
                    return this.$main.Assignment$Click();
                case 72:
                    return VoG.lambda46();
                case 73:
                    return VoG.lambda47();
                case 74:
                    return VoG.lambda48();
                case 75:
                    return VoG.lambda49();
                case PrettyWriter.NEWLINE_LITERAL /*76*/:
                    return VoG.lambda50();
                case PrettyWriter.NEWLINE_MISER /*77*/:
                    return VoG.lambda51();
                case PrettyWriter.NEWLINE_LINEAR /*78*/:
                    return this.$main.Oracle1$Click();
                case 79:
                    return VoG.lambda52();
                case 80:
                    return VoG.lambda53();
                case 81:
                    return this.$main.Oracle2$Click();
                case PrettyWriter.NEWLINE_MANDATORY /*82*/:
                    return VoG.lambda54();
                case PrettyWriter.NEWLINE_SPACE /*83*/:
                    return VoG.lambda55();
                case 84:
                    return this.$main.Oracle3$Click();
                case 85:
                    return VoG.lambda56();
                case 86:
                    return VoG.lambda57();
                case 87:
                    return this.$main.Oracle4$Click();
                case 88:
                    return VoG.lambda58();
                case 89:
                    return VoG.lambda59();
                case 90:
                    return this.$main.Oracle5$Click();
                case 91:
                    return VoG.lambda60();
                case 92:
                    return VoG.lambda61();
                case 93:
                    return this.$main.Oracle6$Click();
                case 94:
                    return VoG.lambda62();
                case 95:
                    return VoG.lambda63();
                case 96:
                    return this.$main.NeedCleanse$Click();
                case 97:
                    return VoG.lambda64();
                case 98:
                    return VoG.lambda65();
                case 99:
                    return this.$main.Countdown$Click();
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
                case 57:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 58:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 59:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 60:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 61:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 62:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 63:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 64:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 65:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 66:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 67:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 68:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 69:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case PrettyWriter.NEWLINE_FILL /*70*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 71:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 72:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 73:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 74:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 75:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case PrettyWriter.NEWLINE_LITERAL /*76*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case PrettyWriter.NEWLINE_MISER /*77*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case PrettyWriter.NEWLINE_LINEAR /*78*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 79:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 80:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 81:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case PrettyWriter.NEWLINE_MANDATORY /*82*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case PrettyWriter.NEWLINE_SPACE /*83*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 84:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 85:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 86:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 87:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 88:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 89:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 90:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 91:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 92:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 93:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 94:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 95:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 96:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 97:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 98:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 99:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                default:
                    return super.match0(moduleMethod, callContext);
            }
        }
    }

    public Object Oracle3$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "3.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda56() {
        C0202runtime.setAndCoerceProperty$Ex(Lit139, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit139, Lit17, Lit140, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit139, Lit24, "4", Lit4);
    }

    static Object lambda57() {
        C0202runtime.setAndCoerceProperty$Ex(Lit139, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit139, Lit17, Lit140, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit139, Lit24, "4", Lit4);
    }

    public Object Oracle4$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "4.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda58() {
        C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit17, Lit145, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit24, "5", Lit4);
    }

    static Object lambda59() {
        C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit17, Lit145, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit24, "5", Lit4);
    }

    public Object Oracle5$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "5.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda60() {
        C0202runtime.setAndCoerceProperty$Ex(Lit149, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit149, Lit17, Lit150, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit149, Lit24, "6", Lit4);
    }

    static Object lambda61() {
        C0202runtime.setAndCoerceProperty$Ex(Lit149, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit149, Lit17, Lit150, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit149, Lit24, "6", Lit4);
    }

    public Object Oracle6$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "6.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda62() {
        C0202runtime.setAndCoerceProperty$Ex(Lit154, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit154, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit154, Lit24, "I Need Cleanse", Lit4);
    }

    static Object lambda63() {
        C0202runtime.setAndCoerceProperty$Ex(Lit154, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit154, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit154, Lit24, "I Need Cleanse", Lit4);
    }

    public Object NeedCleanse$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "NeedCleanse.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda64() {
        C0202runtime.setAndCoerceProperty$Ex(Lit158, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit158, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit158, Lit24, "10 Second Countdown", Lit4);
    }

    static Object lambda65() {
        C0202runtime.setAndCoerceProperty$Ex(Lit158, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit158, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit158, Lit24, "10 Second Countdown", Lit4);
    }

    public Object Countdown$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "10SecondCountdown.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
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
        VoG = this;
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
