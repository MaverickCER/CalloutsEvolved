package appinventor.ai_chadthornburg.Destiny_Mute_Raider_Soundboard;

import com.google.appinventor.components.common.ComponentConstants;
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
import gnu.math.DateTime;
import gnu.math.IntNum;
import gnu.text.PrettyWriter;
import kawa.lang.Promise;
import kawa.lib.C0214lists;
import kawa.lib.misc;
import kawa.lib.strings;
import kawa.standard.Scheme;
import kawa.standard.require;

/* renamed from: appinventor.ai_chadthornburg.Destiny_Mute_Raider_Soundboard.KF */
/* compiled from: KF.yail */
public class C0001KF extends Form implements Runnable {

    /* renamed from: KF */
    public static C0001KF f2KF;
    static final SimpleSymbol Lit0 = ((SimpleSymbol) new SimpleSymbol("KF").readResolve());
    static final SimpleSymbol Lit1 = ((SimpleSymbol) new SimpleSymbol("getMessage").readResolve());
    static final SimpleSymbol Lit10 = ((SimpleSymbol) new SimpleSymbol("Title").readResolve());
    static final SimpleSymbol Lit100 = ((SimpleSymbol) new SimpleSymbol("Gaze$Click").readResolve());
    static final FString Lit101 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit102 = ((SimpleSymbol) new SimpleSymbol("Gaze2").readResolve());
    static final IntNum Lit103 = IntNum.make(-1090);
    static final FString Lit104 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit105 = ((SimpleSymbol) new SimpleSymbol("Gaze2$Click").readResolve());
    static final FString Lit106 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit107 = ((SimpleSymbol) new SimpleSymbol("Gaze3").readResolve());
    static final IntNum Lit108 = IntNum.make(-1090);
    static final FString Lit109 = new FString("com.google.appinventor.components.runtime.Button");
    static final FString Lit11 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit110 = ((SimpleSymbol) new SimpleSymbol("Gaze3$Click").readResolve());
    static final FString Lit111 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit112 = ((SimpleSymbol) new SimpleSymbol("Gaze4").readResolve());
    static final IntNum Lit113 = IntNum.make(-1090);
    static final FString Lit114 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit115 = ((SimpleSymbol) new SimpleSymbol("Gaze4$Click").readResolve());
    static final FString Lit116 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit117 = ((SimpleSymbol) new SimpleSymbol("Gaze5").readResolve());
    static final IntNum Lit118 = IntNum.make(-1090);
    static final FString Lit119 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit12 = ((SimpleSymbol) new SimpleSymbol("Navigation").readResolve());
    static final SimpleSymbol Lit120 = ((SimpleSymbol) new SimpleSymbol("Gaze5$Click").readResolve());
    static final FString Lit121 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit122 = ((SimpleSymbol) new SimpleSymbol("Gaze6").readResolve());
    static final IntNum Lit123 = IntNum.make(-1090);
    static final FString Lit124 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit125 = ((SimpleSymbol) new SimpleSymbol("Gaze6$Click").readResolve());
    static final FString Lit126 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit127 = ((SimpleSymbol) new SimpleSymbol("InFightCallouts").readResolve());
    static final FString Lit128 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit129 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit13 = ((SimpleSymbol) new SimpleSymbol("AlignHorizontal").readResolve());
    static final SimpleSymbol Lit130 = ((SimpleSymbol) new SimpleSymbol("GazeCountdown").readResolve());
    static final FString Lit131 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit132 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final SimpleSymbol Lit133 = ((SimpleSymbol) new SimpleSymbol("VerticalArrangement2").readResolve());
    static final FString Lit134 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final FString Lit135 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit136 = ((SimpleSymbol) new SimpleSymbol("Nineteen").readResolve());
    static final IntNum Lit137 = IntNum.make(-1090);
    static final FString Lit138 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit139 = ((SimpleSymbol) new SimpleSymbol("Nineteen$Click").readResolve());
    static final IntNum Lit14 = IntNum.make(3);
    static final FString Lit140 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit141 = ((SimpleSymbol) new SimpleSymbol("Fifteen").readResolve());
    static final IntNum Lit142 = IntNum.make(-1090);
    static final FString Lit143 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit144 = ((SimpleSymbol) new SimpleSymbol("Fifteen$Click").readResolve());
    static final FString Lit145 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit146 = ((SimpleSymbol) new SimpleSymbol("Ten").readResolve());
    static final IntNum Lit147 = IntNum.make(-1090);
    static final FString Lit148 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit149 = ((SimpleSymbol) new SimpleSymbol("Ten$Click").readResolve());
    static final SimpleSymbol Lit15 = ((SimpleSymbol) new SimpleSymbol("AlignVertical").readResolve());
    static final FString Lit150 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit151 = ((SimpleSymbol) new SimpleSymbol("HasGazeLabel").readResolve());
    static final FString Lit152 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit153 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final SimpleSymbol Lit154 = ((SimpleSymbol) new SimpleSymbol("VerticalArrangement3").readResolve());
    static final FString Lit155 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final FString Lit156 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit157 = ((SimpleSymbol) new SimpleSymbol("TwoHasGaze").readResolve());
    static final IntNum Lit158 = IntNum.make(-1090);
    static final FString Lit159 = new FString("com.google.appinventor.components.runtime.Button");
    static final IntNum Lit16 = IntNum.make(2);
    static final SimpleSymbol Lit160 = ((SimpleSymbol) new SimpleSymbol("TwoHasGaze$Click").readResolve());
    static final FString Lit161 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit162 = ((SimpleSymbol) new SimpleSymbol("ThreeHasGaze").readResolve());
    static final IntNum Lit163 = IntNum.make(-1090);
    static final FString Lit164 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit165 = ((SimpleSymbol) new SimpleSymbol("ThreeHasGaze$Click").readResolve());
    static final FString Lit166 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit167 = ((SimpleSymbol) new SimpleSymbol("FourHasGaze").readResolve());
    static final IntNum Lit168 = IntNum.make(-1090);
    static final FString Lit169 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit17 = ((SimpleSymbol) new SimpleSymbol("Width").readResolve());
    static final SimpleSymbol Lit170 = ((SimpleSymbol) new SimpleSymbol("FourHasGaze$Click").readResolve());
    static final FString Lit171 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit172 = ((SimpleSymbol) new SimpleSymbol("FiveHasGaze").readResolve());
    static final IntNum Lit173 = IntNum.make(-1090);
    static final FString Lit174 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit175 = ((SimpleSymbol) new SimpleSymbol("FiveHasGaze$Click").readResolve());
    static final FString Lit176 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit177 = ((SimpleSymbol) new SimpleSymbol("SixHasGaze").readResolve());
    static final IntNum Lit178 = IntNum.make(-1090);
    static final FString Lit179 = new FString("com.google.appinventor.components.runtime.Button");
    static final IntNum Lit18 = IntNum.make(-2);
    static final SimpleSymbol Lit180 = ((SimpleSymbol) new SimpleSymbol("SixHasGaze$Click").readResolve());
    static final FString Lit181 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit182 = ((SimpleSymbol) new SimpleSymbol("DaughtersLabel").readResolve());
    static final FString Lit183 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit184 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit185 = ((SimpleSymbol) new SimpleSymbol("ImTorn").readResolve());
    static final FString Lit186 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit187 = ((SimpleSymbol) new SimpleSymbol("ImTorn$Click").readResolve());
    static final FString Lit188 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit189 = ((SimpleSymbol) new SimpleSymbol("HaveRelic").readResolve());
    static final FString Lit19 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final FString Lit190 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit191 = ((SimpleSymbol) new SimpleSymbol("HaveRelic$Click").readResolve());
    static final FString Lit192 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit193 = ((SimpleSymbol) new SimpleSymbol("OryxLabel").readResolve());
    static final FString Lit194 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit195 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit196 = ((SimpleSymbol) new SimpleSymbol("OryxAssignmentsLabel").readResolve());
    static final FString Lit197 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit198 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final SimpleSymbol Lit199 = ((SimpleSymbol) new SimpleSymbol("OryxArrangement").readResolve());
    static final SimpleSymbol Lit2 = ((SimpleSymbol) new SimpleSymbol("*the-null-value*").readResolve());
    static final FString Lit20 = new FString("com.google.appinventor.components.runtime.Button");
    static final FString Lit200 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final FString Lit201 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit202 = ((SimpleSymbol) new SimpleSymbol("Runner").readResolve());
    static final IntNum Lit203 = IntNum.make(-1090);
    static final FString Lit204 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit205 = ((SimpleSymbol) new SimpleSymbol("Runner$Click").readResolve());
    static final FString Lit206 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit207 = ((SimpleSymbol) new SimpleSymbol("One").readResolve());
    static final IntNum Lit208 = IntNum.make(-1090);
    static final FString Lit209 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit21 = ((SimpleSymbol) new SimpleSymbol("General").readResolve());
    static final SimpleSymbol Lit210 = ((SimpleSymbol) new SimpleSymbol("One$Click").readResolve());
    static final FString Lit211 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit212 = ((SimpleSymbol) new SimpleSymbol("Two").readResolve());
    static final IntNum Lit213 = IntNum.make(-1090);
    static final FString Lit214 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit215 = ((SimpleSymbol) new SimpleSymbol("Two$Click").readResolve());
    static final FString Lit216 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit217 = ((SimpleSymbol) new SimpleSymbol("Three").readResolve());
    static final IntNum Lit218 = IntNum.make(-1090);
    static final FString Lit219 = new FString("com.google.appinventor.components.runtime.Button");
    static final IntNum Lit22;
    static final SimpleSymbol Lit220 = ((SimpleSymbol) new SimpleSymbol("Three$Click").readResolve());
    static final FString Lit221 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit222 = ((SimpleSymbol) new SimpleSymbol("Middle4thBomb").readResolve());
    static final IntNum Lit223 = IntNum.make(-1090);
    static final FString Lit224 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit225 = ((SimpleSymbol) new SimpleSymbol("Middle4thBomb$Click").readResolve());
    static final FString Lit226 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit227 = ((SimpleSymbol) new SimpleSymbol("OryxCallouts").readResolve());
    static final FString Lit228 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit229 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final SimpleSymbol Lit23 = ((SimpleSymbol) new SimpleSymbol("FontBold").readResolve());
    static final SimpleSymbol Lit230 = ((SimpleSymbol) new SimpleSymbol("VerticalArrangement5").readResolve());
    static final FString Lit231 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final FString Lit232 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit233 = ((SimpleSymbol) new SimpleSymbol("OneIsOn").readResolve());
    static final IntNum Lit234 = IntNum.make(-1090);
    static final FString Lit235 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit236 = ((SimpleSymbol) new SimpleSymbol("OneIsOn$Click").readResolve());
    static final FString Lit237 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit238 = ((SimpleSymbol) new SimpleSymbol("TwoIsOn").readResolve());
    static final IntNum Lit239 = IntNum.make(-1090);
    static final SimpleSymbol Lit24 = ((SimpleSymbol) new SimpleSymbol("Text").readResolve());
    static final FString Lit240 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit241 = ((SimpleSymbol) new SimpleSymbol("TwoIsOn$Click").readResolve());
    static final FString Lit242 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit243 = ((SimpleSymbol) new SimpleSymbol("HaveRelicOryx").readResolve());
    static final IntNum Lit244 = IntNum.make(-1090);
    static final FString Lit245 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit246 = ((SimpleSymbol) new SimpleSymbol("HaveRelicOryx$Click").readResolve());
    static final FString Lit247 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit248 = ((SimpleSymbol) new SimpleSymbol("Knight4Dead").readResolve());
    static final IntNum Lit249 = IntNum.make(-1090);
    static final FString Lit25 = new FString("com.google.appinventor.components.runtime.Button");
    static final FString Lit250 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit251 = ((SimpleSymbol) new SimpleSymbol("Knight4Dead$Click").readResolve());
    static final FString Lit252 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit253 = ((SimpleSymbol) new SimpleSymbol("ShootTheBoss").readResolve());
    static final IntNum Lit254 = IntNum.make(-1090);
    static final FString Lit255 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit256 = ((SimpleSymbol) new SimpleSymbol("ShootTheBoss$Click").readResolve());
    static final FString Lit257 = new FString("com.google.appinventor.components.runtime.Player");
    static final FString Lit258 = new FString("com.google.appinventor.components.runtime.Player");
    static final SimpleSymbol Lit259 = ((SimpleSymbol) new SimpleSymbol("android-log-form").readResolve());
    static final PairWithPosition Lit26 = PairWithPosition.make(Lit4, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\KF.yail", 159822);
    static final SimpleSymbol Lit260 = ((SimpleSymbol) new SimpleSymbol("add-to-form-environment").readResolve());
    static final SimpleSymbol Lit261 = ((SimpleSymbol) new SimpleSymbol("lookup-in-form-environment").readResolve());
    static final SimpleSymbol Lit262 = ((SimpleSymbol) new SimpleSymbol("is-bound-in-form-environment").readResolve());
    static final SimpleSymbol Lit263 = ((SimpleSymbol) new SimpleSymbol("add-to-global-var-environment").readResolve());
    static final SimpleSymbol Lit264 = ((SimpleSymbol) new SimpleSymbol("add-to-events").readResolve());
    static final SimpleSymbol Lit265 = ((SimpleSymbol) new SimpleSymbol("add-to-components").readResolve());
    static final SimpleSymbol Lit266 = ((SimpleSymbol) new SimpleSymbol("add-to-global-vars").readResolve());
    static final SimpleSymbol Lit267 = ((SimpleSymbol) new SimpleSymbol("add-to-form-do-after-creation").readResolve());
    static final SimpleSymbol Lit268 = ((SimpleSymbol) new SimpleSymbol("send-error").readResolve());
    static final SimpleSymbol Lit269 = ((SimpleSymbol) new SimpleSymbol("dispatchEvent").readResolve());
    static final SimpleSymbol Lit27 = ((SimpleSymbol) new SimpleSymbol("General$Click").readResolve());
    static final SimpleSymbol Lit270 = ((SimpleSymbol) new SimpleSymbol("lookup-handler").readResolve());
    static final SimpleSymbol Lit28 = ((SimpleSymbol) new SimpleSymbol("Click").readResolve());
    static final FString Lit29 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit3 = ((SimpleSymbol) new SimpleSymbol("AppName").readResolve());
    static final SimpleSymbol Lit30 = ((SimpleSymbol) new SimpleSymbol("VoG").readResolve());
    static final IntNum Lit31;
    static final IntNum Lit32 = IntNum.make(-1020);
    static final FString Lit33 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit34 = PairWithPosition.make(Lit4, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\KF.yail", 221258);
    static final SimpleSymbol Lit35 = ((SimpleSymbol) new SimpleSymbol("VoG$Click").readResolve());
    static final FString Lit36 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit37 = ((SimpleSymbol) new SimpleSymbol("CE").readResolve());
    static final IntNum Lit38;
    static final IntNum Lit39 = IntNum.make(-1020);
    static final SimpleSymbol Lit4;
    static final FString Lit40 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit41 = PairWithPosition.make(Lit4, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\KF.yail", 282697);
    static final SimpleSymbol Lit42 = ((SimpleSymbol) new SimpleSymbol("CE$Click").readResolve());
    static final FString Lit43 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit44 = ((SimpleSymbol) new SimpleSymbol("WoTM").readResolve());
    static final IntNum Lit45;
    static final IntNum Lit46 = IntNum.make(-1020);
    static final FString Lit47 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit48;
    static final SimpleSymbol Lit49 = ((SimpleSymbol) new SimpleSymbol("WoTM$Click").readResolve());
    static final SimpleSymbol Lit5 = ((SimpleSymbol) new SimpleSymbol("BackgroundColor").readResolve());
    static final FString Lit50 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit51 = ((SimpleSymbol) new SimpleSymbol("IntroTotemsLabel").readResolve());
    static final FString Lit52 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit53 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit54 = ((SimpleSymbol) new SimpleSymbol("HorizontalArrangement1").readResolve());
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
    static final FString Lit74 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit75 = ((SimpleSymbol) new SimpleSymbol("HorizontalArrangement2").readResolve());
    static final FString Lit76 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final FString Lit77 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit78 = ((SimpleSymbol) new SimpleSymbol("MidThenLeft").readResolve());
    static final IntNum Lit79 = IntNum.make(-1045);
    static final SimpleSymbol Lit8 = ((SimpleSymbol) new SimpleSymbol("Scrollable").readResolve());
    static final FString Lit80 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit81 = ((SimpleSymbol) new SimpleSymbol("MidThenLeft$Click").readResolve());
    static final FString Lit82 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit83 = ((SimpleSymbol) new SimpleSymbol("MidThenRight").readResolve());
    static final IntNum Lit84 = IntNum.make(-1045);
    static final FString Lit85 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit86 = ((SimpleSymbol) new SimpleSymbol("MidThenRight$Click").readResolve());
    static final FString Lit87 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit88 = ((SimpleSymbol) new SimpleSymbol("GolgCM").readResolve());
    static final FString Lit89 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit9 = ((SimpleSymbol) new SimpleSymbol(PropertyTypeConstants.PROPERTY_TYPE_BOOLEAN).readResolve());
    static final FString Lit90 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit91 = ((SimpleSymbol) new SimpleSymbol("PreFightAssignments").readResolve());
    static final FString Lit92 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit93 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final SimpleSymbol Lit94 = ((SimpleSymbol) new SimpleSymbol("VerticalArrangement1").readResolve());
    static final FString Lit95 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final FString Lit96 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit97 = ((SimpleSymbol) new SimpleSymbol("Gaze").readResolve());
    static final IntNum Lit98 = IntNum.make(-1090);
    static final FString Lit99 = new FString("com.google.appinventor.components.runtime.Button");
    static final ModuleMethod lambda$Fn1 = null;
    static final ModuleMethod lambda$Fn10 = null;
    static final ModuleMethod lambda$Fn100 = null;
    static final ModuleMethod lambda$Fn101 = null;
    static final ModuleMethod lambda$Fn102 = null;
    static final ModuleMethod lambda$Fn103 = null;
    static final ModuleMethod lambda$Fn104 = null;
    static final ModuleMethod lambda$Fn105 = null;
    static final ModuleMethod lambda$Fn106 = null;
    static final ModuleMethod lambda$Fn107 = null;
    static final ModuleMethod lambda$Fn108 = null;
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
    static final ModuleMethod lambda$Fn65 = null;
    static final ModuleMethod lambda$Fn66 = null;
    static final ModuleMethod lambda$Fn67 = null;
    static final ModuleMethod lambda$Fn68 = null;
    static final ModuleMethod lambda$Fn69 = null;
    static final ModuleMethod lambda$Fn7 = null;
    static final ModuleMethod lambda$Fn70 = null;
    static final ModuleMethod lambda$Fn71 = null;
    static final ModuleMethod lambda$Fn72 = null;
    static final ModuleMethod lambda$Fn73 = null;
    static final ModuleMethod lambda$Fn74 = null;
    static final ModuleMethod lambda$Fn75 = null;
    static final ModuleMethod lambda$Fn76 = null;
    static final ModuleMethod lambda$Fn77 = null;
    static final ModuleMethod lambda$Fn78 = null;
    static final ModuleMethod lambda$Fn79 = null;
    static final ModuleMethod lambda$Fn8 = null;
    static final ModuleMethod lambda$Fn80 = null;
    static final ModuleMethod lambda$Fn81 = null;
    static final ModuleMethod lambda$Fn82 = null;
    static final ModuleMethod lambda$Fn83 = null;
    static final ModuleMethod lambda$Fn84 = null;
    static final ModuleMethod lambda$Fn85 = null;
    static final ModuleMethod lambda$Fn86 = null;
    static final ModuleMethod lambda$Fn87 = null;
    static final ModuleMethod lambda$Fn88 = null;
    static final ModuleMethod lambda$Fn89 = null;
    static final ModuleMethod lambda$Fn9 = null;
    static final ModuleMethod lambda$Fn90 = null;
    static final ModuleMethod lambda$Fn91 = null;
    static final ModuleMethod lambda$Fn92 = null;
    static final ModuleMethod lambda$Fn93 = null;
    static final ModuleMethod lambda$Fn94 = null;
    static final ModuleMethod lambda$Fn95 = null;
    static final ModuleMethod lambda$Fn96 = null;
    static final ModuleMethod lambda$Fn97 = null;
    static final ModuleMethod lambda$Fn98 = null;
    static final ModuleMethod lambda$Fn99 = null;
    public Boolean $Stdebug$Mnform$St;
    public final ModuleMethod $define;

    /* renamed from: CE */
    public Button f3CE;
    public final ModuleMethod CE$Click;
    public Label DaughtersLabel;
    public Button Fifteen;
    public final ModuleMethod Fifteen$Click;
    public Button FiveHasGaze;
    public final ModuleMethod FiveHasGaze$Click;
    public Button FourHasGaze;
    public final ModuleMethod FourHasGaze$Click;
    public Button Gaze;
    public final ModuleMethod Gaze$Click;
    public Button Gaze2;
    public final ModuleMethod Gaze2$Click;
    public Button Gaze3;
    public final ModuleMethod Gaze3$Click;
    public Button Gaze4;
    public final ModuleMethod Gaze4$Click;
    public Button Gaze5;
    public final ModuleMethod Gaze5$Click;
    public Button Gaze6;
    public final ModuleMethod Gaze6$Click;
    public Label GazeCountdown;
    public Button General;
    public final ModuleMethod General$Click;
    public Label GolgCM;
    public Label HasGazeLabel;
    public Button HaveRelic;
    public final ModuleMethod HaveRelic$Click;
    public Button HaveRelicOryx;
    public final ModuleMethod HaveRelicOryx$Click;
    public HorizontalArrangement HorizontalArrangement1;
    public HorizontalArrangement HorizontalArrangement2;
    public Button ImTorn;
    public final ModuleMethod ImTorn$Click;
    public Label InFightCallouts;
    public Label IntroTotemsLabel;
    public Button Knight4Dead;
    public final ModuleMethod Knight4Dead$Click;
    public Button Left;
    public final ModuleMethod Left$Click;
    public Button MidThenLeft;
    public final ModuleMethod MidThenLeft$Click;
    public Button MidThenRight;
    public final ModuleMethod MidThenRight$Click;
    public Button Middle;
    public final ModuleMethod Middle$Click;
    public Button Middle4thBomb;
    public final ModuleMethod Middle4thBomb$Click;
    public HorizontalArrangement Navigation;
    public Button Nineteen;
    public final ModuleMethod Nineteen$Click;
    public Button One;
    public final ModuleMethod One$Click;
    public Button OneIsOn;
    public final ModuleMethod OneIsOn$Click;
    public VerticalArrangement OryxArrangement;
    public Label OryxAssignmentsLabel;
    public Label OryxCallouts;
    public Label OryxLabel;
    public Player Player1;
    public Label PreFightAssignments;
    public Button Right;
    public final ModuleMethod Right$Click;
    public Button Runner;
    public final ModuleMethod Runner$Click;
    public Button ShootTheBoss;
    public final ModuleMethod ShootTheBoss$Click;
    public Button SixHasGaze;
    public final ModuleMethod SixHasGaze$Click;
    public Button Ten;
    public final ModuleMethod Ten$Click;
    public Button Three;
    public final ModuleMethod Three$Click;
    public Button ThreeHasGaze;
    public final ModuleMethod ThreeHasGaze$Click;
    public Button Two;
    public final ModuleMethod Two$Click;
    public Button TwoHasGaze;
    public final ModuleMethod TwoHasGaze$Click;
    public Button TwoIsOn;
    public final ModuleMethod TwoIsOn$Click;
    public VerticalArrangement VerticalArrangement1;
    public VerticalArrangement VerticalArrangement2;
    public VerticalArrangement VerticalArrangement3;
    public VerticalArrangement VerticalArrangement5;
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
        Lit48 = PairWithPosition.make(simpleSymbol, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\KF.yail", 344139);
        int[] iArr = new int[2];
        iArr[0] = -65536;
        Lit45 = IntNum.make(iArr);
        int[] iArr2 = new int[2];
        iArr2[0] = -16711936;
        Lit38 = IntNum.make(iArr2);
        int[] iArr3 = new int[2];
        iArr3[0] = -14336;
        Lit31 = IntNum.make(iArr3);
        int[] iArr4 = new int[2];
        iArr4[0] = -1;
        Lit22 = IntNum.make(iArr4);
        int[] iArr5 = new int[2];
        iArr5[0] = -3355444;
        Lit6 = IntNum.make(iArr5);
    }

    public C0001KF() {
        ModuleInfo.register(this);
        frame frame2 = new frame();
        frame2.$main = this;
        this.android$Mnlog$Mnform = new ModuleMethod(frame2, 1, Lit259, 4097);
        this.add$Mnto$Mnform$Mnenvironment = new ModuleMethod(frame2, 2, Lit260, 8194);
        this.lookup$Mnin$Mnform$Mnenvironment = new ModuleMethod(frame2, 3, Lit261, 8193);
        this.is$Mnbound$Mnin$Mnform$Mnenvironment = new ModuleMethod(frame2, 5, Lit262, 4097);
        this.add$Mnto$Mnglobal$Mnvar$Mnenvironment = new ModuleMethod(frame2, 6, Lit263, 8194);
        this.add$Mnto$Mnevents = new ModuleMethod(frame2, 7, Lit264, 8194);
        this.add$Mnto$Mncomponents = new ModuleMethod(frame2, 8, Lit265, 16388);
        this.add$Mnto$Mnglobal$Mnvars = new ModuleMethod(frame2, 9, Lit266, 8194);
        this.add$Mnto$Mnform$Mndo$Mnafter$Mncreation = new ModuleMethod(frame2, 10, Lit267, 4097);
        this.send$Mnerror = new ModuleMethod(frame2, 11, Lit268, 4097);
        this.process$Mnexception = new ModuleMethod(frame2, 12, "process-exception", 4097);
        this.dispatchEvent = new ModuleMethod(frame2, 13, Lit269, 16388);
        this.lookup$Mnhandler = new ModuleMethod(frame2, 14, Lit270, 8194);
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
        this.CE$Click = new ModuleMethod(frame2, 28, Lit42, 0);
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
        this.MidThenLeft$Click = new ModuleMethod(frame2, 49, Lit81, 0);
        lambda$Fn27 = new ModuleMethod(frame2, 50, (Object) null, 0);
        lambda$Fn28 = new ModuleMethod(frame2, 51, (Object) null, 0);
        this.MidThenRight$Click = new ModuleMethod(frame2, 52, Lit86, 0);
        lambda$Fn29 = new ModuleMethod(frame2, 53, (Object) null, 0);
        lambda$Fn30 = new ModuleMethod(frame2, 54, (Object) null, 0);
        lambda$Fn31 = new ModuleMethod(frame2, 55, (Object) null, 0);
        lambda$Fn32 = new ModuleMethod(frame2, 56, (Object) null, 0);
        lambda$Fn33 = new ModuleMethod(frame2, 57, (Object) null, 0);
        lambda$Fn34 = new ModuleMethod(frame2, 58, (Object) null, 0);
        lambda$Fn35 = new ModuleMethod(frame2, 59, (Object) null, 0);
        lambda$Fn36 = new ModuleMethod(frame2, 60, (Object) null, 0);
        this.Gaze$Click = new ModuleMethod(frame2, 61, Lit100, 0);
        lambda$Fn37 = new ModuleMethod(frame2, 62, (Object) null, 0);
        lambda$Fn38 = new ModuleMethod(frame2, 63, (Object) null, 0);
        this.Gaze2$Click = new ModuleMethod(frame2, 64, Lit105, 0);
        lambda$Fn39 = new ModuleMethod(frame2, 65, (Object) null, 0);
        lambda$Fn40 = new ModuleMethod(frame2, 66, (Object) null, 0);
        this.Gaze3$Click = new ModuleMethod(frame2, 67, Lit110, 0);
        lambda$Fn41 = new ModuleMethod(frame2, 68, (Object) null, 0);
        lambda$Fn42 = new ModuleMethod(frame2, 69, (Object) null, 0);
        this.Gaze4$Click = new ModuleMethod(frame2, 70, Lit115, 0);
        lambda$Fn43 = new ModuleMethod(frame2, 71, (Object) null, 0);
        lambda$Fn44 = new ModuleMethod(frame2, 72, (Object) null, 0);
        this.Gaze5$Click = new ModuleMethod(frame2, 73, Lit120, 0);
        lambda$Fn45 = new ModuleMethod(frame2, 74, (Object) null, 0);
        lambda$Fn46 = new ModuleMethod(frame2, 75, (Object) null, 0);
        this.Gaze6$Click = new ModuleMethod(frame2, 76, Lit125, 0);
        lambda$Fn47 = new ModuleMethod(frame2, 77, (Object) null, 0);
        lambda$Fn48 = new ModuleMethod(frame2, 78, (Object) null, 0);
        lambda$Fn49 = new ModuleMethod(frame2, 79, (Object) null, 0);
        lambda$Fn50 = new ModuleMethod(frame2, 80, (Object) null, 0);
        lambda$Fn51 = new ModuleMethod(frame2, 81, (Object) null, 0);
        lambda$Fn52 = new ModuleMethod(frame2, 82, (Object) null, 0);
        lambda$Fn53 = new ModuleMethod(frame2, 83, (Object) null, 0);
        lambda$Fn54 = new ModuleMethod(frame2, 84, (Object) null, 0);
        this.Nineteen$Click = new ModuleMethod(frame2, 85, Lit139, 0);
        lambda$Fn55 = new ModuleMethod(frame2, 86, (Object) null, 0);
        lambda$Fn56 = new ModuleMethod(frame2, 87, (Object) null, 0);
        this.Fifteen$Click = new ModuleMethod(frame2, 88, Lit144, 0);
        lambda$Fn57 = new ModuleMethod(frame2, 89, (Object) null, 0);
        lambda$Fn58 = new ModuleMethod(frame2, 90, (Object) null, 0);
        this.Ten$Click = new ModuleMethod(frame2, 91, Lit149, 0);
        lambda$Fn59 = new ModuleMethod(frame2, 92, (Object) null, 0);
        lambda$Fn60 = new ModuleMethod(frame2, 93, (Object) null, 0);
        lambda$Fn61 = new ModuleMethod(frame2, 94, (Object) null, 0);
        lambda$Fn62 = new ModuleMethod(frame2, 95, (Object) null, 0);
        lambda$Fn63 = new ModuleMethod(frame2, 96, (Object) null, 0);
        lambda$Fn64 = new ModuleMethod(frame2, 97, (Object) null, 0);
        this.TwoHasGaze$Click = new ModuleMethod(frame2, 98, Lit160, 0);
        lambda$Fn65 = new ModuleMethod(frame2, 99, (Object) null, 0);
        lambda$Fn66 = new ModuleMethod(frame2, 100, (Object) null, 0);
        this.ThreeHasGaze$Click = new ModuleMethod(frame2, ErrorMessages.ERROR_LOCATION_SENSOR_LATITUDE_NOT_FOUND, Lit165, 0);
        lambda$Fn67 = new ModuleMethod(frame2, ErrorMessages.ERROR_LOCATION_SENSOR_LONGITUDE_NOT_FOUND, (Object) null, 0);
        lambda$Fn68 = new ModuleMethod(frame2, 103, (Object) null, 0);
        this.FourHasGaze$Click = new ModuleMethod(frame2, 104, Lit170, 0);
        lambda$Fn69 = new ModuleMethod(frame2, 105, (Object) null, 0);
        lambda$Fn70 = new ModuleMethod(frame2, 106, (Object) null, 0);
        this.FiveHasGaze$Click = new ModuleMethod(frame2, 107, Lit175, 0);
        lambda$Fn71 = new ModuleMethod(frame2, 108, (Object) null, 0);
        lambda$Fn72 = new ModuleMethod(frame2, 109, (Object) null, 0);
        this.SixHasGaze$Click = new ModuleMethod(frame2, 110, Lit180, 0);
        lambda$Fn73 = new ModuleMethod(frame2, 111, (Object) null, 0);
        lambda$Fn74 = new ModuleMethod(frame2, DateTime.TIME_MASK, (Object) null, 0);
        lambda$Fn75 = new ModuleMethod(frame2, 113, (Object) null, 0);
        lambda$Fn76 = new ModuleMethod(frame2, 114, (Object) null, 0);
        this.ImTorn$Click = new ModuleMethod(frame2, 115, Lit187, 0);
        lambda$Fn77 = new ModuleMethod(frame2, 116, (Object) null, 0);
        lambda$Fn78 = new ModuleMethod(frame2, 117, (Object) null, 0);
        this.HaveRelic$Click = new ModuleMethod(frame2, 118, Lit191, 0);
        lambda$Fn79 = new ModuleMethod(frame2, 119, (Object) null, 0);
        lambda$Fn80 = new ModuleMethod(frame2, 120, (Object) null, 0);
        lambda$Fn81 = new ModuleMethod(frame2, 121, (Object) null, 0);
        lambda$Fn82 = new ModuleMethod(frame2, 122, (Object) null, 0);
        lambda$Fn83 = new ModuleMethod(frame2, 123, (Object) null, 0);
        lambda$Fn84 = new ModuleMethod(frame2, 124, (Object) null, 0);
        lambda$Fn85 = new ModuleMethod(frame2, 125, (Object) null, 0);
        lambda$Fn86 = new ModuleMethod(frame2, 126, (Object) null, 0);
        this.Runner$Click = new ModuleMethod(frame2, 127, Lit205, 0);
        lambda$Fn87 = new ModuleMethod(frame2, DateTime.TIMEZONE_MASK, (Object) null, 0);
        lambda$Fn88 = new ModuleMethod(frame2, 129, (Object) null, 0);
        this.One$Click = new ModuleMethod(frame2, 130, Lit210, 0);
        lambda$Fn89 = new ModuleMethod(frame2, 131, (Object) null, 0);
        lambda$Fn90 = new ModuleMethod(frame2, 132, (Object) null, 0);
        this.Two$Click = new ModuleMethod(frame2, 133, Lit215, 0);
        lambda$Fn91 = new ModuleMethod(frame2, 134, (Object) null, 0);
        lambda$Fn92 = new ModuleMethod(frame2, 135, (Object) null, 0);
        this.Three$Click = new ModuleMethod(frame2, 136, Lit220, 0);
        lambda$Fn93 = new ModuleMethod(frame2, 137, (Object) null, 0);
        lambda$Fn94 = new ModuleMethod(frame2, 138, (Object) null, 0);
        this.Middle4thBomb$Click = new ModuleMethod(frame2, 139, Lit225, 0);
        lambda$Fn95 = new ModuleMethod(frame2, 140, (Object) null, 0);
        lambda$Fn96 = new ModuleMethod(frame2, 141, (Object) null, 0);
        lambda$Fn97 = new ModuleMethod(frame2, 142, (Object) null, 0);
        lambda$Fn98 = new ModuleMethod(frame2, 143, (Object) null, 0);
        lambda$Fn99 = new ModuleMethod(frame2, ComponentConstants.VIDEOPLAYER_PREFERRED_HEIGHT, (Object) null, 0);
        lambda$Fn100 = new ModuleMethod(frame2, 145, (Object) null, 0);
        this.OneIsOn$Click = new ModuleMethod(frame2, 146, Lit236, 0);
        lambda$Fn101 = new ModuleMethod(frame2, 147, (Object) null, 0);
        lambda$Fn102 = new ModuleMethod(frame2, 148, (Object) null, 0);
        this.TwoIsOn$Click = new ModuleMethod(frame2, 149, Lit241, 0);
        lambda$Fn103 = new ModuleMethod(frame2, 150, (Object) null, 0);
        lambda$Fn104 = new ModuleMethod(frame2, 151, (Object) null, 0);
        this.HaveRelicOryx$Click = new ModuleMethod(frame2, 152, Lit246, 0);
        lambda$Fn105 = new ModuleMethod(frame2, 153, (Object) null, 0);
        lambda$Fn106 = new ModuleMethod(frame2, 154, (Object) null, 0);
        this.Knight4Dead$Click = new ModuleMethod(frame2, 155, Lit251, 0);
        lambda$Fn107 = new ModuleMethod(frame2, 156, (Object) null, 0);
        lambda$Fn108 = new ModuleMethod(frame2, 157, (Object) null, 0);
        this.ShootTheBoss$Click = new ModuleMethod(frame2, 158, Lit256, 0);
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
            f2KF = null;
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
                    Values.writeValues(C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit10, "KF", Lit4), $result);
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
                this.f3CE = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit12, Lit36, Lit37, lambda$Fn9), $result);
                } else {
                    addToComponents(Lit12, Lit40, Lit37, lambda$Fn10);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit42, this.CE$Click);
                } else {
                    addToFormEnvironment(Lit42, this.CE$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "CE", "Click");
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
                this.IntroTotemsLabel = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit50, Lit51, lambda$Fn13), $result);
                } else {
                    addToComponents(Lit0, Lit52, Lit51, lambda$Fn14);
                }
                this.HorizontalArrangement1 = null;
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
                this.HorizontalArrangement2 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit74, Lit75, lambda$Fn23), $result);
                } else {
                    addToComponents(Lit0, Lit76, Lit75, lambda$Fn24);
                }
                this.MidThenLeft = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit75, Lit77, Lit78, lambda$Fn25), $result);
                } else {
                    addToComponents(Lit75, Lit80, Lit78, lambda$Fn26);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit81, this.MidThenLeft$Click);
                } else {
                    addToFormEnvironment(Lit81, this.MidThenLeft$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "MidThenLeft", "Click");
                } else {
                    addToEvents(Lit78, Lit28);
                }
                this.MidThenRight = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit75, Lit82, Lit83, lambda$Fn27), $result);
                } else {
                    addToComponents(Lit75, Lit85, Lit83, lambda$Fn28);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit86, this.MidThenRight$Click);
                } else {
                    addToFormEnvironment(Lit86, this.MidThenRight$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "MidThenRight", "Click");
                } else {
                    addToEvents(Lit83, Lit28);
                }
                this.GolgCM = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit87, Lit88, lambda$Fn29), $result);
                } else {
                    addToComponents(Lit0, Lit89, Lit88, lambda$Fn30);
                }
                this.PreFightAssignments = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit90, Lit91, lambda$Fn31), $result);
                } else {
                    addToComponents(Lit0, Lit92, Lit91, lambda$Fn32);
                }
                this.VerticalArrangement1 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit93, Lit94, lambda$Fn33), $result);
                } else {
                    addToComponents(Lit0, Lit95, Lit94, lambda$Fn34);
                }
                this.Gaze = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit94, Lit96, Lit97, lambda$Fn35), $result);
                } else {
                    addToComponents(Lit94, Lit99, Lit97, lambda$Fn36);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit100, this.Gaze$Click);
                } else {
                    addToFormEnvironment(Lit100, this.Gaze$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Gaze", "Click");
                } else {
                    addToEvents(Lit97, Lit28);
                }
                this.Gaze2 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit94, Lit101, Lit102, lambda$Fn37), $result);
                } else {
                    addToComponents(Lit94, Lit104, Lit102, lambda$Fn38);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit105, this.Gaze2$Click);
                } else {
                    addToFormEnvironment(Lit105, this.Gaze2$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Gaze2", "Click");
                } else {
                    addToEvents(Lit102, Lit28);
                }
                this.Gaze3 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit94, Lit106, Lit107, lambda$Fn39), $result);
                } else {
                    addToComponents(Lit94, Lit109, Lit107, lambda$Fn40);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit110, this.Gaze3$Click);
                } else {
                    addToFormEnvironment(Lit110, this.Gaze3$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Gaze3", "Click");
                } else {
                    addToEvents(Lit107, Lit28);
                }
                this.Gaze4 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit94, Lit111, Lit112, lambda$Fn41), $result);
                } else {
                    addToComponents(Lit94, Lit114, Lit112, lambda$Fn42);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit115, this.Gaze4$Click);
                } else {
                    addToFormEnvironment(Lit115, this.Gaze4$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Gaze4", "Click");
                } else {
                    addToEvents(Lit112, Lit28);
                }
                this.Gaze5 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit94, Lit116, Lit117, lambda$Fn43), $result);
                } else {
                    addToComponents(Lit94, Lit119, Lit117, lambda$Fn44);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit120, this.Gaze5$Click);
                } else {
                    addToFormEnvironment(Lit120, this.Gaze5$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Gaze5", "Click");
                } else {
                    addToEvents(Lit117, Lit28);
                }
                this.Gaze6 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit94, Lit121, Lit122, lambda$Fn45), $result);
                } else {
                    addToComponents(Lit94, Lit124, Lit122, lambda$Fn46);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit125, this.Gaze6$Click);
                } else {
                    addToFormEnvironment(Lit125, this.Gaze6$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Gaze6", "Click");
                } else {
                    addToEvents(Lit122, Lit28);
                }
                this.InFightCallouts = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit126, Lit127, lambda$Fn47), $result);
                } else {
                    addToComponents(Lit0, Lit128, Lit127, lambda$Fn48);
                }
                this.GazeCountdown = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit129, Lit130, lambda$Fn49), $result);
                } else {
                    addToComponents(Lit0, Lit131, Lit130, lambda$Fn50);
                }
                this.VerticalArrangement2 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit132, Lit133, lambda$Fn51), $result);
                } else {
                    addToComponents(Lit0, Lit134, Lit133, lambda$Fn52);
                }
                this.Nineteen = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit133, Lit135, Lit136, lambda$Fn53), $result);
                } else {
                    addToComponents(Lit133, Lit138, Lit136, lambda$Fn54);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit139, this.Nineteen$Click);
                } else {
                    addToFormEnvironment(Lit139, this.Nineteen$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Nineteen", "Click");
                } else {
                    addToEvents(Lit136, Lit28);
                }
                this.Fifteen = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit133, Lit140, Lit141, lambda$Fn55), $result);
                } else {
                    addToComponents(Lit133, Lit143, Lit141, lambda$Fn56);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit144, this.Fifteen$Click);
                } else {
                    addToFormEnvironment(Lit144, this.Fifteen$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Fifteen", "Click");
                } else {
                    addToEvents(Lit141, Lit28);
                }
                this.Ten = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit133, Lit145, Lit146, lambda$Fn57), $result);
                } else {
                    addToComponents(Lit133, Lit148, Lit146, lambda$Fn58);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit149, this.Ten$Click);
                } else {
                    addToFormEnvironment(Lit149, this.Ten$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Ten", "Click");
                } else {
                    addToEvents(Lit146, Lit28);
                }
                this.HasGazeLabel = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit150, Lit151, lambda$Fn59), $result);
                } else {
                    addToComponents(Lit0, Lit152, Lit151, lambda$Fn60);
                }
                this.VerticalArrangement3 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit153, Lit154, lambda$Fn61), $result);
                } else {
                    addToComponents(Lit0, Lit155, Lit154, lambda$Fn62);
                }
                this.TwoHasGaze = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit154, Lit156, Lit157, lambda$Fn63), $result);
                } else {
                    addToComponents(Lit154, Lit159, Lit157, lambda$Fn64);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit160, this.TwoHasGaze$Click);
                } else {
                    addToFormEnvironment(Lit160, this.TwoHasGaze$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "TwoHasGaze", "Click");
                } else {
                    addToEvents(Lit157, Lit28);
                }
                this.ThreeHasGaze = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit154, Lit161, Lit162, lambda$Fn65), $result);
                } else {
                    addToComponents(Lit154, Lit164, Lit162, lambda$Fn66);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit165, this.ThreeHasGaze$Click);
                } else {
                    addToFormEnvironment(Lit165, this.ThreeHasGaze$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "ThreeHasGaze", "Click");
                } else {
                    addToEvents(Lit162, Lit28);
                }
                this.FourHasGaze = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit154, Lit166, Lit167, lambda$Fn67), $result);
                } else {
                    addToComponents(Lit154, Lit169, Lit167, lambda$Fn68);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit170, this.FourHasGaze$Click);
                } else {
                    addToFormEnvironment(Lit170, this.FourHasGaze$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "FourHasGaze", "Click");
                } else {
                    addToEvents(Lit167, Lit28);
                }
                this.FiveHasGaze = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit154, Lit171, Lit172, lambda$Fn69), $result);
                } else {
                    addToComponents(Lit154, Lit174, Lit172, lambda$Fn70);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit175, this.FiveHasGaze$Click);
                } else {
                    addToFormEnvironment(Lit175, this.FiveHasGaze$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "FiveHasGaze", "Click");
                } else {
                    addToEvents(Lit172, Lit28);
                }
                this.SixHasGaze = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit154, Lit176, Lit177, lambda$Fn71), $result);
                } else {
                    addToComponents(Lit154, Lit179, Lit177, lambda$Fn72);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit180, this.SixHasGaze$Click);
                } else {
                    addToFormEnvironment(Lit180, this.SixHasGaze$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "SixHasGaze", "Click");
                } else {
                    addToEvents(Lit177, Lit28);
                }
                this.DaughtersLabel = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit181, Lit182, lambda$Fn73), $result);
                } else {
                    addToComponents(Lit0, Lit183, Lit182, lambda$Fn74);
                }
                this.ImTorn = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit184, Lit185, lambda$Fn75), $result);
                } else {
                    addToComponents(Lit0, Lit186, Lit185, lambda$Fn76);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit187, this.ImTorn$Click);
                } else {
                    addToFormEnvironment(Lit187, this.ImTorn$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "ImTorn", "Click");
                } else {
                    addToEvents(Lit185, Lit28);
                }
                this.HaveRelic = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit188, Lit189, lambda$Fn77), $result);
                } else {
                    addToComponents(Lit0, Lit190, Lit189, lambda$Fn78);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit191, this.HaveRelic$Click);
                } else {
                    addToFormEnvironment(Lit191, this.HaveRelic$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "HaveRelic", "Click");
                } else {
                    addToEvents(Lit189, Lit28);
                }
                this.OryxLabel = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit192, Lit193, lambda$Fn79), $result);
                } else {
                    addToComponents(Lit0, Lit194, Lit193, lambda$Fn80);
                }
                this.OryxAssignmentsLabel = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit195, Lit196, lambda$Fn81), $result);
                } else {
                    addToComponents(Lit0, Lit197, Lit196, lambda$Fn82);
                }
                this.OryxArrangement = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit198, Lit199, lambda$Fn83), $result);
                } else {
                    addToComponents(Lit0, Lit200, Lit199, lambda$Fn84);
                }
                this.Runner = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit199, Lit201, Lit202, lambda$Fn85), $result);
                } else {
                    addToComponents(Lit199, Lit204, Lit202, lambda$Fn86);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit205, this.Runner$Click);
                } else {
                    addToFormEnvironment(Lit205, this.Runner$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Runner", "Click");
                } else {
                    addToEvents(Lit202, Lit28);
                }
                this.One = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit199, Lit206, Lit207, lambda$Fn87), $result);
                } else {
                    addToComponents(Lit199, Lit209, Lit207, lambda$Fn88);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit210, this.One$Click);
                } else {
                    addToFormEnvironment(Lit210, this.One$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "One", "Click");
                } else {
                    addToEvents(Lit207, Lit28);
                }
                this.Two = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit199, Lit211, Lit212, lambda$Fn89), $result);
                } else {
                    addToComponents(Lit199, Lit214, Lit212, lambda$Fn90);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit215, this.Two$Click);
                } else {
                    addToFormEnvironment(Lit215, this.Two$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Two", "Click");
                } else {
                    addToEvents(Lit212, Lit28);
                }
                this.Three = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit199, Lit216, Lit217, lambda$Fn91), $result);
                } else {
                    addToComponents(Lit199, Lit219, Lit217, lambda$Fn92);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit220, this.Three$Click);
                } else {
                    addToFormEnvironment(Lit220, this.Three$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Three", "Click");
                } else {
                    addToEvents(Lit217, Lit28);
                }
                this.Middle4thBomb = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit199, Lit221, Lit222, lambda$Fn93), $result);
                } else {
                    addToComponents(Lit199, Lit224, Lit222, lambda$Fn94);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit225, this.Middle4thBomb$Click);
                } else {
                    addToFormEnvironment(Lit225, this.Middle4thBomb$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Middle4thBomb", "Click");
                } else {
                    addToEvents(Lit222, Lit28);
                }
                this.OryxCallouts = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit226, Lit227, lambda$Fn95), $result);
                } else {
                    addToComponents(Lit0, Lit228, Lit227, lambda$Fn96);
                }
                this.VerticalArrangement5 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit229, Lit230, lambda$Fn97), $result);
                } else {
                    addToComponents(Lit0, Lit231, Lit230, lambda$Fn98);
                }
                this.OneIsOn = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit230, Lit232, Lit233, lambda$Fn99), $result);
                } else {
                    addToComponents(Lit230, Lit235, Lit233, lambda$Fn100);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit236, this.OneIsOn$Click);
                } else {
                    addToFormEnvironment(Lit236, this.OneIsOn$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "OneIsOn", "Click");
                } else {
                    addToEvents(Lit233, Lit28);
                }
                this.TwoIsOn = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit230, Lit237, Lit238, lambda$Fn101), $result);
                } else {
                    addToComponents(Lit230, Lit240, Lit238, lambda$Fn102);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit241, this.TwoIsOn$Click);
                } else {
                    addToFormEnvironment(Lit241, this.TwoIsOn$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "TwoIsOn", "Click");
                } else {
                    addToEvents(Lit238, Lit28);
                }
                this.HaveRelicOryx = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit230, Lit242, Lit243, lambda$Fn103), $result);
                } else {
                    addToComponents(Lit230, Lit245, Lit243, lambda$Fn104);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit246, this.HaveRelicOryx$Click);
                } else {
                    addToFormEnvironment(Lit246, this.HaveRelicOryx$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "HaveRelicOryx", "Click");
                } else {
                    addToEvents(Lit243, Lit28);
                }
                this.Knight4Dead = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit230, Lit247, Lit248, lambda$Fn105), $result);
                } else {
                    addToComponents(Lit230, Lit250, Lit248, lambda$Fn106);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit251, this.Knight4Dead$Click);
                } else {
                    addToFormEnvironment(Lit251, this.Knight4Dead$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Knight4Dead", "Click");
                } else {
                    addToEvents(Lit248, Lit28);
                }
                this.ShootTheBoss = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit230, Lit252, Lit253, lambda$Fn107), $result);
                } else {
                    addToComponents(Lit230, Lit255, Lit253, lambda$Fn108);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit256, this.ShootTheBoss$Click);
                } else {
                    addToFormEnvironment(Lit256, this.ShootTheBoss$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "ShootTheBoss", "Click");
                } else {
                    addToEvents(Lit253, Lit28);
                }
                this.Player1 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit257, Lit60, Boolean.FALSE), $result);
                } else {
                    addToComponents(Lit0, Lit258, Lit60, Boolean.FALSE);
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
        return C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit10, "KF", Lit4);
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
        return C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit24, "CE", Lit4);
    }

    static Object lambda11() {
        C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit5, Lit38, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit17, Lit39, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit37, Lit24, "CE", Lit4);
    }

    public Object CE$Click() {
        C0202runtime.setThisForm();
        return C0202runtime.callYailPrimitive(C0202runtime.open$Mnanother$Mnscreen, LList.list1("CE"), Lit41, "open another screen");
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
        return C0202runtime.setAndCoerceProperty$Ex(Lit51, Lit24, "First Encounter + Totems", Lit4);
    }

    static Object lambda15() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit51, Lit24, "First Encounter + Totems", Lit4);
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
        C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit17, Lit18, Lit7);
    }

    static Object lambda25() {
        C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit17, Lit18, Lit7);
    }

    static Object lambda26() {
        C0202runtime.setAndCoerceProperty$Ex(Lit78, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit78, Lit17, Lit79, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit78, Lit24, "Start Middle Then Left", Lit4);
    }

    static Object lambda27() {
        C0202runtime.setAndCoerceProperty$Ex(Lit78, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit78, Lit17, Lit79, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit78, Lit24, "Start Middle Then Left", Lit4);
    }

    public Object MidThenLeft$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "StartMidCoverLeft.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda28() {
        C0202runtime.setAndCoerceProperty$Ex(Lit83, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit83, Lit17, Lit84, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit83, Lit24, "Start Middle Then Right", Lit4);
    }

    static Object lambda29() {
        C0202runtime.setAndCoerceProperty$Ex(Lit83, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit83, Lit17, Lit84, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit83, Lit24, "Start Middle Then Right", Lit4);
    }

    public Object MidThenRight$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "StartMidCoverRight.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda30() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit88, Lit24, "Golgoroth Challenge", Lit4);
    }

    static Object lambda31() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit88, Lit24, "Golgoroth Challenge", Lit4);
    }

    static Object lambda32() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit91, Lit24, "Pre-Fight Role Assignments", Lit4);
    }

    static Object lambda33() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit91, Lit24, "Pre-Fight Role Assignments", Lit4);
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
        return C0202runtime.setAndCoerceProperty$Ex(Lit97, Lit24, "Gaze", Lit4);
    }

    static Object lambda37() {
        C0202runtime.setAndCoerceProperty$Ex(Lit97, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit97, Lit17, Lit98, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit97, Lit24, "Gaze", Lit4);
    }

    public Object Gaze$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "Gaze.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda38() {
        C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit17, Lit103, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit24, "I'll Take Number 2", Lit4);
    }

    static Object lambda39() {
        C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit17, Lit103, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit24, "I'll Take Number 2", Lit4);
    }

    public Object Gaze2$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "TakeNumber2.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda40() {
        C0202runtime.setAndCoerceProperty$Ex(Lit107, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit107, Lit17, Lit108, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit107, Lit24, "I'll Take Number 3", Lit4);
    }

    static Object lambda41() {
        C0202runtime.setAndCoerceProperty$Ex(Lit107, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit107, Lit17, Lit108, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit107, Lit24, "I'll Take Number 3", Lit4);
    }

    public Object Gaze3$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "TakeNumber3.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda42() {
        C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit17, Lit113, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit24, "I'll Take Number 4", Lit4);
    }

    static Object lambda43() {
        C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit17, Lit113, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit24, "I'll Take Number 4", Lit4);
    }

    public Object Gaze4$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "TakeNumber4.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda44() {
        C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit17, Lit118, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit24, "I'll Take Number 5", Lit4);
    }

    static Object lambda45() {
        C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit17, Lit118, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit117, Lit24, "I'll Take Number 5", Lit4);
    }

    public Object Gaze5$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "TakeNumber5.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda46() {
        C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit17, Lit123, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit24, "I'll Take Number 6", Lit4);
    }

    static Object lambda47() {
        C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit17, Lit123, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit122, Lit24, "I'll Take Number 6", Lit4);
    }

    public Object Gaze6$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "TakeNumber6.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda48() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit127, Lit24, "In-Fight Callouts", Lit4);
    }

    static Object lambda49() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit127, Lit24, "In-Fight Callouts", Lit4);
    }

    static Object lambda50() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit130, Lit24, "Gaze Countdown - Only Press One Of These!", Lit4);
    }

    static Object lambda51() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit130, Lit24, "Gaze Countdown - Only Press One Of These!", Lit4);
    }

    static Object lambda52() {
        C0202runtime.setAndCoerceProperty$Ex(Lit133, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit133, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit133, Lit17, Lit18, Lit7);
    }

    static Object lambda53() {
        C0202runtime.setAndCoerceProperty$Ex(Lit133, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit133, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit133, Lit17, Lit18, Lit7);
    }

    /* renamed from: appinventor.ai_chadthornburg.Destiny_Mute_Raider_Soundboard.KF$frame */
    /* compiled from: KF.yail */
    public class frame extends ModuleBody {
        C0001KF $main;

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
                    if (!(obj instanceof C0001KF)) {
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
                    if (!(obj instanceof C0001KF)) {
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
                    return C0001KF.lambda2();
                case 16:
                    this.$main.$define();
                    return Values.empty;
                case 17:
                    return C0001KF.lambda3();
                case 18:
                    return C0001KF.lambda4();
                case 19:
                    return C0001KF.lambda5();
                case 20:
                    return C0001KF.lambda6();
                case 21:
                    return C0001KF.lambda7();
                case 22:
                    return this.$main.General$Click();
                case 23:
                    return C0001KF.lambda8();
                case 24:
                    return C0001KF.lambda9();
                case 25:
                    return this.$main.VoG$Click();
                case 26:
                    return C0001KF.lambda10();
                case 27:
                    return C0001KF.lambda11();
                case 28:
                    return this.$main.CE$Click();
                case 29:
                    return C0001KF.lambda12();
                case 30:
                    return C0001KF.lambda13();
                case 31:
                    return this.$main.WoTM$Click();
                case 32:
                    return C0001KF.lambda14();
                case 33:
                    return C0001KF.lambda15();
                case 34:
                    return C0001KF.lambda16();
                case 35:
                    return C0001KF.lambda17();
                case 36:
                    return C0001KF.lambda18();
                case 37:
                    return C0001KF.lambda19();
                case 38:
                    return this.$main.Left$Click();
                case 39:
                    return C0001KF.lambda20();
                case 40:
                    return C0001KF.lambda21();
                case 41:
                    return this.$main.Middle$Click();
                case XDataType.NMTOKEN_TYPE_CODE /*42*/:
                    return C0001KF.lambda22();
                case XDataType.NAME_TYPE_CODE /*43*/:
                    return C0001KF.lambda23();
                case XDataType.NCNAME_TYPE_CODE /*44*/:
                    return this.$main.Right$Click();
                case XDataType.ID_TYPE_CODE /*45*/:
                    return C0001KF.lambda24();
                case XDataType.IDREF_TYPE_CODE /*46*/:
                    return C0001KF.lambda25();
                case XDataType.ENTITY_TYPE_CODE /*47*/:
                    return C0001KF.lambda26();
                case 48:
                    return C0001KF.lambda27();
                case 49:
                    return this.$main.MidThenLeft$Click();
                case 50:
                    return C0001KF.lambda28();
                case 51:
                    return C0001KF.lambda29();
                case 52:
                    return this.$main.MidThenRight$Click();
                case 53:
                    return C0001KF.lambda30();
                case 54:
                    return C0001KF.lambda31();
                case 55:
                    return C0001KF.lambda32();
                case 56:
                    return C0001KF.lambda33();
                case 57:
                    return C0001KF.lambda34();
                case 58:
                    return C0001KF.lambda35();
                case 59:
                    return C0001KF.lambda36();
                case 60:
                    return C0001KF.lambda37();
                case 61:
                    return this.$main.Gaze$Click();
                case 62:
                    return C0001KF.lambda38();
                case 63:
                    return C0001KF.lambda39();
                case 64:
                    return this.$main.Gaze2$Click();
                case 65:
                    return C0001KF.lambda40();
                case 66:
                    return C0001KF.lambda41();
                case 67:
                    return this.$main.Gaze3$Click();
                case 68:
                    return C0001KF.lambda42();
                case 69:
                    return C0001KF.lambda43();
                case PrettyWriter.NEWLINE_FILL /*70*/:
                    return this.$main.Gaze4$Click();
                case 71:
                    return C0001KF.lambda44();
                case 72:
                    return C0001KF.lambda45();
                case 73:
                    return this.$main.Gaze5$Click();
                case 74:
                    return C0001KF.lambda46();
                case 75:
                    return C0001KF.lambda47();
                case PrettyWriter.NEWLINE_LITERAL /*76*/:
                    return this.$main.Gaze6$Click();
                case PrettyWriter.NEWLINE_MISER /*77*/:
                    return C0001KF.lambda48();
                case PrettyWriter.NEWLINE_LINEAR /*78*/:
                    return C0001KF.lambda49();
                case 79:
                    return C0001KF.lambda50();
                case 80:
                    return C0001KF.lambda51();
                case 81:
                    return C0001KF.lambda52();
                case PrettyWriter.NEWLINE_MANDATORY /*82*/:
                    return C0001KF.lambda53();
                case PrettyWriter.NEWLINE_SPACE /*83*/:
                    return C0001KF.lambda54();
                case 84:
                    return C0001KF.lambda55();
                case 85:
                    return this.$main.Nineteen$Click();
                case 86:
                    return C0001KF.lambda56();
                case 87:
                    return C0001KF.lambda57();
                case 88:
                    return this.$main.Fifteen$Click();
                case 89:
                    return C0001KF.lambda58();
                case 90:
                    return C0001KF.lambda59();
                case 91:
                    return this.$main.Ten$Click();
                case 92:
                    return C0001KF.lambda60();
                case 93:
                    return C0001KF.lambda61();
                case 94:
                    return C0001KF.lambda62();
                case 95:
                    return C0001KF.lambda63();
                case 96:
                    return C0001KF.lambda64();
                case 97:
                    return C0001KF.lambda65();
                case 98:
                    return this.$main.TwoHasGaze$Click();
                case 99:
                    return C0001KF.lambda66();
                case 100:
                    return C0001KF.lambda67();
                case ErrorMessages.ERROR_LOCATION_SENSOR_LATITUDE_NOT_FOUND /*101*/:
                    return this.$main.ThreeHasGaze$Click();
                case ErrorMessages.ERROR_LOCATION_SENSOR_LONGITUDE_NOT_FOUND /*102*/:
                    return C0001KF.lambda68();
                case 103:
                    return C0001KF.lambda69();
                case 104:
                    return this.$main.FourHasGaze$Click();
                case 105:
                    return C0001KF.lambda70();
                case 106:
                    return C0001KF.lambda71();
                case 107:
                    return this.$main.FiveHasGaze$Click();
                case 108:
                    return C0001KF.lambda72();
                case 109:
                    return C0001KF.lambda73();
                case 110:
                    return this.$main.SixHasGaze$Click();
                case 111:
                    return C0001KF.lambda74();
                case DateTime.TIME_MASK /*112*/:
                    return C0001KF.lambda75();
                case 113:
                    return C0001KF.lambda76();
                case 114:
                    return C0001KF.lambda77();
                case 115:
                    return this.$main.ImTorn$Click();
                case 116:
                    return C0001KF.lambda78();
                case 117:
                    return C0001KF.lambda79();
                case 118:
                    return this.$main.HaveRelic$Click();
                case 119:
                    return C0001KF.lambda80();
                case 120:
                    return C0001KF.lambda81();
                case 121:
                    return C0001KF.lambda82();
                case 122:
                    return C0001KF.lambda83();
                case 123:
                    return C0001KF.lambda84();
                case 124:
                    return C0001KF.lambda85();
                case 125:
                    return C0001KF.lambda86();
                case 126:
                    return C0001KF.lambda87();
                case 127:
                    return this.$main.Runner$Click();
                case DateTime.TIMEZONE_MASK /*128*/:
                    return C0001KF.lambda88();
                case 129:
                    return C0001KF.lambda89();
                case 130:
                    return this.$main.One$Click();
                case 131:
                    return C0001KF.lambda90();
                case 132:
                    return C0001KF.lambda91();
                case 133:
                    return this.$main.Two$Click();
                case 134:
                    return C0001KF.lambda92();
                case 135:
                    return C0001KF.lambda93();
                case 136:
                    return this.$main.Three$Click();
                case 137:
                    return C0001KF.lambda94();
                case 138:
                    return C0001KF.lambda95();
                case 139:
                    return this.$main.Middle4thBomb$Click();
                case 140:
                    return C0001KF.lambda96();
                case 141:
                    return C0001KF.lambda97();
                case 142:
                    return C0001KF.lambda98();
                case 143:
                    return C0001KF.lambda99();
                case ComponentConstants.VIDEOPLAYER_PREFERRED_HEIGHT /*144*/:
                    return C0001KF.lambda100();
                case 145:
                    return C0001KF.lambda101();
                case 146:
                    return this.$main.OneIsOn$Click();
                case 147:
                    return C0001KF.lambda102();
                case 148:
                    return C0001KF.lambda103();
                case 149:
                    return this.$main.TwoIsOn$Click();
                case 150:
                    return C0001KF.lambda104();
                case 151:
                    return C0001KF.lambda105();
                case 152:
                    return this.$main.HaveRelicOryx$Click();
                case 153:
                    return C0001KF.lambda106();
                case 154:
                    return C0001KF.lambda107();
                case 155:
                    return this.$main.Knight4Dead$Click();
                case 156:
                    return C0001KF.lambda108();
                case 157:
                    return C0001KF.lambda109();
                case 158:
                    return this.$main.ShootTheBoss$Click();
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
                case 103:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 104:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 105:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 106:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 107:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 108:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 109:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 110:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 111:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case DateTime.TIME_MASK /*112*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 113:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 114:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 115:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 116:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 117:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 118:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 119:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 120:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 121:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 122:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 123:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 124:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 125:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 126:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 127:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case DateTime.TIMEZONE_MASK /*128*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 129:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 130:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 131:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 132:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 133:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 134:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 135:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 136:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 137:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 138:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 139:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 140:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 141:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 142:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 143:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case ComponentConstants.VIDEOPLAYER_PREFERRED_HEIGHT /*144*/:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 145:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 146:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 147:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 148:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 149:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 150:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 151:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 152:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 153:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 154:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 155:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 156:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 157:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 158:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                default:
                    return super.match0(moduleMethod, callContext);
            }
        }
    }

    static Object lambda54() {
        C0202runtime.setAndCoerceProperty$Ex(Lit136, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit136, Lit17, Lit137, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit136, Lit24, "19 Second Countdown", Lit4);
    }

    static Object lambda55() {
        C0202runtime.setAndCoerceProperty$Ex(Lit136, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit136, Lit17, Lit137, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit136, Lit24, "19 Second Countdown", Lit4);
    }

    public Object Nineteen$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "19SecondCountdown.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda56() {
        C0202runtime.setAndCoerceProperty$Ex(Lit141, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit141, Lit17, Lit142, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit141, Lit24, "15 Second Countdown", Lit4);
    }

    static Object lambda57() {
        C0202runtime.setAndCoerceProperty$Ex(Lit141, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit141, Lit17, Lit142, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit141, Lit24, "15 Second Countdown", Lit4);
    }

    public Object Fifteen$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "15SecondCountdown.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda58() {
        C0202runtime.setAndCoerceProperty$Ex(Lit146, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit146, Lit17, Lit147, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit146, Lit24, "10 Second Countdown", Lit4);
    }

    static Object lambda59() {
        C0202runtime.setAndCoerceProperty$Ex(Lit146, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit146, Lit17, Lit147, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit146, Lit24, "10 Second Countdown", Lit4);
    }

    public Object Ten$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "10SecondCountdown.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda60() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit151, Lit24, "\"Number\" Has Gaze", Lit4);
    }

    static Object lambda61() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit151, Lit24, "\"Number\" Has Gaze", Lit4);
    }

    static Object lambda62() {
        C0202runtime.setAndCoerceProperty$Ex(Lit154, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit154, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit154, Lit17, Lit18, Lit7);
    }

    static Object lambda63() {
        C0202runtime.setAndCoerceProperty$Ex(Lit154, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit154, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit154, Lit17, Lit18, Lit7);
    }

    static Object lambda64() {
        C0202runtime.setAndCoerceProperty$Ex(Lit157, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit157, Lit17, Lit158, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit157, Lit24, "2 Has Gaze", Lit4);
    }

    static Object lambda65() {
        C0202runtime.setAndCoerceProperty$Ex(Lit157, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit157, Lit17, Lit158, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit157, Lit24, "2 Has Gaze", Lit4);
    }

    public Object TwoHasGaze$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "2HasGaze.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda66() {
        C0202runtime.setAndCoerceProperty$Ex(Lit162, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit162, Lit17, Lit163, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit162, Lit24, "3 Has Gaze", Lit4);
    }

    static Object lambda67() {
        C0202runtime.setAndCoerceProperty$Ex(Lit162, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit162, Lit17, Lit163, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit162, Lit24, "3 Has Gaze", Lit4);
    }

    public Object ThreeHasGaze$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "3HasGaze.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda68() {
        C0202runtime.setAndCoerceProperty$Ex(Lit167, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit167, Lit17, Lit168, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit167, Lit24, "4 Has Gaze", Lit4);
    }

    static Object lambda69() {
        C0202runtime.setAndCoerceProperty$Ex(Lit167, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit167, Lit17, Lit168, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit167, Lit24, "4 Has Gaze", Lit4);
    }

    public Object FourHasGaze$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "4HasGaze.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda70() {
        C0202runtime.setAndCoerceProperty$Ex(Lit172, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit172, Lit17, Lit173, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit172, Lit24, "5 Has Gaze", Lit4);
    }

    static Object lambda71() {
        C0202runtime.setAndCoerceProperty$Ex(Lit172, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit172, Lit17, Lit173, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit172, Lit24, "5 Has Gaze", Lit4);
    }

    public Object FiveHasGaze$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "5HasGaze.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda72() {
        C0202runtime.setAndCoerceProperty$Ex(Lit177, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit177, Lit17, Lit178, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit177, Lit24, "6 Has Gaze", Lit4);
    }

    static Object lambda73() {
        C0202runtime.setAndCoerceProperty$Ex(Lit177, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit177, Lit17, Lit178, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit177, Lit24, "6 Has Gaze", Lit4);
    }

    public Object SixHasGaze$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "6HasGaze.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda74() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit182, Lit24, "Daughters", Lit4);
    }

    static Object lambda75() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit182, Lit24, "Daughters", Lit4);
    }

    static Object lambda76() {
        C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit24, "I'm Torn", Lit4);
    }

    static Object lambda77() {
        C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit24, "I'm Torn", Lit4);
    }

    public Object ImTorn$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "ImTorn.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda78() {
        C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit24, "I Have Relic, Get Off Plate", Lit4);
    }

    static Object lambda79() {
        C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit24, "I Have Relic, Get Off Plate", Lit4);
    }

    public Object HaveRelic$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "HaveRelicGetOffPlates.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda80() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit193, Lit24, "Oryx", Lit4);
    }

    static Object lambda81() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit193, Lit24, "Oryx", Lit4);
    }

    static Object lambda82() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit196, Lit24, "Pre-Fight Role Assignments", Lit4);
    }

    static Object lambda83() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit196, Lit24, "Pre-Fight Role Assignments", Lit4);
    }

    static Object lambda84() {
        C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit17, Lit18, Lit7);
    }

    static Object lambda85() {
        C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit17, Lit18, Lit7);
    }

    static Object lambda86() {
        C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit17, Lit203, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit24, "Runner", Lit4);
    }

    static Object lambda87() {
        C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit17, Lit203, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit24, "Runner", Lit4);
    }

    public Object Runner$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "Runner.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda88() {
        C0202runtime.setAndCoerceProperty$Ex(Lit207, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit207, Lit17, Lit208, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit207, Lit24, "1", Lit4);
    }

    static Object lambda89() {
        C0202runtime.setAndCoerceProperty$Ex(Lit207, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit207, Lit17, Lit208, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit207, Lit24, "1", Lit4);
    }

    public Object One$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "TakeNumber1.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda90() {
        C0202runtime.setAndCoerceProperty$Ex(Lit212, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit212, Lit17, Lit213, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit212, Lit24, "2", Lit4);
    }

    static Object lambda91() {
        C0202runtime.setAndCoerceProperty$Ex(Lit212, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit212, Lit17, Lit213, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit212, Lit24, "2", Lit4);
    }

    public Object Two$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "TakeNumber2.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda92() {
        C0202runtime.setAndCoerceProperty$Ex(Lit217, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit217, Lit17, Lit218, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit217, Lit24, "3", Lit4);
    }

    static Object lambda93() {
        C0202runtime.setAndCoerceProperty$Ex(Lit217, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit217, Lit17, Lit218, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit217, Lit24, "3", Lit4);
    }

    public Object Three$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "TakeNumber3.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda94() {
        C0202runtime.setAndCoerceProperty$Ex(Lit222, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit222, Lit17, Lit223, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit222, Lit24, "Middle and 4th Bomb", Lit4);
    }

    static Object lambda95() {
        C0202runtime.setAndCoerceProperty$Ex(Lit222, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit222, Lit17, Lit223, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit222, Lit24, "Middle and 4th Bomb", Lit4);
    }

    public Object Middle4thBomb$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "CoverMiddleDetonatePlate4.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda96() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit227, Lit24, "In-Fight Callouts", Lit4);
    }

    static Object lambda97() {
        return C0202runtime.setAndCoerceProperty$Ex(Lit227, Lit24, "In-Fight Callouts", Lit4);
    }

    static Object lambda98() {
        C0202runtime.setAndCoerceProperty$Ex(Lit230, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit230, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit230, Lit17, Lit18, Lit7);
    }

    static Object lambda99() {
        C0202runtime.setAndCoerceProperty$Ex(Lit230, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit230, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit230, Lit17, Lit18, Lit7);
    }

    static Object lambda100() {
        C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit17, Lit234, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit24, "1 is On", Lit4);
    }

    static Object lambda101() {
        C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit17, Lit234, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit24, "1 is On", Lit4);
    }

    public Object OneIsOn$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "1isOn.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda102() {
        C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit17, Lit239, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit24, "2 is On", Lit4);
    }

    static Object lambda103() {
        C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit17, Lit239, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit24, "2 is On", Lit4);
    }

    public Object TwoIsOn$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "2isOn.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda104() {
        C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit17, Lit244, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit24, "I Have Relic, Get Off Plates", Lit4);
    }

    static Object lambda105() {
        C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit17, Lit244, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit24, "I Have Relic, Get Off Plates", Lit4);
    }

    public Object HaveRelicOryx$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "HaveRelicGetOffPlates.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda106() {
        C0202runtime.setAndCoerceProperty$Ex(Lit248, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit248, Lit17, Lit249, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit248, Lit24, "Knight 4 is Dead", Lit4);
    }

    static Object lambda107() {
        C0202runtime.setAndCoerceProperty$Ex(Lit248, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit248, Lit17, Lit249, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit248, Lit24, "Knight 4 is Dead", Lit4);
    }

    public Object Knight4Dead$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "Knight4isDead.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit60, Lit62, LList.Empty, LList.Empty);
    }

    static Object lambda108() {
        C0202runtime.setAndCoerceProperty$Ex(Lit253, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit253, Lit17, Lit254, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit253, Lit24, "Shoot The Boss", Lit4);
    }

    static Object lambda109() {
        C0202runtime.setAndCoerceProperty$Ex(Lit253, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit253, Lit17, Lit254, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit253, Lit24, "Shoot The Boss", Lit4);
    }

    public Object ShootTheBoss$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit60, Lit61, "ShootTheBoss.wav", Lit4);
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
        f2KF = this;
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
