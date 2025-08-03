'use client';

import { useApi } from '@/hooks/useApi';
import { useQuery } from '@tanstack/react-query';
export default function ClientTest() {
  const api = useApi();

  const { data, error, isLoading } = useQuery({
    queryKey: ['user-test'],
    queryFn: () => api.getUserTest(),
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error.message}</div>;
  }

  return (
    <div className="p-8">
      <h1>클라이언트 테스트</h1>
      <p>클라이언트에서 받은 데이터: {data}</p>
    </div>
  );
}
