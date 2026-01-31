import { Center } from 'styled-system/jsx';
import { Text } from '@/ui-lib';

function LoadingSection() {
  return (
    <Center p={5} aspectRatio={1} bgColor="background.01_white">
      <Text variant="B2_Medium" color="neutral.03_gray">
        로딩 중...
      </Text>
    </Center>
  );
}

export default LoadingSection;
