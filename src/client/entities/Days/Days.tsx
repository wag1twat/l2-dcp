import { Table, Tbody, Th, Thead, Tr, Td } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import React from 'react';
import { DayEntity } from 'src/server/modules/days/entities/day.entity';
import { DateManager } from 'src/shared/utils/date-manager';

interface DaysProps {
  days: DayEntity[];
}

export const Days = ({ days }: React.PropsWithChildren<DaysProps>) => {
  const [year] = React.useState(() => DateTime.now().get('year'));
  const [month] = React.useState(() => DateTime.now().get('month'));

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
        {days.map((day) => (
          <Tr key={day.id}>
            <Td>{DateManager.CLIENT_DATE(day.date)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
