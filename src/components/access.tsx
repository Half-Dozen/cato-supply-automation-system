"use client";

import { Button } from "@/components/ui/button";

export function Access() {
  const handleRevoke = async () => {
    try {
      const response = await fetch(`${window.location.origin}/api/revoke`, { method: 'POST' });
      if (response.ok) {
        alert('Token revoked successfully');
      } else {
        alert('Error revoking token');
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      alert('Failed to fetch: ' + (error as Error).message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="space-y-4">
        <div className="buttons flex gap-4">
          <Button
            onClick={handleRevoke}
            className="inline-flex items-center justify-center rounded-md border border-black px-6 py-3 text-base font-medium text-black shadow-sm transition-colors hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            variant="outline"
          >
            Revoke Access
          </Button>
        </div>
      </div>
    </div>
  );
}