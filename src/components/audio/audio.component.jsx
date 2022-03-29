import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { setOptionsData } from "../../redux/options/options.actions";
import { getOptionsData } from "../../redux/options/options.selectors";
import { Form, Dropdown } from "react-bootstrap";

export const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState([]);
  const synth = useRef();

  const updateVoices = () => {
    setVoices(synth.current.getVoices());
  };

  const speak = (options, text, rate) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = options.tsv;
    utterance.voice = speechSynthesis
      .getVoices()
      .filter((voice) => voice.name === options.tsl)[0];
    utterance.pitch = options.tsp;
    utterance.rate = rate;
    synth.current.speak(utterance);
  };

  useEffect(() => {
    if (typeof window !== "object" || !window.speechSynthesis) return;
    synth.current = window.speechSynthesis;
    synth.current.onvoiceschanged = updateVoices;
    setTimeout(() => {
      updateVoices();
    }, 1000);

    return () => {
      synth.current.onvoiceschanged = null;
    };
  }, []);

  return [voices, speak];
};

const Audio = (props) => {
  const [voices] = useSpeechSynthesis();
  const dialects = [
    "Afrikaans (South Africa)af-ZA",
    "Albanian (Albania)sq-AL",
    "Amharic (Ethiopia)am-ET",
    "Arabic (Algeria)ar-DZ",
    "Arabic (Bahrain)ar-BH",
    "Arabic (Egypt)ar-EG",
    "Arabic (Iraq)ar-IQ",
    "Arabic (Israel)ar-IL",
    "Arabic (Jordan)ar-JO",
    "Arabic (Kuwait)ar-KW",
    "Arabic (Lebanon)ar-LB",
    "Arabic (Morocco)ar-MA",
    "Arabic (Oman)ar-OM",
    "Arabic (Qatar)ar-QA",
    "Arabic (Saudi Arabia)ar-SA",
    "Arabic (State of Palestine)ar-PS",
    "Arabic (Tunisia)ar-TN",
    "Arabic (United Arab Emirates)ar-AE",
    "Arabic (Yemen)ar-YE",
    "Armenian (Armenia)hy-AM",
    "Azerbaijani (Azerbaijan)az-AZ",
    "Basque (Spain)eu-ES",
    "Bengali (Bangladesh)bn-BD",
    "Bengali (India)bn-IN",
    "Bosnian (Bosnia and Herzegovina)bs-BA",
    "Bulgarian (Bulgaria)bg-BG",
    "Burmese (Myanmar)my-MM",
    "Catalan (Spain)ca-ES",
    "Chinese, Mandarin (Traditional, Taiwan)zh-TW",
    "Croatian (Croatia)hr-HR",
    "Czech (Czech Republic)cs-CZ",
    "Danish (Denmark)da-DK",
    "Dutch (Belgium)nl-BE",
    "Dutch (Netherlands)nl-NL",
    "English (Australia)en-AU",
    "English (Canada)en-CA",
    "English (Ghana)en-GH",
    "English (Hong Kong)en-HK",
    "English (India)en-IN",
    "English (Ireland)en-IE",
    "English (Kenya)en-KE",
    "English (New Zealand)en-NZ",
    "English (Nigeria)en-NG",
    "English (Pakistan)en-PK",
    "English (Philippines)en-PH",
    "English (Singapore)en-SG",
    "English (South Africa)en-ZA",
    "English (Tanzania)en-TZ",
    "English (United Kingdom)en-GB",
    "English (United States)en-US",
    "Estonian (Estonia)et-EE",
    "Filipino (Philippines)fil-PH",
    "Finnish (Finland)fi-FI",
    "French (Belgium)fr-BE",
    "French (Canada)fr-CA",
    "French (France)fr-FR",
    "French (Switzerland)fr-CH",
    "Galician (Spain)gl-ES",
    "Georgian (Georgia)ka-GE",
    "German (Austria)de-AT",
    "German (Germany)de-DE",
    "German (Switzerland)de-CH",
    "Greek (Greece)el-GR",
    "Gujarati (India)gu-IN",
    "Hebrew (Israel)iw-IL",
    "Hindi (India)hi-IN",
    "Hungarian (Hungary)hu-HU",
    "Icelandic (Iceland)is-IS",
    "Indonesian (Indonesia)id-ID",
    "Italian (Italy)it-IT",
    "Italian (Switzerland)it-CH",
    "Japanese (Japan)ja-JP",
    "Javanese (Indonesia)jv-ID",
    "Kannada (India)kn-IN",
    "Khmer (Cambodia)km-KH",
    "Korean (South Korea)ko-KR",
    "Lao (Laos)lo-LA",
    "Latvian (Latvia)lv-LV",
    "Lithuanian (Lithuania)lt-LT",
    "Macedonian (North Macedonia)mk-MK",
    "Malay (Malaysia)ms-MY",
    "Malayalam (India)ml-IN",
    "Marathi (India)mr-IN",
    "Mongolian (Mongolia)mn-MN",
    "Nepali (Nepal)ne-NP",
    "Norwegian Bokmål (Norway)no-NO",
    "Persian (Iran)fa-IR",
    "Polish (Poland)pl-PL",
    "Portuguese (Brazil)pt-BR",
    "Portuguese (Portugal)pt-PT",
    "Romanian (Romania)ro-RO",
    "Russian (Russia)ru-RU",
    "Serbian (Serbia)sr-RS",
    "Sinhala (Sri Lanka)si-LK",
    "Slovak (Slovakia)sk-SK",
    "Slovenian (Slovenia)sl-SI",
    "Spanish (Argentina)es-AR",
    "Spanish (Bolivia)es-BO",
    "Spanish (Chile)es-CL",
    "Spanish (Colombia)es-CO",
    "Spanish (Costa Rica)es-CR",
    "Spanish (Dominican Republic)es-DO",
    "Spanish (Ecuador)es-EC",
    "Spanish (El Salvador)es-SV",
    "Spanish (Guatemala)es-GT",
    "Spanish (Honduras)es-HN",
    "Spanish (Mexico)es-MX",
    "Spanish (Nicaragua)es-NI",
    "Spanish (Panama)es-PA",
    "Spanish (Paraguay)es-PY",
    "Spanish (Peru)es-PE",
    "Spanish (Puerto Rico)es-PR",
    "Spanish (Spain)es-ES",
    "Spanish (United States)es-US",
    "Spanish (Uruguay)es-UY",
    "Spanish (Venezuela)es-VE",
    "Sundanese (Indonesia)su-ID",
    "Swahili (Kenya)sw-KE",
    "Swahili (Tanzania)sw-TZ",
    "Swedish (Sweden)sv-SE",
    "Tamil (India)ta-IN",
    "Tamil (Malaysia)ta-MY",
    "Tamil (Singapore)ta-SG",
    "Tamil (Sri Lanka)ta-LK",
    "Telugu (India)te-IN",
    "Thai (Thailand)th-TH",
    "Turkish (Turkey)tr-TR",
    "Ukrainian (Ukraine)uk-UA",
    "Urdu (India)ur-IN",
    "Urdu (Pakistan)ur-PK",
    "Uzbek (Uzbekistan)uz-UZ",
    "Vietnamese (Vietnam)vi-VN",
    "Zulu (South Africa)zu-ZA"
  ];
  // To set speech to text language
  const setSTL = (val) => {
    var stlData = JSON.parse(JSON.stringify(props.optionsData));
    stlData.stl = val;
    props.setOptionsData(stlData);
  };
  // To set text to speech language
  const setTSL = (val) => {
    var tslData = JSON.parse(JSON.stringify(props.optionsData));
    tslData.tsl = val;
    props.setOptionsData(tslData);
  };
  // To set text to speech Grid
  const setTSC = (val) => {
    var tscData = JSON.parse(JSON.stringify(props.optionsData));
    tscData.tsc = val;
    props.setOptionsData(tscData);
  };
  // To set text to speech Grid
  const setTSG = (val) => {
    var tsgData = JSON.parse(JSON.stringify(props.optionsData));
    tsgData.tsg = val;
    props.setOptionsData(tsgData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "tsv") {
      var tsvData = JSON.parse(JSON.stringify(props.optionsData));
      var val = value / 100;
      tsvData.tsv = val;
      props.setOptionsData(tsvData);
    } else if (name === "tsp") {
      var tspData = JSON.parse(JSON.stringify(props.optionsData));
      tspData.tsp = value;
      props.setOptionsData(tspData);
    } else if (name === "tsr") {
      var tsrData = JSON.parse(JSON.stringify(props.optionsData));
      tsrData.tsr = value;
      props.setOptionsData(tsrData);
    }
  };

  return (
    <>
      <div style={{ width: "inherit" }}>
        <span>Speech to Text Language:</span>
        <Dropdown className="mt-1">
          <Dropdown.Toggle variant="accent" id="stlSelect">
            <p>
              {props.optionsData.stl.charAt(0).toUpperCase() +
                props.optionsData.stl
                  .slice(1)
                  .substring(0, props.optionsData.stl.slice(1).length - 5)}
            </p>
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            {dialects.map((v, index) => (
              <Dropdown.Item key={index} onClick={() => setSTL(`${v}`)}>
                {v.substring(0, v.length - 5)}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="mt-3">
        <span>Text to Speech Language:</span>
        <Dropdown className="mt-1">
          <Dropdown.Toggle variant="accent" id="tslSelect" block>
            <p>
              {props.optionsData.tsl.charAt(0).toUpperCase() +
                props.optionsData.tsl.slice(1)}
            </p>
          </Dropdown.Toggle>
          <Dropdown.Menu variant={props.optionsData.mod}>
            <Dropdown.Item onClick={() => setTSL("Disabled")}>
              Disabled
            </Dropdown.Item>
            {voices.map((v, index) => (
              <Dropdown.Item
                style={{ maxWidth: "16rem", overflow: "hidden" }}
                key={index}
                onClick={() => setTSL(`${v.name}`)}
              >
                {v.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div
        className="mt-3"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "1rem"
        }}
      >
        <div>
          <span>TTS Callouts:</span>
          <Dropdown className="mt-1">
            <Dropdown.Toggle
              variant="accent"
              id="tsgSelect"
              block
              style={{ width: "100%" }}
            >
              {props.optionsData.tsg ? "Enabled" : "Disabled"}
            </Dropdown.Toggle>
            <Dropdown.Menu variant={props.optionsData.mod}>
              <Dropdown.Item onClick={() => setTSG(true)}>
                Enabled
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setTSG(false)}>
                Disabled
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <span>TTS Chat:</span>
          <Dropdown className="mt-1">
            <Dropdown.Toggle
              variant="accent"
              id="tscSelect"
              block
              style={{ width: "100%" }}
            >
              {props.optionsData.tsc ? "Enabled" : "Disabled"}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item onClick={() => setTSC(true)}>
                Enabled
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setTSC(false)}>
                Disabled
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {props.optionsData.ppi ? (
        <div
          className="mt-3 mb-1"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "1rem"
          }}
        >
          <div>
            <Form.Group controlId="inputTSV">
              <Form.Label className="mb-1">Volume:</Form.Label>
              <Form.Control
                type="number"
                name="tsv"
                value={props.optionsData.tsv * 100}
                onChange={handleChange}
                placeholder="100"
                min={0}
                max={100}
                step={10}
                disabled
              />
            </Form.Group>
          </div>
          <div>
            <Form.Group controlId="inputTSR">
              <Form.Label className="mb-1">Pitch:</Form.Label>
              <Form.Control
                type="number"
                name="tsr"
                value={props.optionsData.tsr}
                onChange={handleChange}
                placeholder="1"
                min={0}
                max={2}
                step={0.1}
                disabled
              />
            </Form.Group>
          </div>
          <div>
            <Form.Group controlId="inputTSP">
              <Form.Label className="mb-1">Rate:</Form.Label>
              <Form.Control
                type="number"
                name="tsp"
                value={props.optionsData.tsp}
                onChange={handleChange}
                placeholder="10"
                min={0.1}
                max={10}
                step={0.1}
                disabled
              />
            </Form.Group>
          </div>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state)
});

const mapDispatchToProps = (dispatch) => ({
  setOptionsData: (data) => dispatch(setOptionsData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Audio);
