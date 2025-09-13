// app/components/LayoutClient.js
'use client';
import { usePageLoading } from '../hooks/usePageLoading';
import Loader from '../components/Loader';

export default function LayoutClient({ children }) {
  const { isLoading } = usePageLoading(8000);

  if (isLoading) {
    return <Loader isLoading={isLoading} onComplete={() => {}} />;
  }

  return <>{children}</>;
}