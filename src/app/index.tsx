import { withProviders } from "./providers";
import { Routing } from "../pages";
import { Header } from "../widgets/ui/Header";
import { Footer } from "../widgets/ui/Footer";
import { PostManagementProvider } from "../features/postManagement/model/context";

const AppComponent = () => {
  return (
    <PostManagementProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routing />
        </main>
        <Footer />
      </div>
    </PostManagementProvider>
  );
};

export const App = withProviders(AppComponent);