"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Clock, CheckCircle2, Star, User, Filter } from "lucide-react";
import Link from "next/link";

interface Expert {
  id: string;
  anonymousHandle: string;
  expertise: string[];
  averageRating: number;
  totalResponses: number;
  totalHelpful: number;
  isAvailable: boolean;
}

interface Thread {
  id: string;
  title: string;
  description: string;
  trialPhase: string;
  therapeuticArea: string;
  failureType: string;
  urgencyLevel: string;
  status: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
  matchedExperts: Expert[];
}

export default function ExpertDashboardPage() {
  const [expert, setExpert] = useState<Expert | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    failureType: '',
    trialPhase: '',
    urgencyLevel: '',
    status: 'ACTIVE'
  });

  useEffect(() => {
    fetchExpertProfile();
    fetchThreads();
  }, []);

  useEffect(() => {
    filterThreads();
  }, [threads, filters]);

  const fetchExpertProfile = async () => {
    try {
      const response = await fetch('/api/experts/me');
      if (!response.ok) {
        throw new Error('Failed to fetch expert profile');
      }
      const data = await response.json();
      setExpert(data.expert);
    } catch (error) {
      console.error('Error fetching expert profile:', error);
      setIsLoading(false);
    }
  };

  const fetchThreads = async () => {
    try {
      const response = await fetch(`/api/urgent-threads?status=${filters.status}`);
      if (!response.ok) {
        throw new Error('Failed to fetch threads');
      }
      const data = await response.json();
      setThreads(data.threads);
    } catch (error) {
      console.error('Error fetching threads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterThreads = () => {
    let filtered = [...threads];

    if (filters.failureType) {
      filtered = filtered.filter(t => t.failureType === filters.failureType);
    }

    if (filters.trialPhase) {
      filtered = filtered.filter(t => t.trialPhase === filters.trialPhase);
    }

    if (filters.urgencyLevel) {
      filtered = filtered.filter(t => t.urgencyLevel === filters.urgencyLevel);
    }

    setFilteredThreads(filtered);
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

  const getUrgencyPriority = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 0;
      case 'HIGH': return 1;
      case 'MEDIUM': return 2;
      case 'LOW': return 3;
      default: return 4;
    }
  };

  const toggleAvailability = async () => {
    if (!expert) return;

    try {
      const response = await fetch('/api/experts/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          anonymousHandle: expert.anonymousHandle,
          expertise: expert.expertise
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update availability');
      }

      // Refresh expert profile
      await fetchExpertProfile();
    } catch (error) {
      console.error('Error updating availability:', error);
      alert('Failed to update availability. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-slate-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-slate-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Expert profile not found</div>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-slate-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Expert Dashboard
              </h1>
              <div className="text-white/90">
                {expert.anonymousHandle} • Expert since {new Date().getFullYear()}
              </div>
            </div>
            <Button
              onClick={toggleAvailability}
              className={expert.isAvailable ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {expert.isAvailable ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Available
                </>
              ) : (
                <>
                  <Clock className="mr-2 h-5 w-5" />
                  Away
                </>
              )}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-white mb-1">
                  {expert.totalResponses}
                </div>
                <div className="text-white/90 text-sm">Total Responses</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-white mb-1">
                  {expert.totalHelpful}
                </div>
                <div className="text-white/90 text-sm">Helpful Ratings</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 fill-yellow-500 text-yellow-500 mr-2" />
                  <div>
                    <div className="text-3xl font-bold text-white">
                      {expert.averageRating.toFixed(1)}
                    </div>
                    <div className="text-white/90 text-sm">Average Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-white mb-1">
                  {expert.expertise.length}
                </div>
                <div className="text-white/90 text-sm">Expertise Areas</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Expertise Areas */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Your Expertise</CardTitle>
            <CardDescription className="text-white/90">
              Areas where you receive urgent help requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {expert.expertise.map((area) => (
                <Badge key={area} className="bg-blue-600 text-white">
                  {area.replace(/_/g, ' ')}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filter Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-white font-semibold mb-2 block">Failure Type</label>
                <Select
                  value={filters.failureType}
                  onValueChange={(value) => setFilters({ ...filters, failureType: value })}
                >
                  <SelectTrigger className="bg-slate-700 text-white border-slate-600">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="">All types</SelectItem>
                    <SelectItem value="ENROLLMENT_COLLAPSE">Enrollment Collapse</SelectItem>
                    <SelectItem value="PROTOCOL_OVERLOAD">Protocol Overload</SelectItem>
                    <SelectItem value="BUDGET_UNDERFUNDING">Budget Underfunding</SelectItem>
                    <SelectItem value="CRO_EXECUTION_FAILURE">CRO Execution Failure</SelectItem>
                    <SelectItem value="SITE_SELECTION_MISMATCH">Site Selection Mismatch</SelectItem>
                    <SelectItem value="AMENDMENT_CASCADE">Amendment Cascade</SelectItem>
                    <SelectItem value="VENDOR_BREAKDOWN">Vendor Breakdown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-white font-semibold mb-2 block">Trial Phase</label>
                <Select
                  value={filters.trialPhase}
                  onValueChange={(value) => setFilters({ ...filters, trialPhase: value })}
                >
                  <SelectTrigger className="bg-slate-700 text-white border-slate-600">
                    <SelectValue placeholder="All phases" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="">All phases</SelectItem>
                    <SelectItem value="PHASE_I">Phase I</SelectItem>
                    <SelectItem value="PHASE_II">Phase II</SelectItem>
                    <SelectItem value="PHASE_III">Phase III</SelectItem>
                    <SelectItem value="PHASE_IV">Phase IV</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-white font-semibold mb-2 block">Urgency Level</label>
                <Select
                  value={filters.urgencyLevel}
                  onValueChange={(value) => setFilters({ ...filters, urgencyLevel: value })}
                >
                  <SelectTrigger className="bg-slate-700 text-white border-slate-600">
                    <SelectValue placeholder="All levels" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="">All levels</SelectItem>
                    <SelectItem value="CRITICAL">Critical (2-4hr)</SelectItem>
                    <SelectItem value="HIGH">High (6-12hr)</SelectItem>
                    <SelectItem value="MEDIUM">Medium (12-24hr)</SelectItem>
                    <SelectItem value="LOW">Low (24-48hr)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-white font-semibold mb-2 block">Status</label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters({ ...filters, status: value })}
                >
                  <SelectTrigger className="bg-slate-700 text-white border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="RESOLVED">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Urgent Requests */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Urgent Help Requests ({filteredThreads.length})
          </h2>
          {filteredThreads.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6 text-center">
                <div className="text-white/90">
                  {threads.length === 0
                    ? "No urgent help requests matching your expertise yet"
                    : "No requests match your current filters"}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredThreads
                .sort((a, b) => {
                  // Sort by urgency first, then by date
                  const urgencyDiff = getUrgencyPriority(a.urgencyLevel) - getUrgencyPriority(b.urgencyLevel);
                  if (urgencyDiff !== 0) return urgencyDiff;
                  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                })
                .map((thread) => (
                <Card key={thread.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex space-x-2">
                        <Badge className={getUrgencyColor(thread.urgencyLevel)}>
                          {thread.urgencyLevel}
                        </Badge>
                        <Badge className={getStatusColor(thread.status)}>
                          {thread.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="text-white/90 text-sm">
                        {new Date(thread.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="text-white mb-1">
                      {thread.title}
                    </CardTitle>
                    <CardDescription className="text-white/90">
                      {thread.therapeuticArea} • {thread.trialPhase.replace('_', ' ')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/90 text-sm line-clamp-3 mb-4">
                      {thread.description}
                    </p>
                    <Link href={`/urgent-help/${thread.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        View & Respond
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}