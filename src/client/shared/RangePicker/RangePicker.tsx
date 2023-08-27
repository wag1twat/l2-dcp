import { DatePicker as AntdDatePicker } from 'antd';
import { DateTime } from 'luxon';
import luxonGenerateConfig from 'rc-picker/lib/generate/luxon';
import { RangePickerCss } from './RangePickerCss';

const CoreDatePicker =
  AntdDatePicker.generatePicker<DateTime>(luxonGenerateConfig);

export type RangeValue = Parameters<
  NonNullable<
    React.ComponentProps<typeof CoreDatePicker.RangePicker>['onChange']
  >
>[0];

interface DatePickerProps {
  value: [string, string];
  onChange(value: [string, string]): void;
}

function RangePicker({ value, onChange }: DatePickerProps) {
  const _value = [DateTime.fromISO(value[0]), DateTime.fromISO(value[1])] as [
    DateTime | null,
    DateTime | null,
  ];

  const _onChange = (nextValue: RangeValue) => {
    onChange([
      nextValue?.[0]?.toISODate() ?? value[0],
      nextValue?.[1]?.toISODate() ?? value[1],
    ]);
  };

  return (
    <RangePickerCss>
      <CoreDatePicker.RangePicker value={_value} onChange={_onChange} />
    </RangePickerCss>
  );
}

export { RangePicker };
