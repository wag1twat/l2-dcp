import { Table, Tbody, Th, Thead, Tr, Td } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import React from 'react';
import { DayEntity } from 'src/server/modules/days/entities/day.entity';
import { getAllDatesInMonth, normalizeDate } from './model';

interface DaysProps {
  days: DayEntity[];
}

export const Days = ({ days }: React.PropsWithChildren<DaysProps>) => {
  console.log(days);

  const [year] = React.useState(() => DateTime.now().get('year'));
  const [month] = React.useState(() => DateTime.now().get('month'));
  const daysInMonth = getAllDatesInMonth(year, month);

  return (
    <Table
      variant="simple"
      size="sm"
      __css={{
        'th, td': {
          color: 'whiteAlpha.900',
        },
      }}
    >
      <Thead background="brand">
        <Tr background="inherit">
          <Th position="sticky" top={0} background="inherit" p={2}>
            Дата
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {daysInMonth.map((day) => (
          <Tr key={day}>
            <Td>{normalizeDate(day)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
