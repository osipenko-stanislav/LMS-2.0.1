import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../ui';
const meta = {
  title: 'Linear UI/Controls/Button', component: Button,
  args: { children: 'Button', variant: 'primary', size: 'md', disabled: false },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'subtle', 'danger', 'link'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  parameters: { layout: 'centered' }, tags: ['autodocs'],
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Disabled: Story = { args: { disabled: true } };
