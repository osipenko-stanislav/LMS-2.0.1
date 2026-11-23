# LMS 2.0.1 — Design Principles

## Визуальная основа

Основная дизайн-система — [Linear UI](https://github.com/guillermobeltramino/linear-ui).

Используй существующие компоненты Linear UI как техническую основу. Визуальная система опирается на Linear/DesignKit и Woblo с сохранением согласованных проектных токенов и состояний.

Приоритеты источников: данные проекта определяют содержание; Figma и референсы — композицию в рамках задачи, Woday — композиционный ориентир; Linear/DesignKit и Woblo — визуальную систему. Моковое содержание макетов не заменяет данные проекта.

Не придумывай значения токенов, если подходящие значения уже существуют в библиотеке.

**Иконография:** используй иконки Linear UI и [Lucide](https://github.com/lucide-icons/lucide?utm_source=chatgpt.com). Для React используй `lucide-react`. Подбирай иконки из [официального каталога Lucide](https://lucide.dev/icons/?utm_source=chatgpt.com), соблюдая согласованность размеров, толщины линий, цветов, состояний и визуального стиля внутри одной композиции. Не дублируй SVG вручную, если подходящая иконка уже есть в библиотеке.

## Принципы

**Visual consistency**

- Одна система цветов, типографики, отступов, радиусов и состояний.
- Общие компоненты выглядят и ведут себя одинаково во всех контекстах.
- Базовый размер контролов — MD. Другой размер используй только при явной необходимости конкретного сценария.
- Light и Dark используют согласованные семантические токены.

**Hierarchy**

- Иерархия строится типографикой, расположением, плотностью и контрастом.
- Поверхности разделяют рабочие области; границы подчиняются правилам раздела ниже.
- Не оборачивай каждую секцию в отдельную карточку.

### Минимум границ и разделителей

Визуальная иерархия строится через отступы, типографику, контраст и поверхности, а не через обводки и разделители.

- Не добавлять декоративные границы и разделители по умолчанию.
- Сохранять функциональные границы Linear/DesignKit и согласованные Gradient Borders.
- Группировать контент пространством, а не дополнительными контейнерами.
- Для выделения элементов и их состояний предпочитать изменение фона.
- Сохранять чёткую визуальную иерархию, различимость интерактивных элементов и видимость клавиатурного фокуса.

Новые границы добавлять при подтверждённой проблеме восприятия структуры или состояния либо по явному согласованию; это не основание удалять существующие функциональные границы и согласованные эффекты.

**Composition**

- Контекст может менять плотность, ширину и количество отображаемых данных.
- Различия задаются вариантами и параметрами композиции, а не копированием компонентов.

### Generative UI — единая продуктовая система

Generative UI переиспользует компоненты, токены, контракты, данные и действия основного интерфейса LMS 2.0.1, сохраняя их продуктовую семантику и состояния.

Gen UI отличается не визуальной системой, а контекстом использования и способом композиции.

- Использовать общие компоненты вместо отдельных Gen UI-аналогов; экранную композицию повторять необязательно.
- Общий renderer использовать только для поддерживаемых типов блоков.
- Адаптировать представления к ширине чата, не уменьшая механически полноценные экраны.
- Сохранять доступные действия, навигацию и интерактивность.
- Допускать специфичные для AI состояния: генерация, выполнение инструментов, подтверждение, прогресс и ошибки.
- [Beautiful UI](https://www.beautifului.dev/) использовать как источник AI-native UX-паттернов, интерактивных состояний и композиции компонентов. Адаптировать паттерны к существующим компонентам, токенам и архитектуре LMS, без автоматического переноса визуальной стилистики и зависимостей и без создания отдельного UI-kit.
- Новые компоненты добавлять только там, где существующие не решают задачу.

**Принцип: Gen UI — это продуктовый UI в контексте диалога, а не отдельный интерфейс внутри интерфейса.**

### Принципы визуальной композиции

- Связанные элементы располагай рядом, независимые группы разделяй заметным отступом, а ритм отступов сохраняй последовательным.
- Выстраивай заголовки, содержимое, иконки и метаданные по общим горизонтальным и вертикальным осям. Главное выделяй контрастом и насыщенностью, вторичную информацию делай спокойнее.
- Разделяй крупные рабочие области поверхностями, а внутри них предпочитай свободную композицию. Не превращай каждый элемент списка в карточку; новые границы и разделители подчиняй разделу «Минимум границ и разделителей», тени добавляй по функциональной необходимости.
- Поддерживай контролируемую плотность: компактно размещай повторяющиеся элементы, увеличивай пространство между смысловыми группами и сохраняй максимум полезной информации без потери читаемости.
- Используй цвет, иконки, акценты и декоративные эффекты только с понятной ролью. Если элемент можно убрать без потери структуры, состояния или действия, убери его.
- При проверке экрана последовательно оцени структуру без декоративных границ, связи между элементами, считываемость главного, согласованность осей и отступов, а также количество полезной информации в доступной области.

**Interaction**

- Все интерактивные элементы имеют понятные состояния.
- Сохраняй семантику, клавиатурное поведение и управление фокусом компонентов Radix, а также доступную обратную связь.
- Анимация помогает понять изменение состояния, а не украшает интерфейс без причины.
- Учитывай `prefers-reduced-motion`: отключай или упрощай необязательное движение, сохраняя обратную связь.
- Не допускай layout shift, визуальных скачков и задержек основных действий из-за эффектов или переходов.

**Responsive**

- Композиции адаптируются к доступной ширине контейнера.
- Проверяй узкие экраны и ограниченные области Gen UI.
- Не допускай горизонтального переполнения страницы.

## Визуальная проверка

- Проверяй реальные состояния компонентов в браузере.
- Для существенных изменений сравнивай Light/Dark и desktop/mobile.
- Проверяй типографику, плотность, выравнивание, контраст и поведение.
- Storybook используй для изолированной проверки компонентов и композиций.
- Не объявляй визуальное соответствие подтверждённым без проверки реального рендера.

## Критерий качества

Интерфейс должен выглядеть как цельный продукт, а не набор компонентов из разных библиотек.

Приоритет — аккуратная геометрия, выразительная иерархия, функциональная плотность и последовательное поведение.


## Layout rules

- `reading` uses max-width 768px; main text is limited to 70ch.
- `workspace` uses max-width 960px.
- `data` uses the full available Workspace width.
- AI Navigator and chat share one column for greeting, suggestions, messages, Generative UI and composer: width 100% of the available container, max-width 768px, without a separate width mode.
- Desktop spacing: reading 32px; workspace and data 24px. Medium reading spacing is 24px.
- Mobile outer horizontal fields are 8px for all modes; reading text receives another 8px inner inset. Component internal padding is preserved.
- Reading top spacing is 32px above 1023px and 24px at or below it. Workspace and data use 24px.
- Content is centered within Workspace. H1, toolbar and content share one axis; an additional rail sits beside the main column and is excluded from its max-width. Sidebar collapse recalculates available width.
- Chat history scrolls independently; the composer stays at the bottom of Navigator, not fixed to the viewport. Generative UI never widens its parent column; wide tables scroll inside their widget.

## Shell reference rules

- Use the real Linear screenshots in `assets/` as visual evidence for Shell composition, hierarchy, density, surfaces and states. Use the integrated Linear UI source as the component and technical foundation.
- When a measured reference and an unverified visual approximation disagree, prefer the measured reference. Do not choose token values by eye when the project reference provides a measurable value.
- Keep Sidebar as an independent navigation layer on desktop with expanded and collapsed states. On mobile it opens through Dialog/Sheet, closes on Escape, backdrop interaction and section selection, and does not leave a permanent rail.
- Use one `WorkspaceFrame` for `reading`, `workspace` and `data`; do not add page-level width or centering systems.
- Contextual rails sit beside the main column, do not count toward its max-width, appear only when they contain content, and move to an overlay or accessible panel when space is insufficient.
- Compare real Linear and LMS renders for key Shell states before claiming visual correspondence. Check expanded/collapsed Sidebar, mobile navigation, Light/Dark, long content and empty/rail states.
