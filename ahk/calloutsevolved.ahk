setworkingdir,%A_scriptdir%
;@Ahk2Exe-SetMainIcon [D:\CalloutsEvolved\AHKDev\calloutsevolved.ico]
;@Ahk2Exe-AddResource calloutsevolved.ico, 160
;@Ahk2Exe-AddResource calloutsevolved.ico, 206
;@Ahk2Exe-AddResource calloutsevolved.ico, 207
;@Ahk2Exe-AddResource calloutsevolved.ico, 208

CodeVersion := "2.0.2", company := "Callouts Evolved"
;@Ahk2Exe-Let U_version = %A_PriorLine~U)^(.+"){1}(.+)".*$~$2%
;@Ahk2Exe-Let U_company = %A_PriorLine~U)^(.+"){3}(.+)".*$~$2%

I_Icon = calloutsevolved.ico
IfExist, %I_Icon%
Menu, Tray, Icon, %I_Icon%,, 1

#Warn All, Off
#NoEnv
#Persistent
#SingleInstance, force

class Chrome
{
	static DebugPort := 9222
	CliEscape(Param)
	{
		return """" RegExReplace(Param, "(\\*)""", "$1$1\""") """"
	}
	FindInstances()
	{
		static Needle := "--remote-debugging-port=(\d+)"
		Out := {}
		for Item in ComObjGet("winmgmts:")
			.ExecQuery("SELECT CommandLine FROM Win32_Process"
			. " WHERE Name = 'chrome.exe'")
			if RegExMatch(Item.CommandLine, Needle, Match)
				Out[Match1] := Item.CommandLine
		return Out.MaxIndex() ? Out : False
	}
	__New(ProfilePath:="", URLs:="about:blank", Flags:="", ChromePath:="", DebugPort:="")
	{
		if (ProfilePath != "" && !InStr(FileExist(ProfilePath), "D"))
			throw Exception("The given ProfilePath does not exist")
		this.ProfilePath := ProfilePath
		
		if (ChromePath == "")
			FileGetShortcut, %A_StartMenuCommon%\Programs\Google Chrome.lnk, ChromePath
		if (ChromePath == "")
			RegRead, ChromePath, HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\App Pahs\chrome.exe
		if !FileExist(ChromePath)
			throw Exception("Chrome could not be found")
		this.ChromePath := ChromePath
		
		if (DebugPort != "")
		{
			if DebugPort is not integer
				throw Exception("DebugPort must be a positive integer")
			else if (DebugPort <= 0)
				throw Exception("DebugPort must be a positive integer")
			this.DebugPort := DebugPort
		}
		
		for Index, URL in IsObject(URLs) ? URLs : [URLs]
			URLString .= " " this.CliEscape(URL)
		
		Run, % this.CliEscape(ChromePath)
		. " --remote-debugging-port=" this.DebugPort
		. (ProfilePath ? " --user-data-dir=" this.CliEscape(ProfilePath) : "")
		. (Flags ? " " Flags : "")
		. URLString
		,,, OutputVarPID
		this.PID := OutputVarPID
	}
	Kill()
	{
		Process, Close, % this.PID
	}
	GetPageList()
	{
		http := ComObjCreate("WinHttp.WinHttpRequest.5.1")
		http.open("GET", "http://127.0.0.1:" this.DebugPort "/json")
		http.send()
		return this.Jxon_Load(http.responseText)
	}
	GetPageBy(Key, Value, MatchMode:="exact", Index:=1, fnCallback:="")
	{
		Count := 0
		for n, PageData in this.GetPageList()
		{
			if (((MatchMode = "exact" && PageData[Key] = Value) ; Case insensitive
				|| (MatchMode = "contains" && InStr(PageData[Key], Value))
				|| (MatchMode = "startswith" && InStr(PageData[Key], Value) == 1)
				|| (MatchMode = "regex" && PageData[Key] ~= Value))
				&& ++Count == Index)
				return new this.Page(PageData.webSocketDebuggerUrl, fnCallback)
		}
	}
	GetPageByURL(Value, MatchMode:="startswith", Index:=1, fnCallback:="")
	{
		return this.GetPageBy("url", Value, MatchMode, Index, fnCallback)
	}
	GetPageByTitle(Value, MatchMode:="startswith", Index:=1, fnCallback:="")
	{
		return this.GetPageBy("title", Value, MatchMode, Index, fnCallback)
	}
	GetPage(Index:=1, Type:="page", fnCallback:="")
	{
		return this.GetPageBy("type", Type, "exact", Index, fnCallback)
	}
	class Page
	{
		Connected := False
		ID := 0
		Responses := []
		__New(wsurl, fnCallback:="")
		{
			this.fnCallback := fnCallback
			this.BoundKeepAlive := this.Call.Bind(this, "Browser.getVersion",, False)
			
			if IsObject(wsurl)
				wsurl := wsurl.webSocketDebuggerUrl
			
			wsurl := StrReplace(wsurl, "localhost", "127.0.0.1")
			this.ws := {"base": this.WebSocket, "_Event": this.Event, "Parent": this}
			this.ws.__New(wsurl)
			
			while !this.Connected
				Sleep, 50
		}
		Call(DomainAndMethod, Params:="", WaitForResponse:=True)
		{
			if !this.Connected
				ExitApp
			ID := this.ID += 1
			this.ws.Send(Chrome.Jxon_Dump({"id": ID
			, "params": Params ? Params : {}
			, "method": DomainAndMethod}))

			if !WaitForResponse
				return

			this.responses[ID] := False
			while !this.responses[ID]
				Sleep, 50

			response := this.responses.Delete(ID)
			if (response.error)
				throw Exception("Chrome indicated error in response",, Chrome.Jxon_Dump(response.error))

			return response.result
		}

		Evaluate(JS)
		{
			response := this.Call("Runtime.evaluate",
			( LTrim Join
			{
				"expression": JS,
				"objectGroup": "console",
				"includeCommandLineAPI": Chrome.Jxon_True(),
				"silent": Chrome.Jxon_False(),
				"returnByValue": Chrome.Jxon_False(),
				"userGesture": Chrome.Jxon_True(),
				"awaitPromise": Chrome.Jxon_False()
			}
			))
			
			if (response.exceptionDetails)
				throw Exception(response.result.description,, Chrome.Jxon_Dump(response.exceptionDetails))
			
			return response.result
		}

		WaitForLoad(DesiredState:="complete", Interval:=100)
		{
			while this.Evaluate("document.readyState").value != DesiredState
				Sleep, Interval
		}

		Event(EventName, Event)
		{
			if this.Parent
				this := this.Parent
			
			if (EventName == "Open")
			{
				this.Connected := True
				BoundKeepAlive := this.BoundKeepAlive
				SetTimer, %BoundKeepAlive%, 15000
			}
			else if (EventName == "Message")
			{
				data := Chrome.Jxon_Load(Event.data)
				
				fnCallback := this.fnCallback
				if (newData := %fnCallback%(data))
					data := newData
				
				if this.responses.HasKey(data.ID)
					this.responses[data.ID] := data
			}
			else if (EventName == "Close")
			{
				this.Disconnect()
			}
			else if (EventName == "Error")
			{
				throw Exception("Websocket Error!")
			}
		}

		Disconnect()
		{
			if !this.Connected
				return
			
			this.Connected := False
			this.ws.Delete("Parent")
			this.ws.Disconnect()
			
			BoundKeepAlive := this.BoundKeepAlive
			SetTimer, %BoundKeepAlive%, Delete
			this.Delete("BoundKeepAlive")
		}

		class WebSocket
		{
			__New(WS_URL)
			{
				static wb
				Gui, +hWndhOld
				Gui, New, +hWndhWnd
				this.hWnd := hWnd
				Gui, Add, ActiveX, vWB, Shell.Explorer
				Gui, %hOld%: Default

				WB.Navigate("about:<!DOCTYPE html><meta http-equiv='X-UA-Compatible'"
				. "content='IE=edge'><body></body>")
				while (WB.ReadyState < 4)
					sleep, 50
				this.document := WB.document
				
				this.document.parentWindow.ahk_savews := this._SaveWS.Bind(this)
				this.document.parentWindow.ahk_event := this._Event.Bind(this)
				this.document.parentWindow.ahk_ws_url := WS_URL
				
				Script := this.document.createElement("script")
				Script.text := "ws = new WebSocket(ahk_ws_url);`n"
				. "ws.onopen = function(event){ ahk_event('Open', event); };`n"
				. "ws.onclose = function(event){ ahk_event('Close', event); };`n"
				. "ws.onerror = function(event){ ahk_event('Error', event); };`n"
				. "ws.onmessage = function(event){ ahk_event('Message', event); };"
				this.document.body.appendChild(Script)
			}

			_Event(EventName, Event)
			{
				this["On" EventName](Event)
			}

			Send(Data)
			{
				this.document.parentWindow.ws.send(Data)
			}

			Close(Code:=1000, Reason:="")
			{
				this.document.parentWindow.ws.close(Code, Reason)
			}

			Disconnect()
			{
				if this.hWnd
				{
					this.Close()
					Gui, % this.hWnd ": Destroy"
					this.hWnd := False
				}
			}
		}
	}
	
	Jxon_Load(ByRef src, args*)
	{
		static q := Chr(34)
		
		key := "", is_key := false
		stack := [ tree := [] ]
		is_arr := { (tree): 1 }
		next := q . "{[01234567890-tfn"
		pos := 0
		while ( (ch := SubStr(src, ++pos, 1)) != "" )
		{
			if InStr(" `t`n`r", ch)
				continue
			if !InStr(next, ch, true)
			{
				ln := ObjLength(StrSplit(SubStr(src, 1, pos), "`n"))
				col := pos - InStr(src, "`n",, -(StrLen(src)-pos+1))
				
				msg := Format("{}: line {} col {} (char {})"
				,   (next == "")      ? ["Extra data", ch := SubStr(src, pos)][1]
				: (next == "'")     ? "Unterminated string starting at"
				: (next == "\")     ? "Invalid \escape"
				: (next == ":")     ? "Expecting ':' delimiter"
				: (next == q)       ? "Expecting object key enclosed in double quotes"
				: (next == q . "}") ? "Expecting object key enclosed in double quotes or object closing '}'"
				: (next == ",}")    ? "Expecting ',' delimiter or object closing '}'"
				: (next == ",]")    ? "Expecting ',' delimiter or array closing ']'"
				: [ "Expecting JSON value(string, number, [true, false, null], object or array)"
				, ch := SubStr(src, pos, (SubStr(src, pos)~="[\]\},\s]|$")-1) ][1]
				, ln, col, pos)
				
				throw Exception(msg, -1, ch)
			}
			
			is_array := is_arr[obj := stack[1]]
			
			if i := InStr("{[", ch)
			{
				val := (proto := args[i]) ? new proto : {}
				is_array? ObjPush(obj, val) : obj[key] := val
				ObjInsertAt(stack, 1, val)
				
				is_arr[val] := !(is_key := ch == "{")
				next := q . (is_key ? "}" : "{[]0123456789-tfn")
			}
			
			else if InStr("}]", ch)
			{
				ObjRemoveAt(stack, 1)
				next := stack[1]==tree ? "" : is_arr[stack[1]] ? ",]" : ",}"
			}
			
			else if InStr(",:", ch)
			{
				is_key := (!is_array && ch == ",")
				next := is_key ? q : q . "{[0123456789-tfn"
			}
			
			else
			{
				if (ch == q)
				{
					i := pos
					while i := InStr(src, q,, i+1)
					{
						val := StrReplace(SubStr(src, pos+1, i-pos-1), "\\", "\u005C")
						static end := A_AhkVersion<"2" ? 0 : -1
						if (SubStr(val, end) != "\")
							break
					}
					if !i ? (pos--, next := "'") : 0
						continue
					
					pos := i ; update pos
					
					val := StrReplace(val,    "\/",  "/")
					, val := StrReplace(val, "\" . q,    q)
					, val := StrReplace(val,    "\b", "`b")
					, val := StrReplace(val,    "\f", "`f")
					, val := StrReplace(val,    "\n", "`n")
					, val := StrReplace(val,    "\r", "`r")
					, val := StrReplace(val,    "\t", "`t")
					
					i := 0
					while i := InStr(val, "\",, i+1)
					{
						if (SubStr(val, i+1, 1) != "u") ? (pos -= StrLen(SubStr(val, i)), next := "\") : 0
							continue 2
						
						xxxx := Abs("0x" . SubStr(val, i+2, 4))
						if (A_IsUnicode || xxxx < 0x100)
							val := SubStr(val, 1, i-1) . Chr(xxxx) . SubStr(val, i+6)
					}
					
					if is_key
					{
						key := val, next := ":"
						continue
					}
				}
				
				else
				{
					val := SubStr(src, pos, i := RegExMatch(src, "[\]\},\s]|$",, pos)-pos)
					static number := "number", integer := "integer"
					if val is %number%
					{
						if val is %integer%
							val += 0
					}

					else if (val == "true" || val == "false")
						val := %value% + 0

					else if (val == "null")
						val := ""
					else if (pos--, next := "#")
						continue
					
					pos += i-1
				}
				
				is_array? ObjPush(obj, val) : obj[key] := val
				next := obj==tree ? "" : is_array ? ",]" : ",}"
			}
		}
		
		return tree[1]
	}
	
	Jxon_Dump(obj, indent:="", lvl:=1)
	{
		static q := Chr(34)
		
		if IsObject(obj)
		{
			static Type := Func("Type")
			if Type ? (Type.Call(obj) != "Object") : (ObjGetCapacity(obj) == "")
				throw Exception("Object type not supported.", -1, Format("<Object at 0x{:p}>", &obj))
			
			prefix := SubStr(A_ThisFunc, 1, InStr(A_ThisFunc, ".",, 0))
			fn_t := prefix "Jxon_True",  obj_t := this ? %fn_t%(this) : %fn_t%()
			fn_f := prefix "Jxon_False", obj_f := this ? %fn_f%(this) : %fn_f%()
			
			if (&obj == &obj_t)
				return "true"
			else if (&obj == &obj_f)
				return "false"
			
			is_array := 0
			for k in obj
				is_array := k == A_Index
			until !is_array
			
			static integer := "integer"
			if indent is %integer%
			{
				if (indent < 0)
					throw Exception("Indent parameter must be a postive integer.", -1, indent)
				spaces := indent, indent := ""
				Loop % spaces
					indent .= " "
			}
			indt := ""
			Loop, % indent ? lvl : 0
				indt .= indent
			
			this_fn := this ? Func(A_ThisFunc).Bind(this) : A_ThisFunc
			lvl += 1, out := "" ; Make #Warn happy
			for k, v in obj
			{
				if IsObject(k) || (k == "")
					throw Exception("Invalid object key.", -1, k ? Format("<Object at 0x{:p}>", &obj) : "<blank>")
				
				if !is_array
					out .= ( ObjGetCapacity([k], 1) ? %this_fn%(k) : q . k . q ) ;// key
				.  ( indent ? ": " : ":" ) ; token + padding
				out .= %this_fn%(v, indent, lvl) ; value
				.  ( indent ? ",`n" . indt : "," ) ; token + indent
			}
			
			if (out != "")
			{
				out := Trim(out, ",`n" . indent)
				if (indent != "")
					out := "`n" . indt . out . "`n" . SubStr(indt, StrLen(indent)+1)
			}
			
			return is_array ? "[" . out . "]" : "{" . out . "}"
		}
		
		; Number
		else if (ObjGetCapacity([obj], 1) == "")
			return obj
		
		; String (null -> not supported by AHK)
		if (obj != "")
		{
			obj := StrReplace(obj,  "\",    "\\")
			, obj := StrReplace(obj,  "/",    "\/")
			, obj := StrReplace(obj,    q, "\" . q)
			, obj := StrReplace(obj, "`b",    "\b")
			, obj := StrReplace(obj, "`f",    "\f")
			, obj := StrReplace(obj, "`n",    "\n")
			, obj := StrReplace(obj, "`r",    "\r")
			, obj := StrReplace(obj, "`t",    "\t")
			
			static needle := (A_AhkVersion<"2" ? "O)" : "") . "[^\x20-\x7e]"
			while RegExMatch(obj, needle, m)
				obj := StrReplace(obj, m[0], Format("\u{:04X}", Ord(m[0])))
		}
		
		return q . obj . q
	}
	
	Jxon_True()
	{
		static obj := {}
		return obj
	}
	
	Jxon_False()
	{
		static obj := {}
		return obj
	}
}

; --- Create a new Chrome instance ---
FileCreateDir, ChromeProfile
ChromeInst := new Chrome("ChromeProfile")

; --- Connect to the page ---
if !(PageInst := ChromeInst.GetPage())
{
	MsgBox, Error: Please "Run as administrator"!
	ChromeInst.Kill()
}
else
{
	; --- Navigate to the desired URL ---
	PageInst.Call("Page.navigate", {"url": "https://www.calloutsevolved.com"})
  PageInst.Evaluate("localStorage.setItem('ce','true')")
	PageInst.WaitForLoad()
  global location = PageInst.Evaluate("window.location.href").value
  while (location != "https://www.calloutsevolved.com/session") {
    Sleep, 500
    location := PageInst.Evaluate("window.location.href").value
  }
  Sleep, 500

  global shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  global shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  MsgBox, Setup global hotkeys in Settings > Desktop and toggle shortcuts via the %shortcutToggle% key.

  Hotkey, %shortcutToggle%, ToggleMode

  ToggleMode() {
    shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
    shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
    Suspend
    if (A_IsSuspended = 0)
    {
      ToolTip, Shortcuts Enabled
      Sleep, 500 
      ToolTip
    }
    else
    {
      ToolTip, Disabled
      Sleep, 500 
      ToolTip
    }
    return
  }
  return

	; --- Input Keystrokes ---
  CountdownBTNB:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataB').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataB').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataB').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  Return

  $NumpadDiv::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataB').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataB').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataB').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataB').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataB').click();")
              SetTimer, CountdownBTNB, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataB').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataB').click();")
          return
      }
    default:
      SendInput {NumpadDiv}
      return
  }
  return

  $7::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataB').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataB').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataB').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataB').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataB').click();")
              SetTimer, CountdownBTNB, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataB').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataB').click();")
          return
      }
    default:
      SendInput {7}
      return
  }
  return

  CountdownBTNC:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataC').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataC').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataC').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  Return

  $NumpadMult::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataC').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataC').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataC').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataC').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataC').click();")
              SetTimer, CountdownBTNC, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataC').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataC').click();")
          return
      }
    default:
      SendInput {NumpadMult}
      return
  }
  return

  $8::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataC').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataC').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataC').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataC').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataC').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataC').click();")
              SetTimer, CountdownBTNC, 0
              Send {%sendChat%}
              Send {%closeChat%}
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataC').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataC').click();")
          return
      }
    default:
      SendInput {8}
      return
  }
  return

  CountdownBTND:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataD').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataD').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataD').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  Return

  $NumpadSub::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataD').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataD').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataD').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataD').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataD').click();")
              SetTimer, CountdownBTNE, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataD').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataD').click();")
          return
      }
    default:
      SendInput {NumpadSub}
      return
  }
  return

  $O::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataD').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataD').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataD').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataD').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataD').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataD').click();")
              SetTimer, CountdownBTNE, 0
              Send {%sendChat%}
              Send {%closeChat%}
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataD').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataD').click();")
          return
      }
    default:
      SendInput {o}
      return
  }
  return

  CountdownBTNE:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataE').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataE').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataE').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  Return

  $Numpad7::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataE').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataE').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataE').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataE').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataE').click();")
              SetTimer, CountdownBTNE, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataE').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataE').click();")
          return
      }
    default:
      SendInput {Numpad7}
      return
  }
  return

  $Y::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataE').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataE').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataE').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataE').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataE').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataE').click();")
              SetTimer, CountdownBTNE, 0
              Send {%sendChat%}
              Send {%closeChat%}
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataE').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataE').click();")
          return
      }
    default:
      SendInput {y}
      return
  }
  return

  CountdownBTNF:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataF').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataF').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataF').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  Return

  $Numpad8::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataF').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataF').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataF').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataF').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataF').click();")
              SetTimer, CountdownBTNF, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataF').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataF').click();")
          return
      }
    default:
      SendInput {Numpad8}
      return
  }
  return

  $U::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataF').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataF').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataF').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataF').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataF').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataF').click();")
              SetTimer, CountdownBTNF, 0
              Send {%sendChat%}
              Send {%closeChat%}
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataF').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataF').click();")
          return
      }
    default:
      SendInput {u}
      return
  }
  return

  CountdownBTNG:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataG').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataG').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataG').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  Return

  $Numpad9::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataG').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataG').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataG').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataG').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataG').click();")
              SetTimer, CountdownBTNG, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataG').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataG').click();")
          return
      }
    default:
      SendInput {Numpad9}
      return
  }
  return

  $I::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataG').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataG').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataG').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataG').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataG').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataG').click();")
              SetTimer, CountdownBTNG, 0
              Send {%sendChat%}
              Send {%closeChat%}
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataG').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataG').click();")
          return
      }
    default:
      SendInput {i}
      return
  }
  return

  CountdownBTNH:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataH').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataH').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataH').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  Return

  $NumpadAdd::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataH').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataH').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataH').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataH').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataH').click();")
              SetTimer, CountdownBTNH, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataH').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataH').click();")
          return
      }
    default:
      SendInput {NumpadAdd}
      return
  }
  return

  $L::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataH').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataH').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataH').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataH').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataH').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataH').click();")
              SetTimer, CountdownBTNH, 0
              Send {%sendChat%}
              Send {%closeChat%}
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataH').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataH').click();")
          return
      }
    default:
      SendInput {l}
      return
  }
  return

  CountdownBTNI:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataI').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataI').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataI').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  Return

  $Numpad4::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataI').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataI').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataI').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataI').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataI').click();")
              SetTimer, CountdownBTNI, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataI').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataI').click();")
          return
      }
    default:
      SendInput {Numpad4}
      return
  }
  return

  $H::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataI').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataI').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataI').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataI').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataI').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataI').click();")
              SetTimer, CountdownBTNI, 0
              Send {%sendChat%}
              Send {%closeChat%}
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataI').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataI').click();")
          return
      }
    default:
      SendInput {h}
      return
  }
  return

  CountdownBTNJ:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataJ').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataJ').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataJ').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  Return
  $Numpad5::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataJ').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataJ').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataJ').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataJ').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataJ').click();")
              SetTimer, CountdownBTNJ, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataJ').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataJ').click();")
          return
      }
    default:
      SendInput {Numpad5}
      return
  }
  return

  $J::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataJ').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataJ').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataJ').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataJ').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataJ').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataJ').click();")
              SetTimer, CountdownBTNJ, 0
              Send {%sendChat%}
              Send {%closeChat%}
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataJ').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataJ').click();")
          return
      }
    default:
      SendInput {j}
      return
  }
  return

  CountdownBTNK:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataK').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataK').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataK').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  Return

  $Numpad6::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataK').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataK').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataK').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataK').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataK').click();")
              SetTimer, CountdownBTNK, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataK').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataK').click();")
          return
      }
    default:
      SendInput {Numpad6}
      return
  }
  return

  $K::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataK').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataK').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataK').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataK').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataK').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataK').click();")
              SetTimer, CountdownBTNK, 0
              Send {%sendChat%}
              Send {%closeChat%}
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataK').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataK').click();")
          return
      }
    default:
      SendInput {k}
      return
  }
  return

  CountdownBTNL:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataL').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataL').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataL').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  Return

  $Numpad1::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataL').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataL').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataL').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataL').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              duration = PageInst.Evaluate("document.querySelector('.btnDataL').getAttribute('data-dur`)").value * 1000
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataL').click();")
              SetTimer, CountdownBTNL, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataL').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataL').click();")
          return
      }
    default:
      SendInput {Numpad1}
      return
  }
  return

  $N::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataL').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataL').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataL').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataL').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              duration = PageInst.Evaluate("document.querySelector('.btnDataL').getAttribute('data-dur`)").value * 1000
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataL').click();")
              SetTimer, CountdownBTNL, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataL').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataL').click();")
          return
      }
    default:
      SendInput {n}
      return
  }
  return

  CountdownBTNM:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataM').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataM').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataM').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  Return

  $Numpad2::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataM').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataM').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataM').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataM').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataM').click();")
              SetTimer, CountdownBTNM, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataM').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataM').click();")
          return
      }
    default:
      SendInput {Numpad2}
      return
  }
  return

  $M::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataM').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataM').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataM').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataM').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataM').click();")
              SetTimer, CountdownBTNM, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataM').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataM').click();")
          return
      }
    default:
      SendInput {m}
      return
  }
  return

  CountdownBTNN:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataN').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataN').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataN').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  Return

  $Numpad3::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataN').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataN').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataN').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataN').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataN').click();")
              SetTimer, CountdownBTNN, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataN').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataN').click();")
          return
      }
    default:
      SendInput {Numpad3}
      return
  }
  return

  $,::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataN').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataN').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataN').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataN').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataN').click();")
              SetTimer, CountdownBTNN, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataN').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataN').click();")
          return
      }
    default:
      SendInput {,}
      return
  }
  return

  CountdownBTNO:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataO').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataO').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataO').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  Return

  $NumpadEnter::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataO').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataO').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataO').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataO').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataO').click();")
              SetTimer, CountdownBTNO, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataO').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataO').click();")
          return
      }
    default:
      SendInput {NumpadEnter}
      return
  }
  return

  $.::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataO').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataO').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataO').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataO').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataO').click();")
              SetTimer, CountdownBTNO, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataO').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataO').click();")
          return
      }
    default:
      SendInput {.}
      return
  }
  return

  CountdownBTNP:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataP').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataP').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataP').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  Return

  $Numpad0::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataP').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataP').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataP').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataP').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataP').click();")
              SetTimer, CountdownBTNP, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataP').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataP').click();")
          return
      }
    default:
      SendInput {Numpad0}
      return
  }
  return

  $SPACE::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataP').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataP').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataP').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataP').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataP').click();")
              SetTimer, CountdownBTNP, 0
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataP').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataP').click();")
          return
      }
    default:
      SendInput {SPACE}
      return
  }
  return

  CountdownBTNQ:
  Sleep 1000
  openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
  sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
  closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
  delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
  duration = % PageInst.Evaluate("document.querySelector('.btnDataQ').getAttribute('data-dur')").value
  loop %duration% {
    if ( PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
      Send {%openChat%}
      Sleep %delayChat% ; wait for game to open chat
      SendInput, % PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value
      Sleep %delayChat% ; wait for game to load message
      Send {%sendChat%}
      Send {%closeChat%}
      Sleep % 900 - %delayChat% * 2
    } else {
      Sleep 900
    }
  }
  return

  $NumpadDot::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "numberpad":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataQ').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataQ').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%} ; open chat
              Sleep %delayChat% ; wait for game to open chat
              SendInput, %txt% ; send message
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataQ').click();")
              Send {%sendChat%} ; send chat
              Send {%closeChat%} ; close chat
              duration = % PageInst.Evaluate("document.querySelector('.btnDataQ').getAttribute('data-dur')").value
              loop %duration% {
                if ( PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 9 || PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value = 3) {
                  Send {%openChat%}
                  Sleep %delayChat% ; wait for game to open chat
                  SendInput, % PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value
                  Sleep %delayChat% ; wait for game to load message
                  Send {%sendChat%}
                  Send {%closeChat%}
                  Sleep % 900 - %delayChat% * 2
                } else {
                  Sleep 900
                }
              }
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataQ').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataQ').click();")
          return
      }
    default:
      SendInput {NumpadDot}
      return
  }
  return

  $RALT::
  shortcutToggle = PageInst.Evaluate("document.querySelector('.shortcutToggle').innerHTML").value
  shortcutMode = PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value
  Switch (PageInst.Evaluate("document.querySelector('.shortcutMode').innerHTML").value) {
    Case "keyboard":
      Switch (PageInst.Evaluate("document.querySelector('.gameChat').innerHTML").value) {
        Case "yes":
          openChat = % PageInst.Evaluate("document.querySelector('.openChat').innerHTML").value
          sendChat = % PageInst.Evaluate("document.querySelector('.sendChat').innerHTML").value
          closeChat = % PageInst.Evaluate("document.querySelector('.closeChat').innerHTML").value
          delayChat = % PageInst.Evaluate("document.querySelector('.delayChat').innerHTML").value * 1
          txt = % PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value
          Switch (PageInst.Evaluate("document.querySelector('.btnDataQ').getAttribute('data-cdt')").value) {
            Case "alert":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              PageInst.Evaluate("document.querySelector('.btnDataQ').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            Case "timer":
              Send {%openChat%}
              Sleep %delayChat% ; wait for game to open chat
              SendInput, % PageInst.Evaluate("document.querySelector('.btnDataQ').innerHTML").value
              Sleep %delayChat% ; wait for game to load message
              SetTimer, CountdownBTNQ, 0
              PageInst.Evaluate("document.querySelector('.btnDataQ').click();")
              Send {%sendChat%}
              Send {%closeChat%}
              return
            default:
              PageInst.Evaluate("document.querySelector('.btnDataQ').click();")
              return
          }
        default:
          PageInst.Evaluate("document.querySelector('.btnDataQ').click();")
          return
      }
    default:
      SendInput {RALT}
      return
  }
  return
}