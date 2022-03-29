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
import com.google.appinventor.components.runtime.TableArrangement;
import com.google.appinventor.components.runtime.VerticalArrangement;
import com.google.appinventor.components.runtime.errors.YailRuntimeError;
import com.google.appinventor.components.runtime.util.ErrorMessages;
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

/* renamed from: appinventor.ai_chadthornburg.Destiny_Mute_Raider_Soundboard.CE */
/* compiled from: CE.yail */
public class C0000CE extends Form implements Runnable {

    /* renamed from: CE */
    public static C0000CE f0CE;
    static final SimpleSymbol Lit0 = ((SimpleSymbol) new SimpleSymbol("CE").readResolve());
    static final SimpleSymbol Lit1 = ((SimpleSymbol) new SimpleSymbol("getMessage").readResolve());
    static final SimpleSymbol Lit10 = ((SimpleSymbol) new SimpleSymbol("Title").readResolve());
    static final IntNum Lit100 = IntNum.make(0);
    static final IntNum Lit101 = IntNum.make(-1048);
    static final SimpleSymbol Lit102 = ((SimpleSymbol) new SimpleSymbol("Row").readResolve());
    static final FString Lit103 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit104 = ((SimpleSymbol) new SimpleSymbol("LeftTower$Click").readResolve());
    static final FString Lit105 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit106 = ((SimpleSymbol) new SimpleSymbol("RightTower").readResolve());
    static final IntNum Lit107 = IntNum.make(1);
    static final IntNum Lit108 = IntNum.make(-1048);
    static final FString Lit109 = new FString("com.google.appinventor.components.runtime.Button");
    static final FString Lit11 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit110 = ((SimpleSymbol) new SimpleSymbol("RightTower$Click").readResolve());
    static final FString Lit111 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit112 = ((SimpleSymbol) new SimpleSymbol("LeftHallway").readResolve());
    static final IntNum Lit113 = IntNum.make(-1045);
    static final FString Lit114 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit115 = ((SimpleSymbol) new SimpleSymbol("LeftHallway$Click").readResolve());
    static final FString Lit116 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit117 = ((SimpleSymbol) new SimpleSymbol("RightHallway").readResolve());
    static final IntNum Lit118 = IntNum.make(-1045);
    static final FString Lit119 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit12 = ((SimpleSymbol) new SimpleSymbol("Navigation").readResolve());
    static final SimpleSymbol Lit120 = ((SimpleSymbol) new SimpleSymbol("RightHallway$Click").readResolve());
    static final FString Lit121 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit122 = ((SimpleSymbol) new SimpleSymbol("SoloLeftHallway").readResolve());
    static final IntNum Lit123 = IntNum.make(-1045);
    static final FString Lit124 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit125 = ((SimpleSymbol) new SimpleSymbol("SoloLeftHallway$Click").readResolve());
    static final FString Lit126 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit127 = ((SimpleSymbol) new SimpleSymbol("SoloRightHallway").readResolve());
    static final IntNum Lit128 = IntNum.make(-1045);
    static final FString Lit129 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit13 = ((SimpleSymbol) new SimpleSymbol("AlignHorizontal").readResolve());
    static final SimpleSymbol Lit130 = ((SimpleSymbol) new SimpleSymbol("SoloRightHallway$Click").readResolve());
    static final FString Lit131 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit132 = ((SimpleSymbol) new SimpleSymbol("LeftOgre").readResolve());
    static final IntNum Lit133 = IntNum.make(-1045);
    static final FString Lit134 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit135 = ((SimpleSymbol) new SimpleSymbol("LeftOgre$Click").readResolve());
    static final FString Lit136 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit137 = ((SimpleSymbol) new SimpleSymbol("RightOgre").readResolve());
    static final IntNum Lit138 = IntNum.make(-1045);
    static final FString Lit139 = new FString("com.google.appinventor.components.runtime.Button");
    static final IntNum Lit14 = IntNum.make(3);
    static final SimpleSymbol Lit140 = ((SimpleSymbol) new SimpleSymbol("RightOgre$Click").readResolve());
    static final FString Lit141 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit142 = ((SimpleSymbol) new SimpleSymbol("DeathsingerCallouts").readResolve());
    static final FString Lit143 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit144 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final SimpleSymbol Lit145 = ((SimpleSymbol) new SimpleSymbol("EnemiesDead").readResolve());
    static final FString Lit146 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final FString Lit147 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit148 = ((SimpleSymbol) new SimpleSymbol("Wizard").readResolve());
    static final IntNum Lit149 = IntNum.make(-1080);
    static final SimpleSymbol Lit15 = ((SimpleSymbol) new SimpleSymbol("AlignVertical").readResolve());
    static final FString Lit150 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit151 = ((SimpleSymbol) new SimpleSymbol("Wizard$Click").readResolve());
    static final FString Lit152 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit153 = ((SimpleSymbol) new SimpleSymbol("Shrieker").readResolve());
    static final IntNum Lit154 = IntNum.make(-1080);
    static final FString Lit155 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit156 = ((SimpleSymbol) new SimpleSymbol("Shrieker$Click").readResolve());
    static final FString Lit157 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit158 = ((SimpleSymbol) new SimpleSymbol("TowerKnights").readResolve());
    static final IntNum Lit159 = IntNum.make(-1080);
    static final IntNum Lit16 = IntNum.make(2);
    static final FString Lit160 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit161 = ((SimpleSymbol) new SimpleSymbol("TowerKnights$Click").readResolve());
    static final FString Lit162 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit163 = ((SimpleSymbol) new SimpleSymbol("Ogre").readResolve());
    static final IntNum Lit164 = IntNum.make(-1080);
    static final FString Lit165 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit166 = ((SimpleSymbol) new SimpleSymbol("Ogre$Click").readResolve());
    static final FString Lit167 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit168 = ((SimpleSymbol) new SimpleSymbol("CrotaLabel").readResolve());
    static final FString Lit169 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit17 = ((SimpleSymbol) new SimpleSymbol("Width").readResolve());
    static final FString Lit170 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit171 = ((SimpleSymbol) new SimpleSymbol("DownCrota").readResolve());
    static final FString Lit172 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit173 = ((SimpleSymbol) new SimpleSymbol("DownCrota$Click").readResolve());
    static final FString Lit174 = new FString("com.google.appinventor.components.runtime.Player");
    static final FString Lit175 = new FString("com.google.appinventor.components.runtime.Player");
    static final SimpleSymbol Lit176 = ((SimpleSymbol) new SimpleSymbol("android-log-form").readResolve());
    static final SimpleSymbol Lit177 = ((SimpleSymbol) new SimpleSymbol("add-to-form-environment").readResolve());
    static final SimpleSymbol Lit178 = ((SimpleSymbol) new SimpleSymbol("lookup-in-form-environment").readResolve());
    static final SimpleSymbol Lit179 = ((SimpleSymbol) new SimpleSymbol("is-bound-in-form-environment").readResolve());
    static final IntNum Lit18 = IntNum.make(-2);
    static final SimpleSymbol Lit180 = ((SimpleSymbol) new SimpleSymbol("add-to-global-var-environment").readResolve());
    static final SimpleSymbol Lit181 = ((SimpleSymbol) new SimpleSymbol("add-to-events").readResolve());
    static final SimpleSymbol Lit182 = ((SimpleSymbol) new SimpleSymbol("add-to-components").readResolve());
    static final SimpleSymbol Lit183 = ((SimpleSymbol) new SimpleSymbol("add-to-global-vars").readResolve());
    static final SimpleSymbol Lit184 = ((SimpleSymbol) new SimpleSymbol("add-to-form-do-after-creation").readResolve());
    static final SimpleSymbol Lit185 = ((SimpleSymbol) new SimpleSymbol("send-error").readResolve());
    static final SimpleSymbol Lit186 = ((SimpleSymbol) new SimpleSymbol("dispatchEvent").readResolve());
    static final SimpleSymbol Lit187 = ((SimpleSymbol) new SimpleSymbol("lookup-handler").readResolve());
    static final FString Lit19 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit2 = ((SimpleSymbol) new SimpleSymbol("*the-null-value*").readResolve());
    static final FString Lit20 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit21 = ((SimpleSymbol) new SimpleSymbol("General").readResolve());
    static final IntNum Lit22;
    static final SimpleSymbol Lit23 = ((SimpleSymbol) new SimpleSymbol("FontBold").readResolve());
    static final SimpleSymbol Lit24 = ((SimpleSymbol) new SimpleSymbol("Text").readResolve());
    static final FString Lit25 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit26 = PairWithPosition.make(Lit4, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\CE.yail", 159822);
    static final SimpleSymbol Lit27 = ((SimpleSymbol) new SimpleSymbol("General$Click").readResolve());
    static final SimpleSymbol Lit28 = ((SimpleSymbol) new SimpleSymbol("Click").readResolve());
    static final FString Lit29 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit3 = ((SimpleSymbol) new SimpleSymbol("AppName").readResolve());
    static final SimpleSymbol Lit30 = ((SimpleSymbol) new SimpleSymbol("VoG").readResolve());
    static final IntNum Lit31;
    static final IntNum Lit32 = IntNum.make(-1020);
    static final FString Lit33 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit34 = PairWithPosition.make(Lit4, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\CE.yail", 221258);
    static final SimpleSymbol Lit35 = ((SimpleSymbol) new SimpleSymbol("VoG$Click").readResolve());
    static final FString Lit36 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit37 = ((SimpleSymbol) new SimpleSymbol("KF").readResolve());
    static final IntNum Lit38;
    static final IntNum Lit39 = IntNum.make(-1020);
    static final SimpleSymbol Lit4;
    static final FString Lit40 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit41 = PairWithPosition.make(Lit4, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\CE.yail", 282697);
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
    static final SimpleSymbol Lit51 = ((SimpleSymbol) new SimpleSymbol("BridgeLabel").readResolve());
    static final FString Lit52 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit53 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final SimpleSymbol Lit54 = ((SimpleSymbol) new SimpleSymbol("BridgeArrangement").readResolve());
    static final FString Lit55 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final FString Lit56 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit57 = ((SimpleSymbol) new SimpleSymbol("First").readResolve());
    static final IntNum Lit58 = IntNum.make(-1080);
    static final FString Lit59 = new FString("com.google.appinventor.components.runtime.Button");
    static final IntNum Lit6;
    static final SimpleSymbol Lit60 = ((SimpleSymbol) new SimpleSymbol("Player1").readResolve());
    static final SimpleSymbol Lit61 = ((SimpleSymbol) new SimpleSymbol("Source").readResolve());
    static final SimpleSymbol Lit62 = ((SimpleSymbol) new SimpleSymbol("Start").readResolve());
    static final SimpleSymbol Lit63 = ((SimpleSymbol) new SimpleSymbol("First$Click").readResolve());
    static final FString Lit64 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit65 = ((SimpleSymbol) new SimpleSymbol("Second").readResolve());
    static final IntNum Lit66 = IntNum.make(-1080);
    static final FString Lit67 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit68 = ((SimpleSymbol) new SimpleSymbol("Second$Click").readResolve());
    static final FString Lit69 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit7 = ((SimpleSymbol) new SimpleSymbol("number").readResolve());
    static final SimpleSymbol Lit70 = ((SimpleSymbol) new SimpleSymbol("Third").readResolve());
    static final IntNum Lit71 = IntNum.make(-1080);
    static final FString Lit72 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit73 = ((SimpleSymbol) new SimpleSymbol("Third$Click").readResolve());
    static final FString Lit74 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit75 = ((SimpleSymbol) new SimpleSymbol("Fourth").readResolve());
    static final IntNum Lit76 = IntNum.make(-1080);
    static final FString Lit77 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit78 = ((SimpleSymbol) new SimpleSymbol("Fourth$Click").readResolve());
    static final FString Lit79 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit8 = ((SimpleSymbol) new SimpleSymbol("Scrollable").readResolve());
    static final SimpleSymbol Lit80 = ((SimpleSymbol) new SimpleSymbol("Fifth").readResolve());
    static final IntNum Lit81 = IntNum.make(-1080);
    static final FString Lit82 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit83 = ((SimpleSymbol) new SimpleSymbol("Fifth$Click").readResolve());
    static final FString Lit84 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit85 = ((SimpleSymbol) new SimpleSymbol("Last").readResolve());
    static final IntNum Lit86 = IntNum.make(-1080);
    static final FString Lit87 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit88 = ((SimpleSymbol) new SimpleSymbol("Last$Click").readResolve());
    static final FString Lit89 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit9 = ((SimpleSymbol) new SimpleSymbol(PropertyTypeConstants.PROPERTY_TYPE_BOOLEAN).readResolve());
    static final SimpleSymbol Lit90 = ((SimpleSymbol) new SimpleSymbol("DeathsingerAssignmentsLabel").readResolve());
    static final FString Lit91 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit92 = new FString("com.google.appinventor.components.runtime.TableArrangement");
    static final SimpleSymbol Lit93 = ((SimpleSymbol) new SimpleSymbol("DeathsingerTable").readResolve());
    static final SimpleSymbol Lit94 = ((SimpleSymbol) new SimpleSymbol("Rows").readResolve());
    static final IntNum Lit95 = IntNum.make(4);
    static final FString Lit96 = new FString("com.google.appinventor.components.runtime.TableArrangement");
    static final FString Lit97 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit98 = ((SimpleSymbol) new SimpleSymbol("LeftTower").readResolve());
    static final SimpleSymbol Lit99 = ((SimpleSymbol) new SimpleSymbol("Column").readResolve());
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
    public VerticalArrangement BridgeArrangement;
    public Label BridgeLabel;
    public Label CrotaLabel;
    public Label DeathsingerAssignmentsLabel;
    public Label DeathsingerCallouts;
    public TableArrangement DeathsingerTable;
    public Button DownCrota;
    public final ModuleMethod DownCrota$Click;
    public VerticalArrangement EnemiesDead;
    public Button Fifth;
    public final ModuleMethod Fifth$Click;
    public Button First;
    public final ModuleMethod First$Click;
    public Button Fourth;
    public final ModuleMethod Fourth$Click;
    public Button General;
    public final ModuleMethod General$Click;

    /* renamed from: KF */
    public Button f1KF;
    public final ModuleMethod KF$Click;
    public Button Last;
    public final ModuleMethod Last$Click;
    public Button LeftHallway;
    public final ModuleMethod LeftHallway$Click;
    public Button LeftOgre;
    public final ModuleMethod LeftOgre$Click;
    public Button LeftTower;
    public final ModuleMethod LeftTower$Click;
    public HorizontalArrangement Navigation;
    public Button Ogre;
    public final ModuleMethod Ogre$Click;
    public Player Player1;
    public Button RightHallway;
    public final ModuleMethod RightHallway$Click;
    public Button RightOgre;
    public final ModuleMethod RightOgre$Click;
    public Button RightTower;
    public final ModuleMethod RightTower$Click;
    public Button Second;
    public final ModuleMethod Second$Click;
    public Button Shrieker;
    public final ModuleMethod Shrieker$Click;
    public Button SoloLeftHallway;
    public final ModuleMethod SoloLeftHallway$Click;
    public Button SoloRightHallway;
    public final ModuleMethod SoloRightHallway$Click;
    public Button Third;
    public final ModuleMethod Third$Click;
    public Button TowerKnights;
    public final ModuleMethod TowerKnights$Click;
    public Button VoG;
    public final ModuleMethod VoG$Click;
    public Button Wizard;
    public final ModuleMethod Wizard$Click;
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
        Lit48 = PairWithPosition.make(simpleSymbol, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\CE.yail", 344139);
        int[] iArr = new int[2];
        iArr[0] = -65536;
        Lit45 = IntNum.make(iArr);
        int[] iArr2 = new int[2];
        iArr2[0] = -3355444;
        Lit38 = IntNum.make(iArr2);
        int[] iArr3 = new int[2];
        iArr3[0] = -14336;
        Lit31 = IntNum.make(iArr3);
        int[] iArr4 = new int[2];
        iArr4[0] = -1;
        Lit22 = IntNum.make(iArr4);
        int[] iArr5 = new int[2];
        iArr5[0] = -16711936;
        Lit6 = IntNum.make(iArr5);
    }

    public C0000CE() {
        ModuleInfo.register(this);
        frame frame2 = new frame();
        frame2.$main = this;
        this.android$Mnlog$Mnform = new ModuleMethod(frame2, 1, Lit176, 4097);
        this.add$Mnto$Mnform$Mnenvironment = new ModuleMethod(frame2, 2, Lit177, 8194);
        this.lookup$Mnin$Mnform$Mnenvironment = new ModuleMethod(frame2, 3, Lit178, 8193);
        this.is$Mnbound$Mnin$Mnform$Mnenvironment = new ModuleMethod(frame2, 5, Lit179, 4097);
        this.add$Mnto$Mnglobal$Mnvar$Mnenvironment = new ModuleMethod(frame2, 6, Lit180, 8194);
        this.add$Mnto$Mnevents = new ModuleMethod(frame2, 7, Lit181, 8194);
        this.add$Mnto$Mncomponents = new ModuleMethod(frame2, 8, Lit182, 16388);
        this.add$Mnto$Mnglobal$Mnvars = new ModuleMethod(frame2, 9, Lit183, 8194);
        this.add$Mnto$Mnform$Mndo$Mnafter$Mncreation = new ModuleMethod(frame2, 10, Lit184, 4097);
        this.send$Mnerror = new ModuleMethod(frame2, 11, Lit185, 4097);
        this.process$Mnexception = new ModuleMethod(frame2, 12, "process-exception", 4097);
        this.dispatchEvent = new ModuleMethod(frame2, 13, Lit186, 16388);
        this.lookup$Mnhandler = new ModuleMethod(frame2, 14, Lit187, 8194);
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
        this.VoG$Click = new ModuleMethod(frame2, 25, Lit35, 0);
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
        this.First$Click = new ModuleMethod(frame2, 38, Lit63, 0);
        lambda$Fn19 = new ModuleMethod(frame2, 39, (Object) null, 0);
        lambda$Fn20 = new ModuleMethod(frame2, 40, (Object) null, 0);
        this.Second$Click = new ModuleMethod(frame2, 41, Lit68, 0);
        lambda$Fn21 = new ModuleMethod(frame2, 42, (Object) null, 0);
        lambda$Fn22 = new ModuleMethod(frame2, 43, (Object) null, 0);
        this.Third$Click = new ModuleMethod(frame2, 44, Lit73, 0);
        lambda$Fn23 = new ModuleMethod(frame2, 45, (Object) null, 0);
        lambda$Fn24 = new ModuleMethod(frame2, 46, (Object) null, 0);
        this.Fourth$Click = new ModuleMethod(frame2, 47, Lit78, 0);
        lambda$Fn25 = new ModuleMethod(frame2, 48, (Object) null, 0);
        lambda$Fn26 = new ModuleMethod(frame2, 49, (Object) null, 0);
        this.Fifth$Click = new ModuleMethod(frame2, 50, Lit83, 0);
        lambda$Fn27 = new ModuleMethod(frame2, 51, (Object) null, 0);
        lambda$Fn28 = new ModuleMethod(frame2, 52, (Object) null, 0);
        this.Last$Click = new ModuleMethod(frame2, 53, Lit88, 0);
        lambda$Fn29 = new ModuleMethod(frame2, 54, (Object) null, 0);
        lambda$Fn30 = new ModuleMethod(frame2, 55, (Object) null, 0);
        lambda$Fn31 = new ModuleMethod(frame2, 56, (Object) null, 0);
        lambda$Fn32 = new ModuleMethod(frame2, 57, (Object) null, 0);
        lambda$Fn33 = new ModuleMethod(frame2, 58, (Object) null, 0);
        lambda$Fn34 = new ModuleMethod(frame2, 59, (Object) null, 0);
        this.LeftTower$Click = new ModuleMethod(frame2, 60, Lit104, 0);
        lambda$Fn35 = new ModuleMethod(frame2, 61, (Object) null, 0);
        lambda$Fn36 = new ModuleMethod(frame2, 62, (Object) null, 0);
        this.RightTower$Click = new ModuleMethod(frame2, 63, Lit110, 0);
        lambda$Fn37 = new ModuleMethod(frame2, 64, (Object) null, 0);
        lambda$Fn38 = new ModuleMethod(frame2, 65, (Object) null, 0);
        this.LeftHallway$Click = new ModuleMethod(frame2, 66, Lit115, 0);
        lambda$Fn39 = new ModuleMethod(frame2, 67, (Object) null, 0);
        lambda$Fn40 = new ModuleMethod(frame2, 68, (Object) null, 0);
        this.RightHallway$Click = new ModuleMethod(frame2, 69, Lit120, 0);
        lambda$Fn41 = new ModuleMethod(frame2, 70, (Object) null, 0);
        lambda$Fn42 = new ModuleMethod(frame2, 71, (Object) null, 0);
        this.SoloLeftHallway$Click = new ModuleMethod(frame2, 72, Lit125, 0);
        lambda$Fn43 = new ModuleMethod(frame2, 73, (Object) null, 0);
        lambda$Fn44 = new ModuleMethod(frame2, 74, (Object) null, 0);
        this.SoloRightHallway$Click = new ModuleMethod(frame2, 75, Lit130, 0);
        lambda$Fn45 = new ModuleMethod(frame2, 76, (Object) null, 0);
        lambda$Fn46 = new ModuleMethod(frame2, 77, (Object) null, 0);
        this.LeftOgre$Click = new ModuleMethod(frame2, 78, Lit135, 0);
        lambda$Fn47 = new ModuleMethod(frame2, 79, (Object) null, 0);
        lambda$Fn48 = new ModuleMethod(frame2, 80, (Object) null, 0);
        this.RightOgre$Click = new ModuleMethod(frame2, 81, Lit140, 0);
        lambda$Fn49 = new ModuleMethod(frame2, 82, (Object) null, 0);
        lambda$Fn50 = new ModuleMethod(frame2, 83, (Object) null, 0);
        lambda$Fn51 = new ModuleMethod(frame2, 84, (Object) null, 0);
        lambda$Fn52 = new ModuleMethod(frame2, 85, (Object) null, 0);
        lambda$Fn53 = new ModuleMethod(frame2, 86, (Object) null, 0);
        lambda$Fn54 = new ModuleMethod(frame2, 87, (Object) null, 0);
        this.Wizard$Click = new ModuleMethod(frame2, 88, Lit151, 0);
        lambda$Fn55 = new ModuleMethod(frame2, 89, (Object) null, 0);
        lambda$Fn56 = new ModuleMethod(frame2, 90, (Object) null, 0);
        this.Shrieker$Click = new ModuleMethod(frame2, 91, Lit156, 0);
        lambda$Fn57 = new ModuleMethod(frame2, 92, (Object) null, 0);
        lambda$Fn58 = new ModuleMethod(frame2, 93, (Object) null, 0);
        this.TowerKnights$Click = new ModuleMethod(frame2, 94, Lit161, 0);
        lambda$Fn59 = new ModuleMethod(frame2, 95, (Object) null, 0);
        lambda$Fn60 = new ModuleMethod(frame2, 96, (Object) null, 0);
        this.Ogre$Click = new ModuleMethod(frame2, 97, Lit166, 0);
        lambda$Fn61 = new ModuleMethod(frame2, 98, (Object) null, 0);
        lambda$Fn62 = new ModuleMethod(frame2, 99, (Object) null, 0);
        lambda$Fn63 = new ModuleMethod(frame2, 100, (Object) null, 0);
        lambda$Fn64 = new ModuleMethod(frame2, ErrorMessages.ERROR_LOCATION_SENSOR_LATITUDE_NOT_FOUND, (Object) null, 0);
        this.DownCrota$Click = new ModuleMethod(frame2, ErrorMessages.ERROR_LOCATION_SENSOR_LONGITUDE_NOT_FOUND, Lit173, 0);
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
            f0CE = null;
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
                    Values.writeValues(C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit10, "CE", Lit4), $result);
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
                this.VoG = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit12, Lit29, Lit30, lambda$Fn7), $result);
                } else {
                    addToComponents(Lit12, Lit33, Lit30, lambda$Fn8);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit35, this.VoG$Click);
                } else {
                    addToFormEnvironment(Lit35, this.VoG$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "VoG", "Click");
                } else {
                    addToEvents(Lit30, Lit28);
                }
                this.f1KF = null;
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
                this.BridgeLabel = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit50, Lit51, lambda$Fn13), $result);
                } else {
                    addToComponents(Lit0, Lit52, Lit51, lambda$Fn14);
                }
                this.BridgeArrangement = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit53, Lit54, lambda$Fn15), $result);
                } else {
                    addToComponents(Lit0, Lit55, Lit54, lambda$Fn16);
                }
                this.First = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit54, Lit56, Lit57, lambda$Fn17), $result);
                } else {
                    addToComponents(Lit54, Lit59, Lit57, lambda$Fn18);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit63, this.First$Click);
                } else {
                    addToFormEnvironment(Lit63, this.First$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "First", "Click");
                } else {
                    addToEvents(Lit57, Lit28);
                }
                this.Second = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit54, Lit64, Lit65, lambda$Fn19), $result);
                } else {
                    addToComponents(Lit54, Lit67, Lit65, lambda$Fn20);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit68, this.Second$Click);
                } else {
                    addToFormEnvironment(Lit68, this.Second$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Second", "Click");
                } else {
                    addToEvents(Lit65, Lit28);
                }
                this.Third = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit54, Lit69, Lit70, lambda$Fn21), $result);
                } else {
                    addToComponents(Lit54, Lit72, Lit70, lambda$Fn22);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit73, this.Third$Click);
                } else {
                    addToFormEnvironment(Lit73, this.Third$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Third", "Click");
                } else {
                    addToEvents(Lit70, Lit28);
                }
                this.Fourth = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit54, Lit74, Lit75, lambda$Fn23), $result);
                } else {
                    addToComponents(Lit54, Lit77, Lit75, lambda$Fn24);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit78, this.Fourth$Click);
                } else {
                    addToFormEnvironment(Lit78, this.Fourth$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Fourth", "Click");
                } else {
                    addToEvents(Lit75, Lit28);
                }
                this.Fifth = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit54, Lit79, Lit80, lambda$Fn25), $result);
                } else {
                    addToComponents(Lit54, Lit82, Lit80, lambda$Fn26);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit83, this.Fifth$Click);
                } else {
                    addToFormEnvironment(Lit83, this.Fifth$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Fifth", "Click");
                } else {
                    addToEvents(Lit80, Lit28);
                }
                this.Last = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit54, Lit84, Lit85, lambda$Fn27), $result);
                } else {
                    addToComponents(Lit54, Lit87, Lit85, lambda$Fn28);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit88, this.Last$Click);
                } else {
                    addToFormEnvironment(Lit88, this.Last$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Last", "Click");
                } else {
                    addToEvents(Lit85, Lit28);
                }
                this.DeathsingerAssignmentsLabel = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit89, Lit90, lambda$Fn29), $result);
                } else {
                    addToComponents(Lit0, Lit91, Lit90, lambda$Fn30);
                }
                this.DeathsingerTable = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit92, Lit93, lambda$Fn31), $result);
                } else {
                    addToComponents(Lit0, Lit96, Lit93, lambda$Fn32);
                }
                this.LeftTower = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit93, Lit97, Lit98, lambda$Fn33), $result);
                } else {
                    addToComponents(Lit93, Lit103, Lit98, lambda$Fn34);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit104, this.LeftTower$Click);
                } else {
                    addToFormEnvironment(Lit104, this.LeftTower$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "LeftTower", "Click");
                } else {
                    addToEvents(Lit98, Lit28);
                }
                this.RightTower = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit93, Lit105, Lit106, lambda$Fn35), $result);
                } else {
                    addToComponents(Lit93, Lit109, Lit106, lambda$Fn36);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit110, this.RightTower$Click);
                } else {
                    addToFormEnvironment(Lit110, this.RightTower$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "RightTower", "Click");
                } else {
                    addToEvents(Lit106, Lit28);
                }
                this.LeftHallway = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit93, Lit111, Lit112, lambda$Fn37), $result);
                } else {
                    addToComponents(Lit93, Lit114, Lit112, lambda$Fn38);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit115, this.LeftHallway$Click);
                } else {
                    addToFormEnvironment(Lit115, this.LeftHallway$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "LeftHallway", "Click");
                } else {
                    addToEvents(Lit112, Lit28);
                }
                this.RightHallway = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit93, Lit116, Lit117, lambda$Fn39), $result);
                } else {
                    addToComponents(Lit93, Lit119, Lit117, lambda$Fn40);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit120, this.RightHallway$Click);
                } else {
                    addToFormEnvironment(Lit120, this.RightHallway$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "RightHallway", "Click");
                } else {
                    addToEvents(Lit117, Lit28);
                }
                this.SoloLeftHallway = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit93, Lit121, Lit122, lambda$Fn41), $result);
                } else {
                    addToComponents(Lit93, Lit124, Lit122, lambda$Fn42);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit125, this.SoloLeftHallway$Click);
                } else {
                    addToFormEnvironment(Lit125, this.SoloLeftHallway$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "SoloLeftHallway", "Click");
                } else {
                    addToEvents(Lit122, Lit28);
                }
                this.SoloRightHallway = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit93, Lit126, Lit127, lambda$Fn43), $result);
                } else {
                    addToComponents(Lit93, Lit129, Lit127, lambda$Fn44);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit130, this.SoloRightHallway$Click);
                } else {
                    addToFormEnvironment(Lit130, this.SoloRightHallway$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "SoloRightHallway", "Click");
                } else {
                    addToEvents(Lit127, Lit28);
                }
                this.LeftOgre = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit93, Lit131, Lit132, lambda$Fn45), $result);
                } else {
                    addToComponents(Lit93, Lit134, Lit132, lambda$Fn46);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit135, this.LeftOgre$Click);
                } else {
                    addToFormEnvironment(Lit135, this.LeftOgre$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "LeftOgre", "Click");
                } else {
                    addToEvents(Lit132, Lit28);
                }
                this.RightOgre = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit93, Lit136, Lit137, lambda$Fn47), $result);
                } else {
                    addToComponents(Lit93, Lit139, Lit137, lambda$Fn48);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit140, this.RightOgre$Click);
                } else {
                    addToFormEnvironment(Lit140, this.RightOgre$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "RightOgre", "Click");
                } else {
                    addToEvents(Lit137, Lit28);
                }
                this.DeathsingerCallouts = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit141, Lit142, lambda$Fn49), $result);
                } else {
                    addToComponents(Lit0, Lit143, Lit142, lambda$Fn50);
                }
                this.EnemiesDead = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit144, Lit145, lambda$Fn51), $result);
                } else {
                    addToComponents(Lit0, Lit146, Lit145, lambda$Fn52);
                }
                this.Wizard = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit145, Lit147, Lit148, lambda$Fn53), $result);
                } else {
                    addToComponents(Lit145, Lit150, Lit148, lambda$Fn54);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit151, this.Wizard$Click);
                } else {
                    addToFormEnvironment(Lit151, this.Wizard$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Wizard", "Click");
                } else {
                    addToEvents(Lit148, Lit28);
                }
                this.Shrieker = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit145, Lit152, Lit153, lambda$Fn55), $result);
                } else {
                    addToComponents(Lit145, Lit155, Lit153, lambda$Fn56);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit156, this.Shrieker$Click);
                } else {
                    addToFormEnvironment(Lit156, this.Shrieker$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Shrieker", "Click");
                } else {
                    addToEvents(Lit153, Lit28);
                }
                this.TowerKnights = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit145, Lit157, Lit158, lambda$Fn57), $result);
                } else {
                    addToComponents(Lit145, Lit160, Lit158, lambda$Fn58);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit161, this.TowerKnights$Click);
                } else {
                    addToFormEnvironment(Lit161, this.TowerKnights$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "TowerKnights", "Click");
                } else {
                    addToEvents(Lit158, Lit28);
                }
                this.Ogre = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit145, Lit162, Lit163, lambda$Fn59), $result);
                } else {
                    addToComponents(Lit145, Lit165, Lit163, lambda$Fn60);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit166, this.Ogre$Click);
                } else {
                    addToFormEnvironment(Lit166, this.Ogre$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Ogre", "Click");
                } else {
                    addToEvents(Lit163, Lit28);
                }
                this.CrotaLabel = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit167, Lit168, lambda$Fn61), $result);
                } else {
                    addToComponents(Lit0, Lit169, Lit168, lambda$Fn62);
                }
                this.DownCrota = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit170, Lit171, lambda$Fn63), $result);
                } else {
                    addToComponents(Lit0, Lit172, Lit171, lambda$Fn64);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit173, this.DownCrota$Click);
                } else {
                    addToFormEnvironment(Lit173, this.DownCrota$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "DownCrota", "Click");
                } else {
                    addToEvents(Lit171, Lit28);
                }
                this.Player1 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit174, Lit60, Boolean.FALSE), $result);
                } else {
                    addToComponents(Lit0, Lit175, Lit60, Boolean.FALSE);
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
        return C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit10, "CE", Lit4);
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
        return C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit24, "VoG", Lit4);
    }

    static Object lambda9() {
        C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit5, Lit31, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit17, Lit32, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit30, Lit24, "VoG", Lit4);
    }

    public Object VoG$Click() {
        C0202runtime.setThisForm();
        return C0202runtime.callYailPrimitive(C0202runtime.open$Mnanother$Mnscreen, LList.list1("VoG"), Lit34, "open another screen");
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
        return C0202runtime.setAndCoerceProperty$Ex(Lit51, Lit24, "I'll Cross The Bridge...", Lit4);
    }

    static Object lambda15() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit51, Lit24, "I'll Cross The Bridge...", Lit4);
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
        return C0202runtime.setAndCoerceProperty$Ex(Lit57, Lit24, "1st", Lit4);
    }

    static Object lambda19() {
        C0202runtime.setAndCoerceProperty$Ex(Lit57, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit57, Lit17, Lit58, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit57, Lit24, "1st", Lit4);
    }

    public Object First$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "First.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda20() {
        C0202runtime.setAndCoerceProperty$Ex(Lit65, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit65, Lit17, Lit66, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit65, Lit24, "2nd", Lit4);
    }

    static Object lambda21() {
        C0202runtime.setAndCoerceProperty$Ex(Lit65, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit65, Lit17, Lit66, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit65, Lit24, "2nd", Lit4);
    }

    public Object Second$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "Second.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda22() {
        C0202runtime.setAndCoerceProperty$Ex(Lit70, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit70, Lit17, Lit71, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit70, Lit24, "3rd", Lit4);
    }

    static Object lambda23() {
        C0202runtime.setAndCoerceProperty$Ex(Lit70, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit70, Lit17, Lit71, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit70, Lit24, "3rd", Lit4);
    }

    public Object Third$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "Third.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda24() {
        C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit17, Lit76, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit24, "4th", Lit4);
    }

    static Object lambda25() {
        C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit17, Lit76, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit24, "4th", Lit4);
    }

    public Object Fourth$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "Fourth.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda26() {
        C0202runtime.setAndCoerceProperty$Ex(Lit80, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit80, Lit17, Lit81, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit80, Lit24, "5th", Lit4);
    }

    static Object lambda27() {
        C0202runtime.setAndCoerceProperty$Ex(Lit80, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit80, Lit17, Lit81, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit80, Lit24, "5th", Lit4);
    }

    public Object Fifth$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "Fifth.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda28() {
        C0202runtime.setAndCoerceProperty$Ex(Lit85, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit85, Lit17, Lit86, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit85, Lit24, "Last", Lit4);
    }

    static Object lambda29() {
        C0202runtime.setAndCoerceProperty$Ex(Lit85, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit85, Lit17, Lit86, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit85, Lit24, "Last", Lit4);
    }

    public Object Last$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "Last.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda30() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit90, Lit24, "Deathsinger Assignments", Lit4);
    }

    static Object lambda31() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit90, Lit24, "Deathsinger Assignments", Lit4);
    }

    static Object lambda32() {
        C0202runtime.setAndCoerceProperty$Ex(Lit93, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit93, Lit94, Lit95, Lit7);
    }

    static Object lambda33() {
        C0202runtime.setAndCoerceProperty$Ex(Lit93, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit93, Lit94, Lit95, Lit7);
    }

    static Object lambda34() {
        C0202runtime.setAndCoerceProperty$Ex(Lit98, Lit99, Lit100, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit98, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit98, Lit17, Lit101, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit98, Lit102, Lit100, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit98, Lit24, "Left Tower", Lit4);
    }

    static Object lambda35() {
        C0202runtime.setAndCoerceProperty$Ex(Lit98, Lit99, Lit100, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit98, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit98, Lit17, Lit101, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit98, Lit102, Lit100, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit98, Lit24, "Left Tower", Lit4);
    }

    public Object LeftTower$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "CoverLeftTower.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda36() {
        C0202runtime.setAndCoerceProperty$Ex(Lit106, Lit99, Lit107, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit106, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit106, Lit17, Lit108, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit106, Lit102, Lit100, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit106, Lit24, "Right Tower", Lit4);
    }

    static Object lambda37() {
        C0202runtime.setAndCoerceProperty$Ex(Lit106, Lit99, Lit107, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit106, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit106, Lit17, Lit108, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit106, Lit102, Lit100, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit106, Lit24, "Right Tower", Lit4);
    }

    public Object RightTower$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "CoverRightTower.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda38() {
        C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit99, Lit100, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit17, Lit113, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit102, Lit107, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit24, "Left Hallway", Lit4);
    }

    static Object lambda39() {
        C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit99, Lit100, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit17, Lit113, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit102, Lit107, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit24, "Left Hallway", Lit4);
    }

    public Object LeftHallway$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "CoverLeftHallway.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda40() {
        C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit99, Lit107, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit17, Lit118, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit102, Lit107, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit24, "Right Hallway", Lit4);
    }

    static Object lambda41() {
        C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit99, Lit107, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit17, Lit118, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit102, Lit107, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit24, "Right Hallway", Lit4);
    }

    public Object RightHallway$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "CoverRightHallway.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda42() {
        C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit99, Lit100, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit17, Lit123, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit102, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit24, "Solo Left Hallway", Lit4);
    }

    static Object lambda43() {
        C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit99, Lit100, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit17, Lit123, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit102, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit24, "Solo Left Hallway", Lit4);
    }

    public Object SoloLeftHallway$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "SoloLeftHallway.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda44() {
        C0202runtime.setAndCoerceProperty$Ex(Lit127, Lit99, Lit107, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit127, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit127, Lit17, Lit128, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit127, Lit102, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit127, Lit24, "Solo Right Hallway", Lit4);
    }

    static Object lambda45() {
        C0202runtime.setAndCoerceProperty$Ex(Lit127, Lit99, Lit107, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit127, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit127, Lit17, Lit128, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit127, Lit102, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit127, Lit24, "Solo Right Hallway", Lit4);
    }

    public Object SoloRightHallway$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "SoloRightHallway.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda46() {
        C0202runtime.setAndCoerceProperty$Ex(Lit132, Lit99, Lit100, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit132, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit132, Lit17, Lit133, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit132, Lit102, Lit14, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit132, Lit24, "Left Ogre", Lit4);
    }

    static Object lambda47() {
        C0202runtime.setAndCoerceProperty$Ex(Lit132, Lit99, Lit100, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit132, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit132, Lit17, Lit133, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit132, Lit102, Lit14, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit132, Lit24, "Left Ogre", Lit4);
    }

    /* renamed from: appinventor.ai_chadthornburg.Destiny_Mute_Raider_Soundboard.CE$frame */
    /* compiled from: CE.yail */
    public class frame extends ModuleBody {
        C0000CE $main;

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
                    if (!(obj instanceof C0000CE)) {
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
                    if (!(obj instanceof C0000CE)) {
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
                    return C0000CE.lambda2();
                case 16:
                    this.$main.$define();
                    return Values.empty;
                case 17:
                    return C0000CE.lambda3();
                case 18:
                    return C0000CE.lambda4();
                case 19:
                    return C0000CE.lambda5();
                case 20:
                    return C0000CE.lambda6();
                case 21:
                    return C0000CE.lambda7();
                case 22:
                    return this.$main.General$Click();
                case 23:
                    return C0000CE.lambda8();
                case 24:
                    return C0000CE.lambda9();
                case 25:
                    return this.$main.VoG$Click();
                case 26:
                    return C0000CE.lambda10();
                case 27:
                    return C0000CE.lambda11();
                case 28:
                    return this.$main.KF$Click();
                case 29:
                    return C0000CE.lambda12();
                case 30:
                    return C0000CE.lambda13();
                case 31:
                    return this.$main.WoTM$Click();
                case 32:
                    return C0000CE.lambda14();
                case 33:
                    return C0000CE.lambda15();
                case 34:
                    return C0000CE.lambda16();
                case 35:
                    return C0000CE.lambda17();
                case 36:
                    return C0000CE.lambda18();
                case 37:
                    return C0000CE.lambda19();
                case 38:
                    return this.$main.First$Click();
                case 39:
                    return C0000CE.lambda20();
                case 40:
                    return C0000CE.lambda21();
                case 41:
                    return this.$main.Second$Click();
                case XDataType.NMTOKEN_TYPE_CODE /*42*/:
                    return C0000CE.lambda22();
                case XDataType.NAME_TYPE_CODE /*43*/:
                    return C0000CE.lambda23();
                case XDataType.NCNAME_TYPE_CODE /*44*/:
                    return this.$main.Third$Click();
                case XDataType.ID_TYPE_CODE /*45*/:
                    return C0000CE.lambda24();
                case XDataType.IDREF_TYPE_CODE /*46*/:
                    return C0000CE.lambda25();
                case XDataType.ENTITY_TYPE_CODE /*47*/:
                    return this.$main.Fourth$Click();
                case 48:
                    return C0000CE.lambda26();
                case 49:
                    return C0000CE.lambda27();
                case 50:
                    return this.$main.Fifth$Click();
                case 51:
                    return C0000CE.lambda28();
                case 52:
                    return C0000CE.lambda29();
                case 53:
                    return this.$main.Last$Click();
                case 54:
                    return C0000CE.lambda30();
                case 55:
                    return C0000CE.lambda31();
                case 56:
                    return C0000CE.lambda32();
                case 57:
                    return C0000CE.lambda33();
                case 58:
                    return C0000CE.lambda34();
                case 59:
                    return C0000CE.lambda35();
                case 60:
                    return this.$main.LeftTower$Click();
                case 61:
                    return C0000CE.lambda36();
                case 62:
                    return C0000CE.lambda37();
                case 63:
                    return this.$main.RightTower$Click();
                case 64:
                    return C0000CE.lambda38();
                case 65:
                    return C0000CE.lambda39();
                case 66:
                    return this.$main.LeftHallway$Click();
                case 67:
                    return C0000CE.lambda40();
                case 68:
                    return C0000CE.lambda41();
                case 69:
                    return this.$main.RightHallway$Click();
                case PrettyWriter.NEWLINE_FILL /*70*/:
                    return C0000CE.lambda42();
                case 71:
                    return C0000CE.lambda43();
                case 72:
                    return this.$main.SoloLeftHallway$Click();
                case 73:
                    return C0000CE.lambda44();
                case 74:
                    return C0000CE.lambda45();
                case 75:
                    return this.$main.SoloRightHallway$Click();
                case PrettyWriter.NEWLINE_LITERAL /*76*/:
                    return C0000CE.lambda46();
                case PrettyWriter.NEWLINE_MISER /*77*/:
                    return C0000CE.lambda47();
                case PrettyWriter.NEWLINE_LINEAR /*78*/:
                    return this.$main.LeftOgre$Click();
                case 79:
                    return C0000CE.lambda48();
                case 80:
                    return C0000CE.lambda49();
                case 81:
                    return this.$main.RightOgre$Click();
                case PrettyWriter.NEWLINE_MANDATORY /*82*/:
                    return C0000CE.lambda50();
                case PrettyWriter.NEWLINE_SPACE /*83*/:
                    return C0000CE.lambda51();
                case 84:
                    return C0000CE.lambda52();
                case 85:
                    return C0000CE.lambda53();
                case 86:
                    return C0000CE.lambda54();
                case 87:
                    return C0000CE.lambda55();
                case 88:
                    return this.$main.Wizard$Click();
                case 89:
                    return C0000CE.lambda56();
                case 90:
                    return C0000CE.lambda57();
                case 91:
                    return this.$main.Shrieker$Click();
                case 92:
                    return C0000CE.lambda58();
                case 93:
                    return C0000CE.lambda59();
                case 94:
                    return this.$main.TowerKnights$Click();
                case 95:
                    return C0000CE.lambda60();
                case 96:
                    return C0000CE.lambda61();
                case 97:
                    return this.$main.Ogre$Click();
                case 98:
                    return C0000CE.lambda62();
                case 99:
                    return C0000CE.lambda63();
                case 100:
                    return C0000CE.lambda64();
                case ErrorMessages.ERROR_LOCATION_SENSOR_LATITUDE_NOT_FOUND /*101*/:
                    return C0000CE.lambda65();
                case ErrorMessages.ERROR_LOCATION_SENSOR_LONGITUDE_NOT_FOUND /*102*/:
                    return this.$main.DownCrota$Click();
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
                case 100:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case ErrorMessages.ERROR_LOCATION_SENSOR_LATITUDE_NOT_FOUND /*101*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case ErrorMessages.ERROR_LOCATION_SENSOR_LONGITUDE_NOT_FOUND /*102*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                default:
                    return super.match0(moduleMethod, callContext);
            }
        }
    }

    public Object LeftOgre$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "KillLeftOgre.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda48() {
        C0202runtime.setAndCoerceProperty$Ex(Lit137, Lit99, Lit107, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit137, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit137, Lit17, Lit138, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit137, Lit102, Lit14, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit137, Lit24, "Right Ogre", Lit4);
    }

    static Object lambda49() {
        C0202runtime.setAndCoerceProperty$Ex(Lit137, Lit99, Lit107, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit137, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit137, Lit17, Lit138, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit137, Lit102, Lit14, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit137, Lit24, "Right Ogre", Lit4);
    }

    public Object RightOgre$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "KillRightOgre.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda50() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit142, Lit24, "Callouts", Lit4);
    }

    static Object lambda51() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit142, Lit24, "Callouts", Lit4);
    }

    static Object lambda52() {
        C0202runtime.setAndCoerceProperty$Ex(Lit145, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit145, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit145, Lit17, Lit18, Lit7);
    }

    static Object lambda53() {
        C0202runtime.setAndCoerceProperty$Ex(Lit145, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit145, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit145, Lit17, Lit18, Lit7);
    }

    static Object lambda54() {
        C0202runtime.setAndCoerceProperty$Ex(Lit148, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit148, Lit17, Lit149, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit148, Lit24, "Wizard is Dead", Lit4);
    }

    static Object lambda55() {
        C0202runtime.setAndCoerceProperty$Ex(Lit148, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit148, Lit17, Lit149, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit148, Lit24, "Wizard is Dead", Lit4);
    }

    public Object Wizard$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "TheWizardIsDead.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda56() {
        C0202runtime.setAndCoerceProperty$Ex(Lit153, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit153, Lit17, Lit154, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit153, Lit24, "Shrieker is Dead", Lit4);
    }

    static Object lambda57() {
        C0202runtime.setAndCoerceProperty$Ex(Lit153, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit153, Lit17, Lit154, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit153, Lit24, "Shrieker is Dead", Lit4);
    }

    public Object Shrieker$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "TheShriekerIsDead.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda58() {
        C0202runtime.setAndCoerceProperty$Ex(Lit158, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit158, Lit17, Lit159, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit158, Lit24, "Tower Knights are Dead", Lit4);
    }

    static Object lambda59() {
        C0202runtime.setAndCoerceProperty$Ex(Lit158, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit158, Lit17, Lit159, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit158, Lit24, "Tower Knights are Dead", Lit4);
    }

    public Object TowerKnights$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "TowerKnightsAreDead.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda60() {
        C0202runtime.setAndCoerceProperty$Ex(Lit163, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit163, Lit17, Lit164, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit163, Lit24, "Ogre is Dead", Lit4);
    }

    static Object lambda61() {
        C0202runtime.setAndCoerceProperty$Ex(Lit163, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit163, Lit17, Lit164, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit163, Lit24, "Ogre is Dead", Lit4);
    }

    public Object Ogre$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "OgreIsDead.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda62() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit168, Lit24, "Crota", Lit4);
    }

    static Object lambda63() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit168, Lit24, "Crota", Lit4);
    }

    static Object lambda64() {
        C0202runtime.setAndCoerceProperty$Ex(Lit171, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit171, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit171, Lit24, "Down Crota!", Lit4);
    }

    static Object lambda65() {
        C0202runtime.setAndCoerceProperty$Ex(Lit171, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit171, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit171, Lit24, "Down Crota!", Lit4);
    }

    public Object DownCrota$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "DownCrota.wav", Lit4);
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
        f0CE = this;
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
