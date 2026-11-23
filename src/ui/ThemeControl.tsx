import { Select, useTheme } from './index';
const options = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];
export function ThemeControl() {
  const { theme, setTheme } = useTheme();
  return <Select aria-label="Interface theme" value={theme} options={options} width={112}
    onValueChange={value => {
      if (value === 'light' || value === 'dark' || value === 'system') setTheme(value);
    }} />;
}
