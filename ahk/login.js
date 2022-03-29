// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBp4rd_svI671SHV_P5z-OsFz1qnjS0TKc",
    authDomain: "testingcallouts1.firebaseapp.com",
    databaseURL: "https://testingcallouts1.firebaseio.com",
    projectId: "testingcallouts1",
    storageBucket: "testingcallouts1.appspot.com",
    messagingSenderId: "802641842149",
    appId: "1:802641842149:web:0e87e611910b66c3b6e90c",
    measurementId: "G-E83EMTSJJ1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  const auth = firebase.auth();
  var user_data_js = {displayName:null, email:null, uid:"", logged_status:0};
  localStorage.setItem("ls_user_data_js", JSON.stringify(user_data_js));
  var user_data_js_lenght = Object.keys(user_data_js).length;


function signIn(){
  var user_logIn_session = firebase.auth().currentUser;
  if(user_logIn_session){
    console.log("Already Logged In!");
    return 
  }
  var email = document.getElementById("LoginFormEmail").value;
  var password = document.getElementById("LoginFormPassword").value;
  const promise = auth.signInWithEmailAndPassword(email, password);
}
 
function signOut(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    // ClearUserData()
    console.log("return to login")
  }).catch(function(error) {
    // An error happened.
    console.log("Error signing Out");
  });  
}

function CreateUserData(){
  var user_data_js = {displayName:null, email:null, uid:null, logged_status:0};
  var user_data_js_lenght = Object.keys(user_data_js).length;
}

function ClearUserData(){  
  user_data_js.displayName = null; 
  user_data_js.email = null; 
  user_data_js.uid = null; 
  user_data_js.logged_status = 0;   
}

firebase.auth().onAuthStateChanged(function(user){       
  if(user){
    console.log(user); 
    var email = user.email;
    var updated_user_data = {displayName: user.displayName, email:user.email, uid:user.uid, logged_status:1};
    window.localStorage.setItem("ls_user_data_js", JSON.stringify(updated_user_data));
    $('#login').addClass('hide');
    $('#home').removeClass('hide');

    user_data_js.displayName = user.displayName; 
    user_data_js.email = user.email; 
    user_data_js.uid = user.uid; 
    user_data_js.logged_status = 1; 

    window.localStorage.ls_removeItem("anotherrr");
    aewfawefawe = {displayName:15, email:25, uid:26, logged_status:27};
    window.localStorage.setItem("anotherrr", JSON.stringify(aewfawefawe));
    user_data_jsX.displayName = user.displayName; 
    user_data_jsX.email = user.email; 
    user_data_jsX.uid = user.uid; 
    user_data_jsX.logged_status = 1; 
  } else {
    $("#home").addClass('hide');
    $('#login').removeClass('hide');
  }
});

var recognizing = false,
    speechLang = "en-US",
    final_transcript = "";

$(document).ready(function() {
  $(".changeGame").change(function () {
    var selectedVal = $(this).find(":selected").val();
    $(".changeActivity option").each(function () {
      if ($(this).val() == "default" || $(this).val() == "gen") {
        $(this).removeClass("hide");
      } else {
        if ($(this).data("target") != selectedVal) {
          $(this).addClass("hide");
        } else {
          $(this).removeClass("hide");
        }
      }
    });
  });
  $(".changeActivity").change(function () {
    var selectedVal = $(this).find(":selected").val();
    $(".changeEncounter option").each(function () {
      if ($(this).val() == "default" || $(this).val() == "gen") {
        $(this).removeClass("hide");
      } else {
        if ($(this).data("target") != selectedVal) {
          $(this).addClass("hide");
        } else {
          $(this).removeClass("hide");
        }
      }
    });
  });
  $('#output').change(function() {
    var val = $(this).val();
    $("#output").attr("placeholder", val);
  })

  $('.changeEncounter').bind('change', function() {
    var value = $(this).val();
    if (value.length) { // if somethings' selected
      switch (value) {
        case "custom":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("");
          break;
        case "spireandconfluxes":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("Help Left");
          $("#inputHotkey_18").val("Help Middle");
          $("#inputHotkey_20").val("Help Right");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("help right, help middle, help left, snipers, hobgoblins, left, middle, right");
          break;
        case "destroytheoracles":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("L3");
          $("#inputHotkey_10").val("R3");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("L2");
          $("#inputHotkey_18").val("R2");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("L1");
          $("#inputHotkey_24").val("R1");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("Middle");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("right one, right two, right three, middle, left three, left two, left one, help left, help middle, help right, left, middle, right");
          break;
        case "killthetemplar":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("Remove Detained, then Damage");
          $("#inputHotkey_16").val("");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("I will run relic and solo both teleports");
          $("#inputHotkey_28").val("Oracle Right");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("Oracle Left");
          $("#inputListen").val("damage, i will run relic, you can run relic, i will get both teleports, oracle left, oracle right, right oracle, left oracle, we are not doing challenge, no");
          break;
        case "thegorgonslabyrinth":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("Group Up");
          $("#inputHotkey_10").val("Damage");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("Hide");
          $("#inputHotkey_18").val("Run");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("Left");
          $("#inputHotkey_24").val("Right");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("Behind");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("hide, go, run, damaage, behind, group up");
          break;
        case "awakentheglassthrone":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("Solo Left");
          $("#inputHotkey_5").val("Solo Right");
          $("#inputHotkey_8").val("Open Left");
          $("#inputHotkey_10").val("Open Right");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("Cleans Left");
          $("#inputHotkey_18").val("Cleans Right");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("Help Left");
          $("#inputHotkey_24").val("Help Middle");
          $("#inputHotkey_26").val("Help Right");
          $("#inputHotkey_28").val("Right Relic");
          $("#inputHotkey_30").val("Left Relic");
          $("#inputHotkey_32").val("Middle Relic");
          $("#inputListen").val("left, right, solo, open left, open right, solo left, solo right, help left, help middle, help right, middle relic, left relic, right relic, defend");
          break;
        case "destroyatheon":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("Open Left");
          $("#inputHotkey_16").val("Open Right");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("Cleans Left");
          $("#inputHotkey_24").val("Cleans Right");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("Go to Middle");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("open left, open right, left cleans, right cleans, cleans left, cleanse right, middle, damage, relic, oracle, no challenge, not doing challenge, challenge, yes, no");
          break;
        case "thehellmouth":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("Run");
          $("#inputHotkey_30").val("Group Up");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("run, group up, wait, yes, no");
          break;
        case "oversoulthrone":
          $("#inputHotkey_1").val("Help Exit Left");
          $("#inputHotkey_3").val("Help Exit Middle");
          $("#inputHotkey_5").val("Help Exit Right");
          $("#inputHotkey_8").val("Help Entrance Left");
          $("#inputHotkey_10").val("Help Entrance Middle");
          $("#inputHotkey_12").val("Help Entrance Right");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("4 is crossing, entrance get off plates, exit get on");
          $("#inputHotkey_18").val("5 is crossing");
          $("#inputHotkey_20").val("6 is crossing");
          $("#inputHotkey_22").val("1 is crossing");
          $("#inputHotkey_24").val("2 is crossing, 3 and 4 to center");
          $("#inputHotkey_26").val("3 is crossing");
          $("#inputHotkey_28").val("Run");
          $("#inputHotkey_30").val("Group Up");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("run, group up, help left, help middle, help right, left help, middle help, right help, exit, enter, entrance, one, two, three, four, five, six, get off, get on");
          break;
        case "entercrotasthrone":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val(".115, kill with relic before 0 for challenge");
          $("#inputHotkey_16").val("Left Hall");
          $("#inputHotkey_18").val("Right Hall");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("Left Tower");
          $("#inputHotkey_24").val("Right Tower");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("Middle");
          $("#inputHotkey_32").val("I will complete challenge");
          $("#inputListen").val("help left hall, help left tower, help middle, solo left hall, solo left tower, solo right tower, solo right hall, help right rower, help right hall, no challenge, not doing challenge, yes, no ");
          break;
        case "defeatcrota":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val(".4, down crota at 0");
          $("#inputHotkey_16").val("");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("Pass the Challice");
          $("#inputHotkey_30").val("Oversoul");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("challice, oversoul, 3 2 1 down crota, get inside, ogre");
          break;
        case "entertheascendentplane":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("Open Left");
          $("#inputHotkey_18").val("Open Right");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("Help Left");
          $("#inputHotkey_26").val("Help Right");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("Help Middle");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("open left, open right, help left, help middle, help right");
          break;
        case "annihilatortotems":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("Swap Left");
          $("#inputHotkey_18").val("Swap Right");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("Grab Left Orb");
          $("#inputHotkey_24").val("Grab Right Orb");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("swap left, swap right, left orb, right orb, grab left orb, grab right orb, wipe");
          break;
        case "defeatthewarpriest":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("Swap Left");
          $("#inputHotkey_10").val("Swap Middle");
          $("#inputHotkey_12").val("Swap Right");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("Right");
          $("#inputHotkey_18").val("Middle");
          $("#inputHotkey_20").val("Left");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("Hide Now");
          $("#inputHotkey_30").val("Last Stack");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("swap left, swap middle, swap right, left, middle, right, hide, last stack, last one, nine, eight, seven, six, five, four, three, two, one, zero");
          break;
        case "defeatgolgoroth":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("Get Out!");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val(".18, 1 has gaze");
          $("#inputHotkey_16").val("4 has gaze");
          $("#inputHotkey_18").val("5 has gaze");
          $("#inputHotkey_20").val("6 has gaze");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("2 has gaze");
          $("#inputHotkey_26").val("3 has gaze");
          $("#inputHotkey_28").val("Prepare for damage");
          $("#inputHotkey_30").val("Drop the orb");
          $("#inputHotkey_32").val("I will solo orb, get 1st gaze, and tether");
          $("#inputListen").val("one, two, three, four, five, six, solo, drop the orb, damage, get below");
          break;
        case "daughtersoforyx":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("1 is on");
          $("#inputHotkey_24").val("2 is on");
          $("#inputHotkey_26").val("3 is on");
          $("#inputHotkey_28").val("I have the relic, get off plates");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("one is on, two is on, three is on, I have the relic");
          break;
        case "oyrxthetakenking":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("Knight 4");
          $("#inputHotkey_14").val(".20, Step in bombs at 6, return at 0");
          $("#inputHotkey_16").val("Knight 2");
          $("#inputHotkey_18").val("Knight 3");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("1 is on");
          $("#inputHotkey_24").val("2 is on");
          $("#inputHotkey_26").val("3 is on");
          $("#inputHotkey_28").val("I have the relic, get off plates");
          $("#inputHotkey_30").val("Knight 4");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("one is on, two is on, three is on, I have the relic, detonate, step in, knight 4");
          break;
        case "outbreakprime":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("0000: 0, 0001: 1, 0010: 2, 0011: 3, 0100: 4, 0101: 5, 7 columns, 8 rows");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("0 0 0 0 left, 0 0 0 1 left, 0 0 1 0 left, 0 0 1 1 left, 0 1 0 0 left, 0 1 0 1 left, 0 0 0 0 right, 0 0 0 1 right, 0 0 1 0 right, 0 0 1 1 right, 0 1 0 0 right, 0 1 0 1 right, 0 left, 1 left, 2 left, 3 left, 4 left, 5 left, 0 right, 1 right, 2 right, 3 right, 4 right, 5 right, left 0 0 0 0, left 0 0 0 1, left 0 0 1 0, left 0 0 1 1, left 0 1 0 0, left 0 1 0 1, right 0 0 0 0, right 0 0 0 1, right 0 0 1 0, right 0 0 1 1, right 0 1 0 0, right 0 1 0 1, left 0, left 1, left 2, left 3, left 4, left 5, right 0, right 1, right 2, right 3, right 4, right 5, 0 0 0 0 column, 0 0 0 1 column, 0 0 1 0 column, 0 0 1 1 column, 0 1 0 0 column, 0 1 0 1 column, 0 0 0 0 row, 0 0 0 1 row, 0 0 1 0 row, 0 0 1 1 row, 0 1 0 0 row, 0 1 0 1 row, 0 column, 1 column, 2 column, 3 column, 4 column, 5 column, 0 row, 1 row, 2 row, 3 row, 4 row, 5 row, column 0 0 0 0, column 0 0 0 1, column 0 0 1 0, column 0 0 1 1, column 0 1 0 0, column 0 1 0 1, row 0 0 0 0, row 0 0 0 1, row 0 0 1 0, row 0 0 1 1, row 0 1 0 0, row 0 1 0 1, column 0, column 1, column 2, column 3, column 4, column 5, row 0, row 1, row 2, row 3, row 4, row 5, get off");
          break;
        case "defeatvosik":
          $("#inputHotkey_1").val("Monitor Left");
          $("#inputHotkey_3").val("Monitor Middle");
          $("#inputHotkey_5").val("Monitor Right");
          $("#inputHotkey_8").val("Pick up bombs");
          $("#inputHotkey_10").val("Throw");
          $("#inputHotkey_12").val("Left");
          $("#inputHotkey_14").val("Run");
          $("#inputHotkey_16").val("Front Left Room");
          $("#inputHotkey_18").val("Front Right Room");
          $("#inputHotkey_20").val("Middle");
          $("#inputHotkey_22").val("Back Left Room");
          $("#inputHotkey_24").val("Back Right Room");
          $("#inputHotkey_26").val("Right");
          $("#inputHotkey_28").val("Defend");
          $("#inputHotkey_30").val("Front");
          $("#inputHotkey_32").val("Back");
          $("#inputListen").val("monitor left, monitor middle, monitor right, pick up bombs, 3 2 1 throw, front left, front right, back left, back right, front, back, left, right, yes, no");
          break;
        case "aksis":
          $("#inputHotkey_1").val("Cannon Empowered Left");
          $("#inputHotkey_3").val("Cannon Empowered Middle");
          $("#inputHotkey_5").val("Cannon Empowered Right");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("Null Left");
          $("#inputHotkey_12").val("Null Middle");
          $("#inputHotkey_14").val("Null Right");
          $("#inputHotkey_16").val("Schorch Left");
          $("#inputHotkey_18").val("Schorch Middle");
          $("#inputHotkey_20").val("Scorch Right");
          $("#inputHotkey_22").val("Arc Left");
          $("#inputHotkey_24").val("Arc Middle");
          $("#inputHotkey_26").val("Arc Right");
          $("#inputHotkey_28").val("Bomb Empowered Left");
          $("#inputHotkey_30").val("Bomb Empowered Right");
          $("#inputHotkey_32").val("Bomb Empowered Middle");
          $("#inputListen").val("empowered left, empowered middle, empowered right, null left, null middle, null right, schorch left, schorch middle, schorch right, arc left, arc middle, arc right, cannons");
          break;
        case "castellum":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("Cup");
          $("#inputHotkey_10").val("Sun");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("Axe");
          $("#inputHotkey_18").val("Dog");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("Run");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("Defend");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("cup, dog, axe, sun, defend, go");
          break;
        case "gauntlet":
          $("#inputHotkey_1").val("Challenge Strat");
          $("#inputHotkey_3").val("Second Cup Runner");
          $("#inputHotkey_5").val("Cup Runner");
          $("#inputHotkey_8").val("Cup");
          $("#inputHotkey_10").val("Axe");
          $("#inputHotkey_12").val("Top");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("Sun");
          $("#inputHotkey_18").val("Dog");
          $("#inputHotkey_20").val("Mid");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("Bot");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("cup top, cup middle, cup bottom, axe top, axe middle, axe bottom, dog top, dog middle, dog bottom, sun top, sun middle, sun bottom, challenge, rotate, stationary");
          break;
        case "pleasuregardens":
          $("#inputHotkey_1").val("Follow");
          $("#inputHotkey_3").val("Lead");
          $("#inputHotkey_5").val("Right");
          $("#inputHotkey_8").val("L3");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("R3");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("L2");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("R2");
          $("#inputHotkey_22").val("L1");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("R1");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("Trees");
          $("#inputHotkey_32").val("Rocks");
          $("#inputListen").val("yes, no, L1 R2, R1 L2, L1, L2, L3, tree, rock, R1, R2, R3, right one, right two, right three, left one, left two, left three");
          break;
        case "royalpools":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("Axe Top Left");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("Cup Top Right");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("Middle Left");
          $("#inputHotkey_18").val("Sun");
          $("#inputHotkey_20").val("Middle Right");
          $("#inputHotkey_22").val("Dog Bottom Left");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("Spear Bottom Right");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("go, rotate, left and right, top and bottom");
          break;
        case "throne":
          $("#inputHotkey_1").val("Left");
          $("#inputHotkey_3").val("Middle");
          $("#inputHotkey_5").val("Right");
          $("#inputHotkey_8").val("Cup");
          $("#inputHotkey_10").val("Sun");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val(".20, break sheild at 0");
          $("#inputHotkey_16").val("Axe");
          $("#inputHotkey_18").val("Dog");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("Right Void");
          $("#inputHotkey_32").val("Right Throne");
          $("#inputListen").val("axe cup dog, axe cup sun, axe dog cup, axe dog sun, axe sun cup, axe sun dog, cup axe sun, cup axe dog, cup dog sun, cup dog axe, cup sun dog, cup sun axe, dog axe cup, dog axe sun, dog cup axe, dog cup sun, dog sun axe, dog sun cup, sun axe dog, sun axe cup, sun cup dog, sun cup axe, sun dog cup, sun dog axe, ");
          break;
        case "escapethereactor":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("Go");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("3 2 1 jump, snipers");
          break;
        case "breakthebarrier":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("VVV");
          $("#inputHotkey_10").val("VVS");
          $("#inputHotkey_12").val("VVA");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("SSS");
          $("#inputHotkey_18").val("SSA");
          $("#inputHotkey_20").val("SSV");
          $("#inputHotkey_22").val("AAA");
          $("#inputHotkey_24").val("AAV");
          $("#inputHotkey_26").val("AAS");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("Rainbow");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("arc arc arc, arc arc void, arc arc solar, arc void arc, arc void void, arc void solar, arc solar arc, arc solar void, arc solar solar, void arc arc, void arc void, void arc solar, void void arc, void void void, void void solar, void solar arc, void solar void, void solar solar, solar arc arc, solar arc void, solar arc solar, solar void arc, solar void void, solar void solar, solar solar arc, solar solar void, solar solar solar, ");
          break;
        case "defeatargos":
          $("#inputHotkey_1").val("Defenders to Void");
          $("#inputHotkey_3").val("Defenders to Solar");
          $("#inputHotkey_5").val("Defenders to Arc");
          $("#inputHotkey_8").val("VVV SSS");
          $("#inputHotkey_10").val("VVS SSA");
          $("#inputHotkey_12").val("VVA SSV");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("SSV AAS");
          $("#inputHotkey_18").val("SSS AAA");
          $("#inputHotkey_20").val("SSA AAV");
          $("#inputHotkey_22").val("AAV VVS");
          $("#inputHotkey_24").val("AAS VVA");
          $("#inputHotkey_26").val("AAA VVV");
          $("#inputHotkey_28").val("3s (timer)");
          $("#inputHotkey_30").val("Rainbow 2e");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("arc arc arc, arc arc void, arc arc solar, arc void arc, arc void void, arc void solar, arc solar arc, arc solar void, arc solar solar, void arc arc, void arc void, void arc solar, void void arc, void void void, void void solar, void solar arc, void solar void, void solar solar, solar arc arc, solar arc void, solar arc solar, solar void arc, solar void void, solar void solar, solar solar arc, solar solar void, solar solar solar, ");
          break;
        case "acceptcalussgift":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("I will do skip");
          $("#inputHotkey_16").val("4 needs the ball");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("1 needs the ball");
          $("#inputHotkey_24").val("2 needs the ball");
          $("#inputHotkey_26").val("3 needs the ball");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("Add Clear Back");
          $("#inputHotkey_32").val("Add Clear Front");
          $("#inputListen").val("skip, 1, 2, 3, 4, get the ball");
          break;
        case "stopvalcauorsfleet":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("Square Left");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("Triangle Right");
          $("#inputHotkey_14").val("Symbols");
          $("#inputHotkey_16").val("4 needs the ball");
          $("#inputHotkey_18").val("Circle Middle");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("1 needs the ball");
          $("#inputHotkey_24").val("2 needs the ball");
          $("#inputHotkey_26").val("3 needs the ball");
          $("#inputHotkey_28").val("Plates");
          $("#inputHotkey_30").val("Float Left");
          $("#inputHotkey_32").val("Float Right");
          $("#inputListen").val("symbols, plates, go up, 1, 2, 3, 4, left one, left two, right one, right two, circle, square, triangle");
          break;
        case "neutralizevalcauor":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("Square Left");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("Triangle Right");
          $("#inputHotkey_14").val("Symbols");
          $("#inputHotkey_16").val("4 needs the ball");
          $("#inputHotkey_18").val("Circle Middle");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("1 needs the ball");
          $("#inputHotkey_24").val("2 needs the ball");
          $("#inputHotkey_26").val("3 needs the ball");
          $("#inputHotkey_28").val("Plates");
          $("#inputHotkey_30").val("Float Left");
          $("#inputHotkey_32").val("Float Right");
          $("#inputListen").val("symbols, plates, go up, 1, 2, 3, 4, left one, left two, right one, right two, circle, square, triangle");
          break;
        case "berserkersotp":
          $("#inputHotkey_1").val("Left");
          $("#inputHotkey_3").val("Middle");
          $("#inputHotkey_5").val("Right");
          $("#inputHotkey_8").val("Forwards");
          $("#inputHotkey_10").val("Backwards");
          $("#inputHotkey_12").val("High");
          $("#inputHotkey_14").val("Low");
          $("#inputHotkey_16").val("4");
          $("#inputHotkey_18").val("map");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("1");
          $("#inputHotkey_24").val("2");
          $("#inputHotkey_26").val("3");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("switches, left, middle, right, 1, 2, 3, 4, 5, map, high, low, street, building");
          break;
        case "vaultaccess":
          $("#inputHotkey_1").val("Circular");
          $("#inputHotkey_3").val("Angular");
          $("#inputHotkey_5").val("Parrallel");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("1");
          $("#inputHotkey_28").val("Reset");
          $("#inputHotkey_30").val("3");
          $("#inputHotkey_32").val("2");
          $("#inputListen").val("Circular, Angular, Parrallel, Circle, Triangle, Square, 1, 2, 3, reset, servitor");
          break;
        case "insurrectionprime":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("CAP");
          $("#inputHotkey_8").val("Top Left");
          $("#inputHotkey_10").val("Top Mid");
          $("#inputHotkey_12").val("Top Right");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("Mid Left");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("Bottom Left");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("1");
          $("#inputHotkey_28").val("Bottom Right");
          $("#inputHotkey_30").val("3");
          $("#inputHotkey_32").val("2");
          $("#inputListen").val("C A P, top left, top middle, top right, middle left, bottom left, bottom right, 3, 2, 1");
          break;
        case "kaliandshurochi":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("Challenge");
          $("#inputHotkey_5").val("Doors by Roster");
          $("#inputHotkey_8").val("No Infinity Snake");
          $("#inputHotkey_10").val("No 8 Snake");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("No Cloud Snake");
          $("#inputHotkey_18").val("No Split Snake");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("1");
          $("#inputHotkey_24").val("2");
          $("#inputHotkey_26").val("3");
          $("#inputHotkey_28").val("Ready");
          $("#inputHotkey_30").val("Swap");
          $("#inputHotkey_32").val("4");
          $("#inputListen").val("Challenge, roster, no infinity snake, no 8 snake, no cloud snake, no uwu snake, no w snake, no split snake, ready,  1 swap with 2, 1 swap with 3, 1 swap with 4, 2 swap with 1, 2 swap with 3, 2 swap with 4, 3 swap with 1, 3 swap with 2, 3 swap with 4, 4 swap with 1, 4 swap with 2, 4 swap with 3");
          break;
        case "morgeth":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("Thank you");
          $("#inputHotkey_16").val("Trapped Left");
          $("#inputHotkey_18").val("Damage");
          $("#inputHotkey_20").val("Trapped Right");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("Sword Strat, 1st set right, 2nd cleans");
          $("#inputHotkey_32").val("Challenge");
          $("#inputListen").val("taken left, taken right, trapped left, trapped right, sword strat, force right, force left, challenge, damage");
          break;
        case "vault":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("Tree Pen");
          $("#inputHotkey_10").val("Tree Ant");
          $("#inputHotkey_12").val("Knight on Tree");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("Stairs Pen");
          $("#inputHotkey_18").val("Stairs Ant");
          $("#inputHotkey_20").val("Knight on Stairs");
          $("#inputHotkey_22").val("Rock Pen");
          $("#inputHotkey_24").val("Rock Ant");
          $("#inputHotkey_26").val("Knight on Rock");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("Knight Tree, Knight Strairs, Knight Rock, Tree Pen, Tree Ant, Stairs Pen, Stairs Pen, Rock Pen, Rock Ant, Read, Front, Back, Left One Left Two, Left One Left Three, Left One Left Four, Left One Left Five, Left One Right One, Left One Right Two, Left One Right Three, Left One Right Four, Left One Right Five, Left Two Left Three, Left Two Left Four, Left Two Left Five, Left Two Right One, Left Two Right Two, Left Two Right Three, Left Two Right Four, Left Two Right Five, Left Three Left Four, Left Three Left Five, Left Three Right One, Left Three Right Two, Left Three Right Three, Left Three Right Four, Left Three Right Five, Left Four Left Five, Left Four Right One, Left Four Right Two, Left Four Right Three, Left Four Right Four, Left Four Right Five, Left Five Right One, Left Five Right Two, Left Five Right Three, Left Five Right Four, Left Five Right Five, Right One Right Two, Right One Right Three, Right One Right Four, Right One Right Five, Right Two Right Three, Right Two Right Four, Right Two Right Five, Right Three Right Four, Right Three Right Five, Right Four Right Five, L1 L2, L1 L3, L1 L4, L1 L5, L1 R1, L1 R2, L1 R3, L1 R4, L1 R5, L2 L3, L2 L4, L2 L5, L2 R1, L2 R2, L2 R3, L2 R4, L2 R5, L3 L4, L3 L5, L3 R1, L3 R2, L3 R3, L3 R4, L3 R5, L4 L5, L4 R1, L4 R2, L4 R3, L4 R4, L4 R5, L5 R1, L5 R2, L5 R3, L5 R4, L5 R5, R1 R2, R1 R3, R1 R4, R1 R5, R2 R3, R2 R4, R2 R5, R3 R4, R3 R5, R4 R5, 1 2, 1 3, 1 4, 1 5, 1 6, 1 7, 1 8, 1 9, 1 10, 2 3, 2 4, 2 5, 2 6, 2 7, 2 8, 2 9, 2 10, 3 4, 3 5, 3 6, 3 7, 3 8, 3 9, 3 10, 4 5, 4 6, 4 7, 4 8, 4 9, 4 10, 5 6, 5 7, 5 8, 5 9, 5 10, 6 7, 6 8, 6 9, 6 10, 7 8, 7 9, 7 10, 8 9, 8 10, 9 10, Fish Left, Fish Curl, Fish Fish, Fish Up, Snake Infinity, Snake Eight, Snake Split, Snake Cloud, Fire Left, Fire Right, Spear Neck, Spear Hands, Bird Dive, Bird Branch, Bird Fly, Bird Stand, Left, Right");
          break;
        case "symbols":
          $("#inputHotkey_1").val("Fish Left");
          $("#inputHotkey_3").val("Fish Curl");
          $("#inputHotkey_5").val("Fish Fish");
          $("#inputHotkey_8").val("Fish Up");
          $("#inputHotkey_10").val("Snake Infinity");
          $("#inputHotkey_12").val("Snake Eight");
          $("#inputHotkey_14").val("Snake Split");
          $("#inputHotkey_16").val("Snake Cloud");
          $("#inputHotkey_18").val("Fire Left");
          $("#inputHotkey_20").val("Fire Right");
          $("#inputHotkey_22").val("Spear Neck");
          $("#inputHotkey_24").val("Spear Hands");
          $("#inputHotkey_26").val("Bird Dive");
          $("#inputHotkey_28").val("Bird Branch");
          $("#inputHotkey_30").val("Bird Fly");
          $("#inputHotkey_32").val("Bird Stand");
          $("#inputListen").val("Knight Tree, Knight Strairs, Knight Rock, Tree Pen, Tree Ant, Stairs Pen, Stairs Pen, Rock Pen, Rock Ant, Read, Fish Left, Fish Curl, Fish Fish, Fish Up, Snake Infinity, Snake Eight, Snake Split, Snake Cloud, Fire Left, Fire Right, Spear Neck, Spear Hands, Bird Dive, Bird Branch, Bird Fly, Bird Stand, Left, Right");
          break;
        case "riven":
          $("#inputHotkey_1").val("Left");
          $("#inputHotkey_3").val("Right");
          $("#inputHotkey_5").val("Front");
          $("#inputHotkey_8").val("Left 1");
          $("#inputHotkey_10").val("Left 2");
          $("#inputHotkey_12").val("Left 3");
          $("#inputHotkey_14").val("Back");
          $("#inputHotkey_16").val("Left 4");
          $("#inputHotkey_18").val("Left 5");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("Right 1");
          $("#inputHotkey_24").val("Right 2");
          $("#inputHotkey_26").val("Right 3");
          $("#inputHotkey_28").val("Go");
          $("#inputHotkey_30").val("Right 4");
          $("#inputHotkey_32").val("Right 5");
          $("#inputListen").val("Front, Back, Left One Left Two, Left One Left Three, Left One Left Four, Left One Left Five, Left One Right One, Left One Right Two, Left One Right Three, Left One Right Four, Left One Right Five, Left Two Left Three, Left Two Left Four, Left Two Left Five, Left Two Right One, Left Two Right Two, Left Two Right Three, Left Two Right Four, Left Two Right Five, Left Three Left Four, Left Three Left Five, Left Three Right One, Left Three Right Two, Left Three Right Three, Left Three Right Four, Left Three Right Five, Left Four Left Five, Left Four Right One, Left Four Right Two, Left Four Right Three, Left Four Right Four, Left Four Right Five, Left Five Right One, Left Five Right Two, Left Five Right Three, Left Five Right Four, Left Five Right Five, Right One Right Two, Right One Right Three, Right One Right Four, Right One Right Five, Right Two Right Three, Right Two Right Four, Right Two Right Five, Right Three Right Four, Right Three Right Five, Right Four Right Five, L1 L2, L1 L3, L1 L4, L1 L5, L1 R1, L1 R2, L1 R3, L1 R4, L1 R5, L2 L3, L2 L4, L2 L5, L2 R1, L2 R2, L2 R3, L2 R4, L2 R5, L3 L4, L3 L5, L3 R1, L3 R2, L3 R3, L3 R4, L3 R5, L4 L5, L4 R1, L4 R2, L4 R3, L4 R4, L4 R5, L5 R1, L5 R2, L5 R3, L5 R4, L5 R5, R1 R2, R1 R3, R1 R4, R1 R5, R2 R3, R2 R4, R2 R5, R3 R4, R3 R5, R4 R5, 1 2, 1 3, 1 4, 1 5, 1 6, 1 7, 1 8, 1 9, 1 10, 2 3, 2 4, 2 5, 2 6, 2 7, 2 8, 2 9, 2 10, 3 4, 3 5, 3 6, 3 7, 3 8, 3 9, 3 10, 4 5, 4 6, 4 7, 4 8, 4 9, 4 10, 5 6, 5 7, 5 8, 5 9, 5 10, 6 7, 6 8, 6 9, 6 10, 7 8, 7 9, 7 10, 8 9, 8 10, 9 10, Fish Left, Fish Curl, Fish Fish, Fish Up, Snake Infinity, Snake Eight, Snake Split, Snake Cloud, Fire Left, Fire Right, Spear Neck, Spear Hands, Bird Dive, Bird Branch, Bird Fly, Bird Stand, Left, Right");
          break;
        case "queenswalk":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val(".18");
          $("#inputHotkey_16").val("Left");
          $("#inputHotkey_18").val("Right");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val(".14, let's go");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("left, right, go to door, slow down, 10, 8, 6, 4, 2, 1");
          break;
        case "dispelhiveward":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("Swap");
          $("#inputHotkey_8").val("Left Buff");
          $("#inputHotkey_10").val("Middle Buff");
          $("#inputHotkey_12").val("Right Buff");
          $("#inputHotkey_14").val("Crystal");
          $("#inputHotkey_16").val("Left non-buff");
          $("#inputHotkey_18").val("Middle non-buff");
          $("#inputHotkey_20").val("Right non-buff");
          $("#inputHotkey_22").val("Blessed Ogre Left");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("Blessed Ogre Right");
          $("#inputHotkey_28").val("Buff");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("swap, left crystal, middle crystal, right crystal, i got it, buff");
          break;
        case "reachthepinnacle":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("Above");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("Left");
          $("#inputHotkey_18").val("Middle");
          $("#inputHotkey_20").val("Right");
          $("#inputHotkey_22").val("Behind");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("Below");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("above, below, beind, left, middle, right");
          break;
        case "defeatgahlransdeception":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("Swap");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("Crysal");
          $("#inputHotkey_16").val("");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("Buff");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("swap, crystal, buff, hands, 3 2 1 melee, melee");
          break;
        case "defeatgahlran":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("Swap");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("Crysal");
          $("#inputHotkey_16").val("");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("");
          $("#inputHotkey_24").val("");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("Buff");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("swap, crystal, buff, hands, 3 2 1 melee, melee");
          break;
        case "embrace":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("1st pick, then skip");
          $("#inputHotkey_16").val("4");
          $("#inputHotkey_18").val("5");
          $("#inputHotkey_20").val("6");
          $("#inputHotkey_22").val("1");
          $("#inputHotkey_24").val("2");
          $("#inputHotkey_26").val("3");
          $("#inputHotkey_28").val("Stay 1");
          $("#inputHotkey_30").val("Go");
          $("#inputHotkey_32").val("Challenge");
          $("#inputListen").val("Skip, can you go, challenge");
          break;
        case "undergrowth":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("Buff");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("4");
          $("#inputHotkey_22").val("1");
          $("#inputHotkey_24").val("2");
          $("#inputHotkey_26").val("3");
          $("#inputHotkey_28").val("Angelics");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("angelics 1, angelics 2, angelics 3, angelics 4, ready 1, ready 2, ready 3, ready 4, 1 is ready, 2 is ready, 3 is ready, 4 is ready, buff 1, buff 2, buff 3, buff 4");
          break;
        case "consecratedmind":
          $("#inputHotkey_1").val("");
          $("#inputHotkey_3").val("");
          $("#inputHotkey_5").val("");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("");
          $("#inputHotkey_18").val("");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("Inner");
          $("#inputHotkey_24").val("Outer");
          $("#inputHotkey_26").val("Damage");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("Solo 1st eyes, everyone help with minotaurs");
          $("#inputListen").val("inner, outer, damage");
          break;
        case "sanctifiedmind":
          $("#inputHotkey_1").val("Team 1");
          $("#inputHotkey_3").val("Team 2");
          $("#inputHotkey_5").val("Build");
          $("#inputHotkey_8").val("");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("Pull Left");
          $("#inputHotkey_18").val("Pull Right");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("Build Left");
          $("#inputHotkey_24").val("Build Right");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("pull left, pull right, build left, build right, build here");
          break;
        case "d2pvp":
          $("#inputHotkey_1").val("High");
          $("#inputHotkey_3").val("Low");
          $("#inputHotkey_5").val("Super");
          $("#inputHotkey_8").val("Grouping");
          $("#inputHotkey_10").val("Camping");
          $("#inputHotkey_12").val("Pushing");
          $("#inputHotkey_14").val("Bailing");
          $("#inputHotkey_16").val("A");
          $("#inputHotkey_18").val("B");
          $("#inputHotkey_20").val("C");
          $("#inputHotkey_22").val("1");
          $("#inputHotkey_24").val("2");
          $("#inputHotkey_26").val("3");
          $("#inputHotkey_28").val("Sniping");
          $("#inputHotkey_30").val("Shotty");
          $("#inputHotkey_32").val("Heavy");
          $("#inputListen").val("up high, down low, super, watch out, group up, play slow, they are camping, push, pushing, absolute, bailing, Zone A, Zone B, Zone C, 1 on me, 2 on me, 3 on me, team shoot, snipping, shotty, heavy");
          break;
        case "gen":
          $("#inputHotkey_1").val("Hello, I am deaf and use Callouts Evolved to communicate.");
          $("#inputHotkey_3").val("It provides basic speech to text functionality with macros for text to speech and in game messages.");
          $("#inputHotkey_5").val("Check it out at https://www.calloutsevovled.com");
          $("#inputHotkey_8").val("My mistake");
          $("#inputHotkey_10").val("");
          $("#inputHotkey_12").val("");
          $("#inputHotkey_14").val("");
          $("#inputHotkey_16").val("I will be right back");
          $("#inputHotkey_18").val("You are still in this fight *clears throat*... Let's get going");
          $("#inputHotkey_20").val("");
          $("#inputHotkey_22").val("Thanks for the run!");
          $("#inputHotkey_24").val("Let me know if there is something I can do better next time!");
          $("#inputHotkey_26").val("");
          $("#inputHotkey_28").val("#sadtrombone");
          $("#inputHotkey_30").val("");
          $("#inputHotkey_32").val("");
          $("#inputListen").val("hello, can you look for more, hello how are you, what is up, can you hear us, i will be right back, be right back, ready, do you know what to do, what is callouts evolved");
          break;
      }
    } else {
      $("#inputHotkey_1").val("");
      $("#inputHotkey_3").val("");
      $("#inputHotkey_5").val("");
      $("#inputHotkey_8").val("");
      $("#inputHotkey_10").val("");
      $("#inputHotkey_12").val("");
      $("#inputHotkey_14").val("");
      $("#inputHotkey_16").val("");
      $("#inputHotkey_18").val("");
      $("#inputHotkey_20").val("");
      $("#inputHotkey_22").val("");
      $("#inputHotkey_24").val("");
      $("#inputHotkey_26").val("");
      $("#inputHotkey_28").val("");
      $("#inputHotkey_30").val("");
      $("#inputHotkey_32").val("");
      $("#inputListen").val("hello, can you look for more, hello how are you, what is up, can you hear us, i will be right back, be right back, ready, do you know what to do, what is callouts evolved");
    }
  }).trigger('change');
});