'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, AlertCircle } from 'lucide-react';

export default function AIvsRealitySearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<any>(null);
  
  const [searchParams, setSearchParams] = useState({
    condition: '',
    phase: 'ALL',
    status: 'COMPLETED',
  });

  const handleSearch = async () => {
    setError('');
    setIsSearching(true);
    setResults(null);

    try {
      const response = await fetch('/api/ai-vs-reality/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to search trials');
      }

      setResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle>Search Clinical Trials</CardTitle>
          <CardDescription>
            Search ClinicalTrials.gov database and analyze AI prediction accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="condition">Condition/Disease</Label>
              <Input
                id="condition"
                placeholder="e.g., Breast Cancer"
                value={searchParams.condition}
                onChange={(e) => setSearchParams({ ...searchParams, condition: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phase">Phase</Label>
              <Select
                value={searchParams.phase}
                onValueChange={(value) => setSearchParams({ ...searchParams, phase: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All phases" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Phases</SelectItem>
                  <SelectItem value="PHASE1">Phase 1</SelectItem>
                  <SelectItem value="PHASE2">Phase 2</SelectItem>
                  <SelectItem value="PHASE3">Phase 3</SelectItem>
                  <SelectItem value="PHASE4">Phase 4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={searchParams.status}
                onValueChange={(value) => setSearchParams({ ...searchParams, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="ACTIVE_NOT_RECRUITING">Active, not recruiting</SelectItem>
                  <SelectItem value="RECRUITING">Recruiting</SelectItem>
                  <SelectItem value="TERMINATED">Terminated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSearch}
            disabled={isSearching || !searchParams.condition}
            className="w-full"
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching & Analyzing...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search & Analyze
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <>
          {/* Summary */}
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950">
            <CardHeader>
              <CardTitle>Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Trials Analyzed</p>
                  <p className="text-2xl font-bold">{results.summary.totalTrials}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Enrollment Error</p>
                  <p className="text-2xl font-bold text-red-600">
                    {results.summary.avgEnrollmentError}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Duration Error</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {results.summary.avgDurationError}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Cost Impact</p>
                  <p className="text-2xl font-bold text-red-600">
                    ${(results.summary.totalCostImpact / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trial Results */}
          <Card>
            <CardHeader>
              <CardTitle>Trial Results ({results.trials.length})</CardTitle>
              <CardDescription>
                Showing prediction vs reality comparison for each trial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.trials.map((trial: any, index: number) => {
                  const prediction = results.predictions[index];
                  const enrollmentError = prediction.actualEnrollment
                    ? Math.abs(((prediction.predictedEnrollment - prediction.actualEnrollment) / prediction.actualEnrollment) * 100)
                    : null;
                  const durationError = prediction.actualDuration
                    ? Math.abs(((prediction.predictedDuration - prediction.actualDuration) / prediction.actualDuration) * 100)
                    : null;

                  return (
                    <div key={trial.nctId} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{trial.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {trial.nctId} • {trial.sponsor}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            {trial.phase.map((phase: string) => (
                              <Badge key={phase} variant="secondary" className="text-xs">
                                {phase}
                              </Badge>
                            ))}
                            <Badge variant="outline" className="text-xs">
                              {trial.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
                        {/* Enrollment */}
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Enrollment</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">AI Predicted:</span>
                            <span className="font-medium">{prediction.predictedEnrollment}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Actual:</span>
                            <span className="font-medium">
                              {prediction.actualEnrollment || 'N/A'}
                            </span>
                          </div>
                          {enrollmentError !== null && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Error:</span>
                              <span className={`font-bold ${
                                enrollmentError > 30 ? 'text-red-600' : 
                                enrollmentError > 15 ? 'text-orange-600' : 
                                'text-green-600'
                              }`}>
                                {enrollmentError.toFixed(0)}%
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Duration */}
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Duration (months)</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">AI Predicted:</span>
                            <span className="font-medium">{prediction.predictedDuration}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Actual:</span>
                            <span className="font-medium">
                              {prediction.actualDuration || 'N/A'}
                            </span>
                          </div>
                          {durationError !== null && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Error:</span>
                              <span className={`font-bold ${
                                durationError > 40 ? 'text-red-600' : 
                                durationError > 20 ? 'text-orange-600' : 
                                'text-green-600'
                              }`}>
                                {durationError.toFixed(0)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}