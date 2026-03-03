"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Shield, CheckCircle2, XCircle, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";

interface Expert {
  id: string;
  anonymousHandle: string;
  averageRating: number;
}

interface Response {
  id: string;
  content: string;
  whatToCheck: string[];
  questionsToAsk: string[];
  escalationScript?: string;
  isHelpful?: boolean;
  helpfulRating?: number;
  createdAt: string;
  expert: Expert;
}

interface UrgentThread {
  id: string;
  title: string;
  description: string;
  trialPhase: string;
  therapeuticArea: string;
  siteType?: string;
  failureType: string;
  urgencyLevel: string;
  status: string;
  createdAt: string;
  firstResponseAt?: string;
  resolvedAt?: string;
  operatorRating?: number;
  responses: Response[];
  matchedExperts: Expert[];
}

export default function UrgentHelpDetailPage({ params }: { params: { id: string } }) {
  const [thread, setThread] = useState<UrgentThread | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchThread();
  }, [params.id]);

  const fetchThread = async () => {
    try {
      const response = await fetch(`/api/urgent-threads/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch thread');
      }
      const data = await response.json();
      setThread(data.thread);
      if (data.thread.operatorRating) {
        setRating(data.thread.operatorRating);
      }
    } catch (error) {
      console.error('Error fetching thread:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markResolved = async () => {
    if (!thread) return;

    try {
      const response = await fetch(`/api/urgent-threads/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'RESOLVED',
          operatorRating: rating
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update thread');
      }

      // Refresh thread
      await fetchThread();
    } catch (error) {
      console.error('Error updating thread:', error);
      alert('Failed to mark as resolved. Please try again.');
    }
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-600';
      case 'HIGH': return 'bg-orange-600';
      case 'MEDIUM': return 'bg-yellow-600';
      case 'LOW': return 'bg-blue-600';
      default: return 'bg-slate-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-blue-600';
      case 'IN_PROGRESS': return 'bg-yellow-600';
      case 'RESOLVED': return 'bg-green-600';
      case 'ABANDONED': return 'bg-red-600';
      default: return 'bg-slate-600';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-slate-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-slate-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Thread not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-slate-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/urgent-help">
            <Button variant="ghost" className="text-white/90 hover:text-white mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Expert-on-Call
            </Button>
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {thread.title}
              </h1>
              <div className="flex items-center space-x-3 text-white/90">
                <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{thread.therapeuticArea}</span>
                <span>•</span>
                <span>{thread.trialPhase.replace('_', ' ')}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getUrgencyColor(thread.urgencyLevel)}>
                {thread.urgencyLevel}
              </Badge>
              <Badge className={getStatusColor(thread.status)}>
                {thread.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </div>

        {/* Thread Description */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Your Situation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/90 text-lg leading-relaxed">
              {thread.description}
            </p>
            {thread.siteType && (
              <p className="text-white/90 mt-4">
                <strong>Site Type:</strong> {thread.siteType}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Response Status */}
        {thread.status === 'ACTIVE' && thread.responses.length === 0 && (
          <Card className="bg-slate-800/50 border-blue-700 mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Clock className="h-8 w-8 text-blue-500 animate-pulse" />
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    Waiting for Expert Response
                  </h3>
                  <p className="text-white/90">
                    {thread.urgencyLevel === 'CRITICAL' && 'Expected response within 2-4 hours'}
                    {thread.urgencyLevel === 'HIGH' && 'Expected response within 6-12 hours'}
                    {thread.urgencyLevel === 'MEDIUM' && 'Expected response within 12-24 hours'}
                    {thread.urgencyLevel === 'LOW' && 'Expected response within 24-48 hours'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Expert Responses */}
        {thread.responses.length > 0 && (
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Expert Responses ({thread.responses.length})
            </h2>
            {thread.responses.map((response) => (
              <Card key={response.id} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-6 w-6 text-green-500" />
                      <div>
                        <CardTitle className="text-white text-lg">
                          {response.expert.anonymousHandle}
                        </CardTitle>
                        <CardDescription className="text-white/90">
                          {new Date(response.createdAt).toLocaleString()}
                          {response.expert.averageRating > 0 && (
                            <span className="ml-2 flex items-center">
                              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                              {response.expert.averageRating.toFixed(1)}
                            </span>
                          )}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Main Response */}
                  <div>
                    <h4 className="text-white font-semibold mb-2">Guidance</h4>
                    <p className="text-white/90 leading-relaxed">
                      {response.content}
                    </p>
                  </div>

                  {/* What to Check */}
                  {response.whatToCheck.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-2">What to Check Immediately</h4>
                      <ul className="space-y-2">
                        {response.whatToCheck.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2 text-white/90">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Questions to Ask */}
                  {response.questionsToAsk.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-2">Questions to Ask Your Team</h4>
                      <ul className="space-y-2">
                        {response.questionsToAsk.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2 text-white/90">
                            <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Escalation Script */}
                  {response.escalationScript && (
                    <div>
                      <h4 className="text-white font-semibold mb-2">Escalation Script</h4>
                      <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                        <p className="text-white/90 leading-relaxed italic">
                          {response.escalationScript}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Mark as Resolved */}
        {thread.status !== 'RESOLVED' && thread.status !== 'ABANDONED' && thread.responses.length > 0 && (
          <Card className="bg-slate-800/50 border-green-700">
            <CardHeader>
              <CardTitle className="text-white">Mark as Resolved?</CardTitle>
              <CardDescription className="text-white/90">
                Did the expert responses help you resolve this issue?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-white font-semibold mb-2 block">
                    Rate the helpfulness (1-5 stars)
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-2 transition-colors"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            rating >= star
                              ? 'fill-yellow-500 text-yellow-500'
                              : 'text-white/60'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={markResolved}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={rating === 0}
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Mark as Resolved
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Matched Experts */}
        <Card className="bg-slate-800/50 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Matched Experts ({thread.matchedExperts.length})</CardTitle>
            <CardDescription className="text-white/90">
              Experts who have been notified of your request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {thread.matchedExperts.map((expert) => (
                <div key={expert.id} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold">
                        {expert.anonymousHandle}
                      </div>
                      <div className="text-white/90 text-sm">
                        {(expert as any).expertise.map((e: string) => e.replace('_', ' ')).join(', ')}
                      </div>
                    </div>
                    {expert.averageRating > 0 && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                        <span className="text-white font-semibold">
                          {expert.averageRating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Anonymity Reminder */}
        <Card className="bg-slate-800/50 border-orange-600 mt-8">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-orange-500 flex-shrink-0" />
              <p className="text-white/90 text-sm">
                This request is completely anonymous. No identifying information was shared.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}