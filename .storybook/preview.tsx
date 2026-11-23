import { useEffect } from 'react';
import type { Preview } from '@storybook/react-vite';
import { TooltipProvider, useTheme } from '../src/ui';
import '../src/ui/styles.css';
import './gallery.css';
import { MotionProvider, motionPresets } from '../src/ui/motion';
const preview: Preview = {
  globalTypes: {
    physics: { description: "Shared motion preset", toolbar: { icon: "lightning", items: Object.keys(motionPresets), dynamicTitle: true } },
    theme: { description: 'Interface theme', toolbar: { icon: 'circlehollow', items: ['light', 'dark', 'system'], dynamicTitle: true } },
  },
  initialGlobals: { theme: 'light', physics: 'balanced' },
  parameters: { layout: 'fullscreen', controls: { expanded: true } },
  decorators: [(Story, context) => {
    const { setTheme } = useTheme();
    useEffect(() => { setTheme(context.globals.theme); }, [context.globals.theme, setTheme]);
    return <MotionProvider physics={motionPresets[context.globals.physics as keyof typeof motionPresets] ?? motionPresets.balanced}><TooltipProvider><Story /></TooltipProvider></MotionProvider>;
  }],
};
export default preview;
