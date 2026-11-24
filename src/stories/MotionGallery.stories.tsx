import type { Meta, StoryObj } from '@storybook/react-vite';
import { MotionGallery } from './motion/MotionGallery';
import { motionPresets } from '../ui/motion';
import { MorphingDropdownDemo, ExpandableCardDemo, ElasticSelectionDemo, ExpressiveFrame } from './motion/Expressive';
const meta = {
  title: 'Linear UI/Motion Gallery', component: MotionGallery,
  args: { ...motionPresets.balanced },
  argTypes: {
    pattern: { table: { disable: true } },
    stiffness: { control: { type: 'range', min: 150, max: 800, step: 10 } },
    damping: { control: { type: 'range', min: 20, max: 60, step: 1 } },
    mass: { control: { type: 'range', min: 0.5, max: 1.5, step: 0.1 } },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MotionGallery>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overlay: Story = { args: { pattern: 'overlay' } };
export const Selection: Story = { args: { pattern: 'selection' } };
export const ExpandCollapse: Story = { name: 'Expand / Collapse', args: { pattern: 'expand' } };
export const LayoutTransition: Story = { name: 'Layout Transition', args: { pattern: 'layout' } };
export const Feedback: Story = { args: { pattern: 'feedback' } };
export const MorphingDropdown: Story = { name: 'Morphing Dropdown', args: {pattern:'overlay'}, render: args => <ExpressiveFrame title="Morphing Dropdown" description="The trigger surface grows into its menu. Width, height and position stay continuous while rows arrive behind the surface." physics={args}><MorphingDropdownDemo /></ExpressiveFrame> };
export const ExpandableCard: Story = { name: 'Expandable Card', args: {pattern:'layout'}, render: args => <ExpressiveFrame title="Expandable Card" description="A compact stay becomes a panel. Its image, title, price and surface remain the same visual objects throughout the transformation." physics={args}><ExpandableCardDemo /></ExpressiveFrame> };
export const ElasticSelection: Story = { name: 'Elastic Selection', args: {pattern:'selection'}, render: args => <ExpressiveFrame title="Elastic Selection" description="Two independently driven edges stretch the indicator toward the selection, then recover its original shape." physics={args}><ElasticSelectionDemo /></ExpressiveFrame> };
export const Thinking: Story = { args: { pattern: 'thinking' } };
export const StreamingReply: Story = { name: 'Streaming Reply', args: { pattern: 'streaming' } };
export const TaskRows: Story = { name: 'Task Rows', args: { pattern: 'taskRows' } };
export const ApprovalCard: Story = { name: 'Approval Card', args: { pattern: 'approval' } };
export const AnimatedComposer: Story = { name: 'Animated Composer', args: { pattern: 'animatedComposer' } };
export const JellySlider: Story = { name: 'Jelly Slider', args: { pattern: 'jellySlider' } };
export const AnimatedToast: Story = { name: 'Animated Toast', args: { pattern: 'toast' } };
export const AnimatedListReorder: Story = { name: 'Animated List Reorder', args: { pattern: 'staggerList' } };
export const ContextCards: Story = { name: 'Context Cards', args: { pattern: 'contextCards' } };
