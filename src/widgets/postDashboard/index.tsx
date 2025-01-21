import { DashboardHeader } from "./ui/dashboardHeader";
import { DashboardContent } from "./ui/dashboardContent";
import { Card, CardContent } from "../../shared/ui";

export const PostDashboard = () => (
  <Card className="w-full max-w-7xl mx-auto">
    <CardContent className="p-6">
      <DashboardHeader />
      <DashboardContent />
    </CardContent>
  </Card>
);