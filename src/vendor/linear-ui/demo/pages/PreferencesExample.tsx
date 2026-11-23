import { useState } from "react";
import { AArrowDown, AArrowUp, Type } from "lucide-react";
import {
  RadioGroup,
  Radio,
  SegmentedControl,
  Select,
  SettingRow,
  SettingsPage,
  SettingsSection,
  Switch,
  ThemePicker,
  useTheme,
} from "@/lib";

export function PreferencesExample() {
  const { theme, setTheme } = useTheme();

  const [language, setLanguage] = useState("en");
  const [firstDay, setFirstDay] = useState("system");
  const [fontSize, setFontSize] = useState<"small" | "default" | "large">(
    "default",
  );
  const [nameFormat, setNameFormat] = useState("full");

  const [pointerCursor, setPointerCursor] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [gridBackground, setGridBackground] = useState(false);

  return (
    <SettingsPage
      title="Preferences"
      description="Choose how Linear looks and behaves for you. These settings only apply to your account."
    >
      <SettingsSection title="General">
        <SettingRow
          title="Interface theme"
          description="Select or customize your interface color scheme."
        >
          <ThemePicker value={theme} onValueChange={setTheme} />
        </SettingRow>

        <SettingRow
          title="Display language"
          description="Change the language used in the user interface."
          htmlFor="pref-language"
        >
          <Select
            aria-label="Display language"
            width={180}
            value={language}
            onValueChange={setLanguage}
            options={[
              { value: "en", label: "English" },
              { value: "es", label: "Español" },
              { value: "fr", label: "Français" },
              { value: "de", label: "Deutsch" },
              { value: "ja", label: "日本語" },
            ]}
          />
        </SettingRow>

        <SettingRow
          title="First day of the week"
          description="This will change how all calendars in the app look."
        >
          <Select
            aria-label="First day of the week"
            width={180}
            value={firstDay}
            onValueChange={setFirstDay}
            options={[
              { value: "system", label: "System default" },
              { value: "monday", label: "Monday" },
              { value: "saturday", label: "Saturday" },
              { value: "sunday", label: "Sunday" },
            ]}
          />
        </SettingRow>
      </SettingsSection>

      <SettingsSection title="Interface & editor">
        <SettingRow
          title="Font size"
          description="Adjust the size of text throughout the app."
        >
          <SegmentedControl
            aria-label="Font size"
            value={fontSize}
            onValueChange={setFontSize}
            items={[
              { value: "small", label: "Small", icon: <AArrowDown /> },
              { value: "default", label: "Default", icon: <Type /> },
              { value: "large", label: "Large", icon: <AArrowUp /> },
            ]}
          />
        </SettingRow>

        <SettingRow
          title="Use pointer cursor"
          description="Show a pointer cursor when hovering over interactive elements."
        >
          <Switch
            checked={pointerCursor}
            onChange={(e) => setPointerCursor(e.target.checked)}
          />
        </SettingRow>

        <SettingRow
          title="Show grid background"
          description="Display a subtle dot grid behind boards and canvases."
        >
          <Switch
            checked={gridBackground}
            onChange={(e) => setGridBackground(e.target.checked)}
          />
        </SettingRow>
      </SettingsSection>

      <SettingsSection title="Behavior">
        <SettingRow
          title="Reduce motion"
          description="Minimize non-essential animations and transitions."
        >
          <Switch
            checked={reduceMotion}
            onChange={(e) => setReduceMotion(e.target.checked)}
          />
        </SettingRow>

        <SettingRow
          title="Play sound effects"
          description="Play sounds when completing actions like marking an issue done."
        >
          <Switch
            checked={soundEffects}
            onChange={(e) => setSoundEffects(e.target.checked)}
          />
        </SettingRow>

        <SettingRow
          title="Display name format"
          description="Choose how other members' names appear across the app."
          layout="stacked"
        >
          <RadioGroup value={nameFormat} onValueChange={setNameFormat}>
            <Radio
              value="full"
              label="Full names"
              description="Show first and last name, e.g. Ada Lovelace."
            />
            <Radio
              value="username"
              label="Usernames"
              description="Show the shorter @handle, e.g. @ada."
            />
          </RadioGroup>
        </SettingRow>
      </SettingsSection>
    </SettingsPage>
  );
}
