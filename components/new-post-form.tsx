'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, AlertCircle, Info } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface NewPostFormProps {
  categories: Category[];
  selectedCategoryId?: string;
}

export default function NewPostForm({ categories, selectedCategoryId }: NewPostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: selectedCategoryId || '',
    isAnonymous: false,
    isUrgent: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validation
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (formData.title.length < 10) {
        throw new Error('Title must be at least 10 characters');
      }
      if (!formData.content.trim()) {
        throw new Error('Content is required');
      }
      if (formData.content.length < 50) {
        throw new Error('Content must be at least 50 characters');
      }
      if (!formData.categoryId) {
        throw new Error('Please select a category');
      }

      const response = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      // Redirect to the new post
      router.push(`/backstage/post/${data.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const titleLength = formData.title.length;
  const contentLength = formData.content.length;

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
          <CardDescription>
            Share your insights, challenges, or questions with the community
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a therapeutic area" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="What's your post about?"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              maxLength={200}
            />
            <p className={`text-xs ${titleLength < 10 ? 'text-red-500' : titleLength > 180 ? 'text-orange-500' : 'text-muted-foreground'}`}>
              {titleLength}/200 characters {titleLength < 10 && '(minimum 10)'}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              placeholder="Share your thoughts, experiences, or questions in detail..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={12}
              maxLength={5000}
            />
            <p className={`text-xs ${contentLength < 50 ? 'text-red-500' : contentLength > 4500 ? 'text-orange-500' : 'text-muted-foreground'}`}>
              {contentLength}/5000 characters {contentLength < 50 && '(minimum 50)'}
            </p>
          </div>

          {/* Anonymous Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="anonymous">Post Anonymously</Label>
              <p className="text-sm text-muted-foreground">
                Your name and reputation tier will be hidden
              </p>
            </div>
            <Switch
              id="anonymous"
              checked={formData.isAnonymous}
              onCheckedChange={(checked) => setFormData({ ...formData, isAnonymous: checked })}
            />
          </div>

          {/* Urgent Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="urgent">Mark as Urgent</Label>
              <p className="text-sm text-muted-foreground">
                Use for time-sensitive issues that need immediate attention
              </p>
            </div>
            <Switch
              id="urgent"
              checked={formData.isUrgent}
              onCheckedChange={(checked) => setFormData({ ...formData, isUrgent: checked })}
            />
          </div>

          {/* Guidelines */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Community Guidelines:</strong> Be respectful, avoid trial identifiers (protocol numbers, sponsor names), 
              and focus on sharing knowledge rather than gossip. Anonymous posting is encouraged for sensitive topics.
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || titleLength < 10 || contentLength < 50}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Post...
                </>
              ) : (
                'Create Post'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}