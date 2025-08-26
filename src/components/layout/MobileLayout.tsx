import FooterNavigation from "./FooterNavigation";

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
}

const MobileLayout = ({
  children,
  title,
  showHeader = true,
}: MobileLayoutProps) => {
  return (
    <div className="mobile-container">
      {showHeader && (
        <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">
              {title || "Optical Store"}
            </h1>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">OS</span>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className="px-4 py-4 space-y-6">{children}</main>

      <FooterNavigation />
    </div>
  );
};

export default MobileLayout;
