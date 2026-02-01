import { Box, Flex, styled } from 'styled-system/jsx';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { useSuspenseQueries } from '@tanstack/react-query';
import { calculateGradeProgress } from '../domain/grade/calculations';
import { gradePointsQueryOptions } from '../domain/grade/api';
import { myInfoQueryOptions } from '@/domain/user/api';
import type { Grade } from '../domain/grade/types';

const GRADE_LABELS: Record<Grade, string> = {
  EXPLORER: 'Explorer',
  PILOT: 'Pilot',
  COMMANDER: 'Commander',
};

function CurrentLevelSection() {
  const [{ data: myInfo }, { data: gradePointData }] = useSuspenseQueries({
    queries: [myInfoQueryOptions(), gradePointsQueryOptions()],
  });

  const { pointsToNextGrade, progress } = calculateGradeProgress(myInfo, gradePointData.gradePointList);

  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>

      <Spacing size={4} />

      <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
        <Flex flexDir="column" gap={2}>
          <Text variant="H2_Bold">{GRADE_LABELS[myInfo.grade]}</Text>

          <ProgressBar value={progress} size="xs" />

          <Flex justifyContent="space-between">
            <Box textAlign="left">
              <Text variant="C1_Bold">현재 포인트</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {myInfo.point}p
              </Text>
            </Box>
            <Box textAlign="right">
              <Text variant="C1_Bold">다음 등급까지</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {pointsToNextGrade}p
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </styled.section>
  );
}

export default CurrentLevelSection;
