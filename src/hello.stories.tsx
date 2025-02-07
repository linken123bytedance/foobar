import { action, Story, StoryDefault } from "@ladle/react";

export default {
  // title: "Level / Sub level / Foobar",
  meta: {
    key: "value",
  },
  decorators: [
    (Component, ctx) => {
      console.log(ctx);
      return (
        <div style={{ margin: "3em" }}>
          <Component />
        </div>
      );
    },
  ],
} as StoryDefault;

export const Button: Story = () => (
  <button onClick={action("onClick")}>My Button</button>
);
Button.storyName = "Renamed Button";

export const World = () => <p>Hey!</p>;

export const HeaderOne: Story = () => <h1>Header</h1>;

export const Simple: Story = () => (
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
);

const Card: Story<{
  label: string;
}> = ({ label }) => <p className="text-neutral-300">Label: {label}</p>;

export const CardHello = Card.bind({});
CardHello.args = {
  label: "Hello",
};

export const CardWorld = Card.bind({});
CardWorld.args = {
  label: "World",
};

export const Controls: Story<{
  label: string;
  disabled: boolean;
  count: number;
  range: number;
  colors: string[];
  variant: string;
  size: string;
  airports: string[];
}> = ({ count, range, disabled, label, colors, variant, size, airports }) => (
  <>
    <p>Count: {count}</p>
    <p>Range: {range}</p>
    <p>Disabled: {disabled ? "yes" : "no"}</p>
    <p>Label: {label}</p>
    <p>Colors: {colors.join(",")}</p>
    <p>Variant: {variant}</p>
    <p>Size: {size}</p>
    <p>Airports: {airports.join(",")}</p>
  </>
);
