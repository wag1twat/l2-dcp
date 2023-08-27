import { Select } from 'antd';
import Router from 'next/router';
import queryString from 'query-string';
import React from 'react';
import { useLang } from 'src/client/hooks';
import { NoSsr } from 'src/client/layouts';

interface SelectLangProps {
  langs: Record<string, string>;
}

export const SelectLang = ({ langs }: SelectLangProps) => {
  const { item, update } = useLang();

  React.useEffect(() => {
    const prevQueries = queryString.parse(globalThis.location.search);
    if (prevQueries.lang !== item) {
      prevQueries.lang = item;
      const nextQueries = queryString.stringify(prevQueries);
      Router.push(`${globalThis.location.pathname}?${nextQueries}`);
    }
  }, [item]);

  return (
    <NoSsr>
      <Select
        value={item}
        onChange={update}
        options={Object.entries(langs).map(([value, label]) => ({
          label,
          value,
        }))}
        popupMatchSelectWidth
      />
    </NoSsr>
  );
};
