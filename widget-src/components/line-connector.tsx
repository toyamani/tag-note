import { LineDirectionType } from "../constants/line";

const { widget } = figma;
const { AutoLayout, Line, Ellipse } = widget;

type Props = {
  color: string;
  direction: LineDirectionType;
};
export function LineConnector({ color, direction }: Props) {
  return (
    <AutoLayout
      width={200}
      height={50}
      direction="horizontal"
      verticalAlignItems="center"
      horizontalAlignItems="center"
      y={50}
    >
      <Ellipse
        fill={color}
        width={15}
        height={15}
        y={15}
        positioning="absolute"
      />
      <Line
        length={200}
        strokeWidth={5}
        stroke={color}
        y={25}
        x={10}
        positioning="absolute"
      />
    </AutoLayout>
  );
}
