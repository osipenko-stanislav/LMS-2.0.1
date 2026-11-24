import { PageIntro } from '../../compositions/shell/SharedViews';
import { SettingsSection } from '../../ui';
import { ThemeControl } from '../../ui/ThemeControl';
export function SettingsPage(){return <><PageIntro description="Настройте оформление рабочего пространства."/><SettingsSection title="Оформление"><div className="flex flex-wrap items-center justify-between gap-4 py-4"><div><p className="text-sm font-medium">Тема интерфейса</p><p className="mt-1 text-xs text-text-secondary">Системная, светлая или темная. Выбор сохраняется.</p></div><ThemeControl/></div></SettingsSection></>;
}
