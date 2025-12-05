import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAdminModeration } from "@/hooks/useAdminModeration";
import { UserAvatar } from "@/components/UserAvatar";
import { Flag, Trash2, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ReviewReportDialog } from "./ReviewReportDialog";

export const ContentModerationPanel = () => {
  const [status, setStatus] = useState<"pending" | "reviewed" | "dismissed">("pending");
  const [page, setPage] = useState(0);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set());
  const pageSize = 20;

  const { reports, totalCount, isLoading, bulkDismiss } = useAdminModeration(
    status,
    page,
    pageSize
  );

  const totalPages = Math.ceil(totalCount / pageSize);

  const getReportTypeBadge = (type: string) => {
    const variants: Record<string, { variant: any; icon: any }> = {
      spam: { variant: "secondary", icon: Flag },
      harassment: { variant: "destructive", icon: AlertTriangle },
      inappropriate: { variant: "destructive", icon: XCircle },
      misinformation: { variant: "default", icon: AlertTriangle },
      other: { variant: "outline", icon: Flag },
    };
    const config = variants[type] || variants.other;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {type}
      </Badge>
    );
  };

  const toggleSelectReport = (reportId: string) => {
    const newSelected = new Set(selectedReports);
    if (newSelected.has(reportId)) {
      newSelected.delete(reportId);
    } else {
      newSelected.add(reportId);
    }
    setSelectedReports(newSelected);
  };

  const handleBulkDismiss = () => {
    bulkDismiss.mutate(Array.from(selectedReports), {
      onSuccess: () => setSelectedReports(new Set()),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        {selectedReports.size > 0 && (
          <Button 
            variant="outline" 
            onClick={handleBulkDismiss}
            className="gap-2 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4" />
            Dismiss {selectedReports.size} Selected
          </Button>
        )}
      </div>

      <Tabs value={status} onValueChange={(v) => setStatus(v as any)}>
        <TabsList className="bg-muted/50 p-1 rounded-lg">
          <TabsTrigger value="pending" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2">
            <AlertTriangle className="h-4 w-4" />
            Pending
          </TabsTrigger>
          <TabsTrigger value="reviewed" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2">
            <CheckCircle className="h-4 w-4" />
            Reviewed
          </TabsTrigger>
          <TabsTrigger value="dismissed" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2">
            <XCircle className="h-4 w-4" />
            Dismissed
          </TabsTrigger>
        </TabsList>

        <TabsContent value={status} className="space-y-4 mt-4">
          {isLoading ? (
            <Card>
              <CardContent className="py-8 text-center">Loading reports...</CardContent>
            </Card>
          ) : reports.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="py-12 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">No {status} reports</p>
                <p className="text-sm text-muted-foreground/70 mt-1">All caught up!</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid gap-4">
                {reports.map((report) => (
                  <Card key={report.id} className="border-border/50 hover:shadow-md transition-shadow overflow-hidden">
                    <CardHeader className="bg-muted/20">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          {status === "pending" && (
                            <input
                              type="checkbox"
                              checked={selectedReports.has(report.id)}
                              onChange={() => toggleSelectReport(report.id)}
                              className="mt-1 h-4 w-4 rounded border-border accent-primary"
                            />
                          )}
                          <div className="flex-1">
                            <CardTitle className="flex flex-wrap items-center gap-2 text-base">
                              {getReportTypeBadge(report.report_type)}
                              <span className="text-xs text-muted-foreground font-normal">
                                {formatDistanceToNow(new Date(report.created_at), {
                                  addSuffix: true,
                                })}
                              </span>
                            </CardTitle>
                            <CardDescription className="mt-1 flex items-center gap-1">
                              <span className="text-muted-foreground/70">Reported by:</span>
                              <span className="font-medium">{report.reporter?.full_name || "Anonymous"}</span>
                            </CardDescription>
                          </div>
                        </div>
                        {status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => setSelectedReport(report.id)}
                            className="gap-1.5"
                          >
                            Review
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                      <div className="bg-muted/30 rounded-lg p-3">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Reason</h4>
                        <p className="text-sm">{report.reason}</p>
                      </div>

                      {report.post && (
                        <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                          <div className="flex items-start gap-3">
                            <UserAvatar
                              avatarUrl={report.post.author?.avatar_url}
                              fullName={report.post.author?.full_name}
                              className="h-10 w-10 ring-2 ring-border/50"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold">
                                {report.post.author?.full_name || "Unknown User"}
                              </p>
                              <p className="text-sm mt-1.5 text-muted-foreground line-clamp-3">
                                {report.post.content}
                              </p>
                              {report.post.image_url && (
                                <img
                                  src={report.post.image_url}
                                  alt="Post"
                                  className="mt-3 rounded-lg max-h-48 object-cover border"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        className={
                          page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = page < 3 ? i : page - 2 + i;
                      if (pageNum >= totalPages) return null;
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => setPage(pageNum)}
                            isActive={page === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum + 1}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                        className={
                          page >= totalPages - 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      {selectedReport && (
        <ReviewReportDialog
          reportId={selectedReport}
          open={!!selectedReport}
          onOpenChange={(open) => !open && setSelectedReport(null)}
        />
      )}
    </div>
  );
};
