package appinventor.ai_chadthornburg.Destiny_Mute_Raider_Soundboard;

import com.google.appinventor.components.common.ComponentConstants;
import com.google.appinventor.components.common.PropertyTypeConstants;
import com.google.appinventor.components.common.YaVersion;
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
import gnu.math.DateTime;
import gnu.math.IntNum;
import gnu.text.PrettyWriter;
import kawa.lang.Promise;
import kawa.lib.C0214lists;
import kawa.lib.misc;
import kawa.lib.strings;
import kawa.standard.Scheme;
import kawa.standard.require;

/* compiled from: WoTM.yail */
public class WoTM extends Form implements Runnable {
    static final SimpleSymbol Lit0 = ((SimpleSymbol) new SimpleSymbol("WoTM").readResolve());
    static final SimpleSymbol Lit1 = ((SimpleSymbol) new SimpleSymbol("getMessage").readResolve());
    static final SimpleSymbol Lit10 = ((SimpleSymbol) new SimpleSymbol("Title").readResolve());
    static final FString Lit100 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final FString Lit101 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit102 = ((SimpleSymbol) new SimpleSymbol("LeftCMBomb").readResolve());
    static final IntNum Lit103 = IntNum.make(-1045);
    static final FString Lit104 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit105 = ((SimpleSymbol) new SimpleSymbol("LeftCMBomb$Click").readResolve());
    static final FString Lit106 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit107 = ((SimpleSymbol) new SimpleSymbol("RightCMBomb").readResolve());
    static final IntNum Lit108 = IntNum.make(-1045);
    static final FString Lit109 = new FString("com.google.appinventor.components.runtime.Button");
    static final FString Lit11 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit110 = ((SimpleSymbol) new SimpleSymbol("RightCMBomb$Click").readResolve());
    static final FString Lit111 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit112 = ((SimpleSymbol) new SimpleSymbol("Label3").readResolve());
    static final FString Lit113 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit114 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit115 = ((SimpleSymbol) new SimpleSymbol("KillMeksisRole").readResolve());
    static final FString Lit116 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit117 = ((SimpleSymbol) new SimpleSymbol("KillMeksisRole$Click").readResolve());
    static final FString Lit118 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit119 = ((SimpleSymbol) new SimpleSymbol("MeksisDead").readResolve());
    static final SimpleSymbol Lit12 = ((SimpleSymbol) new SimpleSymbol("HorizontalArrangement1").readResolve());
    static final FString Lit120 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit121 = ((SimpleSymbol) new SimpleSymbol("MeksisDead$Click").readResolve());
    static final FString Lit122 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit123 = ((SimpleSymbol) new SimpleSymbol("Label4").readResolve());
    static final FString Lit124 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit125 = new FString("com.google.appinventor.components.runtime.TableArrangement");
    static final SimpleSymbol Lit126 = ((SimpleSymbol) new SimpleSymbol("TableArrangement1").readResolve());
    static final SimpleSymbol Lit127 = ((SimpleSymbol) new SimpleSymbol("Columns").readResolve());
    static final FString Lit128 = new FString("com.google.appinventor.components.runtime.TableArrangement");
    static final FString Lit129 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit13 = ((SimpleSymbol) new SimpleSymbol("AlignHorizontal").readResolve());
    static final SimpleSymbol Lit130 = ((SimpleSymbol) new SimpleSymbol("CannonLeft").readResolve());
    static final SimpleSymbol Lit131 = ((SimpleSymbol) new SimpleSymbol("Column").readResolve());
    static final IntNum Lit132 = IntNum.make(0);
    static final IntNum Lit133 = IntNum.make(-1030);
    static final SimpleSymbol Lit134 = ((SimpleSymbol) new SimpleSymbol("Row").readResolve());
    static final FString Lit135 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit136 = ((SimpleSymbol) new SimpleSymbol("CannonLeft$Click").readResolve());
    static final FString Lit137 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit138 = ((SimpleSymbol) new SimpleSymbol("CannonMiddle").readResolve());
    static final IntNum Lit139 = IntNum.make(1);
    static final IntNum Lit14 = IntNum.make(3);
    static final IntNum Lit140 = IntNum.make(-1030);
    static final FString Lit141 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit142 = ((SimpleSymbol) new SimpleSymbol("CannonMiddle$Click").readResolve());
    static final FString Lit143 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit144 = ((SimpleSymbol) new SimpleSymbol("CannonRight").readResolve());
    static final IntNum Lit145 = IntNum.make(-1030);
    static final FString Lit146 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit147 = ((SimpleSymbol) new SimpleSymbol("CannonRight$Click").readResolve());
    static final FString Lit148 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit149 = ((SimpleSymbol) new SimpleSymbol("BombsLeft").readResolve());
    static final SimpleSymbol Lit15 = ((SimpleSymbol) new SimpleSymbol("AlignVertical").readResolve());
    static final FString Lit150 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit151 = ((SimpleSymbol) new SimpleSymbol("BombsLeft$Click").readResolve());
    static final FString Lit152 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit153 = ((SimpleSymbol) new SimpleSymbol("BombsMiddle").readResolve());
    static final FString Lit154 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit155 = ((SimpleSymbol) new SimpleSymbol("BombsMiddle$Click").readResolve());
    static final FString Lit156 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit157 = ((SimpleSymbol) new SimpleSymbol("BombsRight").readResolve());
    static final FString Lit158 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit159 = ((SimpleSymbol) new SimpleSymbol("BombsRight$Click").readResolve());
    static final IntNum Lit16 = IntNum.make(2);
    static final FString Lit160 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit161 = ((SimpleSymbol) new SimpleSymbol("HorizontalArrangement5").readResolve());
    static final FString Lit162 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final FString Lit163 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit164 = ((SimpleSymbol) new SimpleSymbol("DoubleBombs").readResolve());
    static final FString Lit165 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit166 = ((SimpleSymbol) new SimpleSymbol("DoubleBombs$Click").readResolve());
    static final FString Lit167 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit168 = ((SimpleSymbol) new SimpleSymbol("JuggleCannons").readResolve());
    static final FString Lit169 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit17 = ((SimpleSymbol) new SimpleSymbol("Width").readResolve());
    static final SimpleSymbol Lit170 = ((SimpleSymbol) new SimpleSymbol("JuggleCannons$Click").readResolve());
    static final FString Lit171 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit172 = ((SimpleSymbol) new SimpleSymbol("Label5").readResolve());
    static final FString Lit173 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit174 = new FString("com.google.appinventor.components.runtime.TableArrangement");
    static final SimpleSymbol Lit175 = ((SimpleSymbol) new SimpleSymbol("TableArrangement2").readResolve());
    static final IntNum Lit176 = IntNum.make(4);
    static final SimpleSymbol Lit177 = ((SimpleSymbol) new SimpleSymbol("Rows").readResolve());
    static final FString Lit178 = new FString("com.google.appinventor.components.runtime.TableArrangement");
    static final FString Lit179 = new FString("com.google.appinventor.components.runtime.Label");
    static final IntNum Lit18 = IntNum.make(-2);
    static final SimpleSymbol Lit180 = ((SimpleSymbol) new SimpleSymbol("Label6").readResolve());
    static final IntNum Lit181 = IntNum.make(-1025);
    static final SimpleSymbol Lit182 = ((SimpleSymbol) new SimpleSymbol("TextAlignment").readResolve());
    static final FString Lit183 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit184 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit185 = ((SimpleSymbol) new SimpleSymbol("Label7").readResolve());
    static final IntNum Lit186 = IntNum.make(-1025);
    static final FString Lit187 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit188 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit189 = ((SimpleSymbol) new SimpleSymbol("Label8").readResolve());
    static final FString Lit19 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final IntNum Lit190 = IntNum.make(-1025);
    static final FString Lit191 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit192 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit193 = ((SimpleSymbol) new SimpleSymbol("Label9").readResolve());
    static final FString Lit194 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit195 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit196 = ((SimpleSymbol) new SimpleSymbol("Label10").readResolve());
    static final FString Lit197 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit198 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit199 = ((SimpleSymbol) new SimpleSymbol("Label11").readResolve());
    static final SimpleSymbol Lit2 = ((SimpleSymbol) new SimpleSymbol("*the-null-value*").readResolve());
    static final FString Lit20 = new FString("com.google.appinventor.components.runtime.Button");
    static final FString Lit200 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit201 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit202 = ((SimpleSymbol) new SimpleSymbol("SolarLeft").readResolve());
    static final SimpleSymbol Lit203 = ((SimpleSymbol) new SimpleSymbol("TextColor").readResolve());
    static final IntNum Lit204;
    static final FString Lit205 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit206 = ((SimpleSymbol) new SimpleSymbol("SolarLeft$Click").readResolve());
    static final FString Lit207 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit208 = ((SimpleSymbol) new SimpleSymbol("SolarMiddle").readResolve());
    static final IntNum Lit209;
    static final SimpleSymbol Lit21 = ((SimpleSymbol) new SimpleSymbol("General").readResolve());
    static final FString Lit210 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit211 = ((SimpleSymbol) new SimpleSymbol("SolarMiddle$Click").readResolve());
    static final FString Lit212 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit213 = ((SimpleSymbol) new SimpleSymbol("SolarRight").readResolve());
    static final IntNum Lit214;
    static final FString Lit215 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit216 = ((SimpleSymbol) new SimpleSymbol("SolarRight$Click").readResolve());
    static final FString Lit217 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit218 = ((SimpleSymbol) new SimpleSymbol("VoidLeft").readResolve());
    static final IntNum Lit219;
    static final IntNum Lit22;
    static final FString Lit220 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit221 = ((SimpleSymbol) new SimpleSymbol("VoidLeft$Click").readResolve());
    static final FString Lit222 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit223 = ((SimpleSymbol) new SimpleSymbol("VoidMiddle").readResolve());
    static final IntNum Lit224;
    static final FString Lit225 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit226 = ((SimpleSymbol) new SimpleSymbol("VoidMiddle$Click").readResolve());
    static final FString Lit227 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit228 = ((SimpleSymbol) new SimpleSymbol("VoidRight").readResolve());
    static final IntNum Lit229;
    static final SimpleSymbol Lit23 = ((SimpleSymbol) new SimpleSymbol("FontBold").readResolve());
    static final FString Lit230 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit231 = ((SimpleSymbol) new SimpleSymbol("VoidRight$Click").readResolve());
    static final FString Lit232 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit233 = ((SimpleSymbol) new SimpleSymbol("ArcLeft").readResolve());
    static final IntNum Lit234;
    static final FString Lit235 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit236 = ((SimpleSymbol) new SimpleSymbol("ArcLeft$Click").readResolve());
    static final FString Lit237 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit238 = ((SimpleSymbol) new SimpleSymbol("ArcMiddle").readResolve());
    static final IntNum Lit239;
    static final SimpleSymbol Lit24 = ((SimpleSymbol) new SimpleSymbol("Text").readResolve());
    static final FString Lit240 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit241 = ((SimpleSymbol) new SimpleSymbol("ArcMiddle$Click").readResolve());
    static final FString Lit242 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit243 = ((SimpleSymbol) new SimpleSymbol("ArcRight").readResolve());
    static final IntNum Lit244;
    static final FString Lit245 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit246 = ((SimpleSymbol) new SimpleSymbol("ArcRight$Click").readResolve());
    static final FString Lit247 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit248 = ((SimpleSymbol) new SimpleSymbol("LastBomb").readResolve());
    static final FString Lit249 = new FString("com.google.appinventor.components.runtime.Button");
    static final FString Lit25 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit250 = ((SimpleSymbol) new SimpleSymbol("LastBomb$Click").readResolve());
    static final FString Lit251 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit252 = ((SimpleSymbol) new SimpleSymbol("Label12").readResolve());
    static final FString Lit253 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit254 = new FString("com.google.appinventor.components.runtime.TableArrangement");
    static final SimpleSymbol Lit255 = ((SimpleSymbol) new SimpleSymbol("TableArrangement3").readResolve());
    static final FString Lit256 = new FString("com.google.appinventor.components.runtime.TableArrangement");
    static final FString Lit257 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit258 = ((SimpleSymbol) new SimpleSymbol("Left").readResolve());
    static final SimpleSymbol Lit259 = ((SimpleSymbol) new SimpleSymbol("FontSize").readResolve());
    static final PairWithPosition Lit26 = PairWithPosition.make(Lit4, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\WoTM.yail", 159822);
    static final IntNum Lit260 = IntNum.make(18);
    static final IntNum Lit261 = IntNum.make(-1030);
    static final FString Lit262 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit263 = ((SimpleSymbol) new SimpleSymbol("Left$Click").readResolve());
    static final FString Lit264 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit265 = ((SimpleSymbol) new SimpleSymbol("Middle").readResolve());
    static final IntNum Lit266 = IntNum.make(-1030);
    static final FString Lit267 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit268 = ((SimpleSymbol) new SimpleSymbol("Middle$Click").readResolve());
    static final FString Lit269 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit27 = ((SimpleSymbol) new SimpleSymbol("General$Click").readResolve());
    static final SimpleSymbol Lit270 = ((SimpleSymbol) new SimpleSymbol("Right").readResolve());
    static final IntNum Lit271 = IntNum.make(-1030);
    static final FString Lit272 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit273 = ((SimpleSymbol) new SimpleSymbol("Right$Click").readResolve());
    static final FString Lit274 = new FString("com.google.appinventor.components.runtime.Player");
    static final FString Lit275 = new FString("com.google.appinventor.components.runtime.Player");
    static final SimpleSymbol Lit276 = ((SimpleSymbol) new SimpleSymbol("android-log-form").readResolve());
    static final SimpleSymbol Lit277 = ((SimpleSymbol) new SimpleSymbol("add-to-form-environment").readResolve());
    static final SimpleSymbol Lit278 = ((SimpleSymbol) new SimpleSymbol("lookup-in-form-environment").readResolve());
    static final SimpleSymbol Lit279 = ((SimpleSymbol) new SimpleSymbol("is-bound-in-form-environment").readResolve());
    static final SimpleSymbol Lit28 = ((SimpleSymbol) new SimpleSymbol("Click").readResolve());
    static final SimpleSymbol Lit280 = ((SimpleSymbol) new SimpleSymbol("add-to-global-var-environment").readResolve());
    static final SimpleSymbol Lit281 = ((SimpleSymbol) new SimpleSymbol("add-to-events").readResolve());
    static final SimpleSymbol Lit282 = ((SimpleSymbol) new SimpleSymbol("add-to-components").readResolve());
    static final SimpleSymbol Lit283 = ((SimpleSymbol) new SimpleSymbol("add-to-global-vars").readResolve());
    static final SimpleSymbol Lit284 = ((SimpleSymbol) new SimpleSymbol("add-to-form-do-after-creation").readResolve());
    static final SimpleSymbol Lit285 = ((SimpleSymbol) new SimpleSymbol("send-error").readResolve());
    static final SimpleSymbol Lit286 = ((SimpleSymbol) new SimpleSymbol("dispatchEvent").readResolve());
    static final SimpleSymbol Lit287 = ((SimpleSymbol) new SimpleSymbol("lookup-handler").readResolve());
    static final FString Lit29 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit3 = ((SimpleSymbol) new SimpleSymbol("AppName").readResolve());
    static final SimpleSymbol Lit30 = ((SimpleSymbol) new SimpleSymbol("VoG").readResolve());
    static final IntNum Lit31;
    static final IntNum Lit32 = IntNum.make(-1020);
    static final FString Lit33 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit34 = PairWithPosition.make(Lit4, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\WoTM.yail", 221258);
    static final SimpleSymbol Lit35 = ((SimpleSymbol) new SimpleSymbol("VoG$Click").readResolve());
    static final FString Lit36 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit37 = ((SimpleSymbol) new SimpleSymbol("CE").readResolve());
    static final IntNum Lit38;
    static final IntNum Lit39 = IntNum.make(-1020);
    static final SimpleSymbol Lit4;
    static final FString Lit40 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit41 = PairWithPosition.make(Lit4, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\WoTM.yail", 282697);
    static final SimpleSymbol Lit42 = ((SimpleSymbol) new SimpleSymbol("CE$Click").readResolve());
    static final FString Lit43 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit44 = ((SimpleSymbol) new SimpleSymbol("KF").readResolve());
    static final IntNum Lit45;
    static final IntNum Lit46 = IntNum.make(-1020);
    static final FString Lit47 = new FString("com.google.appinventor.components.runtime.Button");
    static final PairWithPosition Lit48;
    static final SimpleSymbol Lit49 = ((SimpleSymbol) new SimpleSymbol("KF$Click").readResolve());
    static final SimpleSymbol Lit5 = ((SimpleSymbol) new SimpleSymbol("BackgroundColor").readResolve());
    static final FString Lit50 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit51 = ((SimpleSymbol) new SimpleSymbol("Label1").readResolve());
    static final FString Lit52 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit53 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit54 = ((SimpleSymbol) new SimpleSymbol("HorizontalArrangement2").readResolve());
    static final FString Lit55 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final FString Lit56 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit57 = ((SimpleSymbol) new SimpleSymbol("RunLeft").readResolve());
    static final FString Lit58 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit59 = ((SimpleSymbol) new SimpleSymbol("Player1").readResolve());
    static final IntNum Lit6;
    static final SimpleSymbol Lit60 = ((SimpleSymbol) new SimpleSymbol("Source").readResolve());
    static final SimpleSymbol Lit61 = ((SimpleSymbol) new SimpleSymbol("Start").readResolve());
    static final SimpleSymbol Lit62 = ((SimpleSymbol) new SimpleSymbol("RunLeft$Click").readResolve());
    static final FString Lit63 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit64 = ((SimpleSymbol) new SimpleSymbol("RunRight").readResolve());
    static final FString Lit65 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit66 = ((SimpleSymbol) new SimpleSymbol("RunRight$Click").readResolve());
    static final FString Lit67 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit68 = ((SimpleSymbol) new SimpleSymbol("HorizontalArrangement3").readResolve());
    static final FString Lit69 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit7 = ((SimpleSymbol) new SimpleSymbol("number").readResolve());
    static final FString Lit70 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit71 = ((SimpleSymbol) new SimpleSymbol("DefendLeft").readResolve());
    static final FString Lit72 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit73 = ((SimpleSymbol) new SimpleSymbol("DefendLeft$Click").readResolve());
    static final FString Lit74 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit75 = ((SimpleSymbol) new SimpleSymbol("DefendMiddle").readResolve());
    static final FString Lit76 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit77 = ((SimpleSymbol) new SimpleSymbol("DefendMiddle$Click").readResolve());
    static final FString Lit78 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit79 = ((SimpleSymbol) new SimpleSymbol("DefendRight").readResolve());
    static final SimpleSymbol Lit8 = ((SimpleSymbol) new SimpleSymbol("Scrollable").readResolve());
    static final FString Lit80 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit81 = ((SimpleSymbol) new SimpleSymbol("DefendRight$Click").readResolve());
    static final FString Lit82 = new FString("com.google.appinventor.components.runtime.Label");
    static final SimpleSymbol Lit83 = ((SimpleSymbol) new SimpleSymbol("Label2").readResolve());
    static final FString Lit84 = new FString("com.google.appinventor.components.runtime.Label");
    static final FString Lit85 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final SimpleSymbol Lit86 = ((SimpleSymbol) new SimpleSymbol("VerticalArrangement1").readResolve());
    static final FString Lit87 = new FString("com.google.appinventor.components.runtime.VerticalArrangement");
    static final FString Lit88 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit89 = ((SimpleSymbol) new SimpleSymbol("FrontBomb").readResolve());
    static final SimpleSymbol Lit9 = ((SimpleSymbol) new SimpleSymbol(PropertyTypeConstants.PROPERTY_TYPE_BOOLEAN).readResolve());
    static final IntNum Lit90 = IntNum.make(-1090);
    static final FString Lit91 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit92 = ((SimpleSymbol) new SimpleSymbol("FrontBomb$Click").readResolve());
    static final FString Lit93 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit94 = ((SimpleSymbol) new SimpleSymbol("BackBomb").readResolve());
    static final IntNum Lit95 = IntNum.make(-1090);
    static final FString Lit96 = new FString("com.google.appinventor.components.runtime.Button");
    static final SimpleSymbol Lit97 = ((SimpleSymbol) new SimpleSymbol("BackBomb$Click").readResolve());
    static final FString Lit98 = new FString("com.google.appinventor.components.runtime.HorizontalArrangement");
    static final SimpleSymbol Lit99 = ((SimpleSymbol) new SimpleSymbol("HorizontalArrangement4").readResolve());
    public static WoTM WoTM;
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
    static final ModuleMethod lambda$Fn109 = null;
    static final ModuleMethod lambda$Fn11 = null;
    static final ModuleMethod lambda$Fn110 = null;
    static final ModuleMethod lambda$Fn111 = null;
    static final ModuleMethod lambda$Fn112 = null;
    static final ModuleMethod lambda$Fn113 = null;
    static final ModuleMethod lambda$Fn114 = null;
    static final ModuleMethod lambda$Fn115 = null;
    static final ModuleMethod lambda$Fn116 = null;
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
    public Button ArcLeft;
    public final ModuleMethod ArcLeft$Click;
    public Button ArcMiddle;
    public final ModuleMethod ArcMiddle$Click;
    public Button ArcRight;
    public final ModuleMethod ArcRight$Click;
    public Button BackBomb;
    public final ModuleMethod BackBomb$Click;
    public Button BombsLeft;
    public final ModuleMethod BombsLeft$Click;
    public Button BombsMiddle;
    public final ModuleMethod BombsMiddle$Click;
    public Button BombsRight;
    public final ModuleMethod BombsRight$Click;

    /* renamed from: CE */
    public Button f9CE;
    public final ModuleMethod CE$Click;
    public Button CannonLeft;
    public final ModuleMethod CannonLeft$Click;
    public Button CannonMiddle;
    public final ModuleMethod CannonMiddle$Click;
    public Button CannonRight;
    public final ModuleMethod CannonRight$Click;
    public Button DefendLeft;
    public final ModuleMethod DefendLeft$Click;
    public Button DefendMiddle;
    public final ModuleMethod DefendMiddle$Click;
    public Button DefendRight;
    public final ModuleMethod DefendRight$Click;
    public Button DoubleBombs;
    public final ModuleMethod DoubleBombs$Click;
    public Button FrontBomb;
    public final ModuleMethod FrontBomb$Click;
    public Button General;
    public final ModuleMethod General$Click;
    public HorizontalArrangement HorizontalArrangement1;
    public HorizontalArrangement HorizontalArrangement2;
    public HorizontalArrangement HorizontalArrangement3;
    public HorizontalArrangement HorizontalArrangement4;
    public HorizontalArrangement HorizontalArrangement5;
    public Button JuggleCannons;
    public final ModuleMethod JuggleCannons$Click;

    /* renamed from: KF */
    public Button f10KF;
    public final ModuleMethod KF$Click;
    public Button KillMeksisRole;
    public final ModuleMethod KillMeksisRole$Click;
    public Label Label1;
    public Label Label10;
    public Label Label11;
    public Label Label12;
    public Label Label2;
    public Label Label3;
    public Label Label4;
    public Label Label5;
    public Label Label6;
    public Label Label7;
    public Label Label8;
    public Label Label9;
    public Button LastBomb;
    public final ModuleMethod LastBomb$Click;
    public Button Left;
    public final ModuleMethod Left$Click;
    public Button LeftCMBomb;
    public final ModuleMethod LeftCMBomb$Click;
    public Button MeksisDead;
    public final ModuleMethod MeksisDead$Click;
    public Button Middle;
    public final ModuleMethod Middle$Click;
    public Player Player1;
    public Button Right;
    public final ModuleMethod Right$Click;
    public Button RightCMBomb;
    public final ModuleMethod RightCMBomb$Click;
    public Button RunLeft;
    public final ModuleMethod RunLeft$Click;
    public Button RunRight;
    public final ModuleMethod RunRight$Click;
    public Button SolarLeft;
    public final ModuleMethod SolarLeft$Click;
    public Button SolarMiddle;
    public final ModuleMethod SolarMiddle$Click;
    public Button SolarRight;
    public final ModuleMethod SolarRight$Click;
    public TableArrangement TableArrangement1;
    public TableArrangement TableArrangement2;
    public TableArrangement TableArrangement3;
    public VerticalArrangement VerticalArrangement1;
    public Button VoG;
    public final ModuleMethod VoG$Click;
    public Button VoidLeft;
    public final ModuleMethod VoidLeft$Click;
    public Button VoidMiddle;
    public final ModuleMethod VoidMiddle$Click;
    public Button VoidRight;
    public final ModuleMethod VoidRight$Click;
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
        int[] iArr = new int[2];
        iArr[0] = -16776961;
        Lit244 = IntNum.make(iArr);
        int[] iArr2 = new int[2];
        iArr2[0] = -16776961;
        Lit239 = IntNum.make(iArr2);
        int[] iArr3 = new int[2];
        iArr3[0] = -16776961;
        Lit234 = IntNum.make(iArr3);
        int[] iArr4 = new int[2];
        iArr4[0] = -65281;
        Lit229 = IntNum.make(iArr4);
        int[] iArr5 = new int[2];
        iArr5[0] = -65281;
        Lit224 = IntNum.make(iArr5);
        int[] iArr6 = new int[2];
        iArr6[0] = -65281;
        Lit219 = IntNum.make(iArr6);
        int[] iArr7 = new int[2];
        iArr7[0] = -14336;
        Lit214 = IntNum.make(iArr7);
        int[] iArr8 = new int[2];
        iArr8[0] = -14336;
        Lit209 = IntNum.make(iArr8);
        int[] iArr9 = new int[2];
        iArr9[0] = -14336;
        Lit204 = IntNum.make(iArr9);
        SimpleSymbol simpleSymbol = (SimpleSymbol) new SimpleSymbol(PropertyTypeConstants.PROPERTY_TYPE_TEXT).readResolve();
        Lit4 = simpleSymbol;
        Lit48 = PairWithPosition.make(simpleSymbol, LList.Empty, "C:\\Users\\Owner\\AppData\\Local\\Temp\\1498160668252_0.3979394405054304-0\\youngandroidproject\\..\\src\\appinventor\\ai_chadthornburg\\Destiny_Mute_Raider_Soundboard\\WoTM.yail", 344137);
        int[] iArr10 = new int[2];
        iArr10[0] = -3355444;
        Lit45 = IntNum.make(iArr10);
        int[] iArr11 = new int[2];
        iArr11[0] = -16711936;
        Lit38 = IntNum.make(iArr11);
        int[] iArr12 = new int[2];
        iArr12[0] = -14336;
        Lit31 = IntNum.make(iArr12);
        int[] iArr13 = new int[2];
        iArr13[0] = -1;
        Lit22 = IntNum.make(iArr13);
        int[] iArr14 = new int[2];
        iArr14[0] = -65536;
        Lit6 = IntNum.make(iArr14);
    }

    public WoTM() {
        ModuleInfo.register(this);
        frame frame2 = new frame();
        frame2.$main = this;
        this.android$Mnlog$Mnform = new ModuleMethod(frame2, 1, Lit276, 4097);
        this.add$Mnto$Mnform$Mnenvironment = new ModuleMethod(frame2, 2, Lit277, 8194);
        this.lookup$Mnin$Mnform$Mnenvironment = new ModuleMethod(frame2, 3, Lit278, 8193);
        this.is$Mnbound$Mnin$Mnform$Mnenvironment = new ModuleMethod(frame2, 5, Lit279, 4097);
        this.add$Mnto$Mnglobal$Mnvar$Mnenvironment = new ModuleMethod(frame2, 6, Lit280, 8194);
        this.add$Mnto$Mnevents = new ModuleMethod(frame2, 7, Lit281, 8194);
        this.add$Mnto$Mncomponents = new ModuleMethod(frame2, 8, Lit282, 16388);
        this.add$Mnto$Mnglobal$Mnvars = new ModuleMethod(frame2, 9, Lit283, 8194);
        this.add$Mnto$Mnform$Mndo$Mnafter$Mncreation = new ModuleMethod(frame2, 10, Lit284, 4097);
        this.send$Mnerror = new ModuleMethod(frame2, 11, Lit285, 4097);
        this.process$Mnexception = new ModuleMethod(frame2, 12, "process-exception", 4097);
        this.dispatchEvent = new ModuleMethod(frame2, 13, Lit286, 16388);
        this.lookup$Mnhandler = new ModuleMethod(frame2, 14, Lit287, 8194);
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
        this.KF$Click = new ModuleMethod(frame2, 31, Lit49, 0);
        lambda$Fn13 = new ModuleMethod(frame2, 32, (Object) null, 0);
        lambda$Fn14 = new ModuleMethod(frame2, 33, (Object) null, 0);
        lambda$Fn15 = new ModuleMethod(frame2, 34, (Object) null, 0);
        lambda$Fn16 = new ModuleMethod(frame2, 35, (Object) null, 0);
        lambda$Fn17 = new ModuleMethod(frame2, 36, (Object) null, 0);
        lambda$Fn18 = new ModuleMethod(frame2, 37, (Object) null, 0);
        this.RunLeft$Click = new ModuleMethod(frame2, 38, Lit62, 0);
        lambda$Fn19 = new ModuleMethod(frame2, 39, (Object) null, 0);
        lambda$Fn20 = new ModuleMethod(frame2, 40, (Object) null, 0);
        this.RunRight$Click = new ModuleMethod(frame2, 41, Lit66, 0);
        lambda$Fn21 = new ModuleMethod(frame2, 42, (Object) null, 0);
        lambda$Fn22 = new ModuleMethod(frame2, 43, (Object) null, 0);
        lambda$Fn23 = new ModuleMethod(frame2, 44, (Object) null, 0);
        lambda$Fn24 = new ModuleMethod(frame2, 45, (Object) null, 0);
        this.DefendLeft$Click = new ModuleMethod(frame2, 46, Lit73, 0);
        lambda$Fn25 = new ModuleMethod(frame2, 47, (Object) null, 0);
        lambda$Fn26 = new ModuleMethod(frame2, 48, (Object) null, 0);
        this.DefendMiddle$Click = new ModuleMethod(frame2, 49, Lit77, 0);
        lambda$Fn27 = new ModuleMethod(frame2, 50, (Object) null, 0);
        lambda$Fn28 = new ModuleMethod(frame2, 51, (Object) null, 0);
        this.DefendRight$Click = new ModuleMethod(frame2, 52, Lit81, 0);
        lambda$Fn29 = new ModuleMethod(frame2, 53, (Object) null, 0);
        lambda$Fn30 = new ModuleMethod(frame2, 54, (Object) null, 0);
        lambda$Fn31 = new ModuleMethod(frame2, 55, (Object) null, 0);
        lambda$Fn32 = new ModuleMethod(frame2, 56, (Object) null, 0);
        lambda$Fn33 = new ModuleMethod(frame2, 57, (Object) null, 0);
        lambda$Fn34 = new ModuleMethod(frame2, 58, (Object) null, 0);
        this.FrontBomb$Click = new ModuleMethod(frame2, 59, Lit92, 0);
        lambda$Fn35 = new ModuleMethod(frame2, 60, (Object) null, 0);
        lambda$Fn36 = new ModuleMethod(frame2, 61, (Object) null, 0);
        this.BackBomb$Click = new ModuleMethod(frame2, 62, Lit97, 0);
        lambda$Fn37 = new ModuleMethod(frame2, 63, (Object) null, 0);
        lambda$Fn38 = new ModuleMethod(frame2, 64, (Object) null, 0);
        lambda$Fn39 = new ModuleMethod(frame2, 65, (Object) null, 0);
        lambda$Fn40 = new ModuleMethod(frame2, 66, (Object) null, 0);
        this.LeftCMBomb$Click = new ModuleMethod(frame2, 67, Lit105, 0);
        lambda$Fn41 = new ModuleMethod(frame2, 68, (Object) null, 0);
        lambda$Fn42 = new ModuleMethod(frame2, 69, (Object) null, 0);
        this.RightCMBomb$Click = new ModuleMethod(frame2, 70, Lit110, 0);
        lambda$Fn43 = new ModuleMethod(frame2, 71, (Object) null, 0);
        lambda$Fn44 = new ModuleMethod(frame2, 72, (Object) null, 0);
        lambda$Fn45 = new ModuleMethod(frame2, 73, (Object) null, 0);
        lambda$Fn46 = new ModuleMethod(frame2, 74, (Object) null, 0);
        this.KillMeksisRole$Click = new ModuleMethod(frame2, 75, Lit117, 0);
        lambda$Fn47 = new ModuleMethod(frame2, 76, (Object) null, 0);
        lambda$Fn48 = new ModuleMethod(frame2, 77, (Object) null, 0);
        this.MeksisDead$Click = new ModuleMethod(frame2, 78, Lit121, 0);
        lambda$Fn49 = new ModuleMethod(frame2, 79, (Object) null, 0);
        lambda$Fn50 = new ModuleMethod(frame2, 80, (Object) null, 0);
        lambda$Fn51 = new ModuleMethod(frame2, 81, (Object) null, 0);
        lambda$Fn52 = new ModuleMethod(frame2, 82, (Object) null, 0);
        lambda$Fn53 = new ModuleMethod(frame2, 83, (Object) null, 0);
        lambda$Fn54 = new ModuleMethod(frame2, 84, (Object) null, 0);
        this.CannonLeft$Click = new ModuleMethod(frame2, 85, Lit136, 0);
        lambda$Fn55 = new ModuleMethod(frame2, 86, (Object) null, 0);
        lambda$Fn56 = new ModuleMethod(frame2, 87, (Object) null, 0);
        this.CannonMiddle$Click = new ModuleMethod(frame2, 88, Lit142, 0);
        lambda$Fn57 = new ModuleMethod(frame2, 89, (Object) null, 0);
        lambda$Fn58 = new ModuleMethod(frame2, 90, (Object) null, 0);
        this.CannonRight$Click = new ModuleMethod(frame2, 91, Lit147, 0);
        lambda$Fn59 = new ModuleMethod(frame2, 92, (Object) null, 0);
        lambda$Fn60 = new ModuleMethod(frame2, 93, (Object) null, 0);
        this.BombsLeft$Click = new ModuleMethod(frame2, 94, Lit151, 0);
        lambda$Fn61 = new ModuleMethod(frame2, 95, (Object) null, 0);
        lambda$Fn62 = new ModuleMethod(frame2, 96, (Object) null, 0);
        this.BombsMiddle$Click = new ModuleMethod(frame2, 97, Lit155, 0);
        lambda$Fn63 = new ModuleMethod(frame2, 98, (Object) null, 0);
        lambda$Fn64 = new ModuleMethod(frame2, 99, (Object) null, 0);
        this.BombsRight$Click = new ModuleMethod(frame2, 100, Lit159, 0);
        lambda$Fn65 = new ModuleMethod(frame2, ErrorMessages.ERROR_LOCATION_SENSOR_LATITUDE_NOT_FOUND, (Object) null, 0);
        lambda$Fn66 = new ModuleMethod(frame2, ErrorMessages.ERROR_LOCATION_SENSOR_LONGITUDE_NOT_FOUND, (Object) null, 0);
        lambda$Fn67 = new ModuleMethod(frame2, 103, (Object) null, 0);
        lambda$Fn68 = new ModuleMethod(frame2, 104, (Object) null, 0);
        this.DoubleBombs$Click = new ModuleMethod(frame2, 105, Lit166, 0);
        lambda$Fn69 = new ModuleMethod(frame2, 106, (Object) null, 0);
        lambda$Fn70 = new ModuleMethod(frame2, 107, (Object) null, 0);
        this.JuggleCannons$Click = new ModuleMethod(frame2, 108, Lit170, 0);
        lambda$Fn71 = new ModuleMethod(frame2, 109, (Object) null, 0);
        lambda$Fn72 = new ModuleMethod(frame2, 110, (Object) null, 0);
        lambda$Fn73 = new ModuleMethod(frame2, 111, (Object) null, 0);
        lambda$Fn74 = new ModuleMethod(frame2, DateTime.TIME_MASK, (Object) null, 0);
        lambda$Fn75 = new ModuleMethod(frame2, 113, (Object) null, 0);
        lambda$Fn76 = new ModuleMethod(frame2, 114, (Object) null, 0);
        lambda$Fn77 = new ModuleMethod(frame2, 115, (Object) null, 0);
        lambda$Fn78 = new ModuleMethod(frame2, 116, (Object) null, 0);
        lambda$Fn79 = new ModuleMethod(frame2, 117, (Object) null, 0);
        lambda$Fn80 = new ModuleMethod(frame2, 118, (Object) null, 0);
        lambda$Fn81 = new ModuleMethod(frame2, 119, (Object) null, 0);
        lambda$Fn82 = new ModuleMethod(frame2, 120, (Object) null, 0);
        lambda$Fn83 = new ModuleMethod(frame2, 121, (Object) null, 0);
        lambda$Fn84 = new ModuleMethod(frame2, 122, (Object) null, 0);
        lambda$Fn85 = new ModuleMethod(frame2, 123, (Object) null, 0);
        lambda$Fn86 = new ModuleMethod(frame2, 124, (Object) null, 0);
        lambda$Fn87 = new ModuleMethod(frame2, 125, (Object) null, 0);
        lambda$Fn88 = new ModuleMethod(frame2, 126, (Object) null, 0);
        this.SolarLeft$Click = new ModuleMethod(frame2, 127, Lit206, 0);
        lambda$Fn89 = new ModuleMethod(frame2, DateTime.TIMEZONE_MASK, (Object) null, 0);
        lambda$Fn90 = new ModuleMethod(frame2, 129, (Object) null, 0);
        this.SolarMiddle$Click = new ModuleMethod(frame2, 130, Lit211, 0);
        lambda$Fn91 = new ModuleMethod(frame2, 131, (Object) null, 0);
        lambda$Fn92 = new ModuleMethod(frame2, 132, (Object) null, 0);
        this.SolarRight$Click = new ModuleMethod(frame2, 133, Lit216, 0);
        lambda$Fn93 = new ModuleMethod(frame2, 134, (Object) null, 0);
        lambda$Fn94 = new ModuleMethod(frame2, 135, (Object) null, 0);
        this.VoidLeft$Click = new ModuleMethod(frame2, 136, Lit221, 0);
        lambda$Fn95 = new ModuleMethod(frame2, 137, (Object) null, 0);
        lambda$Fn96 = new ModuleMethod(frame2, 138, (Object) null, 0);
        this.VoidMiddle$Click = new ModuleMethod(frame2, 139, Lit226, 0);
        lambda$Fn97 = new ModuleMethod(frame2, 140, (Object) null, 0);
        lambda$Fn98 = new ModuleMethod(frame2, 141, (Object) null, 0);
        this.VoidRight$Click = new ModuleMethod(frame2, 142, Lit231, 0);
        lambda$Fn99 = new ModuleMethod(frame2, 143, (Object) null, 0);
        lambda$Fn100 = new ModuleMethod(frame2, ComponentConstants.VIDEOPLAYER_PREFERRED_HEIGHT, (Object) null, 0);
        this.ArcLeft$Click = new ModuleMethod(frame2, 145, Lit236, 0);
        lambda$Fn101 = new ModuleMethod(frame2, 146, (Object) null, 0);
        lambda$Fn102 = new ModuleMethod(frame2, 147, (Object) null, 0);
        this.ArcMiddle$Click = new ModuleMethod(frame2, 148, Lit241, 0);
        lambda$Fn103 = new ModuleMethod(frame2, 149, (Object) null, 0);
        lambda$Fn104 = new ModuleMethod(frame2, 150, (Object) null, 0);
        this.ArcRight$Click = new ModuleMethod(frame2, 151, Lit246, 0);
        lambda$Fn105 = new ModuleMethod(frame2, 152, (Object) null, 0);
        lambda$Fn106 = new ModuleMethod(frame2, 153, (Object) null, 0);
        this.LastBomb$Click = new ModuleMethod(frame2, 154, Lit250, 0);
        lambda$Fn107 = new ModuleMethod(frame2, 155, (Object) null, 0);
        lambda$Fn108 = new ModuleMethod(frame2, 156, (Object) null, 0);
        lambda$Fn109 = new ModuleMethod(frame2, 157, (Object) null, 0);
        lambda$Fn110 = new ModuleMethod(frame2, 158, (Object) null, 0);
        lambda$Fn111 = new ModuleMethod(frame2, YaVersion.YOUNG_ANDROID_VERSION, (Object) null, 0);
        lambda$Fn112 = new ModuleMethod(frame2, ComponentConstants.TEXTBOX_PREFERRED_WIDTH, (Object) null, 0);
        this.Left$Click = new ModuleMethod(frame2, 161, Lit263, 0);
        lambda$Fn113 = new ModuleMethod(frame2, 162, (Object) null, 0);
        lambda$Fn114 = new ModuleMethod(frame2, 163, (Object) null, 0);
        this.Middle$Click = new ModuleMethod(frame2, 164, Lit268, 0);
        lambda$Fn115 = new ModuleMethod(frame2, 165, (Object) null, 0);
        lambda$Fn116 = new ModuleMethod(frame2, 166, (Object) null, 0);
        this.Right$Click = new ModuleMethod(frame2, 167, Lit273, 0);
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
            WoTM = null;
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
                    Values.writeValues(C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit10, "WoTM", Lit4), $result);
                } else {
                    addToFormDoAfterCreation(new Promise(lambda$Fn2));
                }
                this.HorizontalArrangement1 = null;
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
                this.f9CE = null;
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
                this.f10KF = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit12, Lit43, Lit44, lambda$Fn11), $result);
                } else {
                    addToComponents(Lit12, Lit47, Lit44, lambda$Fn12);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit49, this.KF$Click);
                } else {
                    addToFormEnvironment(Lit49, this.KF$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "KF", "Click");
                } else {
                    addToEvents(Lit44, Lit28);
                }
                this.Label1 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit50, Lit51, lambda$Fn13), $result);
                } else {
                    addToComponents(Lit0, Lit52, Lit51, lambda$Fn14);
                }
                this.HorizontalArrangement2 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit53, Lit54, lambda$Fn15), $result);
                } else {
                    addToComponents(Lit0, Lit55, Lit54, lambda$Fn16);
                }
                this.RunLeft = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit54, Lit56, Lit57, lambda$Fn17), $result);
                } else {
                    addToComponents(Lit54, Lit58, Lit57, lambda$Fn18);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit62, this.RunLeft$Click);
                } else {
                    addToFormEnvironment(Lit62, this.RunLeft$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "RunLeft", "Click");
                } else {
                    addToEvents(Lit57, Lit28);
                }
                this.RunRight = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit54, Lit63, Lit64, lambda$Fn19), $result);
                } else {
                    addToComponents(Lit54, Lit65, Lit64, lambda$Fn20);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit66, this.RunRight$Click);
                } else {
                    addToFormEnvironment(Lit66, this.RunRight$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "RunRight", "Click");
                } else {
                    addToEvents(Lit64, Lit28);
                }
                this.HorizontalArrangement3 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit67, Lit68, lambda$Fn21), $result);
                } else {
                    addToComponents(Lit0, Lit69, Lit68, lambda$Fn22);
                }
                this.DefendLeft = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit68, Lit70, Lit71, lambda$Fn23), $result);
                } else {
                    addToComponents(Lit68, Lit72, Lit71, lambda$Fn24);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit73, this.DefendLeft$Click);
                } else {
                    addToFormEnvironment(Lit73, this.DefendLeft$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "DefendLeft", "Click");
                } else {
                    addToEvents(Lit71, Lit28);
                }
                this.DefendMiddle = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit68, Lit74, Lit75, lambda$Fn25), $result);
                } else {
                    addToComponents(Lit68, Lit76, Lit75, lambda$Fn26);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit77, this.DefendMiddle$Click);
                } else {
                    addToFormEnvironment(Lit77, this.DefendMiddle$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "DefendMiddle", "Click");
                } else {
                    addToEvents(Lit75, Lit28);
                }
                this.DefendRight = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit68, Lit78, Lit79, lambda$Fn27), $result);
                } else {
                    addToComponents(Lit68, Lit80, Lit79, lambda$Fn28);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit81, this.DefendRight$Click);
                } else {
                    addToFormEnvironment(Lit81, this.DefendRight$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "DefendRight", "Click");
                } else {
                    addToEvents(Lit79, Lit28);
                }
                this.Label2 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit82, Lit83, lambda$Fn29), $result);
                } else {
                    addToComponents(Lit0, Lit84, Lit83, lambda$Fn30);
                }
                this.VerticalArrangement1 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit85, Lit86, lambda$Fn31), $result);
                } else {
                    addToComponents(Lit0, Lit87, Lit86, lambda$Fn32);
                }
                this.FrontBomb = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit86, Lit88, Lit89, lambda$Fn33), $result);
                } else {
                    addToComponents(Lit86, Lit91, Lit89, lambda$Fn34);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit92, this.FrontBomb$Click);
                } else {
                    addToFormEnvironment(Lit92, this.FrontBomb$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "FrontBomb", "Click");
                } else {
                    addToEvents(Lit89, Lit28);
                }
                this.BackBomb = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit86, Lit93, Lit94, lambda$Fn35), $result);
                } else {
                    addToComponents(Lit86, Lit96, Lit94, lambda$Fn36);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit97, this.BackBomb$Click);
                } else {
                    addToFormEnvironment(Lit97, this.BackBomb$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "BackBomb", "Click");
                } else {
                    addToEvents(Lit94, Lit28);
                }
                this.HorizontalArrangement4 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit98, Lit99, lambda$Fn37), $result);
                } else {
                    addToComponents(Lit0, Lit100, Lit99, lambda$Fn38);
                }
                this.LeftCMBomb = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit99, Lit101, Lit102, lambda$Fn39), $result);
                } else {
                    addToComponents(Lit99, Lit104, Lit102, lambda$Fn40);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit105, this.LeftCMBomb$Click);
                } else {
                    addToFormEnvironment(Lit105, this.LeftCMBomb$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "LeftCMBomb", "Click");
                } else {
                    addToEvents(Lit102, Lit28);
                }
                this.RightCMBomb = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit99, Lit106, Lit107, lambda$Fn41), $result);
                } else {
                    addToComponents(Lit99, Lit109, Lit107, lambda$Fn42);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit110, this.RightCMBomb$Click);
                } else {
                    addToFormEnvironment(Lit110, this.RightCMBomb$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "RightCMBomb", "Click");
                } else {
                    addToEvents(Lit107, Lit28);
                }
                this.Label3 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit111, Lit112, lambda$Fn43), $result);
                } else {
                    addToComponents(Lit0, Lit113, Lit112, lambda$Fn44);
                }
                this.KillMeksisRole = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit114, Lit115, lambda$Fn45), $result);
                } else {
                    addToComponents(Lit0, Lit116, Lit115, lambda$Fn46);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit117, this.KillMeksisRole$Click);
                } else {
                    addToFormEnvironment(Lit117, this.KillMeksisRole$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "KillMeksisRole", "Click");
                } else {
                    addToEvents(Lit115, Lit28);
                }
                this.MeksisDead = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit118, Lit119, lambda$Fn47), $result);
                } else {
                    addToComponents(Lit0, Lit120, Lit119, lambda$Fn48);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit121, this.MeksisDead$Click);
                } else {
                    addToFormEnvironment(Lit121, this.MeksisDead$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "MeksisDead", "Click");
                } else {
                    addToEvents(Lit119, Lit28);
                }
                this.Label4 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit122, Lit123, lambda$Fn49), $result);
                } else {
                    addToComponents(Lit0, Lit124, Lit123, lambda$Fn50);
                }
                this.TableArrangement1 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit125, Lit126, lambda$Fn51), $result);
                } else {
                    addToComponents(Lit0, Lit128, Lit126, lambda$Fn52);
                }
                this.CannonLeft = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit126, Lit129, Lit130, lambda$Fn53), $result);
                } else {
                    addToComponents(Lit126, Lit135, Lit130, lambda$Fn54);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit136, this.CannonLeft$Click);
                } else {
                    addToFormEnvironment(Lit136, this.CannonLeft$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "CannonLeft", "Click");
                } else {
                    addToEvents(Lit130, Lit28);
                }
                this.CannonMiddle = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit126, Lit137, Lit138, lambda$Fn55), $result);
                } else {
                    addToComponents(Lit126, Lit141, Lit138, lambda$Fn56);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit142, this.CannonMiddle$Click);
                } else {
                    addToFormEnvironment(Lit142, this.CannonMiddle$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "CannonMiddle", "Click");
                } else {
                    addToEvents(Lit138, Lit28);
                }
                this.CannonRight = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit126, Lit143, Lit144, lambda$Fn57), $result);
                } else {
                    addToComponents(Lit126, Lit146, Lit144, lambda$Fn58);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit147, this.CannonRight$Click);
                } else {
                    addToFormEnvironment(Lit147, this.CannonRight$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "CannonRight", "Click");
                } else {
                    addToEvents(Lit144, Lit28);
                }
                this.BombsLeft = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit126, Lit148, Lit149, lambda$Fn59), $result);
                } else {
                    addToComponents(Lit126, Lit150, Lit149, lambda$Fn60);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit151, this.BombsLeft$Click);
                } else {
                    addToFormEnvironment(Lit151, this.BombsLeft$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "BombsLeft", "Click");
                } else {
                    addToEvents(Lit149, Lit28);
                }
                this.BombsMiddle = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit126, Lit152, Lit153, lambda$Fn61), $result);
                } else {
                    addToComponents(Lit126, Lit154, Lit153, lambda$Fn62);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit155, this.BombsMiddle$Click);
                } else {
                    addToFormEnvironment(Lit155, this.BombsMiddle$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "BombsMiddle", "Click");
                } else {
                    addToEvents(Lit153, Lit28);
                }
                this.BombsRight = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit126, Lit156, Lit157, lambda$Fn63), $result);
                } else {
                    addToComponents(Lit126, Lit158, Lit157, lambda$Fn64);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit159, this.BombsRight$Click);
                } else {
                    addToFormEnvironment(Lit159, this.BombsRight$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "BombsRight", "Click");
                } else {
                    addToEvents(Lit157, Lit28);
                }
                this.HorizontalArrangement5 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit160, Lit161, lambda$Fn65), $result);
                } else {
                    addToComponents(Lit0, Lit162, Lit161, lambda$Fn66);
                }
                this.DoubleBombs = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit161, Lit163, Lit164, lambda$Fn67), $result);
                } else {
                    addToComponents(Lit161, Lit165, Lit164, lambda$Fn68);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit166, this.DoubleBombs$Click);
                } else {
                    addToFormEnvironment(Lit166, this.DoubleBombs$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "DoubleBombs", "Click");
                } else {
                    addToEvents(Lit164, Lit28);
                }
                this.JuggleCannons = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit161, Lit167, Lit168, lambda$Fn69), $result);
                } else {
                    addToComponents(Lit161, Lit169, Lit168, lambda$Fn70);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit170, this.JuggleCannons$Click);
                } else {
                    addToFormEnvironment(Lit170, this.JuggleCannons$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "JuggleCannons", "Click");
                } else {
                    addToEvents(Lit168, Lit28);
                }
                this.Label5 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit171, Lit172, lambda$Fn71), $result);
                } else {
                    addToComponents(Lit0, Lit173, Lit172, lambda$Fn72);
                }
                this.TableArrangement2 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit174, Lit175, lambda$Fn73), $result);
                } else {
                    addToComponents(Lit0, Lit178, Lit175, lambda$Fn74);
                }
                this.Label6 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit175, Lit179, Lit180, lambda$Fn75), $result);
                } else {
                    addToComponents(Lit175, Lit183, Lit180, lambda$Fn76);
                }
                this.Label7 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit175, Lit184, Lit185, lambda$Fn77), $result);
                } else {
                    addToComponents(Lit175, Lit187, Lit185, lambda$Fn78);
                }
                this.Label8 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit175, Lit188, Lit189, lambda$Fn79), $result);
                } else {
                    addToComponents(Lit175, Lit191, Lit189, lambda$Fn80);
                }
                this.Label9 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit175, Lit192, Lit193, lambda$Fn81), $result);
                } else {
                    addToComponents(Lit175, Lit194, Lit193, lambda$Fn82);
                }
                this.Label10 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit175, Lit195, Lit196, lambda$Fn83), $result);
                } else {
                    addToComponents(Lit175, Lit197, Lit196, lambda$Fn84);
                }
                this.Label11 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit175, Lit198, Lit199, lambda$Fn85), $result);
                } else {
                    addToComponents(Lit175, Lit200, Lit199, lambda$Fn86);
                }
                this.SolarLeft = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit175, Lit201, Lit202, lambda$Fn87), $result);
                } else {
                    addToComponents(Lit175, Lit205, Lit202, lambda$Fn88);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit206, this.SolarLeft$Click);
                } else {
                    addToFormEnvironment(Lit206, this.SolarLeft$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "SolarLeft", "Click");
                } else {
                    addToEvents(Lit202, Lit28);
                }
                this.SolarMiddle = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit175, Lit207, Lit208, lambda$Fn89), $result);
                } else {
                    addToComponents(Lit175, Lit210, Lit208, lambda$Fn90);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit211, this.SolarMiddle$Click);
                } else {
                    addToFormEnvironment(Lit211, this.SolarMiddle$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "SolarMiddle", "Click");
                } else {
                    addToEvents(Lit208, Lit28);
                }
                this.SolarRight = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit175, Lit212, Lit213, lambda$Fn91), $result);
                } else {
                    addToComponents(Lit175, Lit215, Lit213, lambda$Fn92);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit216, this.SolarRight$Click);
                } else {
                    addToFormEnvironment(Lit216, this.SolarRight$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "SolarRight", "Click");
                } else {
                    addToEvents(Lit213, Lit28);
                }
                this.VoidLeft = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit175, Lit217, Lit218, lambda$Fn93), $result);
                } else {
                    addToComponents(Lit175, Lit220, Lit218, lambda$Fn94);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit221, this.VoidLeft$Click);
                } else {
                    addToFormEnvironment(Lit221, this.VoidLeft$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "VoidLeft", "Click");
                } else {
                    addToEvents(Lit218, Lit28);
                }
                this.VoidMiddle = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit175, Lit222, Lit223, lambda$Fn95), $result);
                } else {
                    addToComponents(Lit175, Lit225, Lit223, lambda$Fn96);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit226, this.VoidMiddle$Click);
                } else {
                    addToFormEnvironment(Lit226, this.VoidMiddle$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "VoidMiddle", "Click");
                } else {
                    addToEvents(Lit223, Lit28);
                }
                this.VoidRight = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit175, Lit227, Lit228, lambda$Fn97), $result);
                } else {
                    addToComponents(Lit175, Lit230, Lit228, lambda$Fn98);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit231, this.VoidRight$Click);
                } else {
                    addToFormEnvironment(Lit231, this.VoidRight$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "VoidRight", "Click");
                } else {
                    addToEvents(Lit228, Lit28);
                }
                this.ArcLeft = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit175, Lit232, Lit233, lambda$Fn99), $result);
                } else {
                    addToComponents(Lit175, Lit235, Lit233, lambda$Fn100);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit236, this.ArcLeft$Click);
                } else {
                    addToFormEnvironment(Lit236, this.ArcLeft$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "ArcLeft", "Click");
                } else {
                    addToEvents(Lit233, Lit28);
                }
                this.ArcMiddle = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit175, Lit237, Lit238, lambda$Fn101), $result);
                } else {
                    addToComponents(Lit175, Lit240, Lit238, lambda$Fn102);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit241, this.ArcMiddle$Click);
                } else {
                    addToFormEnvironment(Lit241, this.ArcMiddle$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "ArcMiddle", "Click");
                } else {
                    addToEvents(Lit238, Lit28);
                }
                this.ArcRight = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit175, Lit242, Lit243, lambda$Fn103), $result);
                } else {
                    addToComponents(Lit175, Lit245, Lit243, lambda$Fn104);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit246, this.ArcRight$Click);
                } else {
                    addToFormEnvironment(Lit246, this.ArcRight$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "ArcRight", "Click");
                } else {
                    addToEvents(Lit243, Lit28);
                }
                this.LastBomb = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit247, Lit248, lambda$Fn105), $result);
                } else {
                    addToComponents(Lit0, Lit249, Lit248, lambda$Fn106);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit250, this.LastBomb$Click);
                } else {
                    addToFormEnvironment(Lit250, this.LastBomb$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "LastBomb", "Click");
                } else {
                    addToEvents(Lit248, Lit28);
                }
                this.Label12 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit251, Lit252, lambda$Fn107), $result);
                } else {
                    addToComponents(Lit0, Lit253, Lit252, lambda$Fn108);
                }
                this.TableArrangement3 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit254, Lit255, lambda$Fn109), $result);
                } else {
                    addToComponents(Lit0, Lit256, Lit255, lambda$Fn110);
                }
                this.Left = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit255, Lit257, Lit258, lambda$Fn111), $result);
                } else {
                    addToComponents(Lit255, Lit262, Lit258, lambda$Fn112);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit263, this.Left$Click);
                } else {
                    addToFormEnvironment(Lit263, this.Left$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Left", "Click");
                } else {
                    addToEvents(Lit258, Lit28);
                }
                this.Middle = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit255, Lit264, Lit265, lambda$Fn113), $result);
                } else {
                    addToComponents(Lit255, Lit267, Lit265, lambda$Fn114);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit268, this.Middle$Click);
                } else {
                    addToFormEnvironment(Lit268, this.Middle$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Middle", "Click");
                } else {
                    addToEvents(Lit265, Lit28);
                }
                this.Right = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit255, Lit269, Lit270, lambda$Fn115), $result);
                } else {
                    addToComponents(Lit255, Lit272, Lit270, lambda$Fn116);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    C0202runtime.addToCurrentFormEnvironment(Lit273, this.Right$Click);
                } else {
                    addToFormEnvironment(Lit273, this.Right$Click);
                }
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    EventDispatcher.registerEventForDelegation((HandlesEventDispatching) C0202runtime.$Stthis$Mnform$St, "Right", "Click");
                } else {
                    addToEvents(Lit270, Lit28);
                }
                this.Player1 = null;
                if (C0202runtime.$Stthis$Mnis$Mnthe$Mnrepl$St != Boolean.FALSE) {
                    Values.writeValues(C0202runtime.addComponentWithinRepl(Lit0, Lit274, Lit59, Boolean.FALSE), $result);
                } else {
                    addToComponents(Lit0, Lit275, Lit59, Boolean.FALSE);
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
        return C0202runtime.setAndCoerceProperty$Ex(Lit0, Lit10, "WoTM", Lit4);
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
        return C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit24, "KF", Lit4);
    }

    static Object lambda13() {
        C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit5, Lit45, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit17, Lit46, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit44, Lit24, "KF", Lit4);
    }

    public Object KF$Click() {
        C0202runtime.setThisForm();
        return C0202runtime.callYailPrimitive(C0202runtime.open$Mnanother$Mnscreen, LList.list1("KF"), Lit48, "open another screen");
    }

    static Object lambda14() {
        C0202runtime.setAndCoerceProperty$Ex(Lit51, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit51, Lit24, "Vosik Phase 1", Lit4);
    }

    static Object lambda15() {
        C0202runtime.setAndCoerceProperty$Ex(Lit51, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit51, Lit24, "Vosik Phase 1", Lit4);
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
        return C0202runtime.setAndCoerceProperty$Ex(Lit57, Lit24, "I'll Run on Left", Lit4);
    }

    static Object lambda19() {
        C0202runtime.setAndCoerceProperty$Ex(Lit57, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit57, Lit24, "I'll Run on Left", Lit4);
    }

    public Object RunLeft$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "RunVoltageLeft.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda20() {
        C0202runtime.setAndCoerceProperty$Ex(Lit64, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit64, Lit24, "I'll Run on Right", Lit4);
    }

    static Object lambda21() {
        C0202runtime.setAndCoerceProperty$Ex(Lit64, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit64, Lit24, "I'll Run on Right", Lit4);
    }

    public Object RunRight$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "RunVoltageRight.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda22() {
        C0202runtime.setAndCoerceProperty$Ex(Lit68, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit68, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit68, Lit17, Lit18, Lit7);
    }

    static Object lambda23() {
        C0202runtime.setAndCoerceProperty$Ex(Lit68, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit68, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit68, Lit17, Lit18, Lit7);
    }

    static Object lambda24() {
        C0202runtime.setAndCoerceProperty$Ex(Lit71, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit71, Lit24, "I'll Cover Left", Lit4);
    }

    static Object lambda25() {
        C0202runtime.setAndCoerceProperty$Ex(Lit71, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit71, Lit24, "I'll Cover Left", Lit4);
    }

    public Object DefendLeft$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "CoverLeftSide.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda26() {
        C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit24, "I'll Cover Middle", Lit4);
    }

    static Object lambda27() {
        C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit75, Lit24, "I'll Cover Middle", Lit4);
    }

    public Object DefendMiddle$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "CoverMiddle.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda28() {
        C0202runtime.setAndCoerceProperty$Ex(Lit79, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit79, Lit24, "I'll Cover Right", Lit4);
    }

    static Object lambda29() {
        C0202runtime.setAndCoerceProperty$Ex(Lit79, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit79, Lit24, "I'll Cover Right", Lit4);
    }

    public Object DefendRight$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "CoverRightSide.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda30() {
        C0202runtime.setAndCoerceProperty$Ex(Lit83, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit83, Lit24, "Vosik Phase 2", Lit4);
    }

    static Object lambda31() {
        C0202runtime.setAndCoerceProperty$Ex(Lit83, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit83, Lit24, "Vosik Phase 2", Lit4);
    }

    static Object lambda32() {
        C0202runtime.setAndCoerceProperty$Ex(Lit86, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit86, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit86, Lit17, Lit18, Lit7);
    }

    static Object lambda33() {
        C0202runtime.setAndCoerceProperty$Ex(Lit86, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit86, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit86, Lit17, Lit18, Lit7);
    }

    static Object lambda34() {
        C0202runtime.setAndCoerceProperty$Ex(Lit89, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit89, Lit17, Lit90, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit89, Lit24, "I'll Get Front Bomb", Lit4);
    }

    static Object lambda35() {
        C0202runtime.setAndCoerceProperty$Ex(Lit89, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit89, Lit17, Lit90, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit89, Lit24, "I'll Get Front Bomb", Lit4);
    }

    public Object FrontBomb$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "FrontBomb.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda36() {
        C0202runtime.setAndCoerceProperty$Ex(Lit94, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit94, Lit17, Lit95, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit94, Lit24, "I'll Get Back Bomb", Lit4);
    }

    static Object lambda37() {
        C0202runtime.setAndCoerceProperty$Ex(Lit94, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit94, Lit17, Lit95, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit94, Lit24, "I'll Get Back Bomb", Lit4);
    }

    public Object BackBomb$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "BackBomb.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda38() {
        C0202runtime.setAndCoerceProperty$Ex(Lit99, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit99, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit99, Lit17, Lit18, Lit7);
    }

    static Object lambda39() {
        C0202runtime.setAndCoerceProperty$Ex(Lit99, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit99, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit99, Lit17, Lit18, Lit7);
    }

    static Object lambda40() {
        C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit17, Lit103, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit24, "Left Challenge Bomb", Lit4);
    }

    static Object lambda41() {
        C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit17, Lit103, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit102, Lit24, "Left Challenge Bomb", Lit4);
    }

    public Object LeftCMBomb$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "LeftBombChallenge.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda42() {
        C0202runtime.setAndCoerceProperty$Ex(Lit107, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit107, Lit17, Lit108, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit107, Lit24, "Right Challenge Bomb", Lit4);
    }

    static Object lambda43() {
        C0202runtime.setAndCoerceProperty$Ex(Lit107, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit107, Lit17, Lit108, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit107, Lit24, "Right Challenge Bomb", Lit4);
    }

    public Object RightCMBomb$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "RightBombChallenge.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda44() {
        C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit24, "Siege Engine", Lit4);
    }

    static Object lambda45() {
        C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit112, Lit24, "Siege Engine", Lit4);
    }

    static Object lambda46() {
        C0202runtime.setAndCoerceProperty$Ex(Lit115, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit115, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit115, Lit24, "I'll Kill Meksis", Lit4);
    }

    static Object lambda47() {
        C0202runtime.setAndCoerceProperty$Ex(Lit115, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit115, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit115, Lit24, "I'll Kill Meksis", Lit4);
    }

    public Object KillMeksisRole$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "I_Will_Kill_Meksis.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda48() {
        C0202runtime.setAndCoerceProperty$Ex(Lit119, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit119, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit119, Lit24, "Meksis is Dead", Lit4);
    }

    static Object lambda49() {
        C0202runtime.setAndCoerceProperty$Ex(Lit119, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit119, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit119, Lit24, "Meksis is Dead", Lit4);
    }

    public Object MeksisDead$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "MeksisDead.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda50() {
        C0202runtime.setAndCoerceProperty$Ex(Lit123, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit123, Lit24, "Aksis Phase 1 Assignments", Lit4);
    }

    static Object lambda51() {
        C0202runtime.setAndCoerceProperty$Ex(Lit123, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit123, Lit24, "Aksis Phase 1 Assignments", Lit4);
    }

    static Object lambda52() {
        C0202runtime.setAndCoerceProperty$Ex(Lit126, Lit127, Lit14, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit126, Lit17, Lit18, Lit7);
    }

    static Object lambda53() {
        C0202runtime.setAndCoerceProperty$Ex(Lit126, Lit127, Lit14, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit126, Lit17, Lit18, Lit7);
    }

    /* compiled from: WoTM.yail */
    public class frame extends ModuleBody {
        WoTM $main;

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
                    if (!(obj instanceof WoTM)) {
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
                    if (!(obj instanceof WoTM)) {
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
                    return WoTM.lambda2();
                case 16:
                    this.$main.$define();
                    return Values.empty;
                case 17:
                    return WoTM.lambda3();
                case 18:
                    return WoTM.lambda4();
                case 19:
                    return WoTM.lambda5();
                case 20:
                    return WoTM.lambda6();
                case 21:
                    return WoTM.lambda7();
                case 22:
                    return this.$main.General$Click();
                case 23:
                    return WoTM.lambda8();
                case 24:
                    return WoTM.lambda9();
                case 25:
                    return this.$main.VoG$Click();
                case 26:
                    return WoTM.lambda10();
                case 27:
                    return WoTM.lambda11();
                case 28:
                    return this.$main.CE$Click();
                case 29:
                    return WoTM.lambda12();
                case 30:
                    return WoTM.lambda13();
                case 31:
                    return this.$main.KF$Click();
                case 32:
                    return WoTM.lambda14();
                case 33:
                    return WoTM.lambda15();
                case 34:
                    return WoTM.lambda16();
                case 35:
                    return WoTM.lambda17();
                case 36:
                    return WoTM.lambda18();
                case 37:
                    return WoTM.lambda19();
                case 38:
                    return this.$main.RunLeft$Click();
                case 39:
                    return WoTM.lambda20();
                case 40:
                    return WoTM.lambda21();
                case 41:
                    return this.$main.RunRight$Click();
                case XDataType.NMTOKEN_TYPE_CODE /*42*/:
                    return WoTM.lambda22();
                case XDataType.NAME_TYPE_CODE /*43*/:
                    return WoTM.lambda23();
                case XDataType.NCNAME_TYPE_CODE /*44*/:
                    return WoTM.lambda24();
                case XDataType.ID_TYPE_CODE /*45*/:
                    return WoTM.lambda25();
                case XDataType.IDREF_TYPE_CODE /*46*/:
                    return this.$main.DefendLeft$Click();
                case XDataType.ENTITY_TYPE_CODE /*47*/:
                    return WoTM.lambda26();
                case 48:
                    return WoTM.lambda27();
                case 49:
                    return this.$main.DefendMiddle$Click();
                case 50:
                    return WoTM.lambda28();
                case 51:
                    return WoTM.lambda29();
                case 52:
                    return this.$main.DefendRight$Click();
                case 53:
                    return WoTM.lambda30();
                case 54:
                    return WoTM.lambda31();
                case 55:
                    return WoTM.lambda32();
                case 56:
                    return WoTM.lambda33();
                case 57:
                    return WoTM.lambda34();
                case 58:
                    return WoTM.lambda35();
                case 59:
                    return this.$main.FrontBomb$Click();
                case 60:
                    return WoTM.lambda36();
                case 61:
                    return WoTM.lambda37();
                case 62:
                    return this.$main.BackBomb$Click();
                case 63:
                    return WoTM.lambda38();
                case 64:
                    return WoTM.lambda39();
                case 65:
                    return WoTM.lambda40();
                case 66:
                    return WoTM.lambda41();
                case 67:
                    return this.$main.LeftCMBomb$Click();
                case 68:
                    return WoTM.lambda42();
                case 69:
                    return WoTM.lambda43();
                case PrettyWriter.NEWLINE_FILL /*70*/:
                    return this.$main.RightCMBomb$Click();
                case 71:
                    return WoTM.lambda44();
                case 72:
                    return WoTM.lambda45();
                case 73:
                    return WoTM.lambda46();
                case 74:
                    return WoTM.lambda47();
                case 75:
                    return this.$main.KillMeksisRole$Click();
                case PrettyWriter.NEWLINE_LITERAL /*76*/:
                    return WoTM.lambda48();
                case PrettyWriter.NEWLINE_MISER /*77*/:
                    return WoTM.lambda49();
                case PrettyWriter.NEWLINE_LINEAR /*78*/:
                    return this.$main.MeksisDead$Click();
                case 79:
                    return WoTM.lambda50();
                case 80:
                    return WoTM.lambda51();
                case 81:
                    return WoTM.lambda52();
                case PrettyWriter.NEWLINE_MANDATORY /*82*/:
                    return WoTM.lambda53();
                case PrettyWriter.NEWLINE_SPACE /*83*/:
                    return WoTM.lambda54();
                case 84:
                    return WoTM.lambda55();
                case 85:
                    return this.$main.CannonLeft$Click();
                case 86:
                    return WoTM.lambda56();
                case 87:
                    return WoTM.lambda57();
                case 88:
                    return this.$main.CannonMiddle$Click();
                case 89:
                    return WoTM.lambda58();
                case 90:
                    return WoTM.lambda59();
                case 91:
                    return this.$main.CannonRight$Click();
                case 92:
                    return WoTM.lambda60();
                case 93:
                    return WoTM.lambda61();
                case 94:
                    return this.$main.BombsLeft$Click();
                case 95:
                    return WoTM.lambda62();
                case 96:
                    return WoTM.lambda63();
                case 97:
                    return this.$main.BombsMiddle$Click();
                case 98:
                    return WoTM.lambda64();
                case 99:
                    return WoTM.lambda65();
                case 100:
                    return this.$main.BombsRight$Click();
                case ErrorMessages.ERROR_LOCATION_SENSOR_LATITUDE_NOT_FOUND /*101*/:
                    return WoTM.lambda66();
                case ErrorMessages.ERROR_LOCATION_SENSOR_LONGITUDE_NOT_FOUND /*102*/:
                    return WoTM.lambda67();
                case 103:
                    return WoTM.lambda68();
                case 104:
                    return WoTM.lambda69();
                case 105:
                    return this.$main.DoubleBombs$Click();
                case 106:
                    return WoTM.lambda70();
                case 107:
                    return WoTM.lambda71();
                case 108:
                    return this.$main.JuggleCannons$Click();
                case 109:
                    return WoTM.lambda72();
                case 110:
                    return WoTM.lambda73();
                case 111:
                    return WoTM.lambda74();
                case DateTime.TIME_MASK /*112*/:
                    return WoTM.lambda75();
                case 113:
                    return WoTM.lambda76();
                case 114:
                    return WoTM.lambda77();
                case 115:
                    return WoTM.lambda78();
                case 116:
                    return WoTM.lambda79();
                case 117:
                    return WoTM.lambda80();
                case 118:
                    return WoTM.lambda81();
                case 119:
                    return WoTM.lambda82();
                case 120:
                    return WoTM.lambda83();
                case 121:
                    return WoTM.lambda84();
                case 122:
                    return WoTM.lambda85();
                case 123:
                    return WoTM.lambda86();
                case 124:
                    return WoTM.lambda87();
                case 125:
                    return WoTM.lambda88();
                case 126:
                    return WoTM.lambda89();
                case 127:
                    return this.$main.SolarLeft$Click();
                case DateTime.TIMEZONE_MASK /*128*/:
                    return WoTM.lambda90();
                case 129:
                    return WoTM.lambda91();
                case 130:
                    return this.$main.SolarMiddle$Click();
                case 131:
                    return WoTM.lambda92();
                case 132:
                    return WoTM.lambda93();
                case 133:
                    return this.$main.SolarRight$Click();
                case 134:
                    return WoTM.lambda94();
                case 135:
                    return WoTM.lambda95();
                case 136:
                    return this.$main.VoidLeft$Click();
                case 137:
                    return WoTM.lambda96();
                case 138:
                    return WoTM.lambda97();
                case 139:
                    return this.$main.VoidMiddle$Click();
                case 140:
                    return WoTM.lambda98();
                case 141:
                    return WoTM.lambda99();
                case 142:
                    return this.$main.VoidRight$Click();
                case 143:
                    return WoTM.lambda100();
                case ComponentConstants.VIDEOPLAYER_PREFERRED_HEIGHT:
                    return WoTM.lambda101();
                case 145:
                    return this.$main.ArcLeft$Click();
                case 146:
                    return WoTM.lambda102();
                case 147:
                    return WoTM.lambda103();
                case 148:
                    return this.$main.ArcMiddle$Click();
                case 149:
                    return WoTM.lambda104();
                case 150:
                    return WoTM.lambda105();
                case 151:
                    return this.$main.ArcRight$Click();
                case 152:
                    return WoTM.lambda106();
                case 153:
                    return WoTM.lambda107();
                case 154:
                    return this.$main.LastBomb$Click();
                case 155:
                    return WoTM.lambda108();
                case 156:
                    return WoTM.lambda109();
                case 157:
                    return WoTM.lambda110();
                case 158:
                    return WoTM.lambda111();
                case YaVersion.YOUNG_ANDROID_VERSION:
                    return WoTM.lambda112();
                case ComponentConstants.TEXTBOX_PREFERRED_WIDTH:
                    return WoTM.lambda113();
                case 161:
                    return this.$main.Left$Click();
                case 162:
                    return WoTM.lambda114();
                case 163:
                    return WoTM.lambda115();
                case 164:
                    return this.$main.Middle$Click();
                case 165:
                    return WoTM.lambda116();
                case 166:
                    return WoTM.lambda117();
                case 167:
                    return this.$main.Right$Click();
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
                case ComponentConstants.VIDEOPLAYER_PREFERRED_HEIGHT:
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
                case YaVersion.YOUNG_ANDROID_VERSION:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case ComponentConstants.TEXTBOX_PREFERRED_WIDTH:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 161:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 162:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 163:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 164:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 165:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 166:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                case 167:
                    callContext.proc = moduleMethod;
                    callContext.f201pc = 0;
                    return 0;
                default:
                    return super.match0(moduleMethod, callContext);
            }
        }
    }

    static Object lambda54() {
        C0202runtime.setAndCoerceProperty$Ex(Lit130, Lit131, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit130, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit130, Lit17, Lit133, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit130, Lit134, Lit132, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit130, Lit24, "Cannon Left", Lit4);
    }

    static Object lambda55() {
        C0202runtime.setAndCoerceProperty$Ex(Lit130, Lit131, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit130, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit130, Lit17, Lit133, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit130, Lit134, Lit132, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit130, Lit24, "Cannon Left", Lit4);
    }

    public Object CannonLeft$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "CannonLeft.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda56() {
        C0202runtime.setAndCoerceProperty$Ex(Lit138, Lit131, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit138, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit138, Lit17, Lit140, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit138, Lit134, Lit132, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit138, Lit24, "Cannon Middle", Lit4);
    }

    static Object lambda57() {
        C0202runtime.setAndCoerceProperty$Ex(Lit138, Lit131, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit138, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit138, Lit17, Lit140, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit138, Lit134, Lit132, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit138, Lit24, "Cannon Middle", Lit4);
    }

    public Object CannonMiddle$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "CannonMiddle.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda58() {
        C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit131, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit17, Lit145, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit134, Lit132, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit24, "Cannon Right", Lit4);
    }

    static Object lambda59() {
        C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit131, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit17, Lit145, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit134, Lit132, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit144, Lit24, "Cannon Right", Lit4);
    }

    public Object CannonRight$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "CannonRight.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda60() {
        C0202runtime.setAndCoerceProperty$Ex(Lit149, Lit131, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit149, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit149, Lit134, Lit139, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit149, Lit24, "Bombs Left", Lit4);
    }

    static Object lambda61() {
        C0202runtime.setAndCoerceProperty$Ex(Lit149, Lit131, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit149, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit149, Lit134, Lit139, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit149, Lit24, "Bombs Left", Lit4);
    }

    public Object BombsLeft$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "BombsLeft.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda62() {
        C0202runtime.setAndCoerceProperty$Ex(Lit153, Lit131, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit153, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit153, Lit134, Lit139, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit153, Lit24, "Bombs Middle", Lit4);
    }

    static Object lambda63() {
        C0202runtime.setAndCoerceProperty$Ex(Lit153, Lit131, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit153, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit153, Lit134, Lit139, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit153, Lit24, "Bombs Middle", Lit4);
    }

    public Object BombsMiddle$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "BombsMiddle.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda64() {
        C0202runtime.setAndCoerceProperty$Ex(Lit157, Lit131, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit157, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit157, Lit134, Lit139, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit157, Lit24, "Bombs Right", Lit4);
    }

    static Object lambda65() {
        C0202runtime.setAndCoerceProperty$Ex(Lit157, Lit131, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit157, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit157, Lit134, Lit139, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit157, Lit24, "Bombs Right", Lit4);
    }

    public Object BombsRight$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "BombsRight.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda66() {
        C0202runtime.setAndCoerceProperty$Ex(Lit161, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit161, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit161, Lit17, Lit18, Lit7);
    }

    static Object lambda67() {
        C0202runtime.setAndCoerceProperty$Ex(Lit161, Lit13, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit161, Lit15, Lit16, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit161, Lit17, Lit18, Lit7);
    }

    static Object lambda68() {
        C0202runtime.setAndCoerceProperty$Ex(Lit164, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit164, Lit24, "I'll Double Throw Bombs", Lit4);
    }

    static Object lambda69() {
        C0202runtime.setAndCoerceProperty$Ex(Lit164, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit164, Lit24, "I'll Double Throw Bombs", Lit4);
    }

    public Object DoubleBombs$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "DoubleThrowBombs.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda70() {
        C0202runtime.setAndCoerceProperty$Ex(Lit168, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit168, Lit24, "I'll Juggle 2 Cannons", Lit4);
    }

    static Object lambda71() {
        C0202runtime.setAndCoerceProperty$Ex(Lit168, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit168, Lit24, "I'll Juggle 2 Cannons", Lit4);
    }

    public Object JuggleCannons$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "Juggle2Cannons.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda72() {
        C0202runtime.setAndCoerceProperty$Ex(Lit172, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit172, Lit24, "Servitors", Lit4);
    }

    static Object lambda73() {
        C0202runtime.setAndCoerceProperty$Ex(Lit172, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit172, Lit24, "Servitors", Lit4);
    }

    static Object lambda74() {
        C0202runtime.setAndCoerceProperty$Ex(Lit175, Lit127, Lit176, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit175, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit175, Lit177, Lit176, Lit7);
    }

    static Object lambda75() {
        C0202runtime.setAndCoerceProperty$Ex(Lit175, Lit127, Lit176, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit175, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit175, Lit177, Lit176, Lit7);
    }

    static Object lambda76() {
        C0202runtime.setAndCoerceProperty$Ex(Lit180, Lit131, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit180, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit180, Lit17, Lit181, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit180, Lit134, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit180, Lit24, "Left", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit180, Lit182, Lit139, Lit7);
    }

    static Object lambda77() {
        C0202runtime.setAndCoerceProperty$Ex(Lit180, Lit131, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit180, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit180, Lit17, Lit181, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit180, Lit134, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit180, Lit24, "Left", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit180, Lit182, Lit139, Lit7);
    }

    static Object lambda78() {
        C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit131, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit17, Lit186, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit134, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit24, "Middle", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit182, Lit139, Lit7);
    }

    static Object lambda79() {
        C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit131, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit17, Lit186, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit134, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit24, "Middle", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit185, Lit182, Lit139, Lit7);
    }

    static Object lambda80() {
        C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit131, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit17, Lit190, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit134, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit24, "Right", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit182, Lit139, Lit7);
    }

    static Object lambda81() {
        C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit131, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit17, Lit190, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit134, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit24, "Right", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit189, Lit182, Lit139, Lit7);
    }

    static Object lambda82() {
        C0202runtime.setAndCoerceProperty$Ex(Lit193, Lit131, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit193, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit193, Lit134, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit193, Lit24, "Solar", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit193, Lit182, Lit139, Lit7);
    }

    static Object lambda83() {
        C0202runtime.setAndCoerceProperty$Ex(Lit193, Lit131, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit193, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit193, Lit134, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit193, Lit24, "Solar", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit193, Lit182, Lit139, Lit7);
    }

    static Object lambda84() {
        C0202runtime.setAndCoerceProperty$Ex(Lit196, Lit131, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit196, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit196, Lit134, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit196, Lit24, "Void", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit196, Lit182, Lit139, Lit7);
    }

    static Object lambda85() {
        C0202runtime.setAndCoerceProperty$Ex(Lit196, Lit131, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit196, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit196, Lit134, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit196, Lit24, "Void", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit196, Lit182, Lit139, Lit7);
    }

    static Object lambda86() {
        C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit131, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit134, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit24, "Arc", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit182, Lit139, Lit7);
    }

    static Object lambda87() {
        C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit131, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit134, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit24, "Arc", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit199, Lit182, Lit139, Lit7);
    }

    static Object lambda88() {
        C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit131, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit134, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit24, "Solar Left", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit203, Lit204, Lit7);
    }

    static Object lambda89() {
        C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit131, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit134, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit24, "Solar Left", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit202, Lit203, Lit204, Lit7);
    }

    public Object SolarLeft$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "SolarLeft.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda90() {
        C0202runtime.setAndCoerceProperty$Ex(Lit208, Lit131, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit208, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit208, Lit134, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit208, Lit24, "Solar Mid", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit208, Lit203, Lit209, Lit7);
    }

    static Object lambda91() {
        C0202runtime.setAndCoerceProperty$Ex(Lit208, Lit131, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit208, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit208, Lit134, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit208, Lit24, "Solar Mid", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit208, Lit203, Lit209, Lit7);
    }

    public Object SolarMiddle$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "SolarMiddle.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda92() {
        C0202runtime.setAndCoerceProperty$Ex(Lit213, Lit131, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit213, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit213, Lit134, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit213, Lit24, "Solar Right", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit213, Lit203, Lit214, Lit7);
    }

    static Object lambda93() {
        C0202runtime.setAndCoerceProperty$Ex(Lit213, Lit131, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit213, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit213, Lit134, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit213, Lit24, "Solar Right", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit213, Lit203, Lit214, Lit7);
    }

    public Object SolarRight$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "SolarRight.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda94() {
        C0202runtime.setAndCoerceProperty$Ex(Lit218, Lit131, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit218, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit218, Lit134, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit218, Lit24, "Void Left", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit218, Lit203, Lit219, Lit7);
    }

    static Object lambda95() {
        C0202runtime.setAndCoerceProperty$Ex(Lit218, Lit131, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit218, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit218, Lit134, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit218, Lit24, "Void Left", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit218, Lit203, Lit219, Lit7);
    }

    public Object VoidLeft$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "VoidLeft.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda96() {
        C0202runtime.setAndCoerceProperty$Ex(Lit223, Lit131, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit223, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit223, Lit134, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit223, Lit24, "Void Mid", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit223, Lit203, Lit224, Lit7);
    }

    static Object lambda97() {
        C0202runtime.setAndCoerceProperty$Ex(Lit223, Lit131, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit223, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit223, Lit134, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit223, Lit24, "Void Mid", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit223, Lit203, Lit224, Lit7);
    }

    public Object VoidMiddle$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "VoidMiddle.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda98() {
        C0202runtime.setAndCoerceProperty$Ex(Lit228, Lit131, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit228, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit228, Lit134, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit228, Lit24, "Void Right", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit228, Lit203, Lit229, Lit7);
    }

    static Object lambda99() {
        C0202runtime.setAndCoerceProperty$Ex(Lit228, Lit131, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit228, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit228, Lit134, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit228, Lit24, "Void Right", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit228, Lit203, Lit229, Lit7);
    }

    public Object VoidRight$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "VoidRight.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda100() {
        C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit131, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit134, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit24, "Arc Left", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit203, Lit234, Lit7);
    }

    static Object lambda101() {
        C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit131, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit134, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit24, "Arc Left", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit233, Lit203, Lit234, Lit7);
    }

    public Object ArcLeft$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "ArcLeft.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda102() {
        C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit131, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit134, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit24, "Arc Mid", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit203, Lit239, Lit7);
    }

    static Object lambda103() {
        C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit131, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit134, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit24, "Arc Mid", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit238, Lit203, Lit239, Lit7);
    }

    public Object ArcMiddle$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "ArcMiddle.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda104() {
        C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit131, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit134, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit24, "Arc Right", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit203, Lit244, Lit7);
    }

    static Object lambda105() {
        C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit131, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit134, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit24, "Arc Right", Lit4);
        return C0202runtime.setAndCoerceProperty$Ex(Lit243, Lit203, Lit244, Lit7);
    }

    public Object ArcRight$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "ArcRight.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda106() {
        C0202runtime.setAndCoerceProperty$Ex(Lit248, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit248, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit248, Lit24, "I Have Last Bomb. Empowered Get In Position.", Lit4);
    }

    static Object lambda107() {
        C0202runtime.setAndCoerceProperty$Ex(Lit248, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit248, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit248, Lit24, "I Have Last Bomb. Empowered Get In Position.", Lit4);
    }

    public Object LastBomb$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "LastBomb.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda108() {
        C0202runtime.setAndCoerceProperty$Ex(Lit252, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit252, Lit24, "Empowerment Callouts", Lit4);
    }

    static Object lambda109() {
        C0202runtime.setAndCoerceProperty$Ex(Lit252, Lit23, Boolean.TRUE, Lit9);
        return C0202runtime.setAndCoerceProperty$Ex(Lit252, Lit24, "Empowerment Callouts", Lit4);
    }

    static Object lambda110() {
        C0202runtime.setAndCoerceProperty$Ex(Lit255, Lit127, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit255, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit255, Lit177, Lit139, Lit7);
    }

    static Object lambda111() {
        C0202runtime.setAndCoerceProperty$Ex(Lit255, Lit127, Lit14, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit255, Lit17, Lit18, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit255, Lit177, Lit139, Lit7);
    }

    static Object lambda112() {
        C0202runtime.setAndCoerceProperty$Ex(Lit258, Lit131, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit258, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit258, Lit259, Lit260, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit258, Lit17, Lit261, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit258, Lit134, Lit132, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit258, Lit24, "Left", Lit4);
    }

    static Object lambda113() {
        C0202runtime.setAndCoerceProperty$Ex(Lit258, Lit131, Lit132, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit258, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit258, Lit259, Lit260, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit258, Lit17, Lit261, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit258, Lit134, Lit132, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit258, Lit24, "Left", Lit4);
    }

    public Object Left$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "EmpoweredLeft.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda114() {
        C0202runtime.setAndCoerceProperty$Ex(Lit265, Lit131, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit265, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit265, Lit259, Lit260, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit265, Lit17, Lit266, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit265, Lit134, Lit132, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit265, Lit24, "Middle", Lit4);
    }

    static Object lambda115() {
        C0202runtime.setAndCoerceProperty$Ex(Lit265, Lit131, Lit139, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit265, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit265, Lit259, Lit260, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit265, Lit17, Lit266, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit265, Lit134, Lit132, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit265, Lit24, "Middle", Lit4);
    }

    public Object Middle$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "EmpoweredMiddle.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
    }

    static Object lambda116() {
        C0202runtime.setAndCoerceProperty$Ex(Lit270, Lit131, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit270, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit270, Lit259, Lit260, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit270, Lit17, Lit271, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit270, Lit134, Lit132, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit270, Lit24, "Right", Lit4);
    }

    static Object lambda117() {
        C0202runtime.setAndCoerceProperty$Ex(Lit270, Lit131, Lit16, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit270, Lit23, Boolean.TRUE, Lit9);
        C0202runtime.setAndCoerceProperty$Ex(Lit270, Lit259, Lit260, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit270, Lit17, Lit271, Lit7);
        C0202runtime.setAndCoerceProperty$Ex(Lit270, Lit134, Lit132, Lit7);
        return C0202runtime.setAndCoerceProperty$Ex(Lit270, Lit24, "Right", Lit4);
    }

    public Object Right$Click() {
        C0202runtime.setThisForm();
        C0202runtime.setAndCoerceProperty$Ex(Lit59, Lit60, "EmpoweredRight.wav", Lit4);
        return C0202runtime.callComponentMethod(Lit59, Lit61, LList.Empty, LList.Empty);
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
        WoTM = this;
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
