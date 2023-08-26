import { DatePicker as AntdDatePicker } from 'antd';
import type { DateTime } from 'luxon';
import luxonGenerateConfig from 'rc-picker/lib/generate/luxon';

const DatePicker = AntdDatePicker.generatePicker<DateTime>(luxonGenerateConfig);

export type RangeValue = Parameters<
  NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>['onChange']>
>[0];
export default DatePicker;
