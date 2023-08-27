import { Divider, chakra } from '@chakra-ui/react';

interface ErrorPageProps {
  code: number;
  message: string;
}

export default function ErrorPage({ code, message }: ErrorPageProps) {
  return (
    <chakra.h1
      position="absolute"
      top="50%"
      left="25%"
      right="25%"
      width="auto"
      height="auto"
      background="blue-brand-90"
      borderRadius={4}
      color="whiteAlpha.900"
      p={2}
      fontSize="1rem"
    >
      <chakra.span verticalAlign="middle" display="inline-block">
        {code}
      </chakra.span>
      <chakra.span verticalAlign="middle" mx={2} h={4} display="inline-block">
        <Divider orientation="vertical" />
      </chakra.span>
      <chakra.span verticalAlign="middle" display="inline-block">
        {message}
      </chakra.span>
    </chakra.h1>
  );
}
