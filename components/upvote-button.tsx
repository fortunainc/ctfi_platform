'use client';

import { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UpvoteButtonProps {
  postId: string;
  initialUpvotes: number;
  userId: string;
}

export default function UpvoteButton({ postId, initialUpvotes, userId }: UpvoteButtonProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpvote = async () => {
    if (isLoading) return;

    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/forum/posts/${postId}/upvote`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to upvote');
      }

      const data = await response.json();
      
      setUpvotes(data.upvotes);
      setHasUpvoted(data.hasUpvoted);
    } catch (error) {
      console.error('Error upvoting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={hasUpvoted ? 'default' : 'outline'}
      size="sm"
      onClick={handleUpvote}
      disabled={isLoading}
      className="gap-2"
    >
      <ThumbsUp className={`h-4 w-4 ${hasUpvoted ? 'fill-current' : ''}`} />
      <span>{upvotes}</span>
    </Button>
  );
}