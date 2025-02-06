import { action, Story, StoryDefault } from "@ladle/react";

export default {
  title: "Level / Sub level",
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
