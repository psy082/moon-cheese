import { Box, Flex, styled } from 'styled-system/jsx';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { http } from '@/utils/http';

type Grade = 'EXPLORER' | 'PILOT' | 'COMMANDER';

interface MyInfo {
  point: number;
  grade: Grade;
}

interface GradePoint {
  type: Grade;
  minPoint: number;
}

interface GradePointResponse {
  gradePointList: GradePoint[];
}

const GRADE_LABELS: Record<Grade, string> = {
  EXPLORER: 'Explorer',
  PILOT: 'Pilot',
  COMMANDER: 'Commander',
};

const GRADE_ORDER = ['EXPLORER', 'PILOT', 'COMMANDER'] as const satisfies readonly Grade[];

function CurrentLevelSection() {
  const { data: myInfo } = useQuery(
    queryOptions({
      queryKey: ['me'],
      queryFn: () => http.get<MyInfo>('/api/me'),
    })
  );

  const { data: gradePointData } = useQuery(
    queryOptions({
      queryKey: ['grade-points'],
      queryFn: () => http.get<GradePointResponse>('/api/grade/point'),
    })
  );

  if (!myInfo || !gradePointData) {
    return null;
  }

  // 다음 등급까지 남은 포인트와 진행도를 계산합니다.
  // 현재 등급의 시작 포인트부터 다음 등급의 시작 포인트까지의 범위에서
  // 사용자의 현재 포인트 위치를 백분율로 계산합니다.
  const gradePointList = gradePointData.gradePointList;
  const currentGradeIndex = GRADE_ORDER.indexOf(myInfo.grade);
  const nextGradeIndex = currentGradeIndex + 1;

  const currentGradeMinPoint =
    gradePointList.find(g => g.type === myInfo.grade)?.minPoint ?? 0;
  const nextGradeMinPoint =
    nextGradeIndex < GRADE_ORDER.length
      ? gradePointList.find(g => g.type === GRADE_ORDER[nextGradeIndex])?.minPoint ?? 0
      : Infinity;

  const pointsToNextGrade = nextGradeMinPoint === Infinity ? 0 : nextGradeMinPoint - myInfo.point;
  const gradeRange = nextGradeMinPoint === Infinity ? 1 : nextGradeMinPoint - currentGradeMinPoint;
  const progress = gradeRange === 0 ? 1 : (myInfo.point - currentGradeMinPoint) / gradeRange;

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
