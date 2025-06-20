"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState } from 'react';

interface Props {
  jobId: string;
}

const Application = ({ jobId }: Props) => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchApplication = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/apply-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId }),
      });

      const result = await response.json();
      
      if (!result.success) {
        setError(result.message || 'Something went wrong');
      } else {
        setSuccess(result.message || 'Successfully applied!');
      }
    } catch (error) {
      console.error('Something went wrong', error);
      setError('Failed to apply. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <Button
        className="w-full p-2"
        onClick={fetchApplication}
        disabled={loading || !!success}
      >
        {loading ? 'Applying...' : 'Apply Now'}
      </Button>

      {error && (
        <p className="mt-3 text-center text-red-500 font-medium">{error}</p>
      )}

      {success && (
        <>
          <p className="mt-3 text-center text-green-600 font-medium">{success}</p>
          <div className="text-center mt-2">
            <Link href="/dashboard" className="text-blue-600 underline hover:text-blue-800">
              View Applications
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Application;
